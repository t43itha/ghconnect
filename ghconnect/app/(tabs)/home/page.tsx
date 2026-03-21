"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Store, Briefcase, Calendar, ArrowRight } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { FeedCard } from "@/components/FeedCard";

export default function HomePage() {
  const businesses = useQuery(api.businesses.featured);
  const jobs = useQuery(api.jobs.featured);
  const events = useQuery(api.events.list);

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="px-6 pt-[env(safe-area-inset-top,20px)] pb-6">
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

      <div className="px-6">
        {/* Quick navigation — minimal text links, not cards */}
        <motion.div
          className="flex gap-6 mb-8"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {[
            { label: "Directory", icon: Store, href: "/directory" },
            { label: "Jobs", icon: Briefcase, href: "/jobs" },
            { label: "Events", icon: Calendar, href: "/community" },
          ].map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <Icon size={15} strokeWidth={1.5} />
              {label}
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -ml-1" />
            </Link>
          ))}
        </motion.div>

        <KenteStrip className="rounded-full mb-8" />

        {/* Featured Businesses */}
        {businesses && businesses.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">
                Featured Businesses
              </h2>
              <Link href="/directory" className="text-[11px] text-white/20 hover:text-kente-gold transition-colors">
                View all
              </Link>
            </div>
            <div>
              {businesses.map((biz, i) => (
                <FeedCard
                  key={biz._id}
                  title={biz.name}
                  subtitle={`${biz.category} · ${biz.location}`}
                  href={`/directory/${biz._id}`}
                  featured={i === 0}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Jobs */}
        {jobs && jobs.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">
                Opportunities
              </h2>
              <Link href="/jobs" className="text-[11px] text-white/20 hover:text-kente-gold transition-colors">
                View all
              </Link>
            </div>
            <div>
              {jobs.map((job, i) => (
                <FeedCard
                  key={job._id}
                  title={job.title}
                  subtitle={`${job.company} · ${job.salary}`}
                  href={`/jobs/${job._id}`}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Events */}
        {events && events.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] uppercase tracking-[2px] text-white/25 font-medium">
                Upcoming Events
              </h2>
              <Link href="/community" className="text-[11px] text-white/20 hover:text-kente-gold transition-colors">
                View all
              </Link>
            </div>
            <div>
              {events.slice(0, 3).map((evt, i) => (
                <FeedCard
                  key={evt._id}
                  title={evt.title}
                  subtitle={`${new Date(evt.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · ${evt.location}`}
                  badge={evt.category}
                  href="/community"
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
