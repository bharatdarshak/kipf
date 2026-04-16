"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { hallAConfig, hallBConfig } from '../../data/stalls';
import type { Stall } from '../../data/stalls/types';
import HallMap from './HallMap';
import HallSwitcher from './HallSwitcher';
import StallLegend from './StallLegend';
import StallSearch from './StallSearch';
import MapControls from './MapControls';
import StallBottomSheet from './StallBottomSheet';
import BookingModal from './BookingModal';
import styles from './StallBookingPage.module.css';

type Filter = 'all' | 'available' | 'booked';

/** Compute a zoom+pan that fits the whole grid inside the container. */
function calcFit(
  containerEl: HTMLDivElement,
  gridCols: number, gridRows: number, unitSize: number,
) {
  const { width, height } = containerEl.getBoundingClientRect();
  if (width <= 0 || height <= 0) return null;
  const svgW = gridCols * unitSize;
  const svgH = gridRows * unitSize;
  const pad = 16;
  const scaleX = (width - pad * 2) / svgW;
  const scaleY = (height - pad * 2) / svgH;
  const z = Math.min(scaleX, scaleY, 1.2); // allow slight upscale on small grids
  return {
    zoom: z,
    panX: (width - svgW * z) / 2,
    panY: (height - svgH * z) / 2,
  };
}

export default function StallBookingPage() {
  const didFitRef = useRef(false);

  const [activeHall, setActiveHall] = useState<'A' | 'B'>('A');
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [bookingStall, setBookingStall] = useState<Stall | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const config = activeHall === 'A' ? hallAConfig : hallBConfig;

  /* ── Derived counts ── */
  const countA = hallAConfig.stalls.length;
  const countB = hallBConfig.stalls.length;
  const availableA = hallAConfig.stalls.filter(s => s.status === 'available').length;
  const availableB = hallBConfig.stalls.filter(s => s.status === 'available').length;

  /* ── Highlighted stall (best fuzzy match from search) ── */
  const highlightId = (() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    // exact match first
    const exact = config.stalls.find(s => s.id.toLowerCase() === q);
    if (exact) return exact.id;
    // prefix / contains match
    const partial = config.stalls.find(s => s.id.toLowerCase().startsWith(q));
    return partial?.id ?? null;
  })();

  /* ── Fit to screen ── */
  const fitToScreen = useCallback(() => {
    const container = mapContainerRef.current;
    if (!container) return;
    const result = calcFit(container, config.gridCols, config.gridRows, config.unitSize);
    if (!result) return;
    setZoom(result.zoom);
    setPanX(result.panX);
    setPanY(result.panY);
  }, [config]);

  /* ResizeObserver-based initial fit */
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;
    didFitRef.current = false;

    const ro = new ResizeObserver(() => {
      if (!didFitRef.current) {
        const result = calcFit(container, config.gridCols, config.gridRows, config.unitSize);
        if (result) {
          didFitRef.current = true;
          setZoom(result.zoom);
          setPanX(result.panX);
          setPanY(result.panY);
        }
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [config]);

  /* Hall switch reset */
  useEffect(() => {
    setSelectedStall(null);
    setSearch('');
    didFitRef.current = false;
  }, [activeHall]);

  /* ── Stall click ── */
  const handleStallClick = useCallback((stall: Stall) => {
    setSelectedStall(prev => (prev?.id === stall.id ? null : stall));
  }, []);

  /* ── Zoom button handlers ── */
  const handleZoomIn  = () => setZoom(z => Math.min(4, z * 1.25));
  const handleZoomOut = () => setZoom(z => Math.max(0.3, z / 1.25));

  /* ── Batched transform callback from HallMap gesture engine ── */
  const handleTransform = useCallback((z: number, px: number, py: number) => {
    setZoom(z);
    setPanX(px);
    setPanY(py);
  }, []);

  /* ── Booking flow ── */
  const handleBook = useCallback((stall: Stall) => {
    setSelectedStall(null);
    setBookingStall(stall);
  }, []);

  /*
   * ── Zoom & center on the highlighted (searched) stall ──
   * When user searches for a stall:
   *  • Zoom to 1.5× (enough to see the stall clearly)
   *  • Center the stall in the viewport
   */
  useEffect(() => {
    if (!highlightId) return;
    const stall = config.stalls.find(s => s.id === highlightId);
    if (!stall || !mapContainerRef.current) return;

    const container = mapContainerRef.current;
    const { width, height } = container.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;

    // Use a zoom level that makes the stall clearly readable
    const targetZoom = Math.max(zoom, 1.5);
    const stallCX = (stall.x + stall.w / 2) * config.unitSize;
    const stallCY = (stall.y + stall.h / 2) * config.unitSize;

    setZoom(targetZoom);
    setPanX(width / 2 - stallCX * targetZoom);
    setPanY(height / 2 - stallCY * targetZoom);
  }, [highlightId, config]); // intentionally NOT depending on zoom to avoid feedback loop

  return (
    <div className={styles.page}>
      {/* ── Page Header ── */}
      <header className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitles}>
            <p className={styles.yearTag}>KIPF 2026 · 12th Edition</p>
            <h1 className={styles.heading}>Stall Selection</h1>
          </div>
          <HallSwitcher
            activeHall={activeHall}
            onChange={hall => setActiveHall(hall)}
            countA={countA}
            countB={countB}
            availableA={availableA}
            availableB={availableB}
          />
        </div>

        <div className={styles.headerBottom}>
          <StallSearch
            query={search}
            onQueryChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
          />
          <div className={styles.legendWrap}>
            <StallLegend />
          </div>
        </div>
      </header>

      {/* ── Hall label strip ── */}
      <div className={styles.hallStrip}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span className={styles.hallName}>{config.name}</span>
        <span className={styles.hallCount}>
          {config.stalls.filter(s => s.status === 'available').length} of {config.stalls.length} stalls available
        </span>
      </div>

      {/* ── Map area ── */}
      <div className={styles.mapArea}>
        <HallMap
          config={config}
          selectedId={selectedStall?.id ?? null}
          highlightId={highlightId}
          filter={filter}
          zoom={zoom}
          panX={panX}
          panY={panY}
          onStallClick={handleStallClick}
          onTransform={handleTransform}
          containerRef={mapContainerRef}
        />

        {/* Map controls — overlaid on the map with absolute positioning */}
        <div className={styles.mapControls}>
          <MapControls
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFit={fitToScreen}
          />
        </div>

        {/* Hint banner */}
        {!selectedStall && (
          <div className={styles.hintBanner} aria-live="polite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Pinch to zoom · Drag to pan · Tap a stall for details
          </div>
        )}
      </div>

      {/* ── Stall detail bottom sheet ── */}
      <StallBottomSheet
        stall={selectedStall}
        onClose={() => setSelectedStall(null)}
        onBook={handleBook}
      />

      {/* ── Booking modal ── */}
      <BookingModal
        stall={bookingStall}
        onClose={() => setBookingStall(null)}
      />
    </div>
  );
}
