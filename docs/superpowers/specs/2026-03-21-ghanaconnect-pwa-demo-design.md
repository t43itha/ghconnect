# GhanaConnect UK & Ireland — PWA Investor Demo

**Date:** 2026-03-21
**Purpose:** Functional prototype PWA to demonstrate at a meeting with the Ghana High Commissioner to the UK. The demo must work both as a guided presentation and a self-guided experience.
**Timeline:** 1 week
**Audience:** Ghana High Commissioner, government officials — interested in community impact, diaspora empowerment, and partnership opportunities.

---

## 1. Overview

GhanaConnect is a digital platform connecting Ghanaians across the UK and Ireland for networking, business promotion, job opportunities, and community engagement. The demo is a read-only, pre-seeded PWA that feels like a production app. No authentication, no user-generated content — all data is pre-populated.

**Goals for the meeting:**
- "This is real" — A polished, installable app the Commissioner can tap through
- "This market is huge" — Impact stats and community numbers visible throughout
- "People want this" — Realistic content that demonstrates clear value
- Leave the door open for endorsement, funding connections, formal partnership

## 2. Brand Identity — Kente Luxe

A luxury aesthetic rooted in Ghanaian heritage. The Kente weave pattern becomes a subtle design system threading through backgrounds, dividers, and accent elements.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Onyx | `#0d0d0d` | Primary background |
| Kente Gold | `#FCD116` | Primary accent, CTAs, highlights |
| Ashanti Red | `#CE1126` | Secondary accent, alerts, event badges |
| Forest Green | `#006B3F` | Tertiary accent, success states, category badges |
| Gold Mist | `rgba(252,209,22,0.08)` | Card backgrounds, subtle fills |
| Surface | `#111111` | Elevated surfaces (cards, tab bar) |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display / Headings | Fraunces (serif) | 600–800 |
| Body / UI | DM Sans (sans-serif) | 300–600 |

### Visual Motifs

- Kente weave pattern as subtle background texture (low opacity, ~0.12)
- Kente strip accent bar (repeating red/gold/green gradient) used as dividers and top accents
- Gold threading — borders, glows, and accent lines in Kente Gold
- Dark canvas lets the gold breathe — premium, not heavy

## 3. App Structure

### Routes

| Route | Screen | Purpose |
|-------|--------|---------|
| `/` | Splash / Onboarding | First impression — streaming text animation, impact stats, CTA |
| `/home` | Home Dashboard | Unified feed — trending businesses, jobs, events. Quick action cards. |
| `/directory` | Business Directory | Searchable, filterable list with category cards |
| `/directory/[id]` | Business Detail | Full business profile — name, category, location, description, contact, hero image |
| `/jobs` | Job Board | Browsable job listings with company, role, location, type |
| `/jobs/[id]` | Job Detail | Full job posting with description and apply CTA |
| `/community` | Community & Events | Upcoming events, community highlights |
| `/vision` | Our Vision | Impact stats, growth roadmap, partnership opportunities — the closing pitch screen |

### Navigation

**Bottom tab bar** — persistent across all screens except onboarding splash:

| Tab | Icon (Lucide) | Route |
|-----|---------------|-------|
| Home | `Home` | `/home` |
| Explore | `Search` | Unified search overlay — text input filters across businesses, jobs, and events on screen |
| Directory | `Store` | `/directory` |
| Jobs | `Briefcase` | `/jobs` |
| Profile | `User` | Placeholder / Our Vision |

### Screen Details

**Splash / Onboarding:**
- Streaming text animation (typewriter effect):
  - "120,000+ Ghanaians in the UK..."
  - "...thousands of businesses..."
  - "...one platform to connect them all."
- Logo reveal with Kente strip accent
- "Explore GhanaConnect" CTA button
- Framer Motion: text streaming with staggered delays, logo fade-in, CTA slide-up

**Home Dashboard:**
- Top bar: GhanaConnect logo (left), avatar placeholder (right)
- Welcome greeting: "Welcome to GhanaConnect"
- Quick action row: 4 cards (Businesses, Jobs, Events, Network) with Lucide icons
- "Trending in Community" section label
- Feed cards showing mix of featured businesses, jobs, and events
- Each card tappable → navigates to detail view

**Business Directory:**
- Search bar at top
- Category filter row (horizontal scroll): Food & Drink, Legal, Beauty, Transport, Finance, Technology, etc.
- Business cards: name, category badge, location, brief description, rating
- Featured businesses highlighted with gold border
- Tap → Business Detail

**Business Detail:**
- Hero image area (gradient placeholder with category icon)
- Business name, category, rating
- Location with map pin icon
- Description paragraph
- Contact section: phone, email, website
- "Share" and "Save" action buttons

