"use client";

import React from 'react';
import styles from './HallSwitcher.module.css';

interface Props {
  activeHall: 'A' | 'B';
  onChange: (hall: 'A' | 'B') => void;
  countA: number;
  countB: number;
  availableA: number;
  availableB: number;
}

export default function HallSwitcher({ activeHall, onChange, countA, countB, availableA, availableB }: Props) {
  return (
    <div className={styles.wrapper} role="tablist" aria-label="Select exhibition hall">
      <button
        role="tab"
        aria-selected={activeHall === 'A'}
        className={`${styles.tab} ${activeHall === 'A' ? styles.active : ''}`}
        onClick={() => onChange('A')}
        id="hall-tab-a"
      >
        <span className={styles.hallLabel}>Hall A</span>
        <span className={styles.meta}>
          <span className={styles.available}>{availableA} available</span>
          <span className={styles.separator}>·</span>
          <span className={styles.total}>{countA} total</span>
        </span>
      </button>
      <button
        role="tab"
        aria-selected={activeHall === 'B'}
        className={`${styles.tab} ${activeHall === 'B' ? styles.active : ''}`}
        onClick={() => onChange('B')}
        id="hall-tab-b"
      >
        <span className={styles.hallLabel}>Hall B</span>
        <span className={styles.meta}>
          <span className={styles.available}>{availableB} available</span>
          <span className={styles.separator}>·</span>
          <span className={styles.total}>{countB} total</span>
        </span>
      </button>
      <div
        className={styles.indicator}
        style={{ transform: `translateX(${activeHall === 'A' ? '0%' : '100%'})` }}
        aria-hidden="true"
      />
    </div>
  );
}
