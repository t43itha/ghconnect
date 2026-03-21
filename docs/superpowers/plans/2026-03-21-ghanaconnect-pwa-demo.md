# GhanaConnect PWA Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, installable PWA demo of GhanaConnect for an investor meeting with the Ghana High Commissioner to the UK.

**Architecture:** Next.js 16.2 App Router with Convex backend for real-time data. All screens are read-only, pre-seeded with realistic mock data. Kente Luxe dark theme with gold accents, animated with Motion (formerly Framer Motion). PWA installable via Serwist.

**Tech Stack:** Next.js 16.2, TypeScript, Tailwind CSS 4, Motion 12 (`motion/react`), Lucide React, Convex, Serwist (`@serwist/next`), Vercel

**Spec:** `docs/superpowers/specs/2026-03-21-ghanaconnect-pwa-demo-design.md`

---

## File Structure

```
ghconnect/
├── app/
│   ├── layout.tsx                    # Root layout — fonts, ConvexProvider, metadata
│   ├── page.tsx                      # Splash/Onboarding screen (no tab bar)
│   ├── manifest.ts                   # PWA manifest (Next.js built-in)
│   ├── globals.css                   # Tailwind import + Kente Luxe theme
│   ├── (tabs)/
│   │   ├── layout.tsx                # Shared layout with BottomTabBar + pb-20
│   │   ├── home/
│   │   │   └── page.tsx              # Home dashboard
│   │   ├── explore/
│   │   │   └── page.tsx              # Unified search page
│   │   ├── directory/
│   │   │   ├── page.tsx              # Business directory listing
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Business detail
│   │   ├── jobs/
│   │   │   ├── page.tsx              # Job board listing
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Job detail
│   │   ├── community/
│   │   │   └── page.tsx              # Community & events
│   │   └── vision/
│   │       └── page.tsx              # Partnership / Our Vision
├── components/
│   ├── ConvexClientProvider.tsx       # "use client" Convex wrapper
│   ├── BottomTabBar.tsx              # Persistent bottom navigation
│   ├── KenteStrip.tsx               # Reusable Kente accent bar
│   ├── FeedCard.tsx                  # Unified feed card (business/job/event)
│   ├── CategoryPill.tsx             # Horizontal-scroll category filter pill
│   ├── GradientHero.tsx             # Gradient placeholder + Lucide icon for images
│   ├── AnimatedCounter.tsx          # Scroll-triggered number counter
│   ├── StreamingText.tsx            # Typewriter text animation
│   └── SearchOverlay.tsx            # Explore tab search overlay
├── convex/
│   ├── schema.ts                     # Convex schema definition
│   ├── businesses.ts                 # Business queries
│   ├── jobs.ts                       # Job queries
│   ├── events.ts                     # Event queries
│   ├── categories.ts                 # Category queries
│   └── seed.ts                       # Seed data function
├── lib/
│   └── gradients.ts                  # Gradient map for category → CSS gradient
├── public/
│   ├── icons/
│   │   ├── icon-192.png              # PWA icon 192x192
│   │   └── icon-512.png              # PWA icon 512x512
│   └── sw.js                         # Generated service worker (Serwist output)
├── sw.ts                             # Service worker source (Serwist input)
├── next.config.ts                    # Next.js + Serwist config
├── tailwind.config.ts                # Tailwind v4 (if needed beyond CSS @theme)
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffolding & Core Config

**Files:**
- Create: `ghconnect/` (entire project via create-next-app)
- Modify: `ghconnect/next.config.ts`
- Modify: `ghconnect/app/globals.css`
- Modify: `ghconnect/app/layout.tsx`
- Create: `ghconnect/app/manifest.ts`

- [ ] **Step 1: Scaffold Next.js 16 project**

```bash
cd C:/Users/tabit/_Projects/GhConnect
npx create-next-app@latest ghconnect --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

Accept defaults. This creates a Next.js 16.2 project with TypeScript, Tailwind v4, ESLint, and App Router.

- [ ] **Step 2: Install dependencies**

```bash
cd C:/Users/tabit/_Projects/GhConnect/ghconnect
npm install motion lucide-react convex @serwist/next @serwist/precaching @serwist/sw
```

- [ ] **Step 3: Set up Kente Luxe theme in globals.css**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-onyx: #0d0d0d;
  --color-surface: #111111;
  --color-kente-gold: #FCD116;
  --color-ashanti-red: #CE1126;
  --color-forest: #006B3F;
  --color-gold-mist: rgba(252, 209, 22, 0.08);
  --color-gold-border: rgba(252, 209, 22, 0.12);
  --color-gold-glow: rgba(252, 209, 22, 0.4);

  --font-display: 'Fraunces', serif;
  --font-body: 'DM Sans', sans-serif;
}

html {
  background: var(--color-onyx);
  color: #e0e0e0;
  font-family: var(--font-body);
}

body {
  min-height: 100dvh;
}

/* Kente weave background pattern */
.kente-bg {
  background-image:
    repeating-linear-gradient(90deg, var(--color-ashanti-red) 0px, var(--color-ashanti-red) 4px, transparent 4px, transparent 20px),
    repeating-linear-gradient(0deg, var(--color-kente-gold) 0px, var(--color-kente-gold) 4px, transparent 4px, transparent 20px),
    repeating-linear-gradient(90deg, var(--color-forest) 10px, var(--color-forest) 14px, transparent 14px, transparent 20px);
  opacity: 0.12;
}

/* Kente strip accent */
.kente-strip {
  background: repeating-linear-gradient(90deg,
    var(--color-ashanti-red) 0px, var(--color-ashanti-red) 30px,
    var(--color-kente-gold) 30px, var(--color-kente-gold) 60px,
    var(--color-forest) 60px, var(--color-forest) 90px,
    var(--color-kente-gold) 90px, var(--color-kente-gold) 120px
  );
}
```

- [ ] **Step 4: Set up root layout with fonts**

Replace `app/layout.tsx`:

```tsx
import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GhanaConnect UK & Ireland",
  description: "Connecting the Ghanaian diaspora across the UK and Ireland",
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-onyx text-gray-200 font-body min-h-dvh">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create PWA manifest**

Create `app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GhanaConnect UK & Ireland",
    short_name: "GhanaConnect",
    description: "Connecting the Ghanaian diaspora across the UK and Ireland",
    start_url: "/home",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

- [ ] **Step 6: Create ConvexClientProvider**

Create `components/ConvexClientProvider.tsx`:

```tsx
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

- [ ] **Step 7: Create placeholder page and verify dev server starts**

Replace `app/page.tsx` with a minimal placeholder:

```tsx
export default function SplashPage() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <h1 className="font-display text-4xl font-bold text-kente-gold">
        GhanaConnect
      </h1>
    </div>
  );
}
```

