"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Store, Briefcase, Calendar, ArrowRight, ChevronRight, Star, MapPin } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";

// ─── Types ───
type StreamItem =
  | { kind: "business"; id: string; title: string; detail: string; meta: string; href: string; rating: number; featured: boolean; recency: string }
  | { kind: "role"; id: string; title: string; detail: string; meta: string; href: string; salary: string; featured: boolean; recency: string }
  | { kind: "event"; id: string; title: string; detail: string; meta: string; href: string; category: string; recency: string };

// Fake recency labels for the demo
const businessRecency = ["just now", "2h ago", "4h ago", "yesterday"];
const jobRecency = ["1h ago", "3h ago", "6h ago"];
const eventRecency = ["today", "2d ago", "3d ago"];

export default function HomePage() {
  const businesses = useQuery(api.businesses.featured);
  const jobs = useQuery(api.jobs.featured);
  const events = useQuery(api.events.list);

  // Build unified stream, interleaved by "recency"
  const stream = useMemo<StreamItem[]>(() => {
    const items: StreamItem[] = [];

    businesses?.forEach((b, i) => {
      items.push({
        kind: "business",
        id: b._id,
        title: b.name,
        detail: `${b.category} · ${b.location}`,
        meta: b.location,
        href: `/directory/${b._id}`,
        rating: b.rating,
        featured: b.featured,
        recency: businessRecency[i % businessRecency.length],
      });
    });

    jobs?.forEach((j, i) => {
      items.push({
        kind: "role",
        id: j._id,
        title: j.title,
        detail: j.company,
        meta: j.salary,
        href: `/jobs/${j._id}`,
        salary: j.salary,
        featured: j.featured,
        recency: jobRecency[i % jobRecency.length],
      });
    });

    events?.slice(0, 3).forEach((e, i) => {
      items.push({
        kind: "event",
        id: e._id,
        title: e.title,
        detail: `${new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · ${e.location}`,
        meta: e.location,
        href: "/community",
        category: e.category,
        recency: eventRecency[i % eventRecency.length],
      });
    });

    // Interleave: business, role, event, business, role, event...
    const byKind = {
      business: items.filter((i) => i.kind === "business"),
      role: items.filter((i) => i.kind === "role"),
      event: items.filter((i) => i.kind === "event"),
    };
    const interleaved: StreamItem[] = [];
    const maxLen = Math.max(byKind.business.length, byKind.role.length, byKind.event.length);
    for (let i = 0; i < maxLen; i++) {
      if (byKind.business[i]) interleaved.push(byKind.business[i]);
      if (byKind.role[i]) interleaved.push(byKind.role[i]);
      if (byKind.event[i]) interleaved.push(byKind.event[i]);
    }
    return interleaved;
  }, [businesses, jobs, events]);

  // Ticker items — recent activity
  const tickerItems = useMemo(() => {
    const items: string[] = [];
    businesses?.slice(0, 2).forEach((b) => items.push(`${b.name} joined the directory`));
    jobs?.slice(0, 2).forEach((j) => items.push(`${j.title} role posted by ${j.company}`));
    events?.slice(0, 1).forEach((e) => items.push(`${e.title} — ${new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`));
    return items;
  }, [businesses, jobs, events]);

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="px-6 pt-[env(safe-area-inset-top,20px)] pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] uppercase tracking-[3px] text-white/20 mb-1">Welcome to</p>
          <h1 className="font-display text-[1.75rem] font-bold text-white tracking-tight">
            Ghana<span className="text-kente-gold">Connect</span>
          </h1>
        </motion.div>
      </header>

      {/* ── 1. Live Activity Ticker ── */}
      {tickerItems.length > 0 && (
        <div className="overflow-hidden mb-6 border-y border-white/[0.03] py-2.5">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate for seamless loop */}
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[12px] text-white/15 flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-forest/60" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      )}

      <div className="px-6">
        {/* Quick navigation */}
        <motion.div
          className="flex gap-6 mb-6"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {[
            { label: "Directory", icon: Store, href: "/directory" },
            { label: "Jobs", icon: Briefcase, href: "/jobs" },
            { label: "Events", icon: Calendar, href: "/community" },
          ].map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 text-[13px] text-white/35 hover:text-white/60 transition-colors duration-200"
            >
              <Icon size={14} strokeWidth={1.5} />
              {label}
              <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -ml-1" />
            </Link>
          ))}
        </motion.div>

        <KenteStrip className="rounded-full mb-6" />

        {/* ── 3. Section header with scale count ── */}
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">
            Happening now
          </h2>
          <span className="text-[11px] text-white/10">
            2,400+ businesses · 850+ roles · 5 events
          </span>
        </div>

        {/* ── 5. Unified mixed stream ── */}
        <div>
          {stream.map((item, i) => {
            // Insert a subtle Kente line when content type changes
            const prevKind = i > 0 ? stream[i - 1].kind : null;
            const showTransition = prevKind !== null && prevKind !== item.kind;

            return (
              <div key={`${item.kind}-${item.id}`}>
                {showTransition && (
                  <div className="kente-strip h-[1px] my-1 opacity-20 rounded-full" />
                )}
                <StreamRow item={item} index={i} />
              </div>
            );
          })}
        </div>

        {/* Loading */}
        {!businesses && !jobs && !events && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}

/* ─── Stream Row ─── */
function StreamRow({ item, index }: { item: StreamItem; index: number }) {
  const kindLabel = { business: "business", role: "role", event: "event" }[item.kind];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.03 }}
    >
      <Link href={item.href} className="group block">
        <div className="py-3.5 border-b border-white/[0.025] flex items-center gap-3">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-[15px] font-medium text-white/85 truncate group-hover:text-white transition-colors duration-200">
                {item.title}
              </h3>
              {item.kind === "business" && "rating" in item && (
                <span className="flex items-center gap-0.5 text-[11px] text-kente-gold/40 shrink-0">
                  <Star size={9} fill="currentColor" />
                  {item.rating}
                </span>
              )}
            </div>
            <p className="text-[12px] text-white/30 mt-0.5 truncate">{item.detail}</p>
          </div>

          {/* Right side — type + recency */}
          <div className="shrink-0 text-right flex flex-col items-end gap-0.5">
            <span className="text-[10px] text-white/15 uppercase tracking-wider">
              {kindLabel}
            </span>
            <span className="text-[10px] text-white/10">
              {item.recency}
            </span>
          </div>

          <ChevronRight
            size={14}
            className="shrink-0 text-white/[0.06] group-hover:text-white/20 transition-colors duration-200"
          />
        </div>
      </Link>
    </motion.div>
  );
}
