"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Store, Briefcase, Calendar, Users } from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { FeedCard } from "@/components/FeedCard";

const quickActions = [
  { label: "Businesses", icon: Store, color: "text-forest", href: "/directory" },
  { label: "Jobs", icon: Briefcase, color: "text-kente-gold", href: "/jobs" },
  { label: "Events", icon: Calendar, color: "text-ashanti-red", href: "/community" },
  { label: "Network", icon: Users, color: "text-kente-gold", href: "/explore" },
] as const;

export default function HomePage() {
  const businesses = useQuery(api.businesses.featured);
  const jobs = useQuery(api.jobs.featured);
  const events = useQuery(api.events.list);

  return (
    <div className="min-h-dvh">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-[env(safe-area-inset-top,12px)] pb-3">
        <h2 className="font-display text-lg font-bold text-white">
          Ghana<span className="text-kente-gold">Connect</span>
        </h2>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ashanti-red to-kente-gold" />
      </header>

      <div className="px-5 space-y-6 pb-6">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm text-white/50">Welcome to</p>
          <h1 className="font-display text-3xl font-bold text-white">
            Ghana<span className="text-kente-gold">Connect</span>
          </h1>
        </motion.div>

        {/* Quick actions grid */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ label, icon: Icon, color, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Link
                href={href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-gold-mist border border-gold-border p-3.5 hover:border-kente-gold/30 transition-colors duration-200"
              >
                <Icon size={24} className={color} />
                <span className="text-[11px] font-medium text-white/70">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Kente divider */}
        <KenteStrip className="rounded-full" />

        {/* Trending section */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[3px] text-kente-gold/50 font-medium">
            Trending in Community
          </p>

          <div className="space-y-4">
            {/* Featured businesses */}
            {businesses?.map((biz, i) => (
              <FeedCard
                key={biz._id}
                title={biz.name}
                subtitle={biz.description}
                badge="Business"
                image={biz.image}
                icon={<Store size={32} />}
                href={`/directory/${biz._id}`}
                featured={i === 0}
                index={i}
              />
            ))}

            {/* Featured jobs */}
            {jobs?.map((job, i) => (
              <FeedCard
                key={job._id}
                title={job.title}
                subtitle={`${job.company} \u2022 ${job.location}`}
                badge="Job"
                image="/jobs"
                icon={<Briefcase size={32} />}
                href={`/jobs/${job._id}`}
                index={(businesses?.length ?? 0) + i}
              />
            ))}

            {/* First 2 events */}
            {events?.slice(0, 2).map((evt, i) => (
              <FeedCard
                key={evt._id}
                title={evt.title}
                subtitle={`${evt.date} \u2022 ${evt.location}`}
                badge="Event"
                image={evt.image}
                icon={<Calendar size={32} />}
                href="/community"
                index={(businesses?.length ?? 0) + (jobs?.length ?? 0) + i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