Run: `npm run dev`
Expected: Page renders at localhost:3000 with "GhanaConnect" in gold Fraunces font on dark background.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 16.2 project with Kente Luxe theme, Convex provider, and PWA manifest"
```

---

## Task 2: Convex Schema & Seed Data

**Files:**
- Create: `ghconnect/convex/schema.ts`
- Create: `ghconnect/convex/businesses.ts`
- Create: `ghconnect/convex/jobs.ts`
- Create: `ghconnect/convex/events.ts`
- Create: `ghconnect/convex/categories.ts`
- Create: `ghconnect/convex/seed.ts`
- Create: `ghconnect/convex/seedData.ts`
- Create: `ghconnect/.env.local`

- [ ] **Step 1: Initialize Convex**

```bash
cd C:/Users/tabit/_Projects/GhConnect/ghconnect
npx convex dev --once
```

This creates the `convex/` directory structure and prompts for project setup. Follow the prompts to create a new Convex project named "ghconnect". Copy the `NEXT_PUBLIC_CONVEX_URL` to `.env.local`.

- [ ] **Step 2: Define Convex schema**

Create `convex/schema.ts`:

```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  businesses: defineTable({
    name: v.string(),
    category: v.string(),
    description: v.string(),
    location: v.string(),
    image: v.string(),
    rating: v.number(),
    featured: v.boolean(),
    contactPhone: v.string(),
    contactEmail: v.string(),
    website: v.string(),
  }),

  jobs: defineTable({
    title: v.string(),
    company: v.string(),
    location: v.string(),
    type: v.string(),
    description: v.string(),
    requirements: v.array(v.string()),
    salary: v.string(),
    postedDate: v.string(),
    featured: v.boolean(),
  }),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    organizer: v.string(),
    image: v.string(),
    category: v.string(),
  }),

  categories: defineTable({
    name: v.string(),
    icon: v.string(),
    type: v.string(),
    count: v.number(),
  }),
});
```

- [ ] **Step 3: Create query functions**

Create `convex/businesses.ts`:

```ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("businesses").collect();
  },
});

export const featured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("businesses")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("businesses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const byCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("businesses")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});
```

Create `convex/jobs.ts`:

```ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("jobs").collect();
  },
});

export const featured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const byType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("type"), args.type))
      .collect();
  },
});
```

Create `convex/events.ts`:

```ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

Create `convex/categories.ts`:

```ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const byType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("type"), args.type))
      .collect();
  },
});
```

- [ ] **Step 4: Create seed data**

Create `convex/seedData.ts` with realistic Ghanaian diaspora mock data (inside the `convex/` directory so the seed mutation can import it):

