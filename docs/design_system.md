# Design System: KIPF Redesign

This document outlines the core tokens, rules, and typography required across the application. It acts as the single source of truth for all styling decisions.

## Typography

We are using Google Fonts to power the typography system. Both are loaded globally via Next.js `next/font/google` in `layout.tsx`.

- **Headers** (h1, h2, h3, h4): `Sora` (sans-serif)
  - Used for large titles, hero text, and section subheaders to bring a modern, slightly rounded, premium feel.
  - Primary weight: `700` (Bold)
  - Secondary weight: `600` (SemiBold)

- **Body Text** (p, span, labels, buttons, navigation): `Inter` (sans-serif)
  - Used for all reading materials to ensure high legibility on mobile.
  - Weights:
    - `400` (Regular) for standard paragraphs
    - `500` (Medium) for labels and notifications
    - `600` (SemiBold) for Button texts and active Navigation links

## Color Palette

The project is built on a restrained color palette focusing on high contrast, readability, and a sophisticated vibe suited for an international exhibition.

| Token | CSS Variable | Hex | Usage |
| --- | --- | --- | --- |
| **Base Background** | `--color-base` | `#FDFBF7` | The main website background (warm off-white/ivory) |
| **Surface Solid** | `--color-surface` | `#FFFFFF` | Card backgrounds, isolated containers |
| **Primary Navy** | `--color-primary` | `#0A192F` | Main deep text, footer backgrounds, major section blocks. Instills trust. |
| **Primary Navy Soft** | `--color-primary-soft`| `#112240` | Subtle hover states or secondary dark blocks. |
| **Accent Gold** | `--color-accent` | `#D4AF37` | Highly prominent CTAs (Book Stall). Indicates premium action. |
| **Accent Gold Soft**| `--color-accent-soft`| `#E6B325` | Gold button hover states or badges. |
| **Accent Glow** | `--color-accent-glow`| `rgba(212,175,55,0.15)` | Subtle glow effect around gold elements. |
| **Text Primary** | `--color-text` | `#0A192F` | Main paragraph and heading text. |
| **Text Secondary**| `--color-text-muted` | `#64748B` | Subtitles, supporting non-critical text. |
| **Border Soft** | `--color-border` | `#E2E8F0` | Card borders and structural dividers. |

## Gradient Tokens

| Token | CSS Variable | Usage |
| --- | --- | --- |
| **Hero Gradient** | `--gradient-hero` | Dark overlay on hero images |
| **Section Gradient** | `--gradient-section` | Navy → Navy-soft for dark sections |
| **Gold Gradient** | `--gradient-gold` | Premium gold CTA buttons and accent lines |
| **Card Shine** | `--gradient-card-shine` | Subtle white reflection on dark cards |

## Spacing Scale

All spacing uses a consistent token scale defined as CSS custom properties:

| Token | Value |
| --- | --- |
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |
| `--space-4xl` | 96px |

## Border Radius Scale

| Token | Value |
| --- | --- |
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 24px |
| `--radius-full` | 9999px |

## Shadow Scale

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 3px rgba(10,25,47,0.06)` | Subtle card resting state |
| `--shadow-md` | `0 4px 12px rgba(10,25,47,0.08)` | Hover states, elevated cards |
| `--shadow-lg` | `0 12px 32px rgba(10,25,47,0.12)` | Lifted cards, modals |
| `--shadow-glow` | `0 0 24px rgba(212,175,55,0.2)` | Gold CTA glow effect |

## Motion Guidelines

All motion must be subtle and never disruptive. Heavy parallax and looping animations are banned (except decorative text shimmer).

### Easing & Duration Tokens
| Token | Value |
| --- | --- |
| `--ease-smooth` | `cubic-bezier(0.25, 0.8, 0.25, 1)` |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--duration-fast` | `0.2s` |
| `--duration-normal` | `0.35s` |
| `--duration-slow` | `0.5s` |

### Animation Rules
- **Properties**: ONLY animate `opacity` and `transform` for GPU acceleration.
- **Card Hovers**: Lift effect (`translateY(-4px)` to `-6px`) combined with shadow enhancement and optional accent line reveal.
- **Section Reveal**: Four variants available: `reveal-up`, `reveal-scale`, `reveal-left`, `reveal-right` — all driven by IntersectionObserver.
- **Stagger Classes**: `.stagger-1` through `.stagger-5` for delayed reveal sequences.
- **Interactive Hovers**: `.hover-lift` (translate up with shadow) and `.hover-scale` (subtle scale with bounce easing).
- **Decorative**: `.anim-float` for floating decorative elements, `.shimmer-text` for gold gradient text shimmer.
- **Button Sweep**: Light-sweep `::before` pseudo-element on hover for premium button feel.

## Components Rules

### TopBar (`/src/components/layout/TopBar.tsx`)
- Sticky position with glassmorphism (`backdrop-filter: blur(16px)`)
- Scroll-aware: shrinks padding and shows border/shadow on scroll
- Desktop shows navigation links with animated underline on hover
- Gold gradient CTA button with glow effect
- Brand text hides on mobile < 480px

### BottomNav (`/src/components/layout/BottomNav.tsx`)
- Fixed position with glassmorphism, hidden on desktop ≥ 768px
- Active item: gold icon, slight lift, dot indicator below
- Bounce easing on active icon scale

### Buttons (`/src/components/ui/Button.tsx`)
- Minimum touch target: 48px height
- Rounded corners: `border-radius: 8px`
- Three variants: `primary` (gold gradient), `secondary` (glass outline), `outline` (dark border)
- Light-sweep hover effect on all variants
- Active press state: transforms back to resting position

### Cards (`/src/components/ui/Card.tsx`)
- Soft shadows with resting state (`shadow-sm`)
- Accent line at top: hidden by default, reveals on hover with `scaleX()` animation
- Optional `accentColor` prop for per-card color theming via CSS `color-mix()`
- Optional `icon` prop for icon area with bounce hover
- Hover: lift up + enhanced shadow + tinted border

### Badges (`/src/components/ui/Badge.tsx`)
- Three variants: `primary`, `accent`, `outline`
- Accent variant uses translucent gold background with subtle border
- Letter-spacing for premium uppercase feel

### Hero (`/src/components/home/Hero.tsx`)
- Auto-rotating image slideshow with crossfade (5 images, 5s interval)
- Ken Burns subtle zoom animation on active slide
- Decorative grid overlay with radial mask
- Gold shimmer gradient on accent headline text
- Stats row with dividers: Exhibitors, Edition, Visitors, Days
- Slide indicators: dots that expand for active state

### QuickActions (`/src/components/home/QuickActions.tsx`)
- 5 action cards with proper SVG stroke icons (no emojis)
- Per-card `--action-color` CSS variable for unique tinting
- Icon wrapper uses `color-mix()` for 10% tinted backgrounds
- Hover: lift + scale + border tint + icon rotation

---
*Note: Refer to `/src/styles/index.css` for the exact mapped variables and `/src/styles/motion.css` for reusable utility classes.*
