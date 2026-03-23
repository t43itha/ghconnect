"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Store } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { CategoryPill } from "@/components/CategoryPill";
import ListCard from "@/components/ListCard";
import CategoryBadge from "@/components/CategoryBadge";
import { GradientHero } from "@/components/GradientHero";

export default function DirectoryPage() {
  const businesses = useQuery(api.businesses.list);
  const categories = useQuery(api.categories.byType, { type: "business" });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (!businesses) return [];
    return businesses.filter((b) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "All" || b.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchQuery, activeCategory]);

  return (
    <div className="min-h-dvh">
      <PageHeader title="Business Directory" />

      <div className="mt-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search businesses..."
        />
      </div>

      {/* Category pill row */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-3">
        <CategoryPill
          label="All"
          active={activeCategory === "All"}
          onClick={() => setActiveCategory("All")}
        />
        {categories?.map((cat) => (
          <CategoryPill
            key={cat._id}
            label={cat.name}
            active={activeCategory === cat.name}
            onClick={() => setActiveCategory(cat.name)}
          />
        ))}
      </div>

      {/* Business list */}
      <div className="flex flex-col gap-2 px-4 pb-24">
        {filtered.map((biz, i) => (
          <ListCard
            key={biz._id}
            href={`/directory/${biz._id}`}
            index={i}
            title={biz.name}
            subtitle={biz.location}
            badge={<CategoryBadge label={biz.category} />}
            thumbnail={
              <div className="w-[72px] h-[72px] rounded-lg overflow-hidden">
                <GradientHero
                  image={`gradient-${biz.category.toLowerCase()}`}
                  icon={<Store size={28} />}
                  className="w-full h-full"
                />
              </div>
            }
          />
        ))}

        {/* Empty state */}
        {businesses && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 text-[14px]">No businesses found</p>
          </div>
        )}

        {/* Loading state */}
        {!businesses && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
