# GhanaConnect v2 — Full Visual Rebuild

**Date:** 2026-03-24
**Status:** Approved
**Reference:** `C:\Users\tabit\Downloads\ghanaconnect-v2.jsx`

## Summary

Replace-in-place rebuild of all pages and components to match the v2 JSX reference. Switch from dark theme (Fraunces + DM Sans) to light theme (Cormorant + Outfit) with Ghana flag color palette. Preserve Convex backend, Next.js 16.2 routing, and infrastructure.

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#FAFAFA` | Page background |
| `surface` | `#FFFFFF` | Cards, inputs |
| `surfaceAlt` | `#F5F5F5` | Secondary surfaces |
| `border` | `#EBEBEB` | Card borders |
| `borderLight` | `#F2F2F2` | Subtle dividers |
| `ink` | `#111111` | Primary text |
| `inkLight` | `#1A1A1A` | Slightly softer text |
| `secondary` | `#6B6B6B` | Secondary text |
| `tertiary` | `#9E9E9E` | Tertiary/placeholder text |
| `faint` | `#C8C8C8` | Disabled/muted |
| `green` | `#006B3F` | Primary brand, Jobs section |
| `greenDark` | `#005432` | Green gradient end |
| `greenSoft` | `rgba(0,107,63,0.07)` | Green tinted backgrounds |
| `red` | `#CE1126` | Directory section |
| `gold` | `#D4A017` | Events section, star ratings |
| `goldSoft` | `rgba(212,160,23,0.08)` | Gold tinted backgrounds |
| `white` | `#FFFFFF` | Text on dark backgrounds |

### Section Colors
| Section | Color | Dark | Soft | Shadow |
|---------|-------|------|------|--------|
| Directory | `#CE1126` | `#A80E1F` | `rgba(206,17,38,0.07)` | `0 6px 24px rgba(206,17,38,0.18)` |
| Events | `#D4A017` | `#B8860B` | `rgba(212,160,23,0.07)` | `0 6px 24px rgba(212,160,23,0.18)` |
| Jobs | `#006B3F` | `#005432` | `rgba(0,107,63,0.07)` | `0 6px 24px rgba(0,107,63,0.18)` |
| High Commission (key: `marketplace`) | `#1A1A1A` | `#111111` | `rgba(0,0,0,0.06)` | `0 6px 24px rgba(0,0,0,0.15)` |

### Typography
- **Display:** Cormorant (serif) — headings, large text, monograms
- **Body:** Outfit (sans-serif) — body text, labels, buttons

### Shadows
| Token | Value |
|-------|-------|
| `s1` | `0 1px 3px rgba(0,0,0,0.04)` |
| `s2` | `0 4px 16px rgba(0,0,0,0.05)` |
| `s3` | `0 8px 30px rgba(0,0,0,0.07)` |
| `sGreen` | `0 6px 24px rgba(0,107,63,0.20)` |

### Radii
| Token | Value |
|-------|-------|
| `r` | `20px` |
| `rs` | `14px` |
| `rxs` | `10px` |

## Route Structure

```
app/
  page.tsx                    → Splash (onboarding + sign-in)
  layout.tsx                  → Root layout (Cormorant + Outfit, ConvexClientProvider)
  globals.css                 → Light theme, animations, Adinkra/Kente patterns
  (tabs)/
    layout.tsx                → KenteBorder + BottomTabBar shell
    home/page.tsx             → Home dashboard
    directory/page.tsx        → Business directory with category filters
    directory/[id]/page.tsx   → Business detail view
    events/page.tsx           → Events listing with type filters
    events/[id]/page.tsx      → Event detail view [NEW]
    jobs/page.tsx             → Job listings
    jobs/[id]/page.tsx        → Job detail view
    highcom/page.tsx          → Ghana High Commission info [NEW]
    profile/page.tsx          → User profile / account [NEW]
```

## Layout Constraints

- App shell is capped at `max-width: 430px`, centered horizontally — mobile-first design
- HTML `body` background uses `surfaceAlt` (`#F5F5F5`); app container uses `bg` (`#FAFAFA`)
- Bottom tab bar is fixed, frosted glass (`backdrop-filter: blur(24px)`)

## Utilities

**handleShare(title, text)** — Uses Web Share API when available, falls back to clipboard copy. Used by all detail page Share buttons and High Commission page.

## CSS Keyframe Animations