```ts
export const businessesSeed = [
  {
    name: "Accra Kitchen",
    category: "Food & Drink",
    description: "Authentic Ghanaian cuisine in the heart of Brixton. Specialising in jollof rice, banku, and tilapia. Catering available for events.",
    location: "Brixton, London",
    image: "gradient-food",
    rating: 4.8,
    featured: true,
    contactPhone: "+44 20 7946 0123",
    contactEmail: "hello@accrakitchen.co.uk",
    website: "www.accrakitchen.co.uk",
  },
  {
    name: "Asante Legal Partners",
    category: "Legal",
    description: "Immigration, family law, and business law specialists. Over 15 years serving the Ghanaian community in the UK.",
    location: "Stratford, London",
    image: "gradient-legal",
    rating: 4.9,
    featured: true,
    contactPhone: "+44 20 7946 0456",
    contactEmail: "info@asantelegal.co.uk",
    website: "www.asantelegal.co.uk",
  },
  {
    name: "Kumasi Cuts Barbershop",
    category: "Beauty",
    description: "Premium barbershop specialising in African hair. Fades, locs, and traditional styles. Walk-ins welcome.",
    location: "Tottenham, London",
    image: "gradient-beauty",
    rating: 4.7,
    featured: false,
    contactPhone: "+44 20 7946 0789",
    contactEmail: "book@kumasicutslondon.co.uk",
    website: "www.kumasicutslondon.co.uk",
  },
  {
    name: "GoldCoast Express Logistics",
    category: "Transport",
    description: "Reliable shipping and courier services between the UK and Ghana. Door-to-door delivery, cargo, and personal items.",
    location: "Elephant & Castle, London",
    image: "gradient-transport",
    rating: 4.5,
    featured: true,
    contactPhone: "+44 20 7946 1012",
    contactEmail: "ship@goldcoastexpress.co.uk",
    website: "www.goldcoastexpress.co.uk",
  },
  {
    name: "Adinkra Financial Services",
    category: "Finance",
    description: "Accounting, tax advisory, and financial planning for individuals and businesses. Specialists in UK-Ghana cross-border finance.",
    location: "Canary Wharf, London",
    image: "gradient-finance",
    rating: 4.8,
    featured: false,
    contactPhone: "+44 20 7946 1345",
    contactEmail: "advice@adinkrafinance.co.uk",
    website: "www.adinkrafinance.co.uk",
  },
  {
    name: "TechGhana Ltd",
    category: "Technology",
    description: "Software development, IT consulting, and digital transformation. Building bridges between UK tech and Ghana's growing startup scene.",
    location: "Shoreditch, London",
    image: "gradient-tech",
    rating: 4.6,
    featured: true,
    contactPhone: "+44 20 7946 1678",
    contactEmail: "hello@techghana.co.uk",
    website: "www.techghana.co.uk",
  },
  {
    name: "Nana's Beauty Lounge",
    category: "Beauty",
    description: "Full-service beauty salon. Braiding, weaves, makeup, and skincare. Bridal packages available.",
    location: "Peckham, London",
    image: "gradient-beauty",
    rating: 4.9,
    featured: false,
    contactPhone: "+44 20 7946 1901",
    contactEmail: "appointments@nanasbeauty.co.uk",
    website: "www.nanasbeauty.co.uk",
  },
  {
    name: "Osu Market Foods",
    category: "Food & Drink",
    description: "Ghanaian grocery store stocking fresh yam, plantain, palm oil, and imported goods direct from Accra.",
    location: "Lewisham, London",
    image: "gradient-food",
    rating: 4.4,
    featured: false,
    contactPhone: "+44 20 7946 2234",
    contactEmail: "orders@osumarket.co.uk",
    website: "www.osumarket.co.uk",
  },
  {
    name: "Cape Coast Properties",
    category: "Property",
    description: "Estate agents specialising in rentals and purchases for the Ghanaian community. UK and Ghana property portfolios.",
    location: "Croydon, London",
    image: "gradient-property",
    rating: 4.3,
    featured: false,
    contactPhone: "+44 20 7946 2567",
    contactEmail: "lettings@capecoastproperties.co.uk",
    website: "www.capecoastproperties.co.uk",
  },
  {
    name: "Kwaku Health & Wellness",
    category: "Health",
    description: "Private GP practice and wellness clinic. Health screenings, travel vaccinations, and holistic care for the diaspora community.",
    location: "Woolwich, London",
    image: "gradient-health",
    rating: 4.7,
    featured: false,
    contactPhone: "+44 20 7946 2890",
    contactEmail: "clinic@kwakuhealth.co.uk",
    website: "www.kwakuhealth.co.uk",
  },
  {
    name: "Sankofa Education Hub",
    category: "Education",
    description: "Tutoring, exam prep, and career coaching. GCSE, A-Level, and university application support for Ghanaian families.",
    location: "Hackney, London",
    image: "gradient-education",
    rating: 4.8,
    featured: false,
    contactPhone: "+44 20 7946 3123",
    contactEmail: "learn@sankofaeducation.co.uk",
    website: "www.sankofaeducation.co.uk",
  },
  {
    name: "Elmina Travel & Tours",
    category: "Travel",
    description: "Flight bookings, holiday packages, and visa assistance. Specialists in UK-Ghana travel with competitive rates.",
    location: "Seven Sisters, London",
    image: "gradient-travel",
    rating: 4.5,
    featured: false,
    contactPhone: "+44 20 7946 3456",
    contactEmail: "book@elminatravel.co.uk",
    website: "www.elminatravel.co.uk",
  },
  {
    name: "Kejetia Fashion House",
    category: "Fashion",
    description: "Bespoke African fashion. Kente cloth, formal wear, and contemporary African designs for all occasions.",
    location: "Brixton, London",
    image: "gradient-fashion",
    rating: 4.6,
    featured: false,
    contactPhone: "+44 20 7946 3789",
    contactEmail: "style@kejetiafashion.co.uk",
    website: "www.kejetiafashion.co.uk",
  },
  {
    name: "Ho Chop Bar",
    category: "Food & Drink",
    description: "Traditional Ghanaian chop bar experience in East London. Fufu, kenkey, waakye, and palm wine. Live highlife music on weekends.",
    location: "Barking, London",
    image: "gradient-food",
    rating: 4.7,
    featured: false,
    contactPhone: "+44 20 7946 4012",
    contactEmail: "eat@hochopbar.co.uk",
    website: "www.hochopbar.co.uk",
  },
  {
    name: "Ashesi Insurance Brokers",
    category: "Finance",
    description: "Insurance solutions for individuals and businesses. Home, motor, business, and specialist diaspora cover.",
    location: "Manchester",
    image: "gradient-finance",
    rating: 4.4,
    featured: false,
    contactPhone: "+44 161 946 5678",
    contactEmail: "cover@ashesiinsurance.co.uk",
    website: "www.ashesiinsurance.co.uk",
  },
  {
    name: "Tema Auto Services",
    category: "Transport",
    description: "MOT, servicing, and repairs. Specialising in vehicle exports to Ghana. Competitive rates for the community.",
    location: "Birmingham",
    image: "gradient-transport",
    rating: 4.3,
    featured: false,
    contactPhone: "+44 121 946 6789",
    contactEmail: "service@temaauto.co.uk",
    website: "www.temaauto.co.uk",
  },
  {
    name: "Labadi Events & Decor",
    category: "Events",
    description: "Event planning, decoration, and coordination. Weddings, naming ceremonies, funerals, and corporate events.",
    location: "Croydon, London",
    image: "gradient-events",
    rating: 4.8,
    featured: false,
    contactPhone: "+44 20 7946 7890",
    contactEmail: "plan@labadievents.co.uk",
    website: "www.labadievents.co.uk",
  },
  {
    name: "Koforidua Media Group",
    category: "Technology",
    description: "Video production, photography, and social media management. Telling the stories of the Ghanaian diaspora.",
    location: "Tottenham, London",
    image: "gradient-tech",
    rating: 4.5,
    featured: false,
    contactPhone: "+44 20 7946 8901",
    contactEmail: "create@koforiduamedia.co.uk",
    website: "www.koforiduamedia.co.uk",
  },
  {
    name: "Volta Cleaning Services",
    category: "Services",
    description: "Commercial and residential cleaning. End-of-tenancy, deep cleans, and regular maintenance contracts.",
    location: "Greenwich, London",
    image: "gradient-services",
    rating: 4.2,
    featured: false,
    contactPhone: "+44 20 7946 9012",
    contactEmail: "clean@voltaservices.co.uk",
    website: "www.voltaservices.co.uk",
  },
  {
    name: "Dzorwulu Pharmacy",
    category: "Health",
    description: "Community pharmacy with Ghanaian herbal supplements. NHS prescriptions, health checks, and wellness advice.",
    location: "Dalston, London",
    image: "gradient-health",
    rating: 4.6,
    featured: false,
    contactPhone: "+44 20 7946 0234",
    contactEmail: "health@dzorwulupharmacy.co.uk",
    website: "www.dzorwulupharmacy.co.uk",
  },
];

export const jobsSeed = [
  {
    title: "Senior Software Developer",
    company: "TechGhana Ltd",
    location: "Shoreditch, London (Hybrid)",
    type: "Full-time",
    description: "Join our growing team building digital solutions for the African diaspora market. You'll lead frontend development using React and Next.js, mentoring junior developers and shaping our technical direction.",
    requirements: ["5+ years React/Next.js experience", "TypeScript proficiency", "Experience with real-time databases", "Strong communication skills"],
    salary: "£65,000 - £80,000",
    postedDate: "2026-03-18",
    featured: true,
  },
  {
    title: "Immigration Solicitor",
    company: "Asante Legal Partners",
    location: "Stratford, London",
    type: "Full-time",
    description: "Experienced immigration solicitor to join our growing practice. You'll handle visa applications, asylum cases, and settlement matters, with a focus on serving the Ghanaian and West African communities.",
    requirements: ["Qualified solicitor (3+ years PQE)", "OISC Level 3 or SRA regulated", "Fluent in English (Twi/Ga an advantage)", "Strong client-facing skills"],
    salary: "£45,000 - £60,000",
    postedDate: "2026-03-15",
    featured: true,
  },
  {
    title: "Head Chef — Ghanaian Cuisine",
    company: "Accra Kitchen",
    location: "Brixton, London",
    type: "Full-time",
    description: "Lead our kitchen team preparing authentic Ghanaian dishes. Must have deep knowledge of Ghanaian cooking traditions and experience managing a busy restaurant kitchen.",
    requirements: ["5+ years as head chef or sous chef", "Expert in Ghanaian cuisine", "Food hygiene Level 3", "Team leadership experience"],
    salary: "£35,000 - £42,000",
    postedDate: "2026-03-19",
    featured: false,
  },
  {
    title: "Marketing Coordinator",
    company: "GoldCoast Express Logistics",
    location: "Elephant & Castle, London",
    type: "Full-time",
    description: "Drive our marketing strategy across the UK Ghanaian community. Manage social media, community partnerships, and brand campaigns to grow our shipping and logistics customer base.",
    requirements: ["2+ years marketing experience", "Strong social media skills", "Knowledge of the Ghanaian diaspora market", "Creative and data-driven"],
    salary: "£30,000 - £38,000",
    postedDate: "2026-03-17",
    featured: false,
  },
  {
    title: "Accountant",
    company: "Adinkra Financial Services",
    location: "Canary Wharf, London",
    type: "Full-time",
    description: "Manage client portfolios including tax returns, bookkeeping, and financial statements. Specialism in UK-Ghana cross-border taxation is a strong advantage.",
    requirements: ["ACCA/ACA qualified", "3+ years practice experience", "Knowledge of HMRC regulations", "Experience with Xero/QuickBooks"],
    salary: "£40,000 - £55,000",
    postedDate: "2026-03-14",
    featured: true,
  },
  {
    title: "Freelance Videographer",
    company: "Koforidua Media Group",
    location: "London (Various locations)",
    type: "Contract",
    description: "Capture events, interviews, and promotional content for our clients across London. Must have own equipment and a strong portfolio of event and documentary work.",
    requirements: ["Professional camera equipment", "Editing skills (Premiere/DaVinci)", "Portfolio of event coverage", "Reliable transport"],
    salary: "£250 - £400 per day",
    postedDate: "2026-03-20",
    featured: false,
  },
  {
    title: "Part-time Sales Assistant",
    company: "Osu Market Foods",
    location: "Lewisham, London",
    type: "Part-time",
    description: "Help our customers find the best Ghanaian ingredients. Weekend shifts available. Knowledge of Ghanaian food products is essential.",
    requirements: ["Customer service experience", "Knowledge of Ghanaian food products", "Weekend availability", "Conversational Twi preferred"],
    salary: "£12.50/hour",
    postedDate: "2026-03-16",
    featured: false,
  },
  {
    title: "Event Coordinator",
    company: "Labadi Events & Decor",
    location: "Croydon, London",
    type: "Contract",
    description: "Coordinate and manage events from planning to execution. Ghanaian weddings, naming ceremonies, and community celebrations. Must be detail-oriented and work well under pressure.",
    requirements: ["2+ years event coordination", "Strong organisational skills", "Understanding of Ghanaian cultural events", "Flexible schedule including weekends"],
    salary: "£28,000 - £35,000",
    postedDate: "2026-03-13",
    featured: false,
  },
  {
    title: "Web Developer (Intern)",
    company: "TechGhana Ltd",
    location: "Shoreditch, London (Hybrid)",
    type: "Part-time",
    description: "3-month paid internship for a Ghanaian student or recent graduate. Learn React, TypeScript, and modern web development while contributing to real projects.",
    requirements: ["Currently studying CS or related field", "Basic HTML/CSS/JavaScript", "Enthusiasm to learn", "Right to work in UK"],
    salary: "£15/hour",
    postedDate: "2026-03-20",
    featured: false,
  },
  {
    title: "Delivery Driver",
    company: "GoldCoast Express Logistics",
    location: "London & South East",
    type: "Full-time",
    description: "Join our delivery team handling packages and cargo across London and the South East. Clean driving licence required. Knowledge of London roads is a plus.",
    requirements: ["Full UK driving licence", "Own vehicle (van preferred)", "Good knowledge of London", "Right to work in UK"],
    salary: "£28,000 - £32,000",
    postedDate: "2026-03-11",
    featured: false,
  },
];

export const eventsSeed = [
  {
    title: "Ghana Independence Day Gala 2026",
    description: "Celebrate Ghana's 69th Independence Day with an evening of music, dance, speeches, and networking. Traditional Ghanaian attire encouraged. Keynote by the Ghana High Commissioner.",
    date: "2026-04-05",
    time: "18:00",
    location: "The Barbican Centre, London",
    organizer: "Ghana UK Association",
    image: "gradient-cultural",
    category: "Cultural",
  },
  {
    title: "Ghanaian Business Networking Evening",
    description: "Monthly networking event for Ghanaian entrepreneurs and professionals. Pitch your business, find collaborators, and grow your network. Light refreshments and drinks provided.",
    date: "2026-04-12",
    time: "18:30",
    location: "WeWork Moorgate, London",
    organizer: "GhanaConnect",
    image: "gradient-professional",
    category: "Professional",
  },
  {
    title: "Financial Literacy Workshop",
    description: "Free workshop covering savings, investments, UK-Ghana remittances, and property buying. Presented by Adinkra Financial Services. Open to all members of the Ghanaian community.",
    date: "2026-04-19",
    time: "10:00",
    location: "Hackney Community Centre, London",
    organizer: "Adinkra Financial Services",
    image: "gradient-workshop",
    category: "Workshop",
  },
  {
    title: "Ghana Food Festival",
    description: "A celebration of Ghanaian cuisine! Featuring 15+ food vendors, live cooking demonstrations, highlife music, and cultural performances. Family-friendly event.",
    date: "2026-05-03",
    time: "12:00",
    location: "Brockwell Park, Brixton, London",
    organizer: "Taste of Ghana UK",
    image: "gradient-cultural",
    category: "Cultural",
  },
  {
    title: "Tech Careers for Young Ghanaians",
    description: "A panel discussion and workshop for Ghanaian students and young professionals interested in UK tech careers. Hear from successful Ghanaian tech professionals and get practical career advice.",
    date: "2026-04-26",
    time: "14:00",
    location: "Google Academy, London",
    organizer: "TechGhana Ltd & Sankofa Education Hub",
    image: "gradient-professional",
    category: "Workshop",
  },
];

export const categoriesSeed = [
  { name: "Food & Drink", icon: "UtensilsCrossed", type: "business", count: 3 },
  { name: "Legal", icon: "Scale", type: "business", count: 1 },
  { name: "Beauty", icon: "Sparkles", type: "business", count: 2 },
  { name: "Transport", icon: "Truck", type: "business", count: 2 },
  { name: "Finance", icon: "PiggyBank", type: "business", count: 2 },
  { name: "Technology", icon: "Monitor", type: "business", count: 2 },
  { name: "Health", icon: "Heart", type: "business", count: 2 },
  { name: "Education", icon: "GraduationCap", type: "business", count: 1 },
];
```

