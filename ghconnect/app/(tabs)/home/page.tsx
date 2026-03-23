"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { User } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import HeroCard from "@/components/HeroCard";
import NotificationPill from "@/components/NotificationPill";
import SectionHeader from "@/components/SectionHeader";
import ListCard from "@/components/ListCard";
import CategoryBadge from "@/components/CategoryBadge";

export default function HomePage() {
  const businesses = useQuery(api.businesses.list);
  const jobs = useQuery(api.jobs.list);
  const events = useQuery(api.events.list);

  const isLoading =
    businesses === undefined || jobs === undefined || events === undefined;

  const nextEvent = events?.[0];

  return (
    <div className="min-h-dvh bg-onyx pb-24">
      <PageHeader title="Akwaaba">
        <div className="w-8 h-8 rounded-full bg-surface border border-gold-border flex items-center justify-center">
          <User size={16} className="text-white/60" />
        </div>
      </PageHeader>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-white/30 text-sm">Loading…</p>
        </div>
      ) : (
        <>
          {/* Hero — Next Event */}
          {nextEvent && (
            <div className="px-4 mt-4">
              <HeroCard
                label="NEXT EVENT"
                title={nextEvent.title}
                subtitle={`${nextEvent.date} · ${nextEvent.location}`}
                href="/more/events"
              />
            </div>
          )}

          {/* Notification Pills */}
          <div className="flex gap-2 overflow-x-auto px-4 py-3">
            <NotificationPill>{businesses?.length || 0} Businesses</NotificationPill>
            <NotificationPill>{jobs?.length || 0} Jobs</NotificationPill>
          </div>

          {/* Upcoming Events */}
          <div className="px-4 mt-2">
            <SectionHeader title="Upcoming Events" viewAllHref="/more/events" />
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 mt-3">
            {events?.map((event, i) => (
              <div key={event._id} className="min-w-[260px] shrink-0">
                <ListCard
                  href="/more/events"
                  title={event.title}
                  subtitle={`${event.date} · ${event.location}`}
                  badge={<CategoryBadge label={event.category} />}
                  index={i}
                />
              </div>
            ))}
          </div>

          {/* Latest in Directory */}
          <div className="px-4 mt-4">
            <SectionHeader title="Latest in Directory" viewAllHref="/directory" />
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 mt-3">
            {businesses?.map((biz, i) => (
              <div key={biz._id} className="min-w-[260px] shrink-0">
                <ListCard
                  href={`/directory/${biz._id}`}
                  title={biz.name}
                  subtitle={biz.location}
                  badge={<CategoryBadge label={biz.category} />}
                  index={i}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
