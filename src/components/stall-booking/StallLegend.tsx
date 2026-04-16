"use client";

import React, { useState } from 'react';
import styles from './StallLegend.module.css';

const ITEMS = [
  { status: 'available', color: '#16A34A', bg: '#DCFCE7', label: 'Available' },
  { status: 'booked',    color: '#DC2626', bg: '#FEE2E2', label: 'Booked' },
  { status: 'blocked',   color: '#94A3B8', bg: '#F1F5F9', label: 'Blocked' },
  { status: 'selected',  color: '#D4AF37', bg: 'rgba(212,175,55,0.15)', label: 'Selected' },
] as const;

export default function StallLegend() {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggle}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Toggle legend"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>Legend</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={styles.items}>
          {ITEMS.map(item => (
            <div key={item.status} className={styles.item}>
              <span
                className={styles.dot}
                style={{ background: item.bg, border: `2px solid ${item.color}` }}
                aria-hidden="true"
              />
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
