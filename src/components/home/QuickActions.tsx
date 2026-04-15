import React from 'react';
import Link from 'next/link';
import styles from './QuickActions.module.css';

const ACTIONS = [
  {
    name: 'Login',
    path: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    color: '#3B82F6',
  },
  {
    name: 'Registration',
    path: '/book/registration-details',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    color: '#10B981',
  },
  {
    name: 'Sponsorship',
    path: '/participate/sponsorship',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: '#F59E0B',
  },
  {
    name: 'Participate',
    path: '/participate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#8B5CF6',
  },
  {
    name: 'More',
    path: '/more',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"/>
        <circle cx="19" cy="12" r="1"/>
        <circle cx="5" cy="12" r="1"/>
      </svg>
    ),
    color: '#6366F1',
  },
];

export default function QuickActions() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {ACTIONS.map((action, i) => (
          <Link
            href={action.path}
            key={action.name}
            className={`${styles.actionCard} reveal-up stagger-${(i % 5) + 1}`}
          >
            <div
              className={styles.iconWrapper}
              style={{ '--action-color': action.color } as React.CSSProperties}
            >
              {action.icon}
            </div>
            <span className={styles.title}>{action.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
