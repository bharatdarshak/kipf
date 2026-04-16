"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Hero from '../components/home/Hero';
import QuickActions from '../components/home/QuickActions';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import styles from './page.module.css';

export default function Home() {
  // Intersection observer to trigger reveals
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const timelineItems = [
    {
      title: 'Exhibition Dates',
      detail: '10th, 11th, 12th, 13th February 2026'
    },
    {
      title: 'NOVACON + Inauguration',
      detail: '10th Feb 2026, 10 am to 10 pm'
    },
    {
      title: 'Ceremonial Dinner',
      detail: '12th Feb 2026, 7 pm onwards'
    },
    {
      title: 'Exhibition Hours',
      detail: 'Daily from 10:00 am to 6:00 pm'
    }
  ];

  const registrationCards = [
    {
      title: 'NOVACON',
      description: 'Register as a conference participant.',
      href: '/book/registration?type=novacon',
      accent: '#0EA5E9',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h16v14H4z"/>
          <path d="M8 9h8"/>
          <path d="M8 13h5"/>
        </svg>
      )
    },
    {
      title: 'EXHIBITOR',
      description: 'Book your space and showcase your brand.',
      href: '/book/registration?type=exhibitor',
      accent: '#16A34A',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M12 7V3"/>
          <path d="M8 3h8"/>
        </svg>
      )
    },
    {
      title: 'CEREMONIAL DINNER',
      description: 'Reserve your place for the official dinner.',
      href: '/book/registration?type=ceremonial-dinner',
      accent: '#D97706',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v8"/>
          <path d="M12 2v8"/>
          <path d="M8 6h4"/>
          <path d="M11 10v12"/>
          <path d="M17 2v7a2 2 0 0 1-2 2h0v11"/>
        </svg>
      )
    },
    {
      title: 'VISITOR',
      description: 'Join as a visitor and explore the event.',
      href: '/book/registration?type=visitor',
      accent: '#7C3AED',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 11h-6"/>
          <path d="M20 8v6"/>
        </svg>
      )
    }
  ];

  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Biswa+Bangla+Exhibition+Center+Canal+Bank+Road+DG+Block+Action+Area+I+Newtown+West+Bengal+700156';

  return (
    <div className={styles.pageWrapper}>
      <Hero />
      <QuickActions />

      {/* Trust & Overview Block */}
      <section className={styles.overviewSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionAccent} />
          <span className={`${styles.sectionTag} reveal-up`}>About the Fair</span>
          <h2 className={`${styles.sectionTitle} reveal-up stagger-1`}>A Tradition of Excellence</h2>
          <p className={`${styles.sectionDesc} reveal-up stagger-2`}>
            Organized since 2013, the Kolkata International Poultry Fair focuses on the advancement and sustainable growth of the poultry sector, connecting thousands of farmers, scientists, and businesses from around the world.
          </p>
        </div>

        <div className={styles.cardGrid}>
          <Card
            title="The Fair"
            className="reveal-up stagger-1"
            accentColor="#3B82F6"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            }
          >
            Discover cutting-edge technology, network with global leaders, and explore opportunities over three action-packed days.
          </Card>
          <Card
            title="Programs & Seminars"
            className="reveal-up stagger-2"
            accentColor="#10B981"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            }
          >
            Participate in rigorous technical seminars and workshops led by prominent scientists and industry stalwarts.
          </Card>
          <Card
            title="Venue & Facilities"
            className="reveal-up stagger-3"
            accentColor="#8B5CF6"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            }
          >
            Held at state-of-the-art facilities designed to handle massive footprint with premium amenities for exhibitors and visitors.
          </Card>
        </div>
      </section>

      {/* 2026 Priority Section */}
      <section className={styles.storySection} aria-labelledby="fair-2026-title">
        <div className={styles.storyBg} aria-hidden="true" />
        <div className={styles.storyContent}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionAccent} />
            <span className={`${styles.sectionTag} reveal-up`}>2026 Edition</span>
            <h2 id="fair-2026-title" className={`${styles.sectionTitle} reveal-up stagger-1`}>
              12th Kolkata International Poultry Fair 2026
            </h2>
            <p className={`${styles.sectionDesc} reveal-up stagger-2`}>
              Upcoming Registrations: Choose your registration category and complete your process in a few easy steps.
            </p>
          </div>

          <div className={styles.storyHeroWrap}>
            <div className={`${styles.storyLeadCard} reveal-up stagger-1`}>
              <p className={styles.storyLeadLabel}>How To Do?</p>
              <h3 className={styles.storyLeadTitle}>Plan your KIPF 2026 journey in one flow</h3>
              <p className={styles.storyLeadText}>
                Organised by West Bengal Poultry Federation in association with the Animal Resources Development Department, Govt. of West Bengal.
              </p>
            </div>

            <figure className={`${styles.storyImageMain} reveal-scale stagger-2`}>
              <Image
                src="/images/venue.jpg"
                alt="Biswa Bangla Exhibition Center"
                fill
                sizes="(max-width: 960px) 100vw, 34vw"
              />
            </figure>
          </div>

          <ol className={styles.storyTimeline}>
            {timelineItems.map((item, index) => (
              <li key={item.title} className={`${styles.storyTimelineItem} reveal-up stagger-${(index % 5) + 1}`}>
                <span className={styles.storyTimelineDot} aria-hidden="true" />
                <p className={styles.storyTimelineTitle}>{item.title}</p>
                <p className={styles.storyTimelineDetail}>{item.detail}</p>
              </li>
            ))}
          </ol>

          <div className={styles.storyRegistrationGrid}>
            {registrationCards.map((card, index) => (
              <article key={card.title} className={`${styles.storyRegistrationCard} reveal-scale stagger-${(index % 5) + 1}`}>
                <div className={styles.storyRegistrationCardTop}>
                  <span className={styles.storyRegistrationIcon} style={{ '--card-accent': card.accent } as React.CSSProperties}>
                    {card.icon}
                  </span>
                  <h3 className={styles.storyRegistrationTitle}>{card.title}</h3>
                </div>
                <p className={styles.storyRegistrationText}>{card.description}</p>
                <Button href={card.href} variant="primary" fullWidth>
                  Register Now
                </Button>
              </article>
            ))}
          </div>

          <div className={`${styles.storyVenueRow} reveal-up stagger-4`}>
            <div>
              <p className={styles.storyVenueTitle}>Venue: Biswa Bangla Exhibition Center</p>
              <p className={styles.storyVenueText}>
                Canal Bank Rd, DG Block, Action Area I, Newtown, West Bengal 700156. Exhibition timing: 10:00 am to 6:00 pm.
              </p>
            </div>
            <Button href={mapUrl} variant="outline" className={styles.storyVenueMapBtn}>
              View on Map
            </Button>
          </div>
        </div>
      </section>

      {/* Participation Block */}
      <section className={styles.participateSection}>
        <div className={styles.participateBg} aria-hidden="true" />
        <div className={styles.participateContent}>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionTag} ${styles.sectionTagLight} reveal-up`}>Get Involved</span>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight} reveal-up stagger-1`}>How to Participate</h2>
            <p className={`${styles.sectionDesc} ${styles.sectionDescLight} reveal-up stagger-2`}>
              Multiple pathways to make your mark at India&apos;s biggest poultry event.
            </p>
          </div>
          
          <div className={styles.participateGrid}>
            {/* Stall Card */}
            <div className={`${styles.participateCard} reveal-scale stagger-1`}>
              <div className={styles.participateCardInner}>
                <div className={styles.participateIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <span className={styles.participateLabel}>Most Popular</span>
                <h3 className={styles.participateTitle}>By Stall / Pavilion</h3>
                <p className={styles.participateDesc}>Secure premium booth space to showcase your innovations directly to buyers and industry leaders.</p>
                <Button href="/book/stall" variant="primary" fullWidth>Book Stall</Button>
              </div>
            </div>

            {/* Sponsorship Card */}
            <div className={`${styles.participateCard} reveal-scale stagger-2`}>
              <div className={styles.participateCardInner}>
                <div className={styles.participateIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 className={styles.participateTitle}>By Sponsorship</h3>
                <p className={styles.participateDesc}>Elevate your brand presence with our exclusive event sponsorship packages and marketing visibility.</p>
                <Button href="/participate/sponsorship" variant="outline" fullWidth className={styles.outlineBtnLight}>View Packages</Button>
              </div>
            </div>

            {/* Souvenir Card */}
            <div className={`${styles.participateCard} reveal-scale stagger-3`}>
              <div className={styles.participateCardInner}>
                <div className={styles.participateIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <h3 className={styles.participateTitle}>By Souvenirs</h3>
                <p className={styles.participateDesc}>Feature your advertisement in our highly anticipated official event souvenir magazine.</p>
                <Button href="/participate/souvenirs" variant="secondary" fullWidth>Submit Ad</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
