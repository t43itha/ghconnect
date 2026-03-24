# GhanaConnect v2 Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all pages and components to match the v2 JSX reference — light theme, Cormorant + Outfit fonts, new route structure.

**Architecture:** Rewrite globals.css with light-theme design tokens. Replace all 19 components with new shared UI primitives (Icon, Reveal, Mono, etc.). Rewrite all page files to match JSX reference layouts while keeping Convex data queries. Remove dead routes (favourites, more) and add new ones (events/[id], highcom, profile).

**Tech Stack:** Next.js 16.2, React 19, Convex, Tailwind 4, Motion (for splash animations only)

**Spec:** `docs/superpowers/specs/2026-03-24-ghanaconnect-v2-rebuild-design.md`
**JSX Reference:** `C:\Users\tabit\Downloads\ghanaconnect-v2.jsx`

### Important Notes for Implementers

1. **Mono component** uses `children` prop (not `t` like JSX reference). Convert `<Mono t={b.m}>` to `<Mono>{b.m}</Mono>` when porting.
2. **ThemedSearch** uses `placeholder` prop (not `ph` like JSX reference).
3. **DetailView** is rendered as a **regular scrollable div** within the page (NOT a fixed overlay). Detail pages are real Next.js routes under `(tabs)/`, so they render inside the tabs layout. Remove `position: fixed, inset: 0` from the JSX reference and use normal flow layout instead.
4. **Events `price` field** does not exist in the Convex schema. Display price as hardcoded placeholder text or omit the price display. The events `category` field maps to "type" in the UI throughout (list page and detail page).
5. **Search bars** on Home, Directory, and Jobs are **decorative/placeholder only** — no filtering wired up. The category/type pills handle filtering.

---

## File Map

### Files to Create
| File | Responsibility |
|------|---------------|
| `lib/theme.ts` | Design tokens (colors, shadows, radii, fonts, section colors) |
| `lib/share.ts` | `handleShare(title, text)` Web Share API utility |
| `components/Icon.tsx` | Custom SVG icon component (20+ icons) |
| `components/Reveal.tsx` | Mount-animation wrapper (fade + translateY) |
| `components/Mono.tsx` | Monogram avatar (gradient square + serif initial) |
| `components/ThemedPill.tsx` | Filter pill with section-colored active state |
| `components/ThemedSearch.tsx` | Search input with focus-colored border |
| `components/DetailView.tsx` | Full-screen detail overlay shell |
| `components/InfoRow.tsx` | Icon + label + value detail row |
| `components/ActionBtn.tsx` | Solid/outline action button |
| `app/(tabs)/events/[id]/page.tsx` | Event detail page |
| `app/(tabs)/highcom/page.tsx` | High Commission info page |
| `app/(tabs)/profile/page.tsx` | Profile/account page |

### Files to Rewrite
| File | What Changes |
|------|-------------|
| `app/globals.css` | Light theme tokens, keyframe animations, body background |
| `app/layout.tsx` | Cormorant + Outfit fonts, remove FavouritesProvider |
| `app/page.tsx` | Splash with onboarding slides + sign-in |
| `app/(tabs)/layout.tsx` | KenteBorder + updated BottomTabBar |
| `components/BottomTabBar.tsx` | 5 new tabs, section colors, frosted glass, custom Icon |
| `components/KenteStrip.tsx` | Rename to KenteBorder, multi-color block strip |
| `app/(tabs)/home/page.tsx` | Full home redesign (greeting, hero, tiles, featured, upcoming) |
| `app/(tabs)/directory/page.tsx` | Category filter pills, new list cards |
| `app/(tabs)/directory/[id]/page.tsx` | Business detail with DetailView shell |
| `app/(tabs)/jobs/page.tsx` | Job cards with Mono + salary pills |
| `app/(tabs)/jobs/[id]/page.tsx` | Job detail with DetailView shell |

