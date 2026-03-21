"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";

export default function CommunityPage() {
  const events = useQuery(api.events.list);

  const nextEvent = events?.[0];
  const upcoming = events?.slice(1);

  return (
    <div className="min-h-dvh bg-onyx pb-20">
      {/* Header */}
      <header className="px-6 pt-[env(safe-area-inset-top,20px)] pb-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-[1.75rem] font-bold text-white tracking-tight">
            Community
          </h1>
          <p className="text-[13px] text-white/25 mt-0.5">
            {events?.length ?? 0} upcoming event{events?.length !== 1 ? "s" : ""}
          </p>
        </motion.div>
      </header>

      {/* ── Hero: Next Event (large, immersive) ── */}
      {nextEvent && (
        <motion.div
          className="mx-6 mt-4 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-surface rounded-2xl overflow-hidden border border-white/[0.04]">
            {/* Vertical Kente strip */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{
              background: "repeating-linear-gradient(180deg, #CE1126 0px, #CE1126 8px, #FCD116 8px, #FCD116 16px, #006B3F 16px, #006B3F 24px, #FCD116 24px, #FCD116 32px)"
            }} />

            <div className="pl-6 pr-5 py-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-ashanti-red animate-pulse" />
                <p className="text-[10px] uppercase tracking-[2px] text-ashanti-red/60 font-medium">
                  Next up
                </p>
              </div>

              {/* Big date */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-[3rem] font-bold text-white leading-none tracking-tight">
                  {new Date(nextEvent.date).getDate()}
                </span>
                <div>
                  <p className="text-[14px] text-white/40 uppercase tracking-wider">
                    {new Date(nextEvent.date).toLocaleDateString("en-GB", { month: "long" })}
                  </p>
                  <p className="text-[12px] text-white/20 mt-0.5">
                    {new Date(nextEvent.date).toLocaleDateString("en-GB", { weekday: "long" })} · {nextEvent.time}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-[1.3rem] font-bold text-white leading-tight tracking-tight">
                {nextEvent.title}
              </h2>

              {/* Description */}
              <p className="text-[13px] text-white/30 mt-2 leading-relaxed line-clamp-2">
                {nextEvent.description}
              </p>

              {/* Meta */}
              <div className="flex flex-col gap-1.5 mt-4">
                <span className="flex items-center gap-2 text-[12px] text-white/25">
                  <MapPin size={11} className="text-kente-gold/40" />
                  {nextEvent.location}
                </span>
                <span className="flex items-center gap-2 text-[12px] text-white/25">
                  <Users size={11} className="text-kente-gold/40" />
                  {nextEvent.organizer}
                </span>
              </div>

              {/* Category */}
              <span className="inline-block mt-4 text-[10px] uppercase tracking-[2px] text-white/15 font-medium">
                {nextEvent.category}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mx-6">
        <KenteStrip className="rounded-full" />
      </div>

      {/* ── Upcoming: Date-forward compact list ── */}
      {upcoming && upcoming.length > 0 && (
        <section className="mt-6 px-6">
          <p className="text-[10px] uppercase tracking-[2px] text-white/20 font-medium mb-4">
            Coming up
          </p>

          {upcoming.map((evt, i) => {
            const date = new Date(evt.date);
            return (
              <motion.div
                key={evt._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                className="py-4 border-b border-white/[0.03] flex items-start gap-4"
              >
                {/* Date block */}
                <div className="shrink-0 w-12 text-center">
                  <p className="font-display text-[1.4rem] font-bold text-white/80 leading-none">
                    {date.getDate()}
                  </p>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mt-0.5">
                    {date.toLocaleDateString("en-GB", { month: "short" })}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[15px] font-semibold text-white/85 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-[12px] text-white/25 mt-1 line-clamp-1">
                    {evt.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[11px] text-white/20">
                      <Clock size={10} />{evt.time}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-white/20">
                      <MapPin size={10} />{evt.location.split(",")[0]}
                    </span>
                  </div>
                </div>

                {/* Category accent */}
                <span className="text-[10px] text-white/12 uppercase tracking-wider shrink-0 mt-1">
                  {evt.category}
                </span>
              </motion.div>
            );
          })}
        </section>
      )}

      {/* Loading */}
      {!events && (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
        </div>
      )}
    </div>
  );
}
