"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Store,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  Bookmark,
} from "lucide-react";
import { GradientHero } from "@/components/GradientHero";
import { KenteStrip } from "@/components/KenteStrip";

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const business = useQuery(api.businesses.getById, {
    id: id as Id<"businesses">,
  });

  if (!business) {
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
      {/* Hero */}
      <div className="relative">
        <GradientHero
          image={business.image}
          icon={<Store size={48} />}
          className="h-48"
        />
        <Link
          href="/directory"
          className="absolute top-[env(safe-area-inset-top,12px)] left-4 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur"
        >
          <ArrowLeft size={18} className="text-white" />
        </Link>
      </div>

      <KenteStrip />

      <div className="px-5 py-5 space-y-5">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="font-display text-2xl font-bold text-white"
        >
          {business.name}
        </motion.h1>

        {/* Category + Rating */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex items-center gap-3"
        >
          <span className="rounded-full bg-forest/20 px-3 py-1 text-xs font-medium text-forest">
            {business.category}
          </span>
          <span className="flex items-center gap-1 text-kente-gold text-sm font-medium">
            <Star size={14} fill="currentColor" />
            {business.rating}
          </span>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-3"
        >
          <button className="flex items-center gap-2 rounded-full bg-gold-mist border border-gold-border px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200">
            <Share2 size={16} />
            Share
          </button>
          <button className="flex items-center gap-2 rounded-full bg-gold-mist border border-gold-border px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200">
            <Bookmark size={16} />
            Save
          </button>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex items-center gap-2 text-white/60 text-sm"
        >
          <MapPin size={16} className="shrink-0 text-kente-gold/60" />
          {business.location}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-sm text-white/60 leading-relaxed"
        >
          {business.description}
        </motion.p>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="space-y-4"
        >
          <h2 className="font-display text-lg font-semibold text-kente-gold">
            Contact
          </h2>
          <div className="space-y-3">
            {business.contactPhone && (
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="shrink-0 text-kente-gold/60" />
                {business.contactPhone}
              </div>
            )}
            {business.contactEmail && (
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-kente-gold/60" />
                {business.contactEmail}
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Globe size={16} className="shrink-0 text-kente-gold/60" />
                {business.website}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
