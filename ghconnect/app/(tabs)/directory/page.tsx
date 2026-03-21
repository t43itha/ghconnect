"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Search, Star, MapPin, X, Store, Tag } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { KenteStrip } from "@/components/KenteStrip";
import { getGradientStyle } from "@/lib/gradients";

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
        b.category.toLowerCase().includes(search.toLowerCase()) ||
        b.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || b.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, search, activeCategory]);

  const featured = filtered.filter((b) => b.featured);
  const regular = filtered.filter((b) => !b.featured);

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <header className="px-5 pt-[env(safe-area-inset-top,16px)] pb-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-[1.75rem] font-bold text-white tracking-tight">
            Directory
          </h1>
          <p className="text-[13px] text-white/35 mt-0.5">
            {filtered.length} Ghanaian business{filtered.length !== 1 ? "es" : ""} in the UK
          </p>
        </motion.div>
      </header>

      {/* Search */}
      <div className="px-5 mt-3">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="relative"
        >
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search by name, category, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-surface border border-gold-border/60 pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-kente-gold/40 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={16} className="text-white/30" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-5 mt-4 pb-1"
      >
        <CategoryChip
          label="All"
          active={activeCategory === "All"}
          onClick={() => setActiveCategory("All")}
        />
        {categories?.map((cat) => {
          const Icon = (LucideIcons as any)[cat.icon] || Tag;
          return (
            <CategoryChip
              key={cat._id}
              label={cat.name}
              icon={<Icon size={13} />}
              count={cat.count}
              active={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name)}
            />
          );
        })}
      </motion.div>

      <div className="px-5 mt-4">
        <KenteStrip className="rounded-full" />
      </div>

      {/* Featured businesses — large cards */}
      {featured.length > 0 && (
        <section className="px-5 mt-5">
          <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/50 font-semibold mb-3">
            Featured
          </p>
          <div className="space-y-3">
            {featured.map((biz, i) => (
              <FeaturedBusinessCard key={biz._id} business={biz} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Regular businesses — compact 2-column grid */}
      {regular.length > 0 && (
        <section className="px-5 mt-6">
          {featured.length > 0 && (
            <p className="text-[10px] uppercase tracking-[2px] text-white/25 font-semibold mb-3">
              All Businesses
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {regular.map((biz, i) => (
              <CompactBusinessCard
                key={biz._id}
                business={biz}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {businesses && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 px-5"
        >
          <Store size={36} className="mx-auto text-white/15 mb-3" />
          <p className="text-white/35 text-sm">No businesses found</p>
          <p className="text-white/20 text-xs mt-1">Try a different search or category</p>
        </motion.div>
      )}

      {/* Loading */}
      {!businesses && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-kente-gold/30 border-t-kente-gold animate-spin" />
        </div>
      )}

      {/* Bottom spacer */}
      <div className="h-6" />
    </div>
  );
}

/* ─── Category Chip ─── */
function CategoryChip({
  label,
  icon,
  count,
  active = false,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-[12px] font-medium
        whitespace-nowrap shrink-0 transition-all duration-200
        ${
          active
            ? "bg-kente-gold text-onyx shadow-[0_0_16px_rgba(252,209,22,0.2)]"
            : "bg-white/[0.03] text-white/45 border border-white/[0.06] hover:border-white/10 hover:text-white/60"
        }
      `}
    >
      {icon}
      {label}
      {count !== undefined && !active && (
        <span className="text-[10px] text-white/25 ml-0.5">{count}</span>
      )}
    </button>
  );
}

/* ─── Featured Business Card (large, immersive) ─── */
function FeaturedBusinessCard({
  business,
  index,
}: {
  business: any;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/directory/${business._id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden border border-kente-gold/20 shadow-[0_0_24px_rgba(252,209,22,0.08)]">
          {/* Gradient hero with overlay */}
          <div
            className="h-36 relative"
            style={getGradientStyle(business.image)}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/30 to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 bg-kente-gold/90 text-onyx text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                <Star size={10} fill="currentColor" />
                Featured
              </span>
            </div>

            {/* Business info overlaid on gradient */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-display text-lg font-bold text-white leading-tight group-hover:text-kente-gold transition-colors duration-200">
                {business.name}
              </h3>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-[12px] text-white/60">
                  <MapPin size={11} className="text-kente-gold/60" />
                  {business.location}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-kente-gold/80">
                  <Star size={11} fill="currentColor" />
                  {business.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bg-surface px-4 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-white/40">{business.category}</span>
            <span className="text-[11px] text-kente-gold/50 group-hover:text-kente-gold transition-colors">
              View details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Compact Business Card (2-column grid) ─── */
function CompactBusinessCard({
  business,
  index,
}: {
  business: any;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.04, ease: "easeOut" }}
    >
      <Link href={`/directory/${business._id}`} className="block group">
        <div className="rounded-xl overflow-hidden bg-surface border border-white/[0.04] hover:border-gold-border transition-all duration-200 hover:-translate-y-0.5">
          {/* Small gradient accent strip */}
          <div
            className="h-2"
            style={getGradientStyle(business.image)}
          />

          <div className="p-3">
            {/* Name */}
            <h3 className="font-display text-[13px] font-semibold text-white leading-snug line-clamp-1 group-hover:text-kente-gold transition-colors duration-200">
              {business.name}
            </h3>

            {/* Category */}
            <p className="text-[11px] text-white/30 mt-0.5">{business.category}</p>

            {/* Location + Rating */}
            <div className="flex items-center justify-between mt-2.5">
              <span className="flex items-center gap-1 text-[10px] text-white/35 truncate max-w-[70%]">
                <MapPin size={10} className="shrink-0 text-white/25" />
                {business.location.split(",")[0]}
              </span>
              <span className="flex items-center gap-0.5 text-[11px] text-kente-gold/70">
                <Star size={10} fill="currentColor" />
                {business.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
