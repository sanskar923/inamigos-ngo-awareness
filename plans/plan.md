# InAmigos NGO Website — Architectural Plan

## Overview
A modern, single-page NGO awareness website for "InAmigos" built with vanilla HTML5, CSS3 (custom properties), and JavaScript. No framework dependencies except Font Awesome CDN for icons and Unsplash for imagery. All animations powered by native Intersection Observer API and CSS transitions.

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 Custom Properties, Flexbox, Grid, Animations |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6 (CDN) |
| Images | Unsplash Source URLs (no API key) |
| Fonts | Google Fonts — Poppins + Inter (CDN) |
| Animations | Intersection Observer API + CSS keyframes |

---

## File Structure
```
c:/task 1/
  ├── index.html          (single HTML file — all sections)
  ├── css/
  │   └── styles.css      (all styles, modular sections with comments)
  └── js/
      └── script.js       (all JavaScript interactions)
```

### Why One HTML File?
All 10 sections are on a single landing page — splitting into multiple HTML files would provide no benefit and add complexity. The CSS and JS are separated for maintainability.

---

## Design System / CSS Custom Properties

```css
:root {
  /* === COLOR PALETTE === */
  --clr-primary-deep-blue: #0a1628;
  --clr-primary-blue: #0d2137;
  --clr-accent-teal: #0d9488;
  --clr-accent-teal-light: #14b8a6;
  --clr-accent-green: #10b981;
  --clr-accent-green-light: #34d399;
  --clr-white: #ffffff;
  --clr-off-white: #f8fafc;
  --clr-gray-light: #e2e8f0;
  --clr-gray-medium: #94a3b8;
  --clr-gray-dark: #475569;
  --clr-gradient-hero: linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0f766e 100%);
  --clr-gradient-primary: linear-gradient(135deg, #0d9488, #10b981);
  --clr-gradient-card: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));

  /* === GLASSMORPHISM === */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-blur: blur(16px);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  /* === TYPOGRAPHY === */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  --fs-hero-title: clamp(2.5rem, 6vw, 5rem);
  --fs-section-title: clamp(2rem, 4vw, 3rem);
  --fs-card-title: 1.25rem;
  --fs-body: 1rem;
  --fs-small: 0.875rem;

  /* === SPACING === */
  --section-padding: clamp(4rem, 8vw, 8rem) 0;
  --container-max: 1200px;
  --container-padding: 1.5rem;

  /* === BORDERS & RADII === */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-round: 50%;

  /* === TRANSITIONS === */
  --transition-fast: 0.2s ease;
  --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  /* === Z-INDEX LAYERS === */
  --z-preloader: 9999;
  --z-navbar: 1000;
  --z-lightbox: 2000;
  --z-scroll-top: 900;
}
```

---

## Section Architecture

### 1. Hero Section (`#hero`)
**Layout:** Flexbox, full viewport height (100vh), centered content
**Key Elements:**
- Background image via Unsplash (`https://images.unsplash.com/photo-1559027612-c17b4e5b6b8c?w=1920&q=80` — community/volunteer scene)
- Dark gradient overlay (`::after` pseudo-element with `rgba(10, 22, 40, 0.75)`)
- `.hero-content` centered flex column
  - `<h1>` — "InAmigos" with gradient text effect
  - `<p class="tagline">` — "Together We Create Change"
  - `<p class="mission">` — Short mission statement
  - `.hero-btns` — Two glassmorphism CTA buttons
- Scroll indicator: animated bouncing chevron + "Scroll" text

**Animations:**
- Hero text fade-up on load (CSS keyframes, staggered delay)
- Floating particles (JavaScript canvas or CSS pseudo-elements)
- Scroll indicator infinite bounce

### 2. About NGO Section (`#about`)
**Layout:** Two-column CSS Grid, 1fr 1fr (stacks on mobile)
**Key Elements:**
- Left: Image with decorative border/shape mask
- Right: Section title, mission paragraph, vision, story
- Below: 4 animated value cards in a 4-column grid
  - Education (`fa-graduation-cap`)
  - Community Support (`fa-hand-holding-heart`)
  - Environment (`fa-leaf`)
  - Youth Empowerment (`fa-person-running`)

**Cards:** Glassmorphism style, icon at top, title, description, hover lift + glow border

### 3. Ongoing Projects (`#projects`)
**Layout:** CSS Grid, 3 columns (2 on tablet, 1 on mobile)
**6 Project Cards:**
1. Education Drive
2. Food Donation Campaign
3. Women Empowerment Initiative
4. Tree Plantation Program
5. Rural Development Project
6. Healthcare Awareness Campaign

**Each card:**
- Background image (Unsplash)
- Gradient overlay on hover (teal→green)
- Title and description slide up on hover
- "Read More" button with arrow
- `border-radius: var(--radius-md)`, `overflow: hidden`

### 4. Social Impact (`#impact`)
**Layout:** 4-column grid, full-width section
**Background:** Deep blue-to-teal gradient
**4 Stat Cards (glassmorphism panels):**
- Icon → Counter (animated from 0) → Label
- Counters: 10000, 500, 100, 50 (all with "+" suffix)
- Floating particle effect via JavaScript canvas overlay

