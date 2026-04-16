"use client";

import React from 'react';
import styles from './StallSearch.module.css';

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  filter: 'all' | 'available' | 'booked';
  onFilterChange: (v: 'all' | 'available' | 'booked') => void;
}

const FILTERS = [
  { value: 'all' as const, label: 'All' },
  { value: 'available' as const, label: 'Available' },
  { value: 'booked' as const, label: 'Booked' },
];

export default function StallSearch({ query, onQueryChange, filter, onFilterChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.input}
          placeholder="Find stall e.g. A14, B72…"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          aria-label="Search stalls by number"
        />
        {query && (
          <button className={styles.clear} onClick={() => onQueryChange('')} aria-label="Clear search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.filters} role="group" aria-label="Filter by status">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${filter === f.value ? styles.filterActive : ''}`}
            onClick={() => onFilterChange(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
