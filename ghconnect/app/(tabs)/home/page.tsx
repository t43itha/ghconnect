"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const businesses = useQuery(api.businesses.featured);
  const allBusinesses = useQuery(api.businesses.list);
  const jobs = useQuery(api.jobs.featured);
  const allJobs = useQuery(api.jobs.list);
  const events = useQuery(api.events.list);

  // Ticker items
  const tickerItems = useMemo(() => {
    const items: string[] = [];
    allBusinesses?.slice(0, 3).forEach((b) => items.push(`${b.name} joined`));
    allJobs?.slice(0, 3).forEach((j) => items.push(`${j.title} posted`));
    events?.slice(0, 2).forEach((e) => items.push(`${e.title} announced`));
    return items;
  }, [allBusinesses, allJobs, events]);

  const nextEvent = events?.[0];

  return (
    <div className="min-h-dvh bg-onyx pb-20">
      {/* Header */}
      <header className="px-6 pt-[env(safe-area-inset-top,20px)] pb-3">
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

      {/* ── Hero Event Card with vertical Kente strip ── */}
      {nextEvent && (
        <div className="mx-6 mt-2 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/community" className="group block">
              <div className="relative bg-surface rounded-2xl overflow-hidden border border-white/[0.04]">
                {/* Vertical Kente strip on left edge */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{
                  background: "repeating-linear-gradient(180deg, #CE1126 0px, #CE1126 8px, #FCD116 8px, #FCD116 16px, #006B3F 16px, #006B3F 24px, #FCD116 24px, #FCD116 32px)"
                }} />

                <div className="pl-6 pr-5 py-6">
                  <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/40 font-medium mb-3">
                    Next event
                  </p>
                  <h2 className="font-display text-[1.4rem] font-bold text-white leading-tight tracking-tight group-hover:text-kente-gold transition-colors duration-200">
                    {nextEvent.title}
                  </h2>
                  <p className="text-[13px] text-white/30 mt-2">
                    {new Date(nextEvent.date).toLocaleDateString("en-GB", { day: "numeric", month: "long" })} · {nextEvent.location}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      )}

      {/* ── Heartbeat Pills ── */}
      <motion.div
        className="flex gap-3 px-6 mb-5 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { text: "4 new businesses this week", dot: "bg-forest" },
          { text: "3 roles posted today", dot: "bg-kente-gold" },
          { text: "1 event tomorrow", dot: "bg-ashanti-red" },
        ].map((pill, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.04] rounded-full px-3.5 py-2 whitespace-nowrap shrink-0"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${pill.dot} animate-pulse`} />
            <span className="text-[11px] text-white/30">{pill.text}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Kente Strip ── */}
      <div className="mx-6 kente-strip h-[2px] rounded-full" />

      {/* ── Lane 1: This Week (Events) ── */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">This week</h3>
          <Link href="/community" className="text-[11px] text-white/15 hover:text-kente-gold transition-colors">View all</Link>
        </div>
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-hide px-6 pb-2">
          {events?.map((evt, i) => (
            <motion.div
              key={evt._id}
              className="shrink-0 w-[260px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <Link href="/community" className="group block h-full">
                <div className="h-full bg-surface border border-white/[0.04] rounded-xl p-4 hover:border-white/[0.08] transition-colors flex flex-col">
                  <p className="text-[10px] uppercase tracking-wider text-ashanti-red/50 font-medium mb-2">{evt.category}</p>
                  <h4 className="font-display text-[14px] font-semibold text-white/85 leading-snug group-hover:text-white transition-colors">{evt.title}</h4>
                  <p className="text-[12px] text-white/25 mt-auto pt-2">
                    {new Date(evt.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {evt.location.split(",")[0]}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Kente Strip ── */}
      <div className="mx-6 mt-4 kente-strip h-[2px] rounded-full" />

      {/* ── Lane 2: New on Platform (Businesses) ── */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">New on platform</h3>
          <Link href="/directory" className="text-[11px] text-white/15 hover:text-kente-gold transition-colors">View all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 pb-2">
          {allBusinesses?.slice(0, 8).map((biz, i) => (
            <motion.div
              key={biz._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              <Link href={`/directory/${biz._id}`} className="group block">
                <div className="shrink-0 w-[140px] bg-surface border border-white/[0.04] rounded-xl p-3 hover:border-white/[0.08] transition-colors">
                  <h4 className="font-display text-[13px] font-semibold text-white/80 leading-snug line-clamp-1 group-hover:text-white transition-colors">{biz.name}</h4>
                  <p className="text-[11px] text-white/25 mt-0.5">{biz.category}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={10} fill="currentColor" className="text-kente-gold/40" />
                    <span className="text-[11px] text-white/25">{biz.rating}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Kente Strip ── */}
      <div className="mx-6 mt-4 kente-strip h-[2px] rounded-full" />

      {/* ── Lane 3: Open Roles ── */}
      <section className="mt-6 px-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">Open roles</h3>
          <Link href="/jobs" className="text-[11px] text-white/15 hover:text-kente-gold transition-colors">View all</Link>
        </div>
        {allJobs?.slice(0, 4).map((job, i) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.04 }}
          >
            <Link href={`/jobs/${job._id}`} className="group block">
              <div className="py-3 border-b border-white/[0.03] flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">{job.title}</h4>
                  <p className="text-[12px] text-white/25 mt-0.5">{job.company} · <span className="text-kente-gold/35">{job.salary}</span></p>
                </div>
                <ChevronRight size={14} className="text-white/[0.06] group-hover:text-white/20 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
