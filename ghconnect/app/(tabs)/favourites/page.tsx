"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavourites } from "@/components/FavouritesProvider";
import PageHeader from "@/components/PageHeader";
import { CategoryPill } from "@/components/CategoryPill";
import ListCard from "@/components/ListCard";

type FilterKind = "all" | "business" | "job" | "event";

const FILTERS: { label: string; value: FilterKind }[] = [
  { label: "All", value: "all" },
  { label: "Businesses", value: "business" },
  { label: "Jobs", value: "job" },
  { label: "Events", value: "event" },
];

function kindLabel(kind: string) {
  if (kind === "business") return "Business";
  if (kind === "job") return "Job";
  if (kind === "event") return "Event";
  return kind;
}

export default function FavouritesPage() {
  const { favourites } = useFavourites();
  const [activeFilter, setActiveFilter] = useState<FilterKind>("all");

  const filtered =
    activeFilter === "all"
      ? favourites
      : favourites.filter((f) => f.kind === activeFilter);

  const hasFavourites = favourites.length > 0;

  return (
    <div className="min-h-dvh bg-onyx pb-24">
      <PageHeader title="Favourites" />

      {/* Category filter row */}
      <div className="flex gap-2 px-4 mt-4 overflow-x-auto scrollbar-none">
        {FILTERS.map((f) => (
          <CategoryPill
            key={f.value}
            label={f.label}
            active={activeFilter === f.value}
            onClick={() => setActiveFilter(f.value)}
          />
        ))}
      </div>

      <div className="px-4 mt-4 flex flex-col gap-3">
        {/* Saved items list */}
        {filtered.map((item, i) => (
          <ListCard
            key={item.id}
            href={item.kind === "event" ? "/more/events" : item.href}
            title={item.title}
            subtitle={item.subtitle}
            badge={
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
                {kindLabel(item.kind)}
              </span>
            }
            index={i}
          />
        ))}

        {/* Empty state */}
        {!hasFavourites && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <Heart size={32} className="text-white/10" />
            <p className="font-body text-[15px] text-white">Nothing saved yet</p>
            <p className="font-body text-[13px] text-white/40">
              Tap the heart on any business, role or event to save it here
            </p>
          </div>
        )}

        {/* Filtered empty state (has favourites but none match filter) */}
        {hasFavourites && filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <Heart size={32} className="text-white/10" />
            <p className="font-body text-[15px] text-white">
              No saved {activeFilter === "business" ? "businesses" : activeFilter === "job" ? "jobs" : "events"} yet
            </p>
            <p className="font-body text-[13px] text-white/40">
              Tap the heart on any {activeFilter} to save it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
