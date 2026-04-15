"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './TopBar.module.css';

const NAV_LINKS = [
  { name: 'The Fair', path: '/' },
  { name: 'Programs', path: '/programs' },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Prelude', path: '/prelude' },
  { name: 'Stall Booking', path: '/book/stall' },
  { name: 'Registration', path: '/register' },
  { name: 'Participation', path: '/participate' },
  { name: 'Organizers', path: '/organizers' },
  { name: 'Contact', path: '/contact' },
  { name: 'Exhibitor', path: '/exhibitor' },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.topBarWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <header className={styles.topBar}>
        {/* Left: Logo + Brand */}
        <Link href="/" className={styles.logoArea}>
          <Image 
            src="/images/ipfkol_logo.png" 
            alt="KIPF Logo" 
            width={56} 
            height={56} 
            className={styles.logo}
            priority
          />
          <div className={styles.brandText}>
            <span className={styles.title}>12th Kolkata International Poultry Fair</span>
            <span className={styles.subtitle}>India&apos;s Biggest Poultry Mela</span>
            <span className={styles.tagline}>Meet the entire Indian Poultry Industry</span>
          </div>
        </Link>

        {/* Center/Right Area */}
        <div className={styles.rightArea}>
          <div className={styles.navAndContact}>
            {/* Top Row: Contact Info (Hidden on Scroll) */}
            <div className={styles.contactInfo}>
              <div className={styles.phoneGroup}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:03340515757" className={styles.contactLinkText}>033-40515757</a>
                <span className={styles.extraPhones}>
                  {' / '}<a href="tel:9051555506" className={styles.contactLinkText}>9051555506</a>
                  {' / '}<a href="tel:7719362347" className={styles.contactLinkText}>7719362347</a>
                </span>
              </div>
              <a href="mailto:info.kipf@yahoo.com" className={styles.contactLink}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>info.kipf@yahoo.com</span>
              </a>
            </div>

            {/* Bottom Row: Desktop Navigation */}
            <nav className={styles.desktopNav}>
              {NAV_LINKS.map((link) => (
                <Link key={link.name} href={link.path} className={styles.navLink}>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Far Right: CTA */}
          <div className={styles.actions}>
            <Link href="/book/stall" className={styles.ctaButton}>
              Book Stall
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
