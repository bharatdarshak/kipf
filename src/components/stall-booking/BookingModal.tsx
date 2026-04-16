"use client";

import React, { useRef, useEffect, useState } from 'react';
import type { Stall } from '../../data/stalls/types';
import styles from './BookingModal.module.css';

interface Props {
  stall: Stall | null;
  onClose: () => void;
}

export default function BookingModal({ stall, onClose }: Props) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const firstRef = useRef<HTMLInputElement>(null);

  /* Focus trap — set focus when modal opens */
  useEffect(() => {
    if (stall) {
      setSubmitted(false);
      setTimeout(() => firstRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [stall]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!stall) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Stall Booking Enquiry — ${stall.label} | KIPF 2026`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to book Stall ${stall.label} at the 12th Kolkata International Poultry Fair 2026.\n\nName: ${name}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\n${message ? `\nMessage: ${message}` : ''}\n\nPlease confirm availability and next steps.\n\nThank you.`
    );
    window.open(`mailto:info.kipf@yahoo.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div
      className={styles.overlay}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Book Stall ${stall.label}`}
    >
      <div className={styles.modal}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close booking form">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon} aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className={styles.successTitle}>Enquiry Sent!</h3>
            <p className={styles.successText}>
              Your booking enquiry for <strong>{stall.label}</strong> has been submitted. Our team will contact you within 24 hours.
            </p>
            <button className={styles.doneBtn} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.stallBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Stall {stall.label}
              </div>
              <h2 className={styles.modalTitle}>Book This Stall</h2>
              <p className={styles.modalSub}>
                Fill in your details below. Our team will confirm your booking within 24 hours.
              </p>
            </div>

            {/* Stall summary */}
            {stall.price && (
              <div className={styles.stallSummary}>
                <span className={styles.summaryItem}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  {stall.stallType ?? 'Open Stall'}
                </span>
                <span className={styles.summaryPrice}>₹{stall.price.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bm-name">Full Name *</label>
                  <input
                    id="bm-name"
                    ref={firstRef}
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bm-company">Company / Organisation *</label>
                  <input
                    id="bm-company"
                    className={styles.input}
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Your company name"
                    required
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bm-phone">Phone Number *</label>
                  <input
                    id="bm-phone"
                    className={styles.input}
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    autoComplete="tel"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bm-email">Email Address *</label>
                  <input
                    id="bm-email"
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="bm-message">Additional Requirements</label>
                <textarea
                  id="bm-message"
                  className={`${styles.input} ${styles.textarea}`}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Any special requirements, preferred stall location, or questions…"
                  rows={3}
                />
              </div>

              <div className={styles.formFooter}>
                <p className={styles.disclaimer}>
                  By submitting, you agree to be contacted by the KIPF organising team regarding your booking.
                </p>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!name || !company || !phone || !email}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Booking Enquiry
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