- [ ] **Step 5: Create seed mutation**

Create `convex/seed.ts`:

```ts
import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Import seed data inline to avoid bundling issues
    const { businessesSeed, jobsSeed, eventsSeed, categoriesSeed } = await import("./seedData");

    // Clear existing data
    const existingBusinesses = await ctx.db.query("businesses").collect();
    for (const b of existingBusinesses) await ctx.db.delete(b._id);

    const existingJobs = await ctx.db.query("jobs").collect();
    for (const j of existingJobs) await ctx.db.delete(j._id);

    const existingEvents = await ctx.db.query("events").collect();
    for (const e of existingEvents) await ctx.db.delete(e._id);

    const existingCategories = await ctx.db.query("categories").collect();
    for (const c of existingCategories) await ctx.db.delete(c._id);

    // Insert seed data
    for (const business of businessesSeed) await ctx.db.insert("businesses", business);
    for (const job of jobsSeed) await ctx.db.insert("jobs", job);
    for (const event of eventsSeed) await ctx.db.insert("events", event);
    for (const category of categoriesSeed) await ctx.db.insert("categories", category);
  },
});
```

- [ ] **Step 6: Run Convex dev and seed the database**

```bash
npx convex dev --once
```

Then seed via the Convex dashboard or a one-time script. From the Convex dashboard, run the `seed:seedAll` mutation.

- [ ] **Step 7: Verify queries work**

Run `npx convex dev` and check the Convex dashboard to confirm all collections are populated with the expected counts: 20 businesses, 10 jobs, 5 events, 8 categories.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add Convex schema, queries, and realistic seed data for Ghanaian diaspora businesses, jobs, and events"
```

---

## Task 3: Shared Components

**Files:**
- Create: `ghconnect/components/KenteStrip.tsx`
- Create: `ghconnect/components/GradientHero.tsx`
- Create: `ghconnect/components/CategoryPill.tsx`
- Create: `ghconnect/components/FeedCard.tsx`
- Create: `ghconnect/components/AnimatedCounter.tsx`
- Create: `ghconnect/components/StreamingText.tsx`
- Create: `ghconnect/components/BottomTabBar.tsx`
- Create: `ghconnect/lib/gradients.ts`

- [ ] **Step 1: Create gradient map**

Create `lib/gradients.ts`:

```ts
export const gradientMap: Record<string, { from: string; to: string }> = {
  "gradient-food": { from: "#CE1126", to: "#FCD116" },
  "gradient-legal": { from: "#006B3F", to: "#0d4a2e" },
  "gradient-beauty": { from: "#9333ea", to: "#CE1126" },
  "gradient-transport": { from: "#1e40af", to: "#006B3F" },
  "gradient-finance": { from: "#FCD116", to: "#f59e0b" },
  "gradient-tech": { from: "#06b6d4", to: "#006B3F" },
  "gradient-property": { from: "#78350f", to: "#FCD116" },
  "gradient-health": { from: "#CE1126", to: "#f87171" },
  "gradient-education": { from: "#006B3F", to: "#FCD116" },
  "gradient-travel": { from: "#0ea5e9", to: "#006B3F" },
  "gradient-fashion": { from: "#CE1126", to: "#9333ea" },
  "gradient-events": { from: "#FCD116", to: "#CE1126" },
  "gradient-services": { from: "#475569", to: "#006B3F" },
  "gradient-cultural": { from: "#CE1126", to: "#FCD116" },
  "gradient-professional": { from: "#006B3F", to: "#111827" },
  "gradient-workshop": { from: "#FCD116", to: "#006B3F" },
};

