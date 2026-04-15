"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './KipfWordmark.module.css';

/**
 * KipfWordmark — Animated SVG "KiPF" signature for the footer.
 *
 * Features:
 * - Bold geometric letterforms (5px stroke, 70px cap height)
 * - Prominent egg-shaped "i" dot (rx=12, ry=16)
 * - Multi-line crack pattern with chip fragment
 * - Subtle flanking accent lines with dot terminals
 * - IntersectionObserver: animates when footer enters view
 * - Plays once, holds final state
 *
 * Performance:
 * - Pure CSS stroke-dashoffset animation
 * - prefers-reduced-motion shows final state instantly
 */
export default function KipfWordmark() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wordmarkWrap} ${isVisible ? styles.animate : ''}`}
      aria-label="KIPF"
      role="img"
    >
      <svg
        className={styles.wordmarkSvg}
        viewBox="0 0 360 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ═══ Left decorative accent ═══ */}
        <circle
          className={`${styles.accentDot} ${styles.accentLeft}`}
          cx="8"
          cy="48"
          r="2"
          fill="white"
        />
        <line
          className={`${styles.accentLine} ${styles.accentLineLeft}`}
          x1="14"
          y1="48"
          x2="34"
          y2="48"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* ═══════════ K ═══════════ */}
        {/* Stem */}
        <path
          className={`${styles.letterPath} ${styles.kStem}`}
          d="M 52 8 L 52 86"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Upper diagonal */}
        <path
          className={`${styles.letterPath} ${styles.kUpper}`}
          d="M 52 50 L 98 8"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Lower diagonal */}
        <path
          className={`${styles.letterPath} ${styles.kLower}`}
          d="M 66 42 L 98 86"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ═══════════ i ═══════════ */}
        {/* Stem (lowercase height) */}
        <path
          className={`${styles.letterPath} ${styles.iStem}`}
          d="M 126 40 L 126 86"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ── EGG dot — prominent, vertically elongated ── */}
        <ellipse
          className={`${styles.eggPath} ${styles.egg}`}
          cx="126"
          cy="18"
          rx="12"
          ry="16"
          stroke="white"
          strokeWidth="3.2"
          fill="none"
        />

        {/* ── EGG CRACK PATTERN ── */}
        {/* Multi-line crack: main zigzag + branches + chip */}
        <g className={styles.crackGroup}>
          {/* Primary crack — zigzag across the upper portion */}
          <path
            className={styles.crackMain}
            d="M 114.5 16 L 118 20 L 121 14 L 126 19 L 130 13 L 133 18 L 137 15"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Branch crack — upward from mid-left */}
          <path
            className={styles.crackBranch1}
            d="M 121 14 L 119 8"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Branch crack — downward from mid-right */}
          <path
            className={styles.crackBranch2}
            d="M 130 13 L 132 21"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small chip fragment — tiny triangle piece near top */}
          <path
            className={styles.crackChip}
            d="M 122 10 L 128 8 L 126 4"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* ═══════════ P ═══════════ */}
        <path
          className={`${styles.letterPath} ${styles.pLetter}`}
          d="M 156 86 L 156 8 L 184 8 Q 208 8 208 30 Q 208 52 184 52 L 156 52"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ═══════════ F ═══════════ */}
        {/* Stem + top bar (continuous path) */}
        <path
          className={`${styles.letterPath} ${styles.fStem}`}
          d="M 232 86 L 232 8 L 278 8"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Mid bar */}
        <path
          className={`${styles.letterPath} ${styles.fMid}`}
          d="M 232 46 L 268 46"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ═══ Right decorative accent ═══ */}
        <line
          className={`${styles.accentLine} ${styles.accentLineRight}`}
          x1="296"
          y1="48"
          x2="316"
          y2="48"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle
          className={`${styles.accentDot} ${styles.accentRight}`}
          cx="322"
          cy="48"
          r="2"
          fill="white"
        />

        {/* ═══ Thin baseline rule beneath wordmark ═══ */}
        <line
          className={`${styles.accentLine} ${styles.baseline}`}
          x1="52"
          y1="96"
          x2="278"
          y2="96"
          stroke="white"
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
