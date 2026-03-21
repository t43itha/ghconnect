"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Search, X, Compass } from "lucide-react";
import { Store, Briefcase, Calendar } from "lucide-react";
import { FeedCard } from "@/components/FeedCard";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const businesses = useQuery(api.businesses.list);
  const jobs = useQuery(api.jobs.list);
  const events = useQuery(api.events.list);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.toLowerCase().trim();

  const filteredBusinesses = useMemo(
    () =>
      q
        ? (businesses ?? []).filter(
            (b) =>
              b.name.toLowerCase().includes(q) ||
              b.category.toLowerCase().includes(q) ||
              b.location.toLowerCase().includes(q)
          )
        : [],
    [q, businesses]
  );

  const filteredJobs = useMemo(
    () =>
      q
        ? (jobs ?? []).filter(
            (j) =>
              j.title.toLowerCase().includes(q) ||
              j.company.toLowerCase().includes(q) ||
              j.type.toLowerCase().includes(q)
          )
        : [],
    [q, jobs]
  );

  const filteredEvents = useMemo(
    () =>
      q
        ? (events ?? []).filter(
            (e) =>
              e.title.toLowerCase().includes(q) ||
              e.category.toLowerCase().includes(q) ||
              e.organizer.toLowerCase().includes(q)
          )
        : [],
    [q, events]
  );

  const hasResults =
    filteredBusinesses.length > 0 ||
    filteredJobs.length > 0 ||
    filteredEvents.length > 0;

  return (
    <div className="min-h-dvh px-5 pt-[env(safe-area-inset-top,12px)] pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5"
      >
        <h1 className="font-display text-3xl font-bold text-white">Explore</h1>
      </motion.div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative mb-6"
      >
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search businesses, jobs, events..."
          className="w-full bg-surface border border-gold-border rounded-xl py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-kente-gold/50 transition-colors duration-200"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </motion.div>

      {/* States */}
      {!q && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col items-center justify-center pt-20 text-center"
        >
          <Compass size={48} className="text-kente-gold/30 mb-4" />
          <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
            Start typing to search across all of GhanaConnect
          </p>
        </motion.div>
      )}

      {q && !hasResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center pt-20 text-center"
        >
          <Search size={48} className="text-white/15 mb-4" />
          <p className="text-sm text-white/40">
            No results found for &ldquo;{query}&rdquo;
          </p>
        </motion.div>
      )}

      {q && hasResults && (
        <div className="space-y-6">
          {/* Businesses */}
          {filteredBusinesses.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
                Businesses
              </p>
              {filteredBusinesses.map((biz, i) => (
                <FeedCard
                  key={biz._id}
                  title={biz.name}
                  subtitle={`${biz.category} \u2022 ${biz.location}`}
                  badge="Business"
                  image={biz.image}
                  icon={<Store size={32} />}
                  href={`/directory/${biz._id}`}
                  index={i}
                />
              ))}
            </div>
          )}

          {/* Jobs */}
          {filteredJobs.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
                Jobs
              </p>
              {filteredJobs.map((job, i) => (
                <FeedCard
                  key={job._id}
                  title={job.title}
                  subtitle={`${job.company} \u2022 ${job.type}`}
                  badge="Job"
                  image="/jobs"
                  icon={<Briefcase size={32} />}
                  href={`/jobs/${job._id}`}
                  index={i}
                />
              ))}
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
                Events
              </p>
              {filteredEvents.map((evt, i) => (
                <FeedCard
                  key={evt._id}
                  title={evt.title}
                  subtitle={`${evt.category} \u2022 ${evt.organizer}`}
                  badge="Event"
                  image={evt.image}
                  icon={<Calendar size={32} />}
                  href="/community"
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