export function getGradientStyle(image: string) {
  const gradient = gradientMap[image] ?? { from: "#006B3F", to: "#FCD116" };
  return {
    background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
  };
}
```

- [ ] **Step 2: Create KenteStrip component**

Create `components/KenteStrip.tsx`:

```tsx
export function KenteStrip({ className = "" }: { className?: string }) {
  return <div className={`kente-strip h-1.5 w-full ${className}`} />;
}
```

- [ ] **Step 3: Create GradientHero component**

Create `components/GradientHero.tsx`:

```tsx
import { getGradientStyle } from "@/lib/gradients";

interface GradientHeroProps {
  image: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function GradientHero({ image, icon, className = "", children }: GradientHeroProps) {
  return (
    <div
      className={`flex items-center justify-center relative ${className}`}
      style={getGradientStyle(image)}
    >
      <div className="text-white/80">{icon}</div>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create CategoryPill component**

Create `components/CategoryPill.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

interface CategoryPillProps {
  name: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ name, icon, active = false, onClick }: CategoryPillProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
        active
          ? "bg-kente-gold text-onyx"
          : "bg-gold-mist text-kente-gold/70 border border-gold-border"
      }`}
    >
      {icon}
      {name}
    </motion.button>
  );
}
```

- [ ] **Step 5: Create FeedCard component**

Create `components/FeedCard.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getGradientStyle } from "@/lib/gradients";

interface FeedCardProps {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  href: string;
  featured?: boolean;
  index?: number;
}

export function FeedCard({ title, subtitle, badge, image, href, featured = false, index = 0 }: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={href} className="block">
        <div className={`bg-surface rounded-2xl overflow-hidden border ${featured ? "border-kente-gold/30" : "border-white/5"}`}>
          <div className="flex items-center gap-3 p-3">
            <div
              className="w-12 h-12 rounded-xl shrink-0"
              style={getGradientStyle(image)}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white/90 truncate">{title}</p>
              <p className="text-xs text-white/40 truncate">{subtitle}</p>
            </div>
            <span className="text-[10px] font-medium text-kente-gold/60 bg-gold-mist px-2 py-1 rounded-full shrink-0">
              {badge}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 6: Create AnimatedCounter component**

Create `components/AnimatedCounter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({ target, suffix = "", prefix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}
```

- [ ] **Step 7: Create StreamingText component**

Create `components/StreamingText.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

interface StreamingTextProps {
  lines: string[];
  delayBetweenLines?: number;
  charSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

export function StreamingText({
  lines,
  delayBetweenLines = 0.8,
  charSpeed = 0.03,
  onComplete,
  className = "",
}: StreamingTextProps) {
  let totalDelay = 0;

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => {
        const lineStartDelay = totalDelay;
        totalDelay += line.length * charSpeed + delayBetweenLines;

        const isLast = lineIndex === lines.length - 1;

        return (
          <div key={lineIndex} className="overflow-hidden">
            <motion.p
              className="font-display text-2xl md:text-3xl font-bold text-white leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: lineStartDelay, duration: 0.01 }}
            >
              {line.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: lineStartDelay + charIndex * charSpeed }}
                  onAnimationComplete={
                    isLast && charIndex === line.length - 1 ? onComplete : undefined
                  }
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 8: Create BottomTabBar component**

Create `components/BottomTabBar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Store, Briefcase, User } from "lucide-react";

