"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Briefcase, MapPin, Banknote } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";

const jobTypes = ["All", "Full-time", "Part-time", "Contract"] as const;

const typeBadgeColors: Record<string, string> = {
  "Full-time": "bg-forest/20 text-forest",
  "Part-time": "bg-kente-gold/20 text-kente-gold",
  Contract: "bg-ashanti-red/20 text-ashanti-red",
};

export default function JobsPage() {
  const jobs = useQuery(api.jobs.list);
  const [activeType, setActiveType] = useState<string>("All");

  const filtered = useMemo(() => {
    if (!jobs) return [];
    if (activeType === "All") return jobs;
    return jobs.filter((j) => j.type === activeType);
  }, [jobs, activeType]);

  return (
    <div className="min-h-dvh">
      <header className="px-5 pt-[env(safe-area-inset-top,12px)] pb-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-2xl font-bold text-white"
        >
          Opportunities
        </motion.h1>
      </header>

      <div className="px-5 space-y-5 pb-6">
        {/* Type filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex gap-2 flex-wrap"
        >
          {jobTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveType(type)}
              className={`
                shrink-0 rounded-full px-5 py-2 text-sm font-medium
                transition-colors duration-200 cursor-pointer
                border select-none
                ${
                  activeType === type
                    ? "bg-kente-gold text-onyx border-kente-gold shadow-[0_0_12px_rgba(252,209,22,0.3)]"
                    : "bg-gold-mist text-white/70 border-gold-border hover:text-white hover:border-kente-gold/30"
                }
              `}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>

        <KenteStrip className="rounded-full" />

        {/* Result count */}
        <p className="text-sm text-white/40">
          {filtered.length} opportunit{filtered.length !== 1 ? "ies" : "y"}
        </p>

        {/* Job cards */}
        <div className="space-y-3">
          {filtered.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            >
              <Link href={`/jobs/${job._id}`} className="block group">
                <div
                  className={`
                    rounded-2xl p-4 space-y-3
                    bg-surface border transition-all duration-300
                    hover:shadow-[0_4px_24px_rgba(252,209,22,0.08)]
                    hover:-translate-y-0.5
                    ${
                      job.featured
                        ? "border-kente-gold/40 shadow-[0_0_20px_rgba(252,209,22,0.12)]"
                        : "border-gold-border hover:border-kente-gold/25"
                    }
                  `}
                >
                  {/* Title + Badge row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-base font-semibold text-white/90 leading-snug line-clamp-1 group-hover:text-kente-gold transition-colors duration-200">
                        {job.title}
                      </h3>
                      <p className="text-sm text-white/40">{job.company}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColors[job.type] ?? "bg-gold-mist text-white/60"}`}
                    >
                      {job.type}
                    </span>
                  </div>

                  {/* Footer: location + salary */}
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-white/30" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-kente-gold/70">
                      <Banknote size={13} />
                      {job.salary}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {jobs && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Briefcase size={40} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/40 text-sm">No opportunities found</p>
          </motion.div>
        )}

        {/* Loading */}
        {!jobs && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-2 border-kente-gold/30 border-t-kente-gold animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
