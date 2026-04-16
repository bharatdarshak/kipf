"use client";

import React, { useRef, useCallback, useEffect } from 'react';
import type { HallConfig, Stall, StallStatus } from '../../data/stalls/types';
import styles from './HallMap.module.css';

/* ── Status colors ── */
const STATUS_STYLES: Record<StallStatus, { fill: string; stroke: string; text: string }> = {
  available: { fill: '#DCFCE7', stroke: '#16A34A', text: '#15803D' },
  booked:    { fill: '#FEE2E2', stroke: '#EF4444', text: '#B91C1C' },
  blocked:   { fill: '#F1F5F9', stroke: '#CBD5E1', text: '#94A3B8' },
  selected:  { fill: 'rgba(212,175,55,0.18)', stroke: '#D4AF37', text: '#78621A' },
};

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 4;

interface Props {
  config: HallConfig;
  selectedId: string | null;
  highlightId: string | null;
  filter: 'all' | 'available' | 'booked';
  zoom: number;
  panX: number;
  panY: number;
  onStallClick: (stall: Stall) => void;
  onTransform: (zoom: number, panX: number, panY: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HallMap({
  config, selectedId, highlightId, filter,
  zoom, panX, panY,
  onStallClick, onTransform,
  containerRef,
}: Props) {
  const { unitSize, gridCols, gridRows, stalls, entrances } = config;
  const svgW = gridCols * unitSize;
  const svgH = gridRows * unitSize;

  /*
   * ─── Mutable transform state ───
   * During gestures we accumulate transform changes in these refs.
   * A single rAF loop flushes them to React state once per frame,
   * preventing multi-setState vibration.
   */
  const tRef = useRef({ z: zoom, px: panX, py: panY });
  const dirty = useRef(false);
  const rafId = useRef(0);

  // Keep refs in sync when React state changes (e.g. from fit-to-screen)
  useEffect(() => {
    if (!dirty.current) {
      tRef.current = { z: zoom, px: panX, py: panY };
    }
  }, [zoom, panX, panY]);

  /** Schedule a batched flush to React state */
  const scheduleFlush = useCallback(() => {
    if (dirty.current) return; // already scheduled
    dirty.current = true;
    rafId.current = requestAnimationFrame(() => {
      dirty.current = false;
      const { z, px, py } = tRef.current;
      onTransform(z, px, py);
    });
  }, [onTransform]);

  // Cleanup rAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  /* Gesture tracking refs */
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);
  const touchCount = useRef(0);

  const isVisible = useCallback((s: Stall) => {
    if (filter === 'available') return s.status === 'available' || s.status === 'selected';
    if (filter === 'booked')    return s.status === 'booked';
    return true;
  }, [filter]);

  /* ── Wheel zoom (desktop) ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      const t = tRef.current;
      t.z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, t.z * factor));
      scheduleFlush();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [containerRef, scheduleFlush]);

  /* ── Mouse pan (desktop) ── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest('[data-stall]')) return;
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    const t = tRef.current;
    t.px += dx;
    t.py += dy;
    scheduleFlush();
  }, [scheduleFlush]);

  const stopDrag = useCallback(() => { isDragging.current = false; }, []);

  /*
   * ─── Touch gestures (mobile) ───
   * Uses native addEventListener with { passive: false } so
   * preventDefault() actually works to block browser zoom/scroll.
   *
   * All transform deltas are accumulated in tRef and flushed
   * once per rAF frame — no multiple setState calls per event.
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      touchCount.current = e.touches.length;

      if (e.touches.length === 1) {
        isDragging.current = true;
        lastPointer.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }

      if (e.touches.length === 2) {
        e.preventDefault();
        isDragging.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist.current = Math.sqrt(dx * dx + dy * dy);
        lastPointer.current = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
      }
    };

    const onMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging.current) {
        e.preventDefault();
        const dx = e.touches[0].clientX - lastPointer.current.x;
        const dy = e.touches[0].clientY - lastPointer.current.y;
        lastPointer.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        const t = tRef.current;
        t.px += dx;
        t.py += dy;
        scheduleFlush();
        return;
      }

      if (e.touches.length === 2 && lastPinchDist.current !== null) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // -- Zoom --
        const scale = dist / lastPinchDist.current;
        lastPinchDist.current = dist;
        const t = tRef.current;
        const oldZ = t.z;
        const newZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZ * scale));

        // Zoom towards the midpoint of the two fingers
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

        // Adjust pan so the point under the midpoint stays fixed
        if (newZ !== oldZ) {
          const ratio = newZ / oldZ;
          // The container's bounding rect origin
          const rect = el.getBoundingClientRect();
          const cx = midX - rect.left; // cursor X relative to container
          const cy = midY - rect.top;
          t.px = cx - ratio * (cx - t.px);
          t.py = cy - ratio * (cy - t.py);
          t.z = newZ;
        }

        // -- Simultaneous pan (follow midpoint drift) --
        const pdx = midX - lastPointer.current.x;
        const pdy = midY - lastPointer.current.y;
        lastPointer.current = { x: midX, y: midY };
        t.px += pdx;
        t.py += pdy;

        scheduleFlush();
      }
    };

    const onEnd = () => {
      isDragging.current = false;
      lastPinchDist.current = null;
      touchCount.current = 0;
    };

    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd);
    el.addEventListener('touchcancel', onEnd);
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  }, [containerRef, scheduleFlush]);

  /* ── Render ── */
  const GAP = 2;
  const RADIUS = 3;
  const FONT_SIZE = Math.max(7, Math.min(11, unitSize * 0.22));

  return (
    <div
      className={styles.mapOuter}
      ref={containerRef as React.RefObject<HTMLDivElement>}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      aria-label={`${config.name} interactive map`}
    >
      <div
        className={styles.mapCanvas}
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          transformOrigin: '0 0',
          width: svgW,
          height: svgH,
        }}
      >
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ display: 'block', overflow: 'visible' }}
          aria-label={config.name}
        >
          {/* Hall background */}
          <rect x={0} y={0} width={svgW} height={svgH} fill="#EFF6FF" rx={6} />

          {/* Subtle grid guide lines */}
          {Array.from({ length: gridCols + 1 }, (_, i) => (
            <line key={`vl-${i}`} x1={i * unitSize} y1={0} x2={i * unitSize} y2={svgH}
              stroke="rgba(148,163,184,0.08)" strokeWidth={0.5} />
          ))}
          {Array.from({ length: gridRows + 1 }, (_, i) => (
            <line key={`hl-${i}`} x1={0} y1={i * unitSize} x2={svgW} y2={i * unitSize}
              stroke="rgba(148,163,184,0.08)" strokeWidth={0.5} />
          ))}

          {/* Stalls */}
          {stalls.map(stall => {
            const effStatus: StallStatus = stall.id === selectedId ? 'selected' : stall.status;
            const colors = STATUS_STYLES[effStatus];
            const isHighlighted = stall.id === highlightId;
            const dimmed = filter !== 'all' && !isVisible(stall);

            const px = stall.x * unitSize + GAP;
            const py = stall.y * unitSize + GAP;
            const pw = stall.w * unitSize - GAP * 2;
            const ph = stall.h * unitSize - GAP * 2;

            return (
              <g
                key={stall.id}
                data-stall={stall.id}
                style={{
                  opacity: dimmed ? 0.18 : 1,
                  cursor: stall.status === 'blocked' ? 'default' : 'pointer',
                }}
                onClick={() => stall.status !== 'blocked' && onStallClick(stall)}
                role={stall.status !== 'blocked' ? 'button' : undefined}
                aria-label={`Stall ${stall.label}, ${stall.status}`}
                tabIndex={stall.status !== 'blocked' ? 0 : undefined}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ' ') && stall.status !== 'blocked') {
                    onStallClick(stall);
                  }
                }}
              >
                <rect
                  x={px} y={py} width={pw} height={ph} rx={RADIUS}
                  fill={isHighlighted ? 'rgba(212,175,55,0.28)' : colors.fill}
                  stroke={isHighlighted ? '#D4AF37' : colors.stroke}
                  strokeWidth={stall.id === selectedId ? 2.5 : isHighlighted ? 2 : 1.5}
                  className={styles.stallRect}
                />
                <text
                  x={px + pw / 2} y={py + ph / 2}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={FONT_SIZE} fontWeight="700"
                  fill={isHighlighted ? '#78621A' : colors.text}
                  fontFamily="Inter, sans-serif"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {stall.label}
                </text>
              </g>
            );
          })}

          {/* Arrow marker defs */}
          <defs>
            <marker id="arrowG" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,1 L7,4 L0,7 Z" fill="#0F766E" />
            </marker>
          </defs>

          {/* Entrances / Exits — larger, more visible labels */}
          {entrances.map(ent => {
            const ex = ent.x * unitSize;
            const ey = ent.y * unitSize;
            const isLeft = ent.direction === 'left';
            const pillW = 64;
            const pillH = 26;
            const bx = isLeft ? ex - pillW - 6 : ex + 6;
            const entLabel = ent.label ?? (ent.type === 'in' ? 'ENTRY' : ent.type === 'out' ? 'EXIT' : 'ENTRY / EXIT');

            return (
              <g key={ent.id}>
                {/* Pill background */}
                <rect
                  x={bx} y={ey - pillH / 2}
                  width={pillW} height={pillH}
                  rx={pillH / 2}
                  fill="#0F766E"
                  stroke="#fff" strokeWidth={1.5}
                />
                {/* Door icon (simple arch) */}
                <path
                  d={`M${bx + 10},${ey + 6} v-8 a4,4 0 0,1 8,0 v8`}
                  fill="none" stroke="#fff" strokeWidth={1.5}
                  strokeLinecap="round"
                />
                {/* Label text */}
                <text
                  x={bx + pillW / 2 + 6} y={ey + 0.5}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={8} fontWeight="800" letterSpacing="0.08em"
                  fill="#fff" fontFamily="Inter, sans-serif"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {entLabel}
                </text>
                {/* Arrow line */}
                <line
                  x1={isLeft ? bx - 2 : bx + pillW + 2} y1={ey}
                  x2={isLeft ? bx - 16 : bx + pillW + 16} y2={ey}
                  stroke="#0F766E" strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd="url(#arrowG)"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