const tabs = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Explore", icon: Search, href: "/explore" },
  { label: "Directory", icon: Store, href: "/directory" },
  { label: "Jobs", icon: Briefcase, href: "/jobs" },
  { label: "More", icon: User, href: "/vision" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-lg border-t border-gold-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(({ label, icon: Icon, href }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                active ? "text-kente-gold" : "text-white/35"
              }`}
            >
              <Icon size={20} className={active ? "drop-shadow-[0_0_6px_rgba(252,209,22,0.4)]" : ""} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 9: Verify components render**

Create a temporary test page or import one component into the placeholder page to verify Motion animations and Lucide icons render correctly. Run `npm run dev` and confirm no import errors.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: add shared components — BottomTabBar, FeedCard, StreamingText, AnimatedCounter, KenteStrip, GradientHero, CategoryPill"
```

---

## Task 4: Splash / Onboarding Screen

**Files:**
- Modify: `ghconnect/app/page.tsx`

- [ ] **Step 1: Build the splash/onboarding page**

Replace `app/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { StreamingText } from "@/components/StreamingText";
import { KenteStrip } from "@/components/KenteStrip";

const lines = [
  "120,000+ Ghanaians in the UK...",
  "...thousands of businesses...",
  "...one platform to connect them all.",
];

export default function SplashPage() {
  const [textDone, setTextDone] = useState(false);
  const router = useRouter();

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Kente background pattern */}
      <div className="kente-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center">
        <StreamingText
          lines={lines}
          onComplete={() => setTextDone(true)}
          className="mb-12 text-left"
        />

        <AnimatePresence>
          {textDone && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-2"
              >
                <KenteStrip className="mb-6 mx-auto max-w-[200px] rounded-full" />
                <h1 className="font-display text-5xl font-extrabold text-white">
                  Ghana<span className="text-kente-gold">Connect</span>
                </h1>
                <p className="text-sm text-white/35 tracking-[4px] uppercase mt-2">
                  UK & Ireland
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                className="mt-10"
              >
                <button
                  onClick={() => router.push("/home")}
                  className="bg-kente-gold text-onyx font-semibold text-base px-8 py-4 rounded-full shadow-[0_0_30px_rgba(252,209,22,0.3)] hover:shadow-[0_0_40px_rgba(252,209,22,0.5)] transition-shadow"
                >
                  Explore GhanaConnect
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test the splash flow**

Run: `npm run dev`
Expected: Page loads with streaming text animation → logo fades in → CTA slides up from bottom. Clicking CTA navigates to `/home`.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add splash/onboarding screen with streaming text animation and logo reveal"
```

---

## Task 5: Home Dashboard

**Files:**
- Create: `ghconnect/app/home/page.tsx`
- Create: `ghconnect/app/home/layout.tsx`

- [ ] **Step 1: Create home layout with BottomTabBar**

Create `app/home/layout.tsx` (this layout will be shared by all tab screens):

Actually, it's cleaner to add the BottomTabBar at a shared layout level. Create a route group for all tabbed pages.

Create `app/(tabs)/layout.tsx`:

```tsx
import { BottomTabBar } from "@/components/BottomTabBar";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="pb-20">{children}</main>
      <BottomTabBar />
    </>
  );
}
```

Then move all tabbed routes under `app/(tabs)/`:
- `app/(tabs)/home/page.tsx`
- `app/(tabs)/directory/page.tsx`
- `app/(tabs)/directory/[id]/page.tsx`
- `app/(tabs)/jobs/page.tsx`
- `app/(tabs)/jobs/[id]/page.tsx`
- `app/(tabs)/community/page.tsx`
- `app/(tabs)/vision/page.tsx`

The splash page stays at `app/page.tsx` (no tab bar).

- [ ] **Step 2: Create home dashboard page**

Create `app/(tabs)/home/page.tsx`:

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { motion } from "motion/react";
import { Store, Briefcase, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { FeedCard } from "@/components/FeedCard";
import { KenteStrip } from "@/components/KenteStrip";

const quickActions = [
  { label: "Businesses", icon: Store, href: "/directory", color: "text-forest" },
  { label: "Jobs", icon: Briefcase, href: "/jobs", color: "text-kente-gold" },
  { label: "Events", icon: Calendar, href: "/community", color: "text-ashanti-red" },
  { label: "Network", icon: Users, href: "/vision", color: "text-kente-gold" },
];

export default function HomePage() {
  const featuredBusinesses = useQuery(api.businesses.featured);
  const featuredJobs = useQuery(api.jobs.featured);
  const events = useQuery(api.events.list);

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-bold text-white">
          Ghana<span className="text-kente-gold">Connect</span>
        </h1>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ashanti-red to-kente-gold" />
      </div>

      {/* Welcome */}
      <p className="text-xs text-white/40 mb-0.5">Welcome to</p>
      <h2 className="font-display text-2xl font-bold text-white mb-5">GhanaConnect</h2>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {quickActions.map(({ label, icon: Icon, href, color }) => (
          <Link key={href} href={href}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-gold-mist border border-gold-border rounded-2xl p-3 flex flex-col items-center gap-1.5"
            >
              <Icon size={20} className={color} />
              <span className="text-[10px] text-white/50 font-medium">{label}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      <KenteStrip className="mb-6 rounded-full" />

      {/* Trending */}
      <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-3">
        Trending in Community
      </p>

      <div className="flex flex-col gap-2">
        {featuredBusinesses?.map((b, i) => (
          <FeedCard
            key={b._id}
            title={b.name}
            subtitle={`${b.category} · ${b.location}`}
            badge="Business"
            image={b.image}
            href={`/directory/${b._id}`}
            featured={b.featured}
            index={i}
          />
        ))}
        {featuredJobs?.map((j, i) => (
          <FeedCard
            key={j._id}
            title={j.title}
            subtitle={`${j.company} · ${j.location}`}
            badge="Job"
            image="gradient-tech"
            href={`/jobs/${j._id}`}
            featured={j.featured}
            index={(featuredBusinesses?.length ?? 0) + i}
          />
        ))}
        {events?.slice(0, 2).map((e, i) => (
          <FeedCard
            key={e._id}
            title={e.title}
            subtitle={`${new Date(e.date).toLocaleDateString("en-GB", { month: "short", day: "numeric" })} · ${e.location}`}
            badge="Event"
            image={e.image}
            href="/community"
            index={(featuredBusinesses?.length ?? 0) + (featuredJobs?.length ?? 0) + i}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Test home dashboard**

Run: `npm run dev`, navigate to `/home`
Expected: Quick actions visible, feed cards populated from Convex with staggered entrance animation. Tab bar visible at bottom. All links navigate to correct routes.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add home dashboard with quick actions, trending feed, and tab bar layout"
```

---

## Task 6: Business Directory & Detail

**Files:**
- Create: `ghconnect/app/(tabs)/directory/page.tsx`
- Create: `ghconnect/app/(tabs)/directory/[id]/page.tsx`

- [ ] **Step 1: Build directory listing page**

Create `app/(tabs)/directory/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { CategoryPill } from "@/components/CategoryPill";
import { FeedCard } from "@/components/FeedCard";
import { KenteStrip } from "@/components/KenteStrip";
import * as LucideIcons from "lucide-react";

export default function DirectoryPage() {
  const businesses = useQuery(api.businesses.list);
  const categories = useQuery(api.categories.byType, { type: "business" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = businesses?.filter((b) => {
    const matchesCategory = !activeCategory || b.category === activeCategory;
    const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-white mb-4">Business Directory</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search businesses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-gold-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-kente-gold/40"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        <CategoryPill
          name="All"
          icon={<></>}
          active={!activeCategory}
          onClick={() => setActiveCategory(null)}
        />
        {categories?.map((cat) => {
          const IconComponent = (LucideIcons as any)[cat.icon] || LucideIcons.Tag;
          return (
            <CategoryPill
              key={cat._id}
              name={cat.name}
              icon={<IconComponent size={14} />}
              active={activeCategory === cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            />
          );
        })}
      </div>

      <KenteStrip className="mb-4 rounded-full" />

      {/* Results */}
      <p className="text-xs text-white/30 mb-3">{filtered?.length ?? 0} businesses</p>

      <div className="flex flex-col gap-2">
        {filtered?.map((b, i) => (
          <FeedCard
            key={b._id}
            title={b.name}
            subtitle={`${b.location} · ★ ${b.rating}`}
            badge={b.category}
            image={b.image}
            href={`/directory/${b._id}`}
            featured={b.featured}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build business detail page**

Create `app/(tabs)/directory/[id]/page.tsx`:

```tsx
"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Globe, ArrowLeft, Share2, Bookmark, Star } from "lucide-react";
import Link from "next/link";
import { GradientHero } from "@/components/GradientHero";
import { KenteStrip } from "@/components/KenteStrip";
import * as LucideIcons from "lucide-react";

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const business = useQuery(api.businesses.getById, { id: id as Id<"businesses"> });

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-kente-gold/30 border-t-kente-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto"
    >
      {/* Hero */}
      <GradientHero
        image={business.image}
        icon={<LucideIcons.Store size={48} />}
        className="h-48 relative"
      >
        <Link href="/directory" className="absolute top-4 left-4 bg-black/40 backdrop-blur-lg rounded-full p-2">
          <ArrowLeft size={20} className="text-white" />
        </Link>
      </GradientHero>

      <KenteStrip />

      <div className="px-4 py-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">{business.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-forest/20 text-forest px-2 py-0.5 rounded-full">{business.category}</span>
              <span className="text-xs text-kente-gold flex items-center gap-1">
                <Star size={12} fill="currentColor" /> {business.rating}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gold-mist border border-gold-border rounded-full p-2">
              <Share2 size={16} className="text-kente-gold" />
            </button>
            <button className="bg-gold-mist border border-gold-border rounded-full p-2">
              <Bookmark size={16} className="text-kente-gold" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
          <MapPin size={14} />
          <span>{business.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed mb-6">{business.description}</p>

        {/* Contact */}
        <h3 className="font-display text-sm font-semibold text-kente-gold mb-3">Contact</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <Phone size={14} className="text-kente-gold/60" />
            <span>{business.contactPhone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <Mail size={14} className="text-kente-gold/60" />
            <span>{business.contactEmail}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <Globe size={14} className="text-kente-gold/60" />
            <span>{business.website}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Test directory flow**

Run: `npm run dev`, navigate to `/directory`
Expected: Search bar filters businesses. Category pills filter by type. Tapping a card navigates to detail view with gradient hero, business info, and contact details. Back arrow returns to directory.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add business directory with search, category filters, and detail view"
```

---

## Task 7: Job Board & Detail

**Files:**
- Create: `ghconnect/app/(tabs)/jobs/page.tsx`
- Create: `ghconnect/app/(tabs)/jobs/[id]/page.tsx`

- [ ] **Step 1: Build job board listing**

Create `app/(tabs)/jobs/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { motion } from "motion/react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { KenteStrip } from "@/components/KenteStrip";

const typeFilters = ["All", "Full-time", "Part-time", "Contract"];

export default function JobsPage() {
  const jobs = useQuery(api.jobs.list);
  const [activeType, setActiveType] = useState("All");

  const filtered = jobs?.filter((j) => activeType === "All" || j.type === activeType);

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-white mb-4">Opportunities</h1>

      {/* Type filters */}
      <div className="flex gap-2 mb-4">
        {typeFilters.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeType === type
                ? "bg-kente-gold text-onyx"
                : "bg-gold-mist text-kente-gold/70 border border-gold-border"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <KenteStrip className="mb-4 rounded-full" />

      <p className="text-xs text-white/30 mb-3">{filtered?.length ?? 0} opportunities</p>

      <div className="flex flex-col gap-3">
        {filtered?.map((job, i) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/jobs/${job._id}`}>
              <div className={`bg-surface rounded-2xl p-4 border ${job.featured ? "border-kente-gold/30" : "border-white/5"}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white/90">{job.title}</h3>
                    <p className="text-xs text-white/40">{job.company}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                    job.type === "Full-time" ? "bg-forest/20 text-forest" :
                    job.type === "Part-time" ? "bg-kente-gold/10 text-kente-gold" :
                    "bg-ashanti-red/10 text-ashanti-red"
                  }`}>
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={12} />{job.salary}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build job detail page**

Create `app/(tabs)/jobs/[id]/page.tsx`:

```tsx
"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { KenteStrip } from "@/components/KenteStrip";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const job = useQuery(api.jobs.getById, { id: id as Id<"jobs"> });

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-kente-gold/30 border-t-kente-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto px-4 pt-4"
    >
      {/* Back */}
      <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-white/40 mb-4">
        <ArrowLeft size={16} /> Back to jobs
      </Link>

      {/* Header */}
      <div className="mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-forest to-kente-gold rounded-xl flex items-center justify-center mb-3">
          <Briefcase size={24} className="text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{job.title}</h1>
        <p className="text-sm text-kente-gold/70">{job.company}</p>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="flex items-center gap-1 text-xs text-white/40"><MapPin size={12} />{job.location}</span>
        <span className="flex items-center gap-1 text-xs text-white/40"><Briefcase size={12} />{job.type}</span>
        <span className="flex items-center gap-1 text-xs text-white/40"><Clock size={12} />Posted {new Date(job.postedDate).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}</span>
      </div>

      <div className="bg-gold-mist border border-gold-border rounded-xl px-4 py-3 mb-6">
        <p className="text-sm font-semibold text-kente-gold">{job.salary}</p>
      </div>

      <KenteStrip className="mb-6 rounded-full" />

      {/* Description */}
      <h3 className="font-display text-sm font-semibold text-kente-gold mb-2">About the Role</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-6">{job.description}</p>

      {/* Requirements */}
      <h3 className="font-display text-sm font-semibold text-kente-gold mb-2">Requirements</h3>
      <ul className="flex flex-col gap-2 mb-8">
        {job.requirements.map((req, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/55">
            <CheckCircle size={14} className="text-forest mt-0.5 shrink-0" />
            {req}
          </li>
        ))}
      </ul>

      {/* Apply CTA */}
      <button className="w-full bg-kente-gold text-onyx font-semibold py-4 rounded-full shadow-[0_0_30px_rgba(252,209,22,0.2)] mb-4">
        Apply Now
      </button>
    </motion.div>
  );
}
```

- [ ] **Step 3: Test job board flow**

Run: `npm run dev`, navigate to `/jobs`
Expected: Type filter tabs work. Job cards show with staggered animation. Tapping a card navigates to detail with full description, requirements, and apply CTA. Back link returns to listing.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add job board with type filters, listings, and detail view"
```

---

## Task 8: Community & Events Screen

**Files:**
- Create: `ghconnect/app/(tabs)/community/page.tsx`

- [ ] **Step 1: Build community/events page**

Create `app/(tabs)/community/page.tsx`:

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { motion } from "motion/react";
import { Calendar, MapPin, Users } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { GradientHero } from "@/components/GradientHero";

export default function CommunityPage() {
  const events = useQuery(api.events.list);

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-white mb-1">Community</h1>
      <p className="text-xs text-white/35 mb-5">Events & happenings in the diaspora</p>

      <KenteStrip className="mb-5 rounded-full" />

      <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-3">
        Upcoming Events
      </p>

      <div className="flex flex-col gap-4">
        {events?.map((event, i) => {
          const date = new Date(event.date);
          return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-surface rounded-2xl overflow-hidden border border-white/5"
            >
              <GradientHero
                image={event.image}
                icon={<Calendar size={32} />}
                className="h-32"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    event.category === "Cultural" ? "bg-ashanti-red/15 text-ashanti-red" :
                    event.category === "Professional" ? "bg-forest/15 text-forest" :
                    "bg-kente-gold/10 text-kente-gold"
                  }`}>
                    {event.category}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed mb-3 line-clamp-2">{event.description}</p>
                <div className="flex flex-col gap-1.5 text-xs text-white/35">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-kente-gold/50" />
                    {date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-kente-gold/50" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} className="text-kente-gold/50" />
                    {event.organizer}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test community page**

Run: `npm run dev`, navigate to `/community`
Expected: Events render with gradient heroes, category badges, date/location/organizer details. Staggered entrance animation.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add community & events page with event cards and category badges"
```

---

## Task 9: Vision / Partnership Screen

**Files:**
- Create: `ghconnect/app/(tabs)/vision/page.tsx`

- [ ] **Step 1: Build the vision/partnership page**

Create `app/(tabs)/vision/page.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { KenteStrip } from "@/components/KenteStrip";
import { Users, Store, Briefcase, Globe, Award, Handshake, Building, UserCheck } from "lucide-react";

const stats = [
  { icon: Users, label: "Ghanaians in the UK & Ireland", target: 120000, suffix: "+" },
  { icon: Store, label: "Businesses Ready to Connect", target: 2400, suffix: "+" },
  { icon: Briefcase, label: "Job Opportunities", target: 850, suffix: "+" },
];

const phases = [
  { phase: "Phase 1", title: "United Kingdom", status: "active", description: "Launch across major UK cities — London, Birmingham, Manchester, Leeds" },
  { phase: "Phase 2", title: "Ireland", status: "next", description: "Expand to Dublin and the growing Ghanaian community in Ireland" },
  { phase: "Phase 3", title: "Global", status: "future", description: "Scale to USA, Canada, Europe, and Australia — connecting the global Ghanaian diaspora" },
];

const partnerships = [
  { icon: Award, title: "Official Endorsement", description: "Lend credibility and trust to the platform with government backing" },
  { icon: Building, title: "Funding Connections", description: "Connect with Ghana Investment Promotion Centre and diaspora funding bodies" },
  { icon: Handshake, title: "Formal Partnership", description: "The High Commission becomes an official partner and advisor" },
  { icon: UserCheck, title: "Advisory Role", description: "Shape the platform's direction to serve the community's real needs" },
];

export default function VisionPage() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-1">Our Vision</p>
      <h1 className="font-display text-2xl font-bold text-white mb-2">
        The Digital Home for the Ghanaian Diaspora
      </h1>
      <p className="text-sm text-white/40 mb-6">Connecting 120,000+ Ghanaians across the UK and Ireland through one trusted platform.</p>

      <KenteStrip className="mb-6 rounded-full" />

      {/* Impact Stats */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, target, suffix }) => (
          <div key={label} className="bg-surface border border-gold-border rounded-2xl p-5 text-center">
            <Icon size={24} className="text-kente-gold mx-auto mb-2" />
            <p className="font-display text-3xl font-extrabold text-kente-gold">
              <AnimatedCounter target={target} suffix={suffix} />
            </p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Growth Roadmap */}
      <h2 className="font-display text-lg font-bold text-white mb-4">Growth Roadmap</h2>
      <div className="flex flex-col gap-3 mb-8">
        {phases.map(({ phase, title, status, description }, i) => (
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-2xl p-4 border ${
              status === "active" ? "bg-kente-gold/10 border-kente-gold/30" :
              status === "next" ? "bg-surface border-gold-border" :
              "bg-surface border-white/5"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                status === "active" ? "text-kente-gold" : "text-white/30"
              }`}>{phase}</span>
              {status === "active" && (
                <span className="text-[9px] bg-kente-gold text-onyx px-2 py-0.5 rounded-full font-semibold">CURRENT</span>
              )}
            </div>
            <h3 className="font-display text-base font-semibold text-white">{title}</h3>
            <p className="text-xs text-white/40 mt-1">{description}</p>
          </motion.div>
        ))}
      </div>

      <KenteStrip className="mb-6 rounded-full" />

      {/* Partnership Opportunities */}
      <h2 className="font-display text-lg font-bold text-white mb-4">Partnership Opportunities</h2>
      <div className="grid grid-cols-1 gap-3 mb-8">
        {partnerships.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-gold-border rounded-2xl p-4 flex items-start gap-3"
          >
            <div className="bg-gold-mist rounded-xl p-2.5 shrink-0">
              <Icon size={18} className="text-kente-gold" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-xs text-white/40 mt-0.5">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-kente-gold/10 to-forest/10 border border-kente-gold/20 rounded-2xl p-6 text-center mb-8">
        <Globe size={28} className="text-kente-gold mx-auto mb-3" />
        <h3 className="font-display text-lg font-bold text-white mb-2">Let's Build This Together</h3>
        <p className="text-xs text-white/45 mb-4">GhanaConnect is ready to become the largest digital network for Ghanaians worldwide.</p>
        <button className="bg-kente-gold text-onyx font-semibold px-8 py-3 rounded-full shadow-[0_0_30px_rgba(252,209,22,0.2)]">
          Get in Touch
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test vision page**

Run: `npm run dev`, navigate to `/vision`
Expected: Animated counters count up on scroll. Roadmap phases animate in. Partnership cards render. CTA button visible at bottom.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add vision/partnership screen with animated counters, roadmap, and partnership CTA"
```

---

## Task 10: Search Overlay (Explore Tab)

**Files:**
- Create: `ghconnect/components/SearchOverlay.tsx`
- Create: `ghconnect/app/(tabs)/explore/page.tsx`

- [ ] **Step 1: Build search overlay page**

Create `app/(tabs)/explore/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Search, X } from "lucide-react";
import { FeedCard } from "@/components/FeedCard";

export default function ExplorePage() {
  const businesses = useQuery(api.businesses.list);
  const jobs = useQuery(api.jobs.list);
  const events = useQuery(api.events.list);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();

  const matchedBusinesses = businesses?.filter(
    (b) => q && (b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.location.toLowerCase().includes(q))
  ) ?? [];

  const matchedJobs = jobs?.filter(
    (j) => q && (j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.type.toLowerCase().includes(q))
  ) ?? [];

  const matchedEvents = events?.filter(
    (e) => q && (e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.organizer.toLowerCase().includes(q))
  ) ?? [];

  const hasResults = matchedBusinesses.length + matchedJobs.length + matchedEvents.length > 0;

  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <h1 className="font-display text-2xl font-bold text-white mb-4">Explore</h1>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search businesses, jobs, events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          className="w-full bg-surface border border-gold-border rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-kente-gold/40"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X size={16} className="text-white/30" />
          </button>
        )}
      </div>

      {!search && (
        <p className="text-sm text-white/25 text-center mt-20">Start typing to search across all of GhanaConnect</p>
      )}

      {search && !hasResults && (
        <p className="text-sm text-white/25 text-center mt-20">No results found for "{search}"</p>
      )}

      {matchedBusinesses.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-2">Businesses</p>
          <div className="flex flex-col gap-2">
            {matchedBusinesses.map((b, i) => (
              <FeedCard key={b._id} title={b.name} subtitle={b.location} badge={b.category} image={b.image} href={`/directory/${b._id}`} index={i} />
            ))}
          </div>
        </div>
      )}

      {matchedJobs.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-2">Jobs</p>
          <div className="flex flex-col gap-2">
            {matchedJobs.map((j, i) => (
              <FeedCard key={j._id} title={j.title} subtitle={j.company} badge={j.type} image="gradient-tech" href={`/jobs/${j._id}`} index={i} />
            ))}
          </div>
        </div>
      )}

      {matchedEvents.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-2">Events</p>
          <div className="flex flex-col gap-2">
            {matchedEvents.map((e, i) => (
              <FeedCard key={e._id} title={e.title} subtitle={e.location} badge={e.category} image={e.image} href="/community" index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Test explore/search**

Run: `npm run dev`, tap Explore tab
Expected: Auto-focused search input. Typing filters across all three collections. Results grouped by type. Empty/no-results states show appropriate messages.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add unified explore/search page filtering across businesses, jobs, and events"
```

---

## Task 11: PWA Setup (Serwist)

**Files:**
- Create: `ghconnect/sw.ts`
- Modify: `ghconnect/next.config.ts`
- Create: `ghconnect/public/icons/icon-192.png`
- Create: `ghconnect/public/icons/icon-512.png`

- [ ] **Step 1: Create service worker source**

Create `sw.ts` at project root:

```ts
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope & typeof globalThis;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
```

- [ ] **Step 2: Configure next.config.ts with Serwist**

Update `next.config.ts`:

```ts
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "sw.ts",
  swDest: "public/sw.js",
});

export default withSerwist({
  // Next.js config
});
```

- [ ] **Step 3: Generate PWA icons**

Create simple PWA icons — a gold square with a black star. These can be generated via a quick canvas script or created as simple SVG-to-PNG. For the demo, create placeholder icons:

```bash
# Use a simple node script or manually create 192x192 and 512x512 gold squares with black star
# For now, create placeholder files that can be replaced with proper icons later
```

Create a simple Node script to generate the icons, or note that proper icons should be created before deployment.

- [ ] **Step 4: Test PWA install**

Run: `npm run build && npm start`
Open in Chrome, check Application tab in DevTools:
Expected: Manifest loads correctly, service worker registers, "Install" prompt appears.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add PWA support with Serwist service worker and app manifest"
```

---

## Task 12: Polish, Transitions & Final QA

**Files:**
- Various component files for refinement

- [ ] **Step 1: Add page transition wrapper**

If page transitions between routes feel abrupt, add an `AnimatePresence` wrapper in the tabs layout. Otherwise, the per-component entrance animations should be sufficient.

- [ ] **Step 2: Test all navigation flows end-to-end**

Walk through the entire demo flow:
1. Splash → streaming text → logo → CTA
2. Home → quick actions → each section
3. Directory → search → filter → detail → back
4. Jobs → filter → detail → back
5. Community → scroll events
6. Vision → animated counters → roadmap → partnership → CTA
7. Tab bar navigation between all sections
8. Explore → search across all types

Verify: No dead ends, no broken links, no console errors, all animations smooth.

- [ ] **Step 3: Test on mobile viewport**

Open Chrome DevTools, use device mode (iPhone 14 Pro / Samsung Galaxy S21). Verify:
- Touch targets are large enough
- Text is readable
- No horizontal overflow
- Bottom tab bar doesn't overlap content
- PWA install works

- [ ] **Step 4: Commit final polish**

```bash
git add .
git commit -m "fix: polish animations, fix navigation edge cases, verify mobile responsiveness"
```

---

## Task 13: Deploy to Vercel

- [ ] **Step 1: Deploy Convex to production**

```bash
npx convex deploy
```

This deploys the Convex backend. Copy the production URL.

- [ ] **Step 2: Seed production database**

Run the `seed:seedAll` mutation on the production Convex deployment via the Convex dashboard.

- [ ] **Step 3: Deploy to Vercel**

```bash
npx vercel --prod
```

Set environment variable `NEXT_PUBLIC_CONVEX_URL` to the production Convex URL during deployment.

- [ ] **Step 4: Verify production deployment**

Open the Vercel URL on a mobile phone:
- PWA install prompt appears
- All data loads from Convex
- Animations are smooth
- All navigation works
- The URL is shareable for the meeting

- [ ] **Step 5: Commit deployment config if any**

```bash
git add .
git commit -m "chore: configure production deployment for Vercel + Convex"
```
