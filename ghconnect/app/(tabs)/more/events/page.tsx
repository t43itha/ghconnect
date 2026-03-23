"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PageHeader from "@/components/PageHeader";
import ListCard from "@/components/ListCard";
import CategoryBadge from "@/components/CategoryBadge";
import PrimaryButton from "@/components/PrimaryButton";

export default function MoreEventsPage() {
  const events = useQuery(api.events.list);

  return (
    <div className="min-h-dvh px-4 pt-4 space-y-3 pb-24">
      <PageHeader title="Community Events">
        <Link href="/more" className="text-white/60 hover:text-white">
          <ArrowLeft size={22} />
        </Link>
      </PageHeader>

      <div className="space-y-3 pt-4">
        {!events && (
          <p className="text-center text-white/40 text-sm py-12">
            Loading events...
          </p>
        )}

        {events?.map((event, index) => (
          <ListCard
            key={event._id}
            href="/more/events"
            title={event.title}
            subtitle={`${event.date} · ${event.location}`}
            badge={<CategoryBadge label={event.category} />}
            trailing={<PrimaryButton>Register</PrimaryButton>}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