### Files to Delete
| File | Reason |
|------|--------|
| `components/AnimatedCounter.tsx` | Not used in v2 |
| `components/CategoryBadge.tsx` | Replaced by ThemedPill |
| `components/CategoryPill.tsx` | Replaced by ThemedPill |
| `components/CompanyLogo.tsx` | Replaced by Mono |
| `components/FavouritesProvider.tsx` | Favourites removed |
| `components/GradientHero.tsx` | Not used in v2 |
| `components/HeroCard.tsx` | Not used in v2 |
| `components/ListCard.tsx` | Inline card markup in pages |
| `components/NotificationPill.tsx` | Not used in v2 |
| `components/PageHeader.tsx` | Inline headers in pages |
| `components/PrimaryButton.tsx` | Replaced by ActionBtn |
| `components/SearchBar.tsx` | Replaced by ThemedSearch |
| `components/SecondaryButton.tsx` | Replaced by ActionBtn |
| `components/SectionHeader.tsx` | Inline section headers |
| `components/StatusBadge.tsx` | Not used in v2 |
| `components/StreamingText.tsx` | Not used in v2 |
| `lib/gradients.ts` | Not used in v2 (Mono replaces gradient icons) |
| `app/(tabs)/favourites/page.tsx` | Route removed |
| `app/(tabs)/more/layout.tsx` | Route removed |
| `app/(tabs)/more/page.tsx` | Route removed |
| `app/(tabs)/more/events/page.tsx` | Replaced by events tab |
| `app/(tabs)/more/vision/page.tsx` | Route removed |
| `app/(tabs)/more/settings/page.tsx` | Route removed |

---

## Task 1: Foundation — Theme, CSS, and Root Layout

**Files:**
- Create: `lib/theme.ts`
- Create: `lib/share.ts`
- Rewrite: `app/globals.css`
- Rewrite: `app/layout.tsx`

- [ ] **Step 1: Create `lib/theme.ts`**

```ts
export const T = {
  bg: "#FAFAFA",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F5F5",
  border: "#EBEBEB",
  borderLight: "#F2F2F2",
  ink: "#111111",
  inkLight: "#1A1A1A",
  secondary: "#6B6B6B",
  tertiary: "#9E9E9E",
  faint: "#C8C8C8",
  green: "#006B3F",
  greenDark: "#005432",
  greenSoft: "rgba(0,107,63,0.07)",
  red: "#CE1126",
  gold: "#D4A017",
  goldSoft: "rgba(212,160,23,0.08)",
  white: "#FFFFFF",
  sGreen: "0 6px 24px rgba(0,107,63,0.20)",
  s1: "0 1px 3px rgba(0,0,0,0.04)",
  s2: "0 4px 16px rgba(0,0,0,0.05)",
  s3: "0 8px 30px rgba(0,0,0,0.07)",
  r: 20,
  rs: 14,
  rxs: 10,
} as const;

export const F = {
  serif: "var(--font-display)",
  sans: "var(--font-body)",
} as const;

export const SECTION = {
  directory: {
    color: "#CE1126",
    dark: "#A80E1F",
    soft: "rgba(206,17,38,0.07)",
    shadow: "0 6px 24px rgba(206,17,38,0.18)",
    label: "Directory",
  },
  events: {
    color: "#D4A017",
    dark: "#B8860B",
    soft: "rgba(212,160,23,0.07)",
    shadow: "0 6px 24px rgba(212,160,23,0.18)",
    label: "Events",
  },
  jobs: {
    color: "#006B3F",
    dark: "#005432",
    soft: "rgba(0,107,63,0.07)",
    shadow: "0 6px 24px rgba(0,107,63,0.18)",
    label: "Jobs",
  },
  marketplace: {
    color: "#1A1A1A",
    dark: "#111111",
    soft: "rgba(0,0,0,0.06)",
    shadow: "0 6px 24px rgba(0,0,0,0.15)",
    label: "High Commission",
  },
} as const;
```

- [ ] **Step 2: Create `lib/share.ts`**

```ts
export function handleShare(title: string, text: string) {
  if (navigator.share) {
    navigator.share({ title, text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard
      .writeText(`${title}\n${text}\n${window.location.href}`)
      .then(() => alert("Copied to clipboard!"));
  }
}
```

- [ ] **Step 3: Rewrite `app/globals.css`**

