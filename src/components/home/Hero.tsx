"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const HERO_IMAGES = [
  '/images/hero/hero1.jpg',
  '/images/hero/hero2.jpg',
  '/images/hero/hero3.jpg',
  '/images/hero/hero4.jpg',
  '/images/hero/hero5.jpg',
];

interface StatConfig {
  endValue: number;
  suffix: string;
  prefix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { endValue: 500, suffix: '+', prefix: '', label: 'Exhibitors' },
  { endValue: 12, suffix: 'th', prefix: '', label: 'Edition' },
  { endValue: 50, suffix: 'K+', prefix: '', label: 'Visitors' },
  { endValue: 4, suffix: '', prefix: '', label: 'Days' },
];

function useCountUp(endValue: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.35 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * endValue));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, endValue, duration]);

  return { count, ref };
}

function AnimatedStat({ stat, delay }: { stat: StatConfig; delay: number }) {
  const { count, ref } = useCountUp(stat.endValue, 2000 + delay);

  return (
    <div className={styles.statItem} style={{ animationDelay: `${0.8 + delay / 1000}s` }}>
      <span className={styles.statValue} ref={ref}>
        {stat.prefix}{count}{stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
      setIsTransitioning(false);
    }, 600);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <section className={styles.heroWrapper} id="hero">
      {/* Background Images with crossfade */}
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`${styles.imageSlide} ${index === currentImage ? styles.activeSlide : ''} ${isTransitioning && index === currentImage ? styles.fadingOut : ''}`}
        >
          <Image
            src={src}
            alt={`KIPF Exhibition ${index + 1}`}
            fill
            className={styles.heroImage}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className={styles.overlay} />

      {/* Decorative elements */}
      <div className={styles.decorGrid} aria-hidden="true" />

      {/* Floating Particles */}
      <div className={styles.particles} aria-hidden="true">
        <span className={styles.particle} />
        <span className={styles.particle} />
        <span className={styles.particle} />
        <span className={styles.particle} />
        <span className={styles.particle} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Badge */}
        <div className={styles.heroBadge}>
          <span className={styles.badgePulse} />
          <span className={styles.badgeText}> Feb 10 – Feb 13, 2026 · Kolkata</span>
        </div>

        <h1 className={styles.headline}>
          12th Kolkata International
          <br />
          <span className={styles.headlineAccent}> Poultry Fair 2026</span>
        </h1>

        <p className={styles.subtext}>
          Join thousands of industry professionals, explore cutting-edge innovations, and network at India&apos;s most prestigious poultry exhibition.
        </p>

        <div className={styles.ctas}>
          <Button href="/book/stall" variant="primary" className={styles.heroCtaButton}>
            Book Stall
          </Button>
          <Button href="/book/registration" variant="secondary" className={styles.heroCtaButton}>
            Company Registration
          </Button>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} delay={i * 200} />
          ))}
        </div>

        {/* Slide Indicators — inside content flow, below stats */}
        <div className={styles.slideIndicators}>
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentImage ? styles.activeIndicator : ''}`}
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
