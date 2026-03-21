"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Heart, ChevronRight, Star, MapPin } from "lucide-react";
import Link from "next/link";
import { useFavourites } from "@/components/FavouritesProvider";
import { KenteStrip } from "@/components/KenteStrip";

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  // Our Picks data
  const featuredBusinesses = useQuery(api.businesses.featured);
  const featuredJobs = useQuery(api.jobs.featured);
  const events = useQuery(api.events.list);

  const hasFavourites = favourites.length > 0;

  const favBusinesses = favourites.filter((f) => f.kind === "business");
  const favJobs = favourites.filter((f) => f.kind === "job");
  const favEvents = favourites.filter((f) => f.kind === "event");

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
            Favourites
          </h1>
          <p className="text-[13px] text-white/25 mt-0.5">
            {hasFavourites
              ? `${favourites.length} saved item${favourites.length !== 1 ? "s" : ""}`
              : "Your saved businesses, roles & events"}
          </p>
        </motion.div>
      </header>

      <div className="px-6">
        {/* ── Saved Items ── */}
        {hasFavourites && (
          <>
            {favBusinesses.length > 0 && (
              <FavSection label="Saved businesses" items={favBusinesses} />
            )}
            {favJobs.length > 0 && (
              <FavSection label="Saved roles" items={favJobs} />
            )}
            {favEvents.length > 0 && (
              <FavSection label="Saved events" items={favEvents} />
            )}

            <div className="mt-6 mb-2">
              <KenteStrip className="rounded-full" />
            </div>
          </>
        )}

        {/* ── Empty State / Our Picks ── */}
        {!hasFavourites && (
          <motion.div
            className="mt-8 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Heart size={28} className="mx-auto text-white/10 mb-3" />
            <p className="text-[14px] text-white/30">Nothing saved yet</p>
            <p className="text-[12px] text-white/15 mt-1">
              Tap the heart on any business or role to save it here
            </p>
          </motion.div>
        )}

        {/* ── Our Picks ── */}
        <section className={hasFavourites ? "mt-6" : "mt-2"}>
          <p className={`text-[10px] uppercase tracking-[2px] font-medium mb-4 ${
            hasFavourites ? "text-white/12" : "text-kente-gold/40"
          }`}>
            {hasFavourites ? "You might also like" : "Our picks"}
          </p>

          {/* Featured businesses */}
          {featuredBusinesses?.slice(0, 3).map((biz, i) => (
            <motion.div
              key={biz._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
            >
              <Link href={`/directory/${biz._id}`} className="group block">
                <div className="py-3.5 border-b border-white/[0.03] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-[15px] font-medium text-white/80 truncate group-hover:text-white transition-colors">
                        {biz.name}
                      </h3>
                      <span className="flex items-center gap-0.5 text-[11px] text-kente-gold/35 shrink-0">
                        <Star size={9} fill="currentColor" />{biz.rating}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/25 mt-0.5">
                      {biz.category} · {biz.location.split(",")[0]}
                    </p>
                  </div>
                  <span className="text-[10px] text-white/10 uppercase tracking-wider shrink-0">business</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Featured jobs */}
          {featuredJobs?.slice(0, 2).map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.04 }}
            >
              <Link href={`/jobs/${job._id}`} className="group block">
                <div className="py-3.5 border-b border-white/[0.03] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-medium text-white/80 truncate group-hover:text-white transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-[12px] text-white/25 mt-0.5">
                      {job.company} · <span className="text-kente-gold/30">{job.salary}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-white/10 uppercase tracking-wider shrink-0">role</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Next event */}
          {events?.slice(0, 1).map((evt, i) => (
            <motion.div
              key={evt._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link href="/community" className="group block">
                <div className="py-3.5 border-b border-white/[0.03] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-medium text-white/80 truncate group-hover:text-white transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-[12px] text-white/25 mt-0.5">
                      {new Date(evt.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} · {evt.location.split(",")[0]}
                    </p>
                  </div>
                  <span className="text-[10px] text-white/10 uppercase tracking-wider shrink-0">event</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}

/* ─── Favourites Section ─── */
function FavSection({ label, items }: { label: string; items: { id: string; title: string; subtitle: string; href: string; kind: string }[] }) {
  return (
    <section className="mt-5">
      <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/40 font-medium mb-2">
        {label}
      </p>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <Link href={item.href} className="group block">
            <div className="py-3 border-b border-white/[0.03] flex items-center justify-between gap-3 border-l-2 border-l-kente-gold pl-4 -ml-0.5">
              <div className="min-w-0">
                <h3 className="text-[15px] font-medium text-white/85 truncate group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-[12px] text-white/25 mt-0.5 truncate">{item.subtitle}</p>
              </div>
              <ChevronRight size={14} className="text-white/[0.06] shrink-0" />
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