Replace entire file with light-theme Tailwind config, design token CSS variables, and keyframe animations. Key contents:
- `@import "tailwindcss"`
- `@theme` block with new color tokens (bg, surface, ink, green, red, gold, etc.) and font variables (Cormorant, Outfit)
- `html` and `body` set to light background (`surfaceAlt` / `#F5F5F5`)
- Keyframes: `pulse`, `float`, `nodeIn`, `lineIn`
- Scrollbar hiding, input placeholder styling, tap highlight removal
- Remove all old dark-theme CSS, kente-bg, kente-corner, kente-chevrons, kente-strip classes

- [ ] **Step 4: Rewrite `app/layout.tsx`**

Replace Fraunces + DM Sans with Cormorant + Outfit via `next/font/google`. Remove `FavouritesProvider` import and wrapper. Update body className for light theme. Keep `ConvexClientProvider`.

```tsx
import type { Metadata, Viewport } from "next";
import { Cormorant, Outfit } from "next/font/google";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GhanaConnect UK & Ireland",
  description: "Connecting the Ghanaian diaspora across the UK and Ireland",
};

export const viewport: Viewport = {
  themeColor: "#006B3F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-body">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Delete files that depend on FavouritesProvider (removed in step 4)**

Since `app/layout.tsx` no longer wraps with FavouritesProvider, delete the files that import from it immediately to avoid build breakage:

```bash
git rm components/FavouritesProvider.tsx
git rm app/\(tabs\)/favourites/page.tsx
git rm -r app/\(tabs\)/more/
```

- [ ] **Step 6: Verify build compiles**

Run: `cd ghconnect && npx next build --webpack 2>&1 | tail -20`
Expected: Build succeeds (pages may error but CSS/layout should compile)

- [ ] **Step 7: Commit**

```bash
git add lib/theme.ts lib/share.ts app/globals.css app/layout.tsx
git add -A  # picks up deletions
git commit -m "feat: foundation — light theme tokens, fonts, root layout, remove dead routes"
```

---

## Task 2: Shared UI Components (Part 1 — Icon, Reveal, Mono, KenteBorder)

**Files:**
- Create: `components/Icon.tsx`
- Create: `components/Reveal.tsx`
- Create: `components/Mono.tsx`
- Rewrite: `components/KenteStrip.tsx` → rename to `components/KenteBorder.tsx`

- [ ] **Step 1: Create `components/Icon.tsx`**

Port all 20+ SVG icon definitions from JSX reference (lines 25-53). Component signature:

```tsx
"use client";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, color = "#6B6B6B", strokeWidth = 1.5 }: IconProps) {
  // SVG with viewBox="0 0 24 24", fill="none", stroke props
  // Switch on name for path data: home, grid, calendar, briefcase, user, search,
  // pin, star, arrow, heart, bell, plus, cart, building, back, share, phone,
  // mail, clock, check, link, globe, users
  // Return <svg>{paths}</svg>
}
```

Copy every icon's SVG path data exactly from the JSX reference lines 28-51. The `star` icon uses `fill={color}` and `stroke="none"` — all others use stroke.

- [ ] **Step 2: Create `components/Reveal.tsx`**

```tsx
"use client";

import { useState, useEffect, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, y = 18, style = {} }: RevealProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/Mono.tsx`**

```tsx
import { T, F } from "@/lib/theme";

interface MonoProps {
  children: string;
  size?: number;
  color?: string;
  darkColor?: string;
}