**Job Board:**
- Filter tabs: All, Full-time, Part-time, Contract
- Job listing cards: title, company name, location, type badge, salary range, posted date
- Featured jobs with gold accent
- Tap → Job Detail

**Job Detail:**
- Company name and logo placeholder
- Job title, location, type, salary
- Full description
- Requirements list
- "Apply Now" CTA button (non-functional in demo)

**Community & Events:**
- Upcoming events section with date cards
- Event cards: title, date, location, organizer, category badge
- Community highlights section with post-style cards
- Tap event → expanded view with full details

**Our Vision (Partnership Screen):**
- Impact statistics with animated counters:
  - "120,000+ Ghanaians in the UK & Ireland"
  - "2,400+ Businesses Ready to Connect"
  - "850+ Job Opportunities"
- Growth roadmap: Phase 1 (UK) → Phase 2 (Ireland) → Phase 3 (Global)
- Partnership opportunities section:
  - Official Endorsement
  - Funding Connections
  - Formal Partnership
  - Advisory Role
- Contact / next steps CTA

## 4. Animations (Framer Motion)

| Context | Animation |
|---------|-----------|
| Onboarding text | Streaming/typewriter reveal with staggered line delays |
| Onboarding logo | Fade-in + scale from 0.8 to 1.0 |
| Onboarding CTA | Slide up from bottom with spring physics |
| Page transitions | Cross-fade between routes (200-300ms) |
| Feed cards | Staggered entrance — each card slides up with 50ms delay |
| Tab switches | Content cross-fade |
| Vision stats | Animated number counters on scroll into view |
| Card hover/tap | Subtle scale (1.02) with shadow elevation |
| Category pills | Horizontal scroll with momentum |

## 5. Data Model (Convex)

### Schema

```typescript
// businesses
{
  name: string,
  category: string,        // "Food & Drink", "Legal", "Beauty", etc.
  description: string,
  location: string,        // "Brixton, London", "Tottenham, London", etc.
  image: string,           // CSS gradient placeholder identifier (e.g., "gradient-food", "gradient-tech") — rendered as gradient + Lucide category icon, no external URLs
  rating: number,          // 4.0–5.0
  featured: boolean,
  contactPhone: string,
  contactEmail: string,
  website: string,
}

// jobs
{
  title: string,
  company: string,
  location: string,
  type: string,            // "Full-time", "Part-time", "Contract"
  description: string,
  requirements: string[],
  salary: string,          // "£35,000 - £45,000"
  postedDate: string,
  featured: boolean,
}

// events
{
  title: string,
  description: string,
  date: string,            // ISO date
  time: string,
  location: string,
  organizer: string,
  image: string,
  category: string,        // "Cultural", "Professional", "Workshop"
}

// categories
{
  name: string,
  icon: string,            // Lucide icon name
  type: string,            // "business", "job", "event"
  count: number,           // Display count for UI
}
```

### Seed Data Volume

| Collection | Count | Notes |
|------------|-------|-------|
| businesses | ~20 | Mix of categories, 3-4 featured |
| jobs | ~10 | Mix of types, 2-3 featured |
| events | ~5 | Upcoming dates, mix of categories |
| categories | ~8 | Business categories with icons |

All data should be realistic — real-sounding Ghanaian business names, authentic UK locations, believable job postings, actual community event types.

## 6. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | latest |
| Icons | Lucide React | latest |
| Database | Convex | latest |
| PWA | next-pwa or equivalent for Next 16 (validate install flow early) | latest |
| Deployment | Vercel + Convex | — |

## 7. PWA Requirements

- Web app manifest with GhanaConnect name, Kente Luxe theme colors
- App icon (black star on gold, matching logo mark)
- Service worker for offline caching of static assets
- Installable on iOS and Android home screens
- Splash screen matching the onboarding aesthetic
- HTTPS required (Vercel provides this)

## 8. What's Explicitly Out of Scope

- User authentication / login
- User-generated content (posting, commenting)
- Marketplace (buy/sell)
- Messaging / chat
- Push notifications
- Search across all sections (basic per-section filtering only)
- Real payment processing
- Admin dashboard (Convex dashboard serves this purpose for seed data)

## 9. Success Criteria

The demo succeeds if:

1. The Commissioner can install the PWA on their phone from a URL
2. Every tap leads somewhere meaningful — no dead ends
3. The business directory feels populated and searchable
4. The job board shows believable opportunities
5. The community section shows vibrant activity
6. The Vision/Partnership screen clearly presents next steps
7. The overall aesthetic conveys professionalism, cultural pride, and technical competence
8. The streaming onboarding creates a memorable first impression
