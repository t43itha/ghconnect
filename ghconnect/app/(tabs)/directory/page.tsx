"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Search, Store, Tag } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { KenteStrip } from "@/components/KenteStrip";
import { FeedCard } from "@/components/FeedCard";
import { CategoryPill } from "@/components/CategoryPill";

export default function DirectoryPage() {
  const businesses = useQuery(api.businesses.list);
  const categories = useQuery(api.categories.byType, { type: "business" });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (!businesses) return [];
    return businesses.filter((b) => {
      const matchesSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || b.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, search, activeCategory]);

  return (
    <div className="min-h-dvh">
      <header className="px-5 pt-[env(safe-area-inset-top,12px)] pb-3">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-2xl font-bold text-white"
        >
          Business Directory
        </motion.h1>
      </header>

      <div className="px-5 space-y-5 pb-6">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="relative"
        >
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-surface border border-gold-border pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-kente-gold/50 transition-colors duration-200"
          />
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5"
        >
          <CategoryPill
            label="All"
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {categories?.map((cat) => {
            const IconComponent =
              (LucideIcons as any)[cat.icon] || LucideIcons.Tag;
            return (
              <CategoryPill
                key={cat._id}
                label={cat.name}
                active={activeCategory === cat.name}
                onClick={() => setActiveCategory(cat.name)}
              />
            );
          })}
        </motion.div>

        <KenteStrip className="rounded-full" />

        {/* Result count */}
        <p className="text-sm text-white/40">
          {filtered.length} business{filtered.length !== 1 ? "es" : ""}
        </p>

        {/* Business cards */}
        <div className="space-y-4">
          {filtered.map((biz, i) => (
            <FeedCard
              key={biz._id}
              title={biz.name}
              subtitle={`${biz.location} · ★ ${biz.rating}`}
              badge={biz.category}
              image={biz.image}
              icon={<Store size={32} />}
              href={`/directory/${biz._id}`}
              featured={biz.featured}
              index={i}
            />
          ))}
        </div>

        {/* Empty state */}
        {businesses && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Store size={40} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/40 text-sm">No businesses found</p>
          </motion.div>
        )}

        {/* Loading */}
        {!businesses && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-2 border-kente-gold/30 border-t-kente-gold animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