All defined in `globals.css`:
- `pulse` — opacity 1→0.4→1, 2s infinite (live indicator dots)
- `float` — translateY 0→-12px→0 (decorative floating)
- `nodeIn` — scale 0→1 with opacity, cubic-bezier easing (splash network nodes)
- `lineIn` — opacity 0→1 (splash network lines)

## Components

### Shared UI Components

**Icon** — Custom SVG icon component with 20+ icons (home, grid, calendar, briefcase, user, search, pin, star, arrow, heart, bell, plus, cart, building, back, share, phone, mail, clock, check, link, globe, users). Props: `name`, `size`, `color`, `strokeWidth`.

**Reveal** — Mount animation wrapper. Fades in + translates up with configurable delay. Uses CSS transitions with `cubic-bezier(0.16,1,0.3,1)` easing.

**KenteBorder** — 10px tall strip of alternating red/gold/green/ink blocks across full width.

**Mono** — Monogram avatar. Rounded square with gradient background, serif initial(s). Props: `children` (the letter(s)), `size`, `color`, `darkColor`. (JSX uses `t` prop — we use descriptive names in the Next.js implementation.)

**ThemedPill** — Filter pill button. Active state fills with section color + glow shadow. Inactive shows outline. Props: `active`, `onClick`, `color`, `children`.

**ThemedSearch** — Search input with focus-responsive border color and icon tint. Props: `placeholder`, `color`.

**DetailView** — Full-screen overlay for detail pages. Fixed position, colored header bar (4px), back button, slide-up entrance animation. Props: `onBack`, `color`, `children`.

**InfoRow** — Detail page info row. Icon in rounded square + label (uppercase) + value. Props: `icon`, `label`, `value`, `color`.

**ActionBtn** — Action button with solid or outline variant. Props: `label`, `icon`, `color`, `outline`, `onClick`.

**BottomTabBar** — Fixed bottom nav with 5 tabs: Home, Directory, Events, Jobs, Profile. Active tab shows section-colored icon + top indicator bar. Tabs without a SECTION entry (Home, Profile) fall back to `green` as active color. Frosted glass background.

### Splash-only Components

**NetworkLogo** — Animated SVG network graph (center node + 6 outer nodes with connecting lines). Nodes scale in sequentially.

**GoogleLogo** — Google "G" logo SVG for sign-in button.

**AdinkraPattern** — Full-screen diamond pattern overlay at 4.5% opacity.

## Pages

### Splash (`app/page.tsx`)
- 4 steps: 3 onboarding slides + sign-in screen
- Slides: "Akwaaba." / "Network." / "Thrive." with sub-text and body
- Progress dots (active dot stretches to 28px)
- Sign-in screen: NetworkLogo, "GhanaConnect" wordmark, Get Started + Google Sign In + Sign In link
- Exit animation: fade + slight scale up
- Background: green gradient with AdinkraPattern overlay + KenteBorder at top

### Home (`app/(tabs)/home/page.tsx`)
- Greeting header (time-based) + GhanaConnect wordmark + bell icon
- ThemedSearch bar
- Dark hero card: "One Community. Infinite Possibility." with stats + CTA
- 2x2 tile grid: Directory (red), Events (gold), Jobs (green), High Commission (ink) — each navigates to its tab
- Featured businesses: horizontal scroll of business cards
- Upcoming events: vertical list with date blocks
- All data from Convex queries

### Directory (`app/(tabs)/directory/page.tsx`)
- Page header: "Directory" + subtitle
- ThemedSearch (red-themed)
- Category filter pills: All, Restaurant, Legal, Fashion, Transport, Finance, Health
- Business list cards: Mono avatar + name + tag + rating + city + arrow
- Click opens detail view

### Directory Detail (`app/(tabs)/directory/[id]/page.tsx`)
- DetailView shell with red header bar
- Centered: large Mono (72px) + business name (serif) + tag + rating
- InfoRows: Location, Category, Hours, Phone, Website
- About section in surfaceAlt card
- Action buttons: Contact + Share

### Events (`app/(tabs)/events/page.tsx`)
- Page header: "Events" + subtitle
- Type filter pills: All, Cultural, Business, Social
- Event cards: left accent bar (4px gold), date block, type badge, title (serif), subtitle, city + price
- Click opens detail view

### Events Detail (`app/(tabs)/events/[id]/page.tsx`)
- DetailView shell with gold header bar
- Type badge pill + title (serif, 32px) + subtitle
- Date hero strip: gradient gold banner with large date + full date string
- InfoRows: Location, Time, Attending, Price
- About section
- Action buttons: Get Tickets + Share

