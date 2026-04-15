"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

/* ─── Icon Components ─── */
/* Each icon exposes CSS classes on individual SVG elements so we can 
   animate specific parts (roof, door, flap, etc.) independently.
   All use 24×24 viewBox, stroke-based, rounded caps/joins. */

function IconHome({ isActive }: { isActive: boolean }) {
  return (
    <svg className={`${styles.icon} ${isActive ? styles.iconHomeActive : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={styles.homeRoof} d="M3 9.5L12 3l9 6.5" />
      <path className={styles.homeBody} d="M4 10v9a1 1 0 001 1h4v-5a1 1 0 011-1h4a1 1 0 011 1v5h4a1 1 0 001-1v-9" />
    </svg>
  );
}

function IconTicket({ isActive }: { isActive: boolean }) {
  return (
    <svg className={`${styles.icon} ${isActive ? styles.iconTicketActive : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className={styles.ticketBody} d="M2 9a3 3 0 013-3h14a3 3 0 013 3v0a3 3 0 00-3 3 3 3 0 003 3v0a3 3 0 01-3 3H5a3 3 0 01-3-3v0a3 3 0 003-3 3 3 0 00-3-3z" />
      <path className={styles.ticketDash} d="M9 6v2" />
      <path className={styles.ticketDash} d="M9 16v2" />
      <path className={styles.ticketDash} d="M9 11v2" />
    </svg>
  );
}

function IconUsers({ isActive }: { isActive: boolean }) {
  return (
    <svg className={`${styles.icon} ${isActive ? styles.iconUsersActive : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle className={styles.userHead1} cx="9" cy="7" r="3" />
      <path className={styles.userBody1} d="M3 21v-1a5 5 0 015-5h2a5 5 0 015 5v1" />
      <circle className={styles.userHead2} cx="17" cy="8" r="2.5" />
      <path className={styles.userBody2} d="M21 21v-.5a4 4 0 00-3-3.87" />
    </svg>
  );
}

function IconGrid({ isActive }: { isActive: boolean }) {
  return (
    <svg className={`${styles.icon} ${isActive ? styles.iconGridActive : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect className={styles.gridTL} x="3" y="3" width="7" height="7" rx="1.5" />
      <rect className={styles.gridTR} x="14" y="3" width="7" height="7" rx="1.5" />
      <rect className={styles.gridBL} x="3" y="14" width="7" height="7" rx="1.5" />
      <rect className={styles.gridBR} x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconMail({ isActive }: { isActive: boolean }) {
  return (
    <svg className={`${styles.icon} ${isActive ? styles.iconMailActive : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect className={styles.mailBody} x="2" y="4" width="20" height="16" rx="3" />
      <path className={styles.mailFlap} d="M22 7l-10 7L2 7" />
    </svg>
  );
}

/* ─── Nav Configuration ─── */
const NAV_ITEMS = [
  { name: 'Home',        path: '/',            Icon: IconHome   },
  { name: 'Book',        path: '/book',        Icon: IconTicket },
  { name: 'Participate', path: '/participate',  Icon: IconUsers  },
  { name: 'More',        path: '/more',        Icon: IconGrid   },
  { name: 'Contact',     path: '/contact',     Icon: IconMail   },
];

/* ─── Component ─── */
export default function BottomNav() {
  const pathname = usePathname();

  /* Tap effect — adds a brief class for the click animation */
  const handleTap = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    // Remove first to allow re-triggering on same tab
    el.classList.remove(styles.tapped);
    // Force reflow so the animation restarts
    void el.offsetWidth;
    el.classList.add(styles.tapped);
    const onEnd = () => {
      el.classList.remove(styles.tapped);
      el.removeEventListener('animationend', onEnd);
    };
    el.addEventListener('animationend', onEnd);
  }, []);

  return (
    <div className={styles.bottomNavWrapper}>
      <nav className={styles.bottomNav} aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== '/' && pathname.startsWith(item.path));

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={handleTap}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.iconWrap}>
                <item.Icon isActive={isActive} />
              </span>
              <span className={styles.label}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
