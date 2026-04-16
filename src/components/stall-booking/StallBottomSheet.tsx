"use client";

import React, { useEffect, useRef } from 'react';
import type { Stall } from '../../data/stalls/types';
import styles from './StallBottomSheet.module.css';

interface Props {
  stall: Stall | null;
  onClose: () => void;
  onBook: (stall: Stall) => void;
}

const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  booked: 'Booked',
  blocked: 'Blocked',
  selected: 'Selected',
};

export default function StallBottomSheet({ stall, onClose, onBook }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isOpen = !!stall;

  /* Prevent body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Close on backdrop tap */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!stall) return null;

  const isAvailable = stall.status === 'available';
  const isBooked = stall.status === 'booked';

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={`Stall ${stall.label} details`}
    >
      <div
        className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ''}`}
        ref={sheetRef}
      >
        {/* Drag handle */}
        <div className={styles.handle} aria-hidden="true" />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.stallId}>{stall.label}</span>
            <span className={`${styles.statusBadge} ${styles[`status_${stall.status}`]}`}>
              {STATUS_LABEL[stall.status]}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className={styles.body}>
          {stall.stallType && (
            <div className={styles.detailRow}>
              <span className={styles.detailIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <div>
                <p className={styles.detailLabel}>Stall Type</p>
                <p className={styles.detailValue}>{stall.stallType}</p>
              </div>
            </div>
          )}

          <div className={styles.detailRow}>
            <span className={styles.detailIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </span>
            <div>
              <p className={styles.detailLabel}>Category</p>
              <p className={styles.detailValue} style={{ textTransform: 'capitalize' }}>{stall.size} Stall</p>
            </div>
          </div>

          {isAvailable && stall.price && (
            <div className={styles.priceBox}>
              <p className={styles.priceLabel}>Booking Price</p>
              <p className={styles.price}>₹{stall.price.toLocaleString('en-IN')}</p>
              <p className={styles.priceSub}>+ applicable taxes · inclusive of 4 days</p>
            </div>
          )}

          {isBooked && (
            <div className={styles.bookedBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0  0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              <div>
                <p className={styles.detailLabel}>Booked By</p>
                <p className={styles.detailValue}>{stall.bookedBy ?? 'Exhibitor (details withheld)'}</p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className={styles.footer}>
          {isAvailable && (
            <button
              className={styles.bookBtn}
              onClick={() => onBook(stall)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12V22H4V12" />
                <path d="M22 7H2v5h20V7z" />
                <path d="M12 22V7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
              Book This Stall
            </button>
          )}
          {isBooked && (
            <button className={styles.contactBtn} onClick={onClose}>
              Contact Organiser
            </button>
          )}
          {!isAvailable && !isBooked && (
            <p className={styles.unavailableNote}>This stall is not available for booking.</p>
          )}
        </div>
      </div>
    </div>
  );
}
