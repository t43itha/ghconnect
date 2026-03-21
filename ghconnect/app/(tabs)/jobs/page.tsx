"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { MapPin, ChevronRight } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";

const jobTypes = ["All", "Full-time", "Part-time", "Contract"] as const;

export default function JobsPage() {
  const jobs = useQuery(api.jobs.list);
  const [activeType, setActiveType] = useState<string>("All");

  const filtered = useMemo(() => {
    if (!jobs) return [];
    if (activeType === "All") return jobs;
    return jobs.filter((j) => j.type === activeType);
  }, [jobs, activeType]);

  const featured = filtered.filter((j) => j.featured);
  const regular = filtered.filter((j) => !j.featured);

  return (
    <div className="min-h-dvh">
      <header className="px-6 pt-[env(safe-area-inset-top,20px)] pb-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-[1.75rem] font-bold text-white tracking-tight">
            Opportunities
          </h1>
          <p className="text-[13px] text-white/25 mt-0.5">
            {filtered.length} role{filtered.length !== 1 ? "s" : ""}
          </p>
        </motion.div>
      </header>

      <div className="px-6">
        {/* Type tabs */}
        <motion.div
          className="flex gap-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`
                px-3 py-1.5 text-[12px] rounded-full whitespace-nowrap transition-all duration-200
                ${activeType === type
                  ? "text-onyx bg-kente-gold font-medium"
                  : "text-white/30 hover:text-white/50"
                }
              `}
            >
              {type}
            </button>
          ))}
        </motion.div>

        <div className="mt-5">
          <KenteStrip className="rounded-full" />
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="mt-6">
            <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/40 font-medium mb-2">
              Featured
            </p>
            {featured.map((job, i) => (
              <JobRow key={job._id} job={job} featured index={i} />
            ))}
          </section>
        )}

        {/* All */}
        {regular.length > 0 && (
          <section className={featured.length > 0 ? "mt-6" : "mt-6"}>
            {featured.length > 0 && (
              <p className="text-[10px] uppercase tracking-[2px] text-white/15 font-medium mb-2">
                All roles
              </p>
            )}
            {regular.map((job, i) => (
              <JobRow key={job._id} job={job} index={featured.length + i} />
            ))}
          </section>
        )}

        {/* Empty */}
        {jobs && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/20 text-[14px]">No opportunities found</p>
          </motion.div>
        )}

        {/* Loading */}
        {!jobs && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}

/* ─── Job Row ─── */
function JobRow({
  job,
  featured = false,
  index = 0,
}: {
  job: any;
  featured?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 + index * 0.03 }}
    >
      <Link href={`/jobs/${job._id}`} className="group block">
        <div
          className={`
            py-4 border-b border-white/[0.03] flex items-center justify-between gap-3
            ${featured ? "border-l-2 border-l-kente-gold pl-4 -ml-0.5" : ""}
          `}
        >
          <div className="min-w-0 flex-1">
            {/* Title */}
            <h3
              className={`
                font-display tracking-tight text-white/90
                group-hover:text-white transition-colors duration-200
                ${featured ? "text-[17px] font-semibold" : "text-[15px] font-medium"}
              `}
            >
              {job.title}
            </h3>

            {/* Company + Type */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[13px] text-white/35">{job.company}</span>
              <span className="text-white/10">·</span>
              <span className="text-[12px] text-white/25">{job.type}</span>
            </div>

            {/* Location + Salary */}
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-[12px] text-white/20">
                <MapPin size={10} />
                {job.location.split("(")[0].trim()}
              </span>
              <span className="text-[12px] text-kente-gold/40">{job.salary}</span>
            </div>
          </div>

          <ChevronRight
            size={16}
            className="shrink-0 text-white/8 group-hover:text-white/25 transition-colors duration-200"
          />
        </div>
      </Link>
    </motion.div>
  );
}
