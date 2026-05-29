# 🌍 InAmigos — Together We Create Change

A modern, single-page NGO awareness website for the **InAmigos Foundation** — a non-profit organization dedicated to education, community support, environment, and youth empowerment.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

---

## 📸 Preview

| Hero Section | Projects Grid | Impact Stats |
|:---:|:---:|:---:|
| Full-screen hero with particle canvas & gradient overlay | 6 glassmorphism project cards with hover effects | Animated counters with teal glow accents |

---

## 🚀 Live Demo

The site is deployed on **Netlify**. Visit the live deployment or run it locally (see [Getting Started](#getting-started)).

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🎬 Preloader** | Animated loading screen with pulsing logo and spinner; removed from DOM after load |
| **📌 Sticky Navbar** | Glassmorphism navigation with scroll spy — highlights active section in real-time |
| **📱 Mobile Menu** | Hamburger toggle with overlay backdrop, closes on link click or Escape key |
| **✨ Scroll Reveals** | Intersection Observer-powered fade-up animations on all sections |
| **🔢 Animated Counters** | Count-up from 0 to target (10,000+ / 500+ / 100+ / 50+) with cubic easing |
| **🖼️ Gallery Lightbox** | Click-to-expand with keyboard navigation (← → Escape) and prev/next controls |
| **🎠 Testimonial Carousel** | Auto-play every 5s, manual prev/next, dot indicators, touch/swipe support |
| **🎨 Particle Effects** | Canvas-based floating particles on Hero and Impact sections with connecting lines |
| **📝 Form Validation** | Client-side validation for Volunteer, Contact, and Newsletter forms |
| **🔝 Scroll to Top** | Floating button appears after 500px scroll with smooth scroll-to-top |
| **♿ Accessibility** | Semantic HTML5, ARIA labels, keyboard navigation, `prefers-reduced-motion` support, focus states |
| **📱 Fully Responsive** | Fluid typography with `clamp()`, responsive grids, mobile-first hamburger nav |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 (semantic elements, ARIA landmarks) |
| **Styling** | CSS3 — Custom Properties, Flexbox, CSS Grid, Keyframe Animations |
| **Scripting** | Vanilla JavaScript (ES6+) — zero framework dependencies |
| **Icons** | [Font Awesome 6](https://fontawesome.com/) (CDN) |
| **Fonts** | [Google Fonts](https://fonts.google.com/) — Poppins (headings) + Inter (body) |
| **Images** | [Unsplash](https://unsplash.com/) source URLs (no API key required) |
| **Animations** | Intersection Observer API + CSS transitions/keyframes |
| **Deployment** | [Netlify](https://www.netlify.com/) with SPA redirects & security headers |

---

## 📁 Project Structure

```
c:/task 1/
├── index.html              # Single-page application — all 10 sections
├── favicon.svg             # SVG favicon
├── robots.txt              # SEO / crawler directives
├── netlify.toml            # Netlify deploy config (headers, redirects)
├── css/
│   └── styles.css          # Complete stylesheet (~2200 lines, modular sections)
├── js/
│   └── script.js           # All interactive logic (~635 lines)
└── plans/
    └── plan.md             # Architectural plan & design system documentation
```

---

## 🗺️ Section Architecture

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | **Hero** | `#hero` | Full-viewport banner with particle canvas, gradient overlay, CTAs |
| 2 | **About** | `#about` | Mission, vision, core values with image + 4 value cards |
| 3 | **Projects** | `#projects` | 6 glassmorphism project cards (Education, Food, Women, Trees, Rural, Healthcare) |
| 4 | **Impact** | `#impact` | 4 animated stat counters with floating particle background |
| 5 | **Gallery** | `#gallery` | Masonry-style grid with click-to-expand lightbox |
| 6 | **Testimonials** | `#testimonials` | Auto-playing carousel with 4 testimonial slides |
| 7 | **Volunteer** | `#volunteer` | Benefits list + registration form (name, email, phone, message) |
| 8 | **Events** | `#events` | Vertical timeline with 4 upcoming events (alternating layout) |
| 9 | **Contact** | `#contact` | Contact form + info cards (phone, email, address) + Google Map embed |
| 10 | **Footer** | `#footer` | 4-column grid: about, quick links, contact info, newsletter |

---

## 🎨 Design System

### Color Palette
- **Deep Blue:** `#0a1628` (backgrounds, hero overlay)
- **Teal:** `#0d9488` (primary accent, gradients)
- **Teal Light:** `#14b8a6` (hover states, glow effects)
- **Green:** `#10b981` (secondary accent, success states)

### Effects
- **Glassmorphism:** Semi-transparent backgrounds with `backdrop-filter: blur()` on nav, project cards, impact cards
- **Gradient Text:** Teal-to-green linear gradient applied via `-webkit-background-clip: text`
- **Wave Dividers:** SVG wave shapes separating sections for visual flow

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (no build tools or package managers required)
- Optional: [Netlify CLI](https://docs.netlify.com/cli/get-started/) for local dev server

### Run Locally

**Option 1: Open directly**
```bash
# Just open index.html in your browser
start index.html   # Windows
open index.html    # macOS
xdg-open index.html # Linux
```

**Option 2: Live Server (recommended)**
```bash
# Using VS Code Live Server extension, or:
npx serve .
```

**Option 3: Netlify Dev**
```bash
netlify dev
```

### Deploy to Netlify
1. Push the project to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect the repo in Netlify dashboard
3. Set publish directory to `.` (root)
4. Deploy — the [`netlify.toml`](netlify.toml:1) handles SPA redirects and security headers automatically

---

## ⚙️ Configuration

### [`netlify.toml`](netlify.toml:1)

| Setting | Value | Purpose |
|---------|-------|---------|
| `publish` | `"."` | Root directory deployment |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Privacy-conscious referrer data |
| `Cache-Control` (assets) | `max-age=86400` | 24h cache for CSS/JS |
| SPA redirect | `/* → /index.html` | Client-side routing support |

### [`robots.txt`](robots.txt)
Allows all crawlers with a link to the sitemap.

---

## ♿ Accessibility

- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- ARIA labels on interactive elements (`aria-label`, `aria-expanded`, `aria-hidden`)
- Keyboard-navigable lightbox (Escape to close, ← → to navigate)
- Visible focus states on all interactive elements (`:focus-visible`)
- `prefers-reduced-motion` media query disables particle animations
- Sufficient color contrast ratios throughout
- Descriptive `alt` text on all images

---

## 📊 Performance

- **Zero framework dependencies** — pure vanilla HTML/CSS/JS
- Font Awesome loaded with `media="print" onload="this.media='all'"` for non-blocking CSS
- Google Fonts use `display=swap` to prevent FOIT
- Unsplash images use explicit width parameters (`?w=600&q=80`) for optimal sizing
- Intersection Observer used for lazy animation triggering
- Minimal DOM manipulation — no virtual DOM overhead
- CSS and JS files have 24-hour cache headers via Netlify

---

## 📝 License

MIT License — see the source code for details.

---

## 👥 Credits

- **Icons:** [Font Awesome](https://fontawesome.com/)
- **Fonts:** [Google Fonts — Poppins & Inter](https://fonts.google.com/)
- **Images:** [Unsplash](https://unsplash.com/)
- **Design & Development:** InAmigos Foundation

---

> *"Together We Create Change" — InAmigos Foundation*