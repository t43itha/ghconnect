"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Calendar, MapPin, Users } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { GradientHero } from "@/components/GradientHero";

const categoryStyle: Record<string, string> = {
  Cultural: "bg-ashanti-red/15 text-ashanti-red",
  Professional: "bg-forest/15 text-forest",
  Workshop: "bg-kente-gold/10 text-kente-gold",
};

export default function CommunityPage() {
  const events = useQuery(api.events.list);

  return (
    <div className="min-h-dvh px-5 pt-[env(safe-area-inset-top,12px)] pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="font-display text-3xl font-bold text-white">
          Community
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Events &amp; happenings in the diaspora
        </p>
      </motion.div>

      <KenteStrip className="rounded-full mb-6" />

      {/* Section label */}
      <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium mb-4">
        Upcoming Events
      </p>

      {/* Event cards */}
      <div className="space-y-4">
        {events?.map((evt, i) => (
          <motion.div
            key={evt._id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
              {/* Gradient hero */}
              <GradientHero
                image={evt.image}
                icon={<Calendar size={28} />}
                className="h-32 rounded-t-2xl"
              />

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Category badge */}
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    categoryStyle[evt.category] ??
                    "bg-kente-gold/10 text-kente-gold"
                  }`}
                >
                  {evt.category}
                </span>

                {/* Title */}
                <h3 className="font-display text-base font-semibold text-white leading-snug">
                  {evt.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                  {evt.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-col gap-2 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-kente-gold/50" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-kente-gold/50" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-kente-gold/50" />
                    <span>{evt.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
