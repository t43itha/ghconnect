# GhConnect Design Unification — "Digital Kente" Theme

**Date:** 2026-03-23
**Approach:** Unified System (Approach B) — extract a tight design system from Stitch screens, apply consistently across all screens.

## Context

GhConnect has 6 reference screens from Stitch (project 941501097792120059) that define the target visual direction. These screens were designed independently and have inconsistencies in nav structure, card styles, kente strip usage, typography, and button styles. This spec unifies them into a coherent design system while keeping the "digital kente" aesthetic restrained.

### Source Screens (Stitch)
1. **Splash Screen** (029e6f4d) — Events page with kente strip, full-width image cards
2. **Home Dashboard** (ba06466d) — Gold dashed borders, notification pills, horizontal scroll
3. **Business Directory** (b0914c95) — List cards with thumbnails, gold borders, search
4. **Job Listings** (f753489e) — 2-column grid, New/Hot badges
5. **Events Listing** (bfeadd12) — 2-column grid, category badges, Register buttons
6. **Splash Screen** (14ed0891) — "GhanaConnect" wordmark, Get Started / Sign In

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Navigation | 5 tabs: Home, Favourites, Directory, Jobs, More (...) | Keep current structure, use ellipsis icon for More |
| Events location | Prominent on Home, full list under More | Events are engagement drivers, not a separate tab |
| Card borders | Gold solid thin (not dashed) | More restrained, less visual noise |
| Splash screen | Stitch wordmark aesthetic + existing streaming animation | Hybrid: brand identity + existing animation investment |
| Kente strip | Thin header divider on every screen | Consistent branded element, subtle |
| Job listings | Single-column list with company logos | Matches Directory pattern, more coherent |

---

## 1. Shared Component System

### Card Component
- Background: `#111111` (surface)
- Border: `1px solid rgba(252, 209, 22, 0.2)` (gold at 20% — changed from current 12%)
- Border radius: `12px`
- Padding: `12px`
- Layout: square thumbnail (72x72px, border-radius 8px) left, content block right
- Content: title (DM Sans bold 16px white), subtitle (DM Sans regular 14px white/60%), category badge pill
- **Thumbnail source:** Businesses use `image` field from Convex schema. Jobs use company logo (placeholder: first letter of company name in gold on surface bg if no logo). Events use `image` field.
- Used on: Directory listings, Job listings, Event list items on Home

### Notification Pill
- Border: `1px solid rgba(252, 209, 22, 0.3)` (gold at 30%)
- Background: transparent
- Text: DM Sans 12px medium, white
- Border radius: `rounded-full`
- Padding: `6px 12px`
- Used on: Home screen ("5 New Businesses", "2 New Jobs")

### Hero Card
- Same gold border as Card but full-width
- Larger padding (16px), Fraunces serif title
- Background: surface color with optional image. When image present, use 60% black overlay for text legibility.
- Min-height: 140px
- Used on: Home "Next Event" feature, promoted content

### Section Header
- Left: Fraunces serif 20px in gold (`#FCD116`)
- Right: "View all" link in white/60%
- Below: kente strip divider (red-gold-green repeating gradient, 3px height, 8px below header text)
- Used on: every scrollable section on Home, event sections in More

### Buttons
- **Primary:** `#006B3F` (green) solid, white text, `border-radius: 9999px` (pill), DM Sans 14px semibold
- **Secondary:** `#FCD116` (gold) 1px outline, gold text, `border-radius: 9999px` (pill), DM Sans 14px semibold
- Padding: `10px 20px`
- Used on: splash CTAs, card actions (View Details, Register)

### Badges / Pills
- **Category:** gold-mist background (gold at 8%), gold text, small rounded pill, DM Sans 12px medium
- **Status:** "New" = green bg, "Hot" = gold bg, white text, DM Sans 12px medium
- Used on: Directory categories, Job status, Event types

### Bottom Tab Bar
- 5 tabs: Home, Favourites, Directory, Jobs, More (...)
- More tab icon: `MoreHorizontal` from lucide-react (three dots)
- Active state: gold icon + label
- Inactive state: white/40% (changed from current 25%)
- Thin top border: white at 4% opacity

---

## 2. Screen-by-Screen Mapping

### Splash Screen
- Full-screen dark background (`#0d0d0d`)
- Centered "GhanaConnect" wordmark: Fraunces serif, "Ghana" in gold, "Connect" in white (note: this reverses the current app which has "Ghana" white / "Connect" gold — intentional change to match Stitch design)
- Kente strip across top edge
- Streaming text animation plays below wordmark (existing effect preserved)
- Bottom: "Get Started" (green primary) + "Sign In" (gold outline secondary)
- Tap either button → enters tab layout (no auth for now)

### Home
- **Header:** "Akwaaba, [Name]" in Fraunces 28px gold. Avatar top-right. Kente strip below. (No auth yet — use "Akwaaba" without a name as fallback. Personalization is a future feature.)
- **Hero card:** "Next Event" — full-width hero card with event title, date, venue. Gold solid border. Chevron right for navigation.
- **Notification pills row:** Horizontal scroll of pills ("5 New Businesses", "2 New Jobs") with gold outline.
- **Upcoming Events section:** Section header (Fraunces gold + "View all"). Horizontal scroll of standard cards. "View all" links to `/more/events`.
- **Latest in Directory section:** Section header. Horizontal scroll of standard cards (business thumbnail, name, category badge).