### Jobs (`app/(tabs)/jobs/page.tsx`)
- Page header: "Opportunities" + subtitle
- ThemedSearch (green-themed)
- Job cards: Mono + title + company + tags (city, type) + salary pill (green) + time ago
- Click opens detail view

### Jobs Detail (`app/(tabs)/jobs/[id]/page.tsx`)
- DetailView shell with green header bar
- Mono (56px) + title + company + tag pills
- InfoRows: Employment type, Location, Posted, Applicants
- About the role section
- Key requirements with check icons
- Action buttons: Apply Now + Share

### High Commission (`app/(tabs)/highcom/page.tsx`)
- Official badge + title + subtitle + rating
- Quick action circles: Call, Directions, Website, Share
- InfoRows: Address, Phone, Website, Email, Hours, Status (open/closed)
- Consular Services list (6 items with bullet dots)
- Important Information box
- Action buttons: Copy Address + Share

### Profile (`app/(tabs)/profile/page.tsx`)
- Large avatar circle (ink bg) with plus badge
- "Welcome" heading + "Sign in to unlock everything"
- Create Account button
- Menu items: My Businesses, Saved, Applications, Network, Notifications — each with colored icon + arrow

## What's Preserved
- Convex schema, queries, seed data — untouched
- ConvexClientProvider wrapper
- Next.js 16.2 file-based routing
- motion dependency (used for Splash animations)
- Package infrastructure (tsconfig, next.config, postcss, eslint)

## What's Removed
- `app/(tabs)/favourites/` — entire route
- `app/(tabs)/more/` — entire route group (events, settings, vision)
- FavouritesProvider component
- Old shared components: AnimatedCounter, CategoryBadge, CategoryPill, CompanyLogo, GradientHero, HeroCard, KenteStrip, ListCard, NotificationPill, PageHeader, PrimaryButton, SearchBar, SecondaryButton, SectionHeader, StatusBadge, StreamingText
- Dark theme CSS (globals.css rewritten)
- Fraunces + DM Sans fonts (replaced by Cormorant + Outfit)
- Lucide-react usage (replaced by custom Icon component)

## What's Added
- `app/(tabs)/events/[id]/page.tsx` — event detail route
- `app/(tabs)/highcom/page.tsx` — High Commission page
- `app/(tabs)/profile/page.tsx` — Profile page
- Custom Icon component with 20+ inline SVG icons
- Reveal animation component
- Mono monogram avatar component
- DetailView shell component
- ThemedPill, ThemedSearch, InfoRow, ActionBtn components
- NetworkLogo, GoogleLogo, AdinkraPattern (splash components)
- Light theme design tokens in globals.css

## Data Flow

- Pages use `useQuery(api.businesses.list)`, `useQuery(api.events.list)`, `useQuery(api.jobs.list)` for real data
- Detail pages use `useQuery(api.businesses.getById, { id })`, etc.
- Directory filtering uses client-side filter on the full list (simpler, avoids extra queries)
- No new Convex functions needed — existing queries cover all use cases
- **High Commission page uses hardcoded data** — embassy address, phone, hours, services are static content, not from Convex
- **Loading states**: Show centered "Loading..." text while Convex queries return `undefined`
- **Empty states**: Show "No results found" message when filters yield zero results
- **Profile avatar**: Shows static "G" initial (placeholder for future auth)

### Convex → Display Field Mapping

| Convex Field | Display Usage |
|-------------|---------------|
| `businesses.name` | Business name |
| `businesses.category` | Category badge/filter |
| `businesses.location` | City display |
| `businesses.rating` | Star rating |
| `businesses.description` | Tag line / about text |
| `businesses.contactPhone` | Phone InfoRow |
| `businesses.website` | Website InfoRow |
| `businesses.contactEmail` | Email (if needed) |
| `businesses.image` | Not used in v2 (Mono monogram replaces images) |
| `jobs.title` | Job title |
| `jobs.company` | Company name + Mono initial source |
| `jobs.location` | City tag |
| `jobs.type` | Employment type tag |
| `jobs.salary` | Pay pill |
| `jobs.postedDate` | "X ago" display |
| `jobs.requirements` | Check-list in detail view |
| `jobs.description` | About the role text |
| `events.title` | Event title |
| `events.description` | Event subtitle / about text |
| `events.date` | Date block + date hero strip |
| `events.time` | Time InfoRow |
| `events.location` | City display |
| `events.category` | Type badge/filter |
| `events.organizer` | Not prominently displayed |
| `events.image` | Not used in v2 |
