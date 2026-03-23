"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  CalendarDays,
  CheckCircle,
  Heart,
} from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { useFavourites } from "@/components/FavouritesProvider";
import PrimaryButton from "@/components/PrimaryButton";
import CategoryBadge from "@/components/CategoryBadge";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const job = useQuery(api.jobs.getById, { id: id as Id<"jobs"> });
  const { isFavourite, toggle } = useFavourites();

  if (!job) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-kente-gold/30 border-t-kente-gold animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-dvh"
    >
      <div className="px-5 pt-[env(safe-area-inset-top,12px)] pb-6 space-y-5">
        {/* Back + Save */}
        <div className="flex items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <button
            onClick={() =>
              toggle({
                id: job._id,
                kind: "job",
                title: job.title,
                subtitle: `${job.company} · ${job.salary}`,
                href: `/jobs/${job._id}`,
              })
            }
            className={`p-2 rounded-full transition-colors duration-200 ${
              isFavourite(job._id)
                ? "text-kente-gold"
                : "text-white/25 hover:text-white/50"
            }`}
          >
            <Heart
              size={18}
              fill={isFavourite(job._id) ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Gradient icon box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-forest to-kente-gold flex items-center justify-center"
        >
          <Briefcase size={28} className="text-white" />
        </motion.div>

        {/* Title + company */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <h1 className="font-display text-[28px] text-kente-gold">
            {job.title}
          </h1>
          <p className="text-sm text-kente-gold/70 mt-1">{job.company}</p>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex flex-wrap gap-3 text-xs text-white/50"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-white/30" />
            {job.location}
          </span>
          <CategoryBadge label={job.type} />
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} className="text-white/30" />
            {job.postedDate}
          </span>
        </motion.div>

        {/* Salary box */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-xl bg-gold-mist border border-gold-border px-4 py-3"
        >
          <p className="text-xs text-white/40 mb-0.5">Salary</p>
          <p className="text-base font-semibold text-kente-gold">{job.salary}</p>
        </motion.div>

        <KenteStrip className="rounded-full" />

        {/* About the Role */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="space-y-2"
        >
          <h2 className="font-display text-xl text-kente-gold">
            About the Role
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            {job.description}
          </p>
        </motion.div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-3"
          >
            <h2 className="font-display text-xl text-kente-gold">
              Requirements
            </h2>
            <ul className="space-y-2.5">
              {job.requirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-white/60"
                >
                  <CheckCircle
                    size={16}
                    className="shrink-0 text-forest mt-0.5"
                  />
                  {req}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Apply CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          <PrimaryButton className="w-full">Apply Now</PrimaryButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
