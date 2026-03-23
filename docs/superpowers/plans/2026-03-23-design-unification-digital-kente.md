# Design Unification — "Digital Kente" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the GhConnect app's visual design around a coherent "digital kente" theme based on 6 Stitch reference screens, using a shared component system applied consistently across all screens.

**Architecture:** Extract shared UI components (Card, HeroCard, SectionHeader, Badge, Button variants, NotificationPill) into dedicated files. Update globals.css design tokens first, then build components, then restyle each screen page-by-page. Restructure routing to move events under `/more/events` and vision under `/more/vision`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Motion (framer-motion), Convex, lucide-react, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-23-design-unification-digital-kente.md`

**Important notes for implementers:**
- This is Next.js 16 — check `ghconnect/AGENTS.md` and `node_modules/next/dist/docs/` for any breaking changes before writing code.
- All existing components use default exports. New components should also use `export default function`.
- Use `Link` from `next/link` for all internal navigation — never plain `<a>` tags.

---

## File Structure

### New Files
- `ghconnect/components/ListCard.tsx` — Unified card with thumbnail, title, subtitle, badge
- `ghconnect/components/HeroCard.tsx` — Full-width featured card for Home
- `ghconnect/components/SectionHeader.tsx` — Fraunces gold title + "View all" + kente strip
- `ghconnect/components/NotificationPill.tsx` — Gold outline pill for Home stats
- `ghconnect/components/PrimaryButton.tsx` — Green solid pill button
- `ghconnect/components/SecondaryButton.tsx` — Gold outline pill button
- `ghconnect/components/StatusBadge.tsx` — "New" / "Hot" badge
- `ghconnect/components/PageHeader.tsx` — Fraunces 28px gold title + kente strip
- `ghconnect/components/SearchBar.tsx` — Shared search input with gold border
- `ghconnect/components/CompanyLogo.tsx` — Letter placeholder for jobs without logos
- `ghconnect/components/CategoryBadge.tsx` — Display-only category label (gold-mist bg, gold text)
- `ghconnect/app/(tabs)/more/page.tsx` — More menu index page
- `ghconnect/app/(tabs)/more/events/page.tsx` — Full events list
- `ghconnect/app/(tabs)/more/vision/page.tsx` — Vision page (moved from `/vision`)
- `ghconnect/app/(tabs)/more/settings/page.tsx` — Settings placeholder
- `ghconnect/app/(tabs)/more/layout.tsx` — Layout for More sub-pages

### Modified Files
- `ghconnect/app/globals.css` — Update `--color-gold-border` to 20%, kente-strip to 3px
- `ghconnect/components/KenteStrip.tsx` — Change height from h-1.5 to h-[3px]
- `ghconnect/components/BottomTabBar.tsx` — MoreHorizontal icon, inactive 40%, route to /more
- `ghconnect/components/CategoryPill.tsx` — Align with spec badge styles
- `ghconnect/app/page.tsx` — Redesign splash: wordmark swap, dual CTA buttons
- `ghconnect/app/(tabs)/home/page.tsx` — Full redesign using shared components
- `ghconnect/app/(tabs)/directory/page.tsx` — Restyle with ListCard, PageHeader, SearchBar
- `ghconnect/app/(tabs)/jobs/page.tsx` — Restyle with ListCard, SearchBar, StatusBadge
- `ghconnect/app/(tabs)/favourites/page.tsx` — Restyle with shared components
- `ghconnect/app/(tabs)/directory/[id]/page.tsx` — Restyle detail page
- `ghconnect/app/(tabs)/jobs/[id]/page.tsx` — Restyle detail page
- `ghconnect/app/(tabs)/layout.tsx` — May need adjustment for /more routes

### Deleted Files
- `ghconnect/app/(tabs)/community/page.tsx` — Replaced by `/more/events`
- `ghconnect/app/(tabs)/vision/page.tsx` — Moved to `/more/vision`
- `ghconnect/components/FeedCard.tsx` — Replaced by ListCard

---

## Task 1: Update Design Tokens & KenteStrip

**Files:**
- Modify: `ghconnect/app/globals.css`
- Modify: `ghconnect/components/KenteStrip.tsx`

- [ ] **Step 1: Update globals.css gold-border opacity**

In `ghconnect/app/globals.css`, change `--color-gold-border` from `rgba(252, 209, 22, 0.12)` to `rgba(252, 209, 22, 0.2)`.

- [ ] **Step 2: Update kente-strip height in globals.css**

In `ghconnect/app/globals.css`, change the `.kente-strip` class `h-1.5` reference — the actual height is controlled by the component. No CSS change needed here, just verify the gradient pattern is correct.

- [ ] **Step 3: Update KenteStrip component height**

In `ghconnect/components/KenteStrip.tsx`, change `h-1.5` to `h-[3px]`.

- [ ] **Step 4: Verify changes visually**

Run: `npm run dev` in `ghconnect/` directory. Check that kente strips appear thinner (3px vs 6px) and card borders (if any visible on current pages) are slightly more prominent.

- [ ] **Step 5: Commit**

```bash
git add ghconnect/app/globals.css ghconnect/components/KenteStrip.tsx
git commit -m "style: update gold-border opacity to 20% and kente strip to 3px"
```

---

## Task 2: Create Shared Button Components

**Files:**
- Create: `ghconnect/components/PrimaryButton.tsx`
- Create: `ghconnect/components/SecondaryButton.tsx`

- [ ] **Step 1: Create PrimaryButton**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function PrimaryButton({ children, onClick, href, className = "" }: PrimaryButtonProps) {
  const styles = `inline-flex items-center justify-center px-5 py-2.5 bg-forest text-white text-sm font-semibold font-body rounded-full ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <motion.span className={styles} whileTap={{ scale: 0.97 }}>
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button onClick={onClick} className={styles} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: Create SecondaryButton**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function SecondaryButton({ children, onClick, href, className = "" }: SecondaryButtonProps) {
  const styles = `inline-flex items-center justify-center px-5 py-2.5 border border-kente-gold text-kente-gold text-sm font-semibold font-body rounded-full ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <motion.span className={styles} whileTap={{ scale: 0.97 }}>
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button onClick={onClick} className={styles} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add ghconnect/components/PrimaryButton.tsx ghconnect/components/SecondaryButton.tsx
git commit -m "feat: add PrimaryButton and SecondaryButton shared components"
```

---

## Task 3: Create PageHeader & SectionHeader Components

**Files:**
- Create: `ghconnect/components/PageHeader.tsx`
- Create: `ghconnect/components/SectionHeader.tsx`

- [ ] **Step 1: Create PageHeader**

```tsx
import KenteStrip from "./KenteStrip";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode; // optional right-side content (avatar, search icon, etc.)
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="px-4 pt-[env(safe-area-inset-top)] mb-4">
      <div className="flex items-center justify-between py-3">
        <h1 className="font-display text-[28px] text-kente-gold">{title}</h1>
        {children}
      </div>
      <KenteStrip />
    </div>
  );
}
```

- [ ] **Step 2: Create SectionHeader**

```tsx
import Link from "next/link";
import KenteStrip from "./KenteStrip";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
}

export default function SectionHeader({ title, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-xl text-kente-gold">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-white/60">
            View all
          </Link>
        )}
      </div>
      <KenteStrip />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add ghconnect/components/PageHeader.tsx ghconnect/components/SectionHeader.tsx
git commit -m "feat: add PageHeader and SectionHeader shared components"
```

---

## Task 4: Create ListCard, CompanyLogo, StatusBadge & CategoryBadge Components

**Files:**
- Create: `ghconnect/components/ListCard.tsx`
- Create: `ghconnect/components/CompanyLogo.tsx`
- Create: `ghconnect/components/StatusBadge.tsx`
- Create: `ghconnect/components/CategoryBadge.tsx`

Note: `CategoryBadge` is a **display-only** badge for showing a category label inside cards (gold-mist bg, gold text). This is distinct from the existing `CategoryPill` which is an **interactive toggle button** for filtering. Both are needed.

- [ ] **Step 1: Create CompanyLogo placeholder**

```tsx
interface CompanyLogoProps {
  name: string;
  className?: string;
}

export default function CompanyLogo({ name, className = "" }: CompanyLogoProps) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <div className={`w-[72px] h-[72px] rounded-lg bg-surface border border-gold-border flex items-center justify-center ${className}`}>
      <span className="font-display text-2xl text-kente-gold">{letter}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create StatusBadge**

```tsx
interface StatusBadgeProps {
  variant: "new" | "hot";
}

export default function StatusBadge({ variant }: StatusBadgeProps) {
  const styles = variant === "new"
    ? "bg-forest text-white"
    : "bg-kente-gold text-onyx";

  return (
    <span className={`text-xs font-medium font-body px-2 py-0.5 rounded-full ${styles}`}>
      {variant === "new" ? "New" : "Hot"}
    </span>
  );
}
```

- [ ] **Step 3: Create CategoryBadge**

```tsx
interface CategoryBadgeProps {
  label: string;
  icon?: React.ReactNode;
}

export default function CategoryBadge({ label, icon }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold-mist text-kente-gold text-xs font-medium font-body rounded-full">
      {icon}
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Create ListCard**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface ListCardProps {
  href: string;
  thumbnail?: React.ReactNode; // image element or CompanyLogo
  title: string;
  subtitle?: string;
  badge?: React.ReactNode; // CategoryPill or StatusBadge
  trailing?: React.ReactNode; // extra right-side content
  index?: number;
}

export default function ListCard({ href, thumbnail, title, subtitle, badge, trailing, index = 0 }: ListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={href} className="flex items-center gap-3 p-3 bg-surface border border-gold-border rounded-xl">
        {thumbnail && <div className="shrink-0">{thumbnail}</div>}
        <div className="flex-1 min-w-0">
          <p className="font-body text-base font-bold text-white truncate">{title}</p>
          {subtitle && <p className="font-body text-sm text-white/60 truncate">{subtitle}</p>}
          {badge && <div className="mt-1">{badge}</div>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {trailing}
          <ChevronRight size={16} className="text-white/40" />
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add ghconnect/components/ListCard.tsx ghconnect/components/CompanyLogo.tsx ghconnect/components/StatusBadge.tsx ghconnect/components/CategoryBadge.tsx
git commit -m "feat: add ListCard, CompanyLogo, StatusBadge, and CategoryBadge components"
```

---

## Task 5: Create HeroCard, NotificationPill & SearchBar Components

**Files:**
- Create: `ghconnect/components/HeroCard.tsx`
- Create: `ghconnect/components/NotificationPill.tsx`
- Create: `ghconnect/components/SearchBar.tsx`

- [ ] **Step 1: Create HeroCard**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface HeroCardProps {
  href: string;
  label?: string; // e.g. "NEXT EVENT"
  title: string;
  subtitle?: string;
  className?: string;
}

export default function HeroCard({ href, label, title, subtitle, className = "" }: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={href}
        className={`block p-4 bg-surface border border-gold-border rounded-xl min-h-[140px] relative ${className}`}
      >
        {label && (
          <span className="text-xs font-body font-medium text-white/60 uppercase tracking-wider">
            {label}
          </span>
        )}
        <h2 className="font-display text-2xl text-white mt-1">{title}</h2>
        {subtitle && (
          <p className="font-body text-sm text-white/60 mt-1">{subtitle}</p>
        )}
        <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create NotificationPill**

```tsx
interface NotificationPillProps {
  children: React.ReactNode;
}

export default function NotificationPill({ children }: NotificationPillProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 border border-[rgba(252,209,22,0.3)] text-white text-xs font-medium font-body rounded-full whitespace-nowrap">
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create SearchBar**

```tsx
"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilter?: () => void;
}

export default function SearchBar({ value, onChange, placeholder = "Search...", onFilter }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 mb-4">
      <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-surface border border-gold-border rounded-xl">
        <Search size={16} className="text-white/40 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none font-body"
        />
      </div>
      {onFilter && (
        <button
          onClick={onFilter}
          className="p-2.5 bg-surface border border-gold-border rounded-xl"
        >
          <SlidersHorizontal size={16} className="text-kente-gold" />
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add ghconnect/components/HeroCard.tsx ghconnect/components/NotificationPill.tsx ghconnect/components/SearchBar.tsx
git commit -m "feat: add HeroCard, NotificationPill, and SearchBar components"
```

---

## Task 6: Redesign Splash Screen

**Files:**
- Modify: `ghconnect/app/page.tsx`

- [ ] **Step 1: Redesign splash page**

Rewrite `ghconnect/app/page.tsx` to match the spec:
- Kente strip at the top edge
- Centered "GhanaConnect" wordmark: "Ghana" in **gold**, "Connect" in **white** (reversed from current — this is intentional per spec)
- **Animation order change:** Wordmark fades in FIRST, THEN StreamingText animation plays below it (current app does it in reverse — streaming text first, then wordmark reveal. This must be changed.)
- Bottom CTA area: "Get Started" (PrimaryButton) + "Sign In" (SecondaryButton)
- Both buttons navigate to `/home` (no auth)

Import PrimaryButton and SecondaryButton components.

- [ ] **Step 2: Verify splash screen**

Run dev server, visit `/`. Confirm: wordmark shows "Ghana" gold / "Connect" white, streaming text animates, both buttons appear and navigate to `/home`.

- [ ] **Step 3: Commit**

```bash
git add ghconnect/app/page.tsx
git commit -m "redesign: splash screen with Stitch wordmark and dual CTA buttons"
```

---

## Task 7: Update BottomTabBar

**Files:**
- Modify: `ghconnect/components/BottomTabBar.tsx`

- [ ] **Step 1: Update BottomTabBar**

Changes:
1. Replace `User` import with `MoreHorizontal` from lucide-react
2. Change More tab icon from `User` to `MoreHorizontal`
3. Change More tab href from `/vision` to `/more`
4. Change inactive opacity from `text-white/25` to `text-white/40`

- [ ] **Step 2: Commit**

```bash
git add ghconnect/components/BottomTabBar.tsx
git commit -m "style: update BottomTabBar — MoreHorizontal icon, 40% inactive, /more route"
```

Note: The `/more` route does not exist yet — it is created in Task 8 immediately after. Do not try to verify navigation until Task 8 is complete.

---

## Task 8: Create More Menu & Sub-pages (Routing Restructure)

**Files:**
- Create: `ghconnect/app/(tabs)/more/page.tsx`
- Create: `ghconnect/app/(tabs)/more/layout.tsx`
- Create: `ghconnect/app/(tabs)/more/events/page.tsx`
- Create: `ghconnect/app/(tabs)/more/vision/page.tsx`
- Create: `ghconnect/app/(tabs)/more/settings/page.tsx`

- [ ] **Step 1: Create More layout**

```tsx
export default function MoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 2: Create More index page**

Build `/more` menu page using PageHeader. Three menu rows:
- Calendar icon + "Community Events" → `/more/events`
- Eye icon + "Vision & Impact" → `/more/vision`
- Settings icon + "Settings" → `/more/settings`

Each row: Link with `flex items-center gap-3 p-4 bg-surface border border-gold-border rounded-xl`, ChevronRight on the right.

- [ ] **Step 3: Create Community Events page**

Build `/more/events` page:
- PageHeader with "Community Events" and back arrow (ArrowLeft linking to `/more`)
- Query `api.events.list` from Convex
- Map events to ListCard components with PrimaryButton "Register"

- [ ] **Step 4: Move Vision page content**

Copy the existing content from `ghconnect/app/(tabs)/vision/page.tsx` into `ghconnect/app/(tabs)/more/vision/page.tsx`. Restyle:
- Replace header with PageHeader component
- Add back arrow linking to `/more`
- Keep all existing content (stats, roadmap, partnerships)
- Update typography to match spec (Fraunces gold titles)

- [ ] **Step 5: Create Settings placeholder**

```tsx
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-onyx">
      <PageHeader title="Settings">
        <Link href="/more" className="text-white/60"><ArrowLeft size={20} /></Link>
      </PageHeader>
      <div className="px-4 py-12 text-center">
        <p className="text-white/40 font-body text-sm">Coming soon</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verify all More routes and BottomTabBar**

Visit `/more`, `/more/events`, `/more/vision`, `/more/settings`. Confirm:
- BottomTabBar More tab (three dots icon) navigates to `/more`
- Back arrows work on all sub-pages
- Events page loads data from Convex
- Vision page preserves all existing content (stats, roadmap, partnerships)

- [ ] **Step 7: Commit**

```bash
git add ghconnect/app/\(tabs\)/more/
git commit -m "feat: add More menu with events, vision, and settings sub-pages"
```

---

## Task 9: Redesign Home Page

**Files:**
- Modify: `ghconnect/app/(tabs)/home/page.tsx`

- [ ] **Step 1: Rewrite Home page**

Complete rewrite of `ghconnect/app/(tabs)/home/page.tsx` using shared components:

1. **PageHeader**: "Akwaaba" (no name — no auth yet, just the greeting). Avatar placeholder top-right (circle with User icon).
2. **HeroCard**: First event from `api.events.list` as "Next Event" — title, date, location. Links to `/more/events`.
3. **NotificationPill row**: Horizontal scroll. Use total counts from queries as an approximation (e.g., `businesses?.length` → "X Businesses", `jobs?.length` → "Y Jobs"). No "recent" query exists — total counts are fine for now.
4. **SectionHeader**: "Upcoming Events" with viewAllHref="/more/events". Horizontal scroll of ListCard components for events (link each event card to `/more/events` since there is no individual event detail page).
5. **SectionHeader**: "Latest in Directory" with viewAllHref="/directory". Horizontal scroll of ListCard components for businesses.

Queries to reuse: `api.businesses.list`, `api.jobs.list`, `api.events.list`.

**Important:** The current Home page has links to `/community` — all of these must be replaced with `/more/events` in this rewrite. Do NOT leave any `/community` references.

- [ ] **Step 2: Verify Home page**

Run dev server, visit `/home`. Confirm all sections render with gold borders, kente strips, and correct data from Convex.

- [ ] **Step 3: Commit**

```bash
git add ghconnect/app/\(tabs\)/home/page.tsx
git commit -m "redesign: Home page with shared components and unified design"
```

---

## Task 10: Redesign Directory Page

**Files:**
- Modify: `ghconnect/app/(tabs)/directory/page.tsx`

- [ ] **Step 1: Rewrite Directory page**

Replace current implementation with:
1. **PageHeader**: "Business Directory"
2. **SearchBar**: Search businesses by name/category/location. No filter button initially (category pills handle filtering).
3. **CategoryPill row**: Horizontal scroll of category pills from `api.categories.byType` with `{ type: "business" }`.
4. **ListCard list**: Vertical scroll. Each business as a ListCard with:
   - Thumbnail: GradientHero-style colored square using the business `image` field (gradient key)
   - Title: business name
   - Subtitle: business location
   - Badge: CategoryPill with business category
   - Href: `/directory/${business._id}`

Remove inline `BusinessRow` and `TabButton` sub-components — replaced by ListCard and CategoryPill.

- [ ] **Step 2: Verify Directory page**

Visit `/directory`. Confirm: search works, category filter works, cards have gold borders and thumbnails.

- [ ] **Step 3: Commit**

```bash
git add ghconnect/app/\(tabs\)/directory/page.tsx
git commit -m "redesign: Directory page with ListCard and SearchBar components"
```

---

## Task 11: Redesign Jobs Page

**Files:**
- Modify: `ghconnect/app/(tabs)/jobs/page.tsx`

- [ ] **Step 1: Rewrite Jobs page**

Replace current implementation with:
1. **PageHeader**: "Jobs"
2. **SearchBar**: Search by title/company/location. Filter button that toggles type filter visibility.
3. **CategoryPill row**: Job type filters (All, Full-time, Part-time, Contract).
4. **ListCard list**: Single-column. Each job as a ListCard with:
   - Thumbnail: CompanyLogo component (first letter of company name)
   - Title: job title
   - Subtitle: `${company} · ${location}`
   - Badge: StatusBadge ("New" for jobs posted in last 7 days, "Hot" for featured)
   - Trailing: SecondaryButton "View Details" (small variant)
   - Href: `/jobs/${job._id}`

- [ ] **Step 2: Verify Jobs page**

Visit `/jobs`. Confirm: single-column layout, company logo placeholders, search bar, status badges.

- [ ] **Step 3: Commit**

```bash
git add ghconnect/app/\(tabs\)/jobs/page.tsx
git commit -m "redesign: Jobs page with single-column ListCard layout and SearchBar"
```

---

## Task 12: Redesign Favourites Page

**Files:**
- Modify: `ghconnect/app/(tabs)/favourites/page.tsx`

- [ ] **Step 1: Restyle Favourites page**

Update to use shared components:
1. **PageHeader**: "Favourites"
2. **CategoryPill row**: Toggle between Businesses / Jobs / Events (reuse existing filter logic).
3. **ListCard list**: Render saved items using ListCard with appropriate thumbnails per type.
4. **Empty state**: Keep heart icon, restyle text to match spec typography.

Preserve existing FavouritesProvider logic and localStorage integration.

**Important:** The current Favourites page has links to `/community` — replace all with `/more/events`.

- [ ] **Step 2: Verify Favourites page**

Visit `/favourites`. Toggle between types, verify cards render correctly and empty state shows.

- [ ] **Step 3: Commit**

```bash
git add ghconnect/app/\(tabs\)/favourites/page.tsx
git commit -m "redesign: Favourites page with shared components"
```

---

## Task 13: Restyle Detail Pages

**Files:**
- Modify: `ghconnect/app/(tabs)/directory/[id]/page.tsx`
- Modify: `ghconnect/app/(tabs)/jobs/[id]/page.tsx`

- [ ] **Step 1: Restyle business detail page**

Update `directory/[id]/page.tsx`:
- Replace header with PageHeader pattern (Fraunces gold title, kente strip)
- Update card sections to use gold-border styling
- Replace CTA buttons with PrimaryButton/SecondaryButton
- Keep GradientHero, back button, share/save functionality

- [ ] **Step 2: Restyle job detail page**

Update `jobs/[id]/page.tsx`:
- Replace header with PageHeader pattern
- Update all borders to gold-border
- Replace "Apply Now" with PrimaryButton
- Replace kente strip usage with KenteStrip component (3px)
- Keep all content sections (salary, requirements, description)

- [ ] **Step 3: Verify both detail pages**

Navigate to a business and a job detail page. Confirm gold borders, Fraunces gold titles, correct button styles.

- [ ] **Step 4: Commit**

```bash
git add ghconnect/app/\(tabs\)/directory/\[id\]/page.tsx ghconnect/app/\(tabs\)/jobs/\[id\]/page.tsx
git commit -m "redesign: business and job detail pages with unified design system"
```

---

## Task 14: Clean Up Old Routes & Components

**Files:**
- Delete: `ghconnect/app/(tabs)/community/page.tsx`
- Delete: `ghconnect/app/(tabs)/vision/page.tsx`
- Delete: `ghconnect/components/FeedCard.tsx`

- [ ] **Step 1: Verify no imports of deleted files**

Search the codebase for imports of:
- `community/page` or links to `/community`
- `vision/page` or links to `/vision`
- `FeedCard` component

Update any remaining references to point to new routes (`/more/events`, `/more/vision`) or new components (ListCard).

- [ ] **Step 2: Delete old files**

Remove `community/page.tsx`, `vision/page.tsx`, and `FeedCard.tsx`.

- [ ] **Step 3: Verify app still works**

Run dev server. Visit all routes: `/`, `/home`, `/favourites`, `/directory`, `/directory/[id]`, `/jobs`, `/jobs/[id]`, `/more`, `/more/events`, `/more/vision`, `/more/settings`. Confirm no broken links or missing components.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "cleanup: remove old community, vision routes and FeedCard component"
```

---

## Task 15: Final Visual QA Pass

**Files:** All modified files

- [ ] **Step 1: Visual audit checklist**

Walk through every screen and verify against the spec:

| Screen | Gold title | Kente strip | Gold borders | Correct buttons | Correct typography |
|--------|-----------|-------------|-------------|----------------|-------------------|
| Splash | | | | | |
| Home | | | | | |
| Directory | | | | | |
| Jobs | | | | | |
| Favourites | | | | | |
| More | | | | | |
| More/Events | | | | | |
| More/Vision | | | | | |
| Directory/[id] | | | | | |
| Jobs/[id] | | | | | |

- [ ] **Step 2: Fix any inconsistencies found**

Address any remaining visual differences from the spec.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "style: final QA pass — unified digital kente design system"
```