### 5. Gallery (`#gallery`)
**Layout:** CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` and `grid-auto-rows` for masonry feel
**Lightbox:** JavaScript — click to open full image overlay with close button and keyboard (Escape) dismiss
**Hover:** Scale zoom + slight brightness increase

### 6. Testimonials (`#testimonials`)
**Layout:** Horizontal carousel with smooth slide transitions
**JavaScript carousel:** Auto-play every 5s, manual prev/next buttons, dot indicators
**Each slide:** Glassmorphism card with circular avatar, quote, name, role, star rating (5 stars)

### 7. Volunteer / Join Us (`#volunteer`)
**Layout:** Two-column, left content + right form
**Left:** "Become a Change Maker Today", motivational text, benefits list
**Right:** Registration form — Name, Email, Phone, Message, Submit button with gradient

### 8. Events & Campaigns (`#events`)
**Layout:** Vertical timeline, alternating left/right cards on desktop, all-left on mobile
**Timeline:** CSS-drawn vertical line with dot markers
**4 Events:** Awareness Drives, Cleanliness Campaigns, Education Workshops, Fundraising Events

### 9. Contact (`#contact`)
**Layout:** Two-column grid
**Left:** Contact form (Name, Email, Subject, Message)
**Right:** Contact info cards — Phone, Email, Address, Social icons
**Map:** Google Maps embed iframe (placeholder URL)
**SVG wave divider** at top

### 10. Footer (`#footer`)
**Layout:** 4-column grid (stacks on mobile)
- **Col 1:** Logo, slogan, short about
- **Col 2:** Quick Links
- **Col 3:** Contact Info
- **Col 4:** Newsletter signup form
**Bottom bar:** Copyright, social icons

---

## Navigation
**Sticky Navbar:**
- Glassmorphism background (`blur` + semi-transparent)
- Logo (text "InAmigos" with gradient)
- Nav links: Home, About, Projects, Impact, Gallery, Join Us, Contact
- Mobile: Hamburger toggle → off-canvas/slide-down menu
- Active state highlight on scroll (Intersection Observer spy)

---

## JavaScript Modules (script.js)

```
1. Preloader        → Hide after window.load with fade-out
2. Sticky Navbar    → Add scrolled class on scroll > 50px
3. Mobile Menu      → Toggle open/close, close on link click
4. Scroll Spy       → Highlight active nav link based on visible section
5. Scroll Reveals   → Intersection Observer adding .visible class to elements
6. Animated Counters→ Intersection Observer triggers count-up from 0 to target
7. Gallery Lightbox → Open/close overlay, keyboard navigation
8. Testimonial Carousel → Auto-play, prev/next, dot navigation
9. Smooth Scrolling → document.querySelector('a[href^="#"]') click handler
10. Scroll-to-Top   → Show after 500px scroll, smooth scroll on click
11. Form Validation → Basic client-side validation for both forms
12. Particle Effect → Canvas-based floating particles in impact section
```

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| ≤ 375px    | Small phones |
| ≤ 576px    | Large phones |
| ≤ 768px    | Tablets |
| ≤ 992px    | Small desktops / landscape tablets |
| ≤ 1200px   | Container max-width |

Key responsive behaviors:
- All grids collapse to single column on mobile
- Font sizes use `clamp()` for fluid scaling
- Nav becomes hamburger menu ≤ 768px
- Hero height remains 100vh but text scales down
- Cards stack vertically on mobile
- Timeline switches to single-sided on mobile

---

## Unsplash Image URLs (planned)

| Section | URL |
|---------|-----|
| Hero BG | `photo-1559027612-c17b4e5b6b8c` (community gathering) |
| About | `photo-1531206714923-8c4c8b4043fe` (NGO volunteer) |
| Projects - Education | `photo-1497633762265-9d179a990aa6` |
| Projects - Food | `photo-1488521787991-ed7bbaae773c` |
| Projects - Women | `photo-1573497019940-1c28c88e3c1b` |
| Projects - Tree | `photo-1542601906990-b4d3fb778b09` |
| Projects - Rural | `photo-1593113630400-6f66b4f4309e` |
| Projects - Healthcare | `photo-1576091160550-41e9a161870b` |
| Gallery (×6) | Various NGO/community Unsplash photos |
| Testimonials (×3) | Portrait photos from Unsplash |

All via `https://images.unsplash.com/{photo-id}?w=800&q=80` format.

---

## Performance Considerations
- Font Awesome loaded with `defer`
- Google Fonts use `display=swap`
- Images use explicit width params via Unsplash URLs
- CSS at top, JS at bottom with `defer`
- Minimal DOM manipulation
- Intersection Observer for lazy animation triggering
- No heavy libraries — pure vanilla

---

## Accessibility Notes
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- Alt text on all images
- ARIA labels on interactive elements
- Keyboard-navigable lightbox (Escape to close)
- Focus states on all interactive elements
- Sufficient color contrast ratios