### Directory
- **Header:** "Business Directory" in Fraunces 28px gold. Kente strip below.
- **Search bar:** Dark surface bg, gold-tinted border, filter icon right.
- **List:** Vertical scroll of standard cards — square thumbnail left, business name, category badge pill, location subtitle.

### Jobs
- **Header:** "Jobs" in Fraunces 28px gold. Kente strip below.
- **Search bar + Filter button:** Same style as Directory.
- **List:** Single-column vertical scroll of standard cards — company logo thumbnail left, job title, company name, location. Status badges ("New" / "Hot") top-right of card. "View Details" gold outline button at card bottom.

### Favourites
- **Header:** "Favourites" in Fraunces 28px gold. Kente strip below.
- **Tab filter:** Pills to toggle between Businesses / Jobs / Events (gold active, muted inactive).
- **List:** Standard card layout matching the content type. Empty state if nothing saved.

### More (`/more`)
- **Header:** "More" in Fraunces 28px gold. Kente strip below.
- **Menu items:** Simple list rows — icon left, label, chevron right. Surface bg, gold border on hover. Items:
  - Community Events → `/more/events`
  - Vision & Impact → `/more/vision` (existing Vision page content preserved, restyled to match design system)
  - Settings → `/more/settings` (placeholder page for now — just header + "Coming soon" text)

### Community Events sub-page (`/more/events`)
- **Header:** "Community Events" in Fraunces 28px gold. Kente strip below. Back arrow top-left.
- **List:** Vertical scroll of standard event cards with "Register" green primary button.

### Detail Pages (`/directory/[id]`, `/jobs/[id]`)
- Keep existing layout structure but restyle to match design system:
  - Page title in Fraunces gold, kente strip below header
  - Gold solid thin borders on content sections
  - Primary/secondary button styles for CTAs
  - Typography follows the unified scale

---

## 3. Visual Details

### Color System
| Token | Value | Usage |
|---|---|---|
| `--color-onyx` | `#0d0d0d` | Page background |
| `--color-surface` | `#111111` | Card / surface background |
| `--color-kente-gold` | `#FCD116` | Titles, active states, accents (100%) |
| `--color-gold-border` | `rgba(252,209,22,0.2)` | Card borders (20%) |
| `--color-gold-mist` | `rgba(252,209,22,0.08)` | Badge backgrounds (8%) |
| `--color-forest` | `#006B3F` | Primary buttons only |
| `--color-ashanti-red` | `#CE1126` | Kente strip only — never as UI accent |
| Text primary | `rgba(255,255,255,1)` | Headings |
| Text secondary | `rgba(255,255,255,0.6)` | Subtitles, secondary info |
| Text inactive | `rgba(255,255,255,0.4)` | Placeholder, inactive tabs |

### Typography Scale
| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Page title | Fraunces | 28px | Regular | Gold |
| Section header | Fraunces | 20px | Regular | Gold |
| Card title | DM Sans | 16px | Bold | White |
| Card subtitle | DM Sans | 14px | Regular | White/60% |
| Badge / pill | DM Sans | 12px | Medium | Varies |
| Button | DM Sans | 14px | Semibold | Varies |

### Spacing
| Token | Value |
|---|---|
| Page horizontal padding | 16px |
| Card internal padding | 12px |
| Card gap (list) | 12px |
| Section gap | 24px |
| Kente strip height | 3px |
| Kente strip offset below header | 8px |

### Card Dimensions
| Element | Size |
|---|---|
| Thumbnail | 72x72px, border-radius 8px |
| Card | Full width, border-radius 12px |
| Hero card | Full width, min-height 140px |

### Animations
- Motion library (existing) preserved
- Cards: fade-in + y-translate on scroll, stagger 0.05s
- Splash: wordmark fades in first, then streaming text animation
- Page transitions: opacity crossfade 0.3s

---

## 4. What Changes From Current App

| Area | Current | New |
|---|---|---|
| Splash | Streaming text animation, direct to tabs | Stitch wordmark + animation, CTA buttons, then tabs |
| Card borders | Solid subtle (white/4%) | Gold solid thin (gold/20%) |
| Kente strip | Used inconsistently | Consistent header divider on every screen |
| Page titles | Mixed styles | All Fraunces 28px gold |
| Section headers | Various | Fraunces 20px gold + "View all" + kente strip |
| Jobs layout | May vary | Single-column cards with company logo thumbnails |
| Jobs search | No search bar, only filter pills | Search bar + filter button (matches Directory) |
| Events | Under Community tab | Prominent on Home, full list at `/more/events` |
| Bottom nav | 5 tabs, More uses User icon, inactive 25% | Same 5 tabs, More uses MoreHorizontal icon, inactive 40% |
| Buttons | Mixed | Green primary / Gold outline secondary only |
| Wordmark | "Ghana" white / "Connect" gold | "Ghana" gold / "Connect" white (reversed) |
| Page titles | White text, mixed sizes | All Fraunces 28px gold |
| Card thumbnails | Not present on Directory/Jobs | Thumbnails on all cards (business image, company logo) |
| Gold border opacity | 12% (`--color-gold-border`) | 20% (more visible) |
| KenteStrip height | 6px (h-1.5) | 3px (more subtle) |
| Routing | `/community` for events, `/vision` for vision | `/more/events`, `/more/vision`, `/more/settings` |
