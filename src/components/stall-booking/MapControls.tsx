"use client";

import React from 'react';
import styles from './MapControls.module.css';

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  zoom: number;
}

export default function MapControls({ onZoomIn, onZoomOut, onFit, zoom }: Props) {
  return (
    <div className={styles.wrapper} aria-label="Map controls">
      <button className={styles.btn} onClick={onZoomIn} aria-label="Zoom in" title="Zoom in" disabled={zoom >= 4}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>

      <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>

      <button className={styles.btn} onClick={onZoomOut} aria-label="Zoom out" title="Zoom out" disabled={zoom <= 0.3}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>

      <div className={styles.divider} />

      <button className={styles.btn} onClick={onFit} aria-label="Fit to screen" title="Fit to screen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
      </button>
    </div>
  );
}
