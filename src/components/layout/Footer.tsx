"use client";

import React from 'react';
import Link from 'next/link';
import KipfWordmark from './KipfWordmark';
import styles from './Footer.module.css';

/* ─── Link data ─── */
const QUICK_LINKS = [
  { label: 'About the Fair', href: '/more/fair' },
  { label: 'Programs', href: '/more/programs' },
  { label: 'Participate', href: '/participate' },
  { label: 'Contact Us', href: '/contact/us' },
  { label: 'Photo Gallery', href: '/more/gallery' },
  { label: 'Admin Login', href: '/admin' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/contact/privacy' },
  { label: 'Terms & Conditions', href: '/contact/terms' },
  { label: 'Refund Policy', href: '/contact/refund' },
];

/* ─── Social links ─── */
const SOCIALS = [
  {
    name: 'X (Twitter)',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const MAP_URL = 'https://maps.app.goo.gl/qbf82nE1AGRP2twp7';

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.footerInner}>
        {/* ══ Brand Column: SVG + subtitle + address + map button ══ */}
        <div className={styles.brandCol}>
          <KipfWordmark />

          <p className={styles.brandSubtitle}>
            12th Kolkata International Poultry Fair
          </p>

          <div className={styles.addressRow}>
            {/* Small building/location icon */}
            <svg className={styles.addressIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V7l7-4 7 4v14" />
              <path d="M9 21v-6h6v6" />
              <path d="M10 10h4" />
            </svg>
            <address className={styles.brandAddress}>
              Everest House, 46C Chowringhee Road, 11th Floor, Room No. C, Kolkata — 700071, West Bengal
            </address>
          </div>

          {/* View in Map button */}
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapBtn}
          >
            <svg className={styles.mapBtnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>View in Map</span>
            <svg className={styles.mapBtnArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

        {/* ══ Links Columns ══ */}
        <div className={styles.linksArea}>
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Quick Links</h4>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Legal</h4>
            <ul className={styles.linkList}>
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══ Contact Column ══ */}
        <div className={styles.contactCol}>
          <h4 className={styles.colHeading}>Reach Us</h4>
          <div className={styles.contactList}>
            {/* Phone numbers */}
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div className={styles.phoneLinks}>
                <a href="tel:03340515757" className={styles.phoneLink}>033-40515757</a>
                <a href="tel:+919051555506" className={styles.phoneLink}>(+91) 9051555506</a>
                <a href="tel:+917719362347" className={styles.phoneLink}>(+91) 7719362347</a>
              </div>
            </div>

            {/* Fax */}
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V3H8v4" />
                <line x1="6" y1="11" x2="6" y2="11.01" />
                <line x1="10" y1="11" x2="10" y2="11.01" />
                <rect x="12" y="14" width="6" height="4" />
              </svg>
              <span>Fax: 033 22885525</span>
            </div>

            {/* Email */}
            <a href="mailto:info.kipf@yahoo.com" className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <span>info.kipf@yahoo.com</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className={styles.socialRow}>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <p className={styles.copyright}>
            &copy; 2026 KIPF Organizing Committee. All Rights Reserved.
          </p>
          <p className={styles.madeWith}>
            Official Platform • Kolkata International Poultry Fair 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