export function Mono({ children, size = 48, color = T.green, darkColor }: MonoProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        flexShrink: 0,
        background: `linear-gradient(145deg, ${color}, ${darkColor || color})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.serif,
        fontSize: size * 0.42,
        fontWeight: 700,
        color: T.white,
        boxShadow: T.s1,
        letterSpacing: -0.5,
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/KenteBorder.tsx`**

```tsx
import { T } from "@/lib/theme";

export function KenteBorder() {
  const colors = [T.red, T.gold, T.green, T.ink];
  return (
    <div style={{ height: 10, display: "flex", width: "100%" }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          style={{ flex: 1, background: colors[i % 4], opacity: 0.9 }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

Note: `KenteStrip.tsx` is deleted later in Task 11 cleanup (it may still be imported by existing pages until they are rewritten).

```bash
git add components/Icon.tsx components/Reveal.tsx components/Mono.tsx components/KenteBorder.tsx
git commit -m "feat: add Icon, Reveal, Mono, KenteBorder components"
```

---

## Task 3: Shared UI Components (Part 2 — ThemedPill, ThemedSearch, InfoRow, ActionBtn, DetailView)

**Files:**
- Create: `components/ThemedPill.tsx`
- Create: `components/ThemedSearch.tsx`
- Create: `components/InfoRow.tsx`
- Create: `components/ActionBtn.tsx`
- Create: `components/DetailView.tsx`

- [ ] **Step 1: Create `components/ThemedPill.tsx`**

Port from JSX reference lines 79-87. Props: `children`, `active`, `onClick`, `color`. Active state: filled background + white text + glow shadow. Inactive: transparent + outline border.

- [ ] **Step 2: Create `components/ThemedSearch.tsx`**

Port from JSX reference lines 89-106. Props: `placeholder`, `color`. Uses Icon component for search icon. Focus state changes border and icon color to section color.

- [ ] **Step 3: Create `components/InfoRow.tsx`**

Port from JSX reference lines 146-156. Props: `icon`, `label`, `value`, `color`. Icon in surfaceAlt rounded square, uppercase label, value text.

- [ ] **Step 4: Create `components/ActionBtn.tsx`**

Port from JSX reference lines 159-176. Props: `label`, `icon`, `color`, `outline`, `onClick`. Solid or outline variant. Hover lifts up 1px.

- [ ] **Step 5: Create `components/DetailView.tsx`**

Port from JSX reference lines 120-143 but **adapt for Next.js routing**: use normal flow layout (NOT `position: fixed`). Props: `onBack`, `color`, `children`. Colored header bar (4px), back button row, padded content area. Uses `"use client"` directive. The `onBack` prop calls `router.back()` from the consuming page.

- [ ] **Step 6: Commit**

```bash
git add components/ThemedPill.tsx components/ThemedSearch.tsx components/InfoRow.tsx components/ActionBtn.tsx components/DetailView.tsx
git commit -m "feat: add ThemedPill, ThemedSearch, InfoRow, ActionBtn, DetailView components"
```

---

## Task 4: BottomTabBar and Tabs Layout

**Files:**
- Rewrite: `components/BottomTabBar.tsx`
- Rewrite: `app/(tabs)/layout.tsx`

- [ ] **Step 1: Rewrite `components/BottomTabBar.tsx`**

Replace Lucide icons with custom Icon component. 5 tabs: home, directory (grid icon), events (calendar), jobs (briefcase), profile (user). Active tab shows section color (falls back to green for home/profile). Active indicator bar (18px wide, 2.5px tall) above active icon. Frosted glass background: `rgba(250,250,250,0.82)` with `backdrop-filter: blur(24px) saturate(1.6)`. Max-width 430px centered.

Tabs config:
```ts
const TABS = [
  { id: "home", icon: "home", label: "Home", href: "/home" },
  { id: "directory", icon: "grid", label: "Directory", href: "/directory" },
  { id: "events", icon: "calendar", label: "Events", href: "/events" },
  { id: "jobs", icon: "briefcase", label: "Jobs", href: "/jobs" },
  { id: "profile", icon: "user", label: "Profile", href: "/profile" },
];
```

Use `usePathname()` to determine active tab. Active color: `SECTION[tabId]?.color || T.green`.

- [ ] **Step 2: Rewrite `app/(tabs)/layout.tsx`**

Wrap children in 430px max-width container with `T.bg` background. Add KenteBorder at top. Include BottomTabBar.

```tsx
import { BottomTabBar } from "@/components/BottomTabBar";
import { KenteBorder } from "@/components/KenteBorder";
import { T } from "@/lib/theme";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: T.bg,
        position: "relative",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <KenteBorder />
      <main>{children}</main>
      <BottomTabBar />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/BottomTabBar.tsx app/\(tabs\)/layout.tsx
git commit -m "feat: rewrite BottomTabBar and tabs layout for v2"
```

---

## Task 5: Splash Page

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Rewrite `app/page.tsx`**

Port the full Splash component from JSX reference lines 380-531. This includes:

**Sub-components (defined inline in page.tsx):**
- `NetworkLogo` — animated SVG network graph (lines 381-394)
- `GoogleLogo` — Google "G" SVG (lines 395-402)
- `AdinkraPattern` — diamond pattern overlay (lines 403-408)

**Splash flow:**
- Step 0-2: Onboarding slides ("Akwaaba.", "Network.", "Thrive.") with Continue button
- Step 3: Sign-in screen (NetworkLogo + "GhanaConnect" wordmark + Get Started / Google Sign In / Sign In)
- Step 4: Exit animation (fade + scale)
- On exit: `router.push("/home")` using Next.js `useRouter`

Replace the streaming text approach with the onboarding carousel. Use `useState` for step tracking. Fade transitions between steps. KenteBorder at top. Green gradient background with AdinkraPattern overlay.

Use `"use client"` directive. Import `useRouter` from `next/navigation`.

- [ ] **Step 2: Verify splash renders**

Run: `npx next dev` and navigate to `http://localhost:3000`
Expected: Green gradient background with onboarding slides

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: splash page with onboarding slides and sign-in"
```

---

## Task 6: Home Page

**Files:**
- Rewrite: `app/(tabs)/home/page.tsx`

- [ ] **Step 1: Rewrite `app/(tabs)/home/page.tsx`**

Port from JSX reference lines 534-633. Mark as `"use client"`.

**Sections (top to bottom):**
1. **Header**: Time-based greeting + "GhanaConnect" wordmark (serif) + bell icon button
2. **Search**: ThemedSearch with green color
3. **Hero card**: Dark (`T.ink`) rounded card with "One Community. Infinite Possibility." text, stats line, "Join the Community" CTA. Decorative gradient circles + grid overlay.
4. **Navigation tiles**: 2x2 grid — Directory (red), Events (gold), Jobs (green), High Commission (ink). Each tile has colored bg, icon, label, subtitle. Click navigates via `router.push`.
5. **Featured businesses**: Horizontal scroll. Each card shows Mono + name + tag + rating. Data from `useQuery(api.businesses.list)`.
6. **Upcoming events**: Vertical list. Date block (month + day) + title + subtitle + city pill + price. Data from `useQuery(api.events.list)`.

Wrap each section in `<Reveal>` with staggered delays.

- [ ] **Step 2: Commit**

```bash
git add app/\(tabs\)/home/page.tsx
git commit -m "feat: home page with hero, tiles, featured, and upcoming"
```

---

## Task 7: Directory Page + Detail

**Files:**
- Rewrite: `app/(tabs)/directory/page.tsx`
- Rewrite: `app/(tabs)/directory/[id]/page.tsx`

- [ ] **Step 1: Rewrite `app/(tabs)/directory/page.tsx`**

Port from JSX reference lines 637-674. Mark as `"use client"`.

- Page header: "Directory" title (serif, 38px) + subtitle
- ThemedSearch with red (`SECTION.directory.color`)
- Category pills: ["All", "Restaurant", "Legal", "Fashion", "Transport", "Finance", "Health"] using ThemedPill
- Business list: Each item shows Mono + name + tag + rating + city + arrow icon
- Client-side filtering by category
- Data from `useQuery(api.businesses.list)` — filter client-side
- Click navigates to `/directory/${business._id}`
- Loading state: centered "Loading..." text
- Empty state: "No businesses found" when filter yields zero

- [ ] **Step 2: Rewrite `app/(tabs)/directory/[id]/page.tsx`**

Port BusinessDetail from JSX reference lines 178-223. Mark as `"use client"`.

- Use `useParams()` to get `id`, `useQuery(api.businesses.getById, { id })` for data
- Use `useRouter()` for back navigation
- DetailView shell with `SECTION.directory.color`
- Centered: large Mono (72px) + name (serif, 30px) + description as tag + rating with star
- InfoRows: Location, Category, Hours (hardcoded "Mon – Sat, 9am – 6pm"), Phone (`contactPhone`), Website
- About section in surfaceAlt card using `description` field
- ActionBtn pair: Contact + Share

- [ ] **Step 3: Commit**

```bash
git add app/\(tabs\)/directory/page.tsx app/\(tabs\)/directory/\[id\]/page.tsx
git commit -m "feat: directory page and business detail view"
```

---

## Task 8: Events Page + Detail

**Files:**
- Rewrite: `app/(tabs)/events/page.tsx` (move from `more/events`)
- Create: `app/(tabs)/events/[id]/page.tsx`

- [ ] **Step 1: Create `app/(tabs)/events/` directory**

```bash
mkdir -p app/\(tabs\)/events
```

- [ ] **Step 2: Write `app/(tabs)/events/page.tsx`**

Port from JSX reference lines 678-723. Mark as `"use client"`.

- Page header: "Events" (serif, 38px) + "Gatherings that bring us together"
- Type filter pills: ["All", "Cultural", "Business", "Social"] using ThemedPill with gold color
- **No search bar** on events page (matches JSX reference)
- Event cards: Left accent bar (4px gold), date block (month + large day), type badge pill (from `category` field), title (serif, 21px), subtitle (`description`), city (`location`) — no price display (field doesn't exist in schema)
- Client-side filtering by `category` field (displayed as "type" label in UI)
- Data from `useQuery(api.events.list)`
- Click navigates to `/events/${event._id}`

- [ ] **Step 3: Write `app/(tabs)/events/[id]/page.tsx`**

Port EventDetail from JSX reference lines 226-288. Mark as `"use client"`.

- Use `useParams()` + `useQuery(api.events.getById, { id })`
- DetailView shell with `SECTION.events.color`
- Type badge pill + title (serif, 32px) + description as subtitle
- Date hero strip: gradient gold banner with large day number + full date string + "Doors open" text
- InfoRows: Location, Time (`time` field), Attending (hardcoded "148 going"), Price (hardcoded "Free" — no price field in schema)
- About section using `description` field
- Category badge uses `category` field (displayed as "type" label)
- ActionBtn pair: Get Tickets + Share

- [ ] **Step 4: Commit**

```bash
git add app/\(tabs\)/events/
git commit -m "feat: events page and event detail view"
```

---

## Task 9: Jobs Page + Detail

**Files:**
- Rewrite: `app/(tabs)/jobs/page.tsx`
- Rewrite: `app/(tabs)/jobs/[id]/page.tsx`

- [ ] **Step 1: Rewrite `app/(tabs)/jobs/page.tsx`**

Port from JSX reference lines 727-764. Mark as `"use client"`.

- Page header: "Opportunities" (serif, 38px) + "Build your career in the diaspora"
- ThemedSearch with green (`SECTION.jobs.color`)
- Job cards: Mono (company initial) + title + company + tags (city, type as surfaceAlt pills) + salary (green soft pill) + time ago
- Data from `useQuery(api.jobs.list)`
- Click navigates to `/jobs/${job._id}`

- [ ] **Step 2: Rewrite `app/(tabs)/jobs/[id]/page.tsx`**

Port JobDetail from JSX reference lines 291-346. Mark as `"use client"`.

- Use `useParams()` + `useQuery(api.jobs.getById, { id })`
- DetailView shell with `SECTION.jobs.color`
- Mono (56px, company initial) + title + company + tag pills (city, type, salary)
- InfoRows: Employment type, Location, Posted (`postedDate` + " ago"), Applicants (hardcoded "23 applicants")
- About the role section using `description`
- Key requirements: check icon + each requirement from `requirements[]`
- ActionBtn pair: Apply Now + Share

- [ ] **Step 3: Commit**

```bash
git add app/\(tabs\)/jobs/page.tsx app/\(tabs\)/jobs/\[id\]/page.tsx
git commit -m "feat: jobs page and job detail view"
```

---

## Task 10: High Commission + Profile Pages

**Files:**
- Create: `app/(tabs)/highcom/page.tsx`
- Create: `app/(tabs)/profile/page.tsx`

- [ ] **Step 1: Write `app/(tabs)/highcom/page.tsx`**

Port from JSX reference lines 804-936. Mark as `"use client"`.

All data is hardcoded (not from Convex):
- Official badge + "Ghana High Commission" title + subtitle + 3.4 rating
- Quick action circles: Call, Directions, Website, Share (with click handlers for `tel:`, Google Maps, website)
- InfoRows: Address ("104 Highgate Hill, London N6 5HE"), Phone ("020 3302 2288"), Website, Email, Hours ("Mon – Fri, 9:30 AM – 3:30 PM"), Status (Closed indicator)
- Consular Services list (6 items: Passport, Visa, Birth & Death, Document Legalisation, Notarial, Dual Citizenship)
- Important Information box
- ActionBtn pair: Copy Address (with clipboard + "Copied!" state) + Share

- [ ] **Step 2: Write `app/(tabs)/profile/page.tsx`**

Port from JSX reference lines 768-802.

- Large avatar circle (88px, ink bg) with "G" initial + green plus badge
- "Welcome" heading (serif) + "Sign in to unlock everything" subtitle
- "Create Account" green pill button
- Menu items list (each with colored icon square + label + sub + arrow):
  - My Businesses (grid icon, directory red)
  - Saved (heart, events gold)
  - Applications (briefcase, jobs green)
  - Network (user, ink)
  - Notifications (bell, ink)

- [ ] **Step 3: Commit**

```bash
git add app/\(tabs\)/highcom/page.tsx app/\(tabs\)/profile/page.tsx
git commit -m "feat: high commission and profile pages"
```

---

## Task 11: Cleanup — Delete Old Files and Routes

**Files:**
- Delete: all files listed in "Files to Delete" section above

- [ ] **Step 1: Delete old components**

Note: `FavouritesProvider.tsx` was already deleted in Task 1.

```bash
cd ghconnect
git rm components/AnimatedCounter.tsx components/CategoryBadge.tsx components/CategoryPill.tsx components/CompanyLogo.tsx components/GradientHero.tsx components/HeroCard.tsx components/KenteStrip.tsx components/ListCard.tsx components/NotificationPill.tsx components/PageHeader.tsx components/PrimaryButton.tsx components/SearchBar.tsx components/SecondaryButton.tsx components/SectionHeader.tsx components/StatusBadge.tsx components/StreamingText.tsx
```

- [ ] **Step 2: Delete old lib files**

```bash
git rm lib/gradients.ts
```

- [ ] **Step 3: Remove lucide-react dependency**

```bash
npm uninstall lucide-react
```

- [ ] **Step 4: Update `app/manifest.ts`**

Change `theme_color` from `#0d0d0d` to `#006B3F` to match the new green brand color.

- [ ] **Step 5: Verify no broken imports**

Run: `npx next build --webpack 2>&1 | tail -30`
Expected: Build succeeds with no import errors

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "cleanup: remove old components, lucide-react, and unused files"
```

---

## Task 12: Final Verification and Polish

- [ ] **Step 1: Run full build**

Run: `cd ghconnect && npx next build --webpack`
Expected: Build succeeds with no errors

- [ ] **Step 2: Manual smoke test**

Run: `npx next dev` and verify each page:
1. `/` — Splash loads with onboarding slides, sign-in screen works, navigates to home
2. `/home` — Greeting, search, hero card, tiles, featured businesses, upcoming events
3. `/directory` — Category pills filter, business cards render, click opens detail
4. `/directory/[id]` — Business detail with back button, info rows, action buttons
5. `/events` — Type pills filter, event cards render, click opens detail
6. `/events/[id]` — Event detail with date hero strip, info rows
7. `/jobs` — Job cards render, click opens detail
8. `/jobs/[id]` — Job detail with requirements list
9. `/highcom` — Embassy info, consular services, copy address works
10. `/profile` — Avatar, menu items render
11. Bottom tab bar — all 5 tabs navigate correctly, active colors match section

- [ ] **Step 3: Fix any issues found**

Address any visual or functional issues from smoke test.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "polish: final fixes from smoke test"
```
