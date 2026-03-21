"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";
import { Search, Star, MapPin, X, Store } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { KenteStrip } from "@/components/KenteStrip";

export default function DirectoryPage() {
  const businesses = useQuery(api.businesses.list);
  const categories = useQuery(api.categories.byType, { type: "business" });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (!businesses) return [];
    return businesses.filter((b) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q);
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
      <header className="px-6 pt-[env(safe-area-inset-top,20px)] pb-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-[1.75rem] font-bold text-white tracking-tight">
            Directory
          </h1>
          <p className="text-[13px] text-white/25 mt-0.5">
            {filtered.length} business{filtered.length !== 1 ? "es" : ""}
          </p>
        </motion.div>
      </header>

      <div className="px-6">
        {/* Search */}
        <motion.div
          className="relative mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Search
            size={15}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20"
          />
          <input
            type="text"
            placeholder="Search by name, category, or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/[0.06] pl-6 pr-8 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.12] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <X size={14} className="text-white/25" />
            </button>
          )}
        </motion.div>

        {/* Category tabs — understated text */}
        <motion.div
          className="flex gap-1 overflow-x-auto scrollbar-hide mt-5 -mx-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TabButton
            label="All"
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {categories?.map((cat) => (
            <TabButton
              key={cat._id}
              label={cat.name}
              active={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name)}
            />
          ))}
        </motion.div>

        <div className="mt-5">
          <KenteStrip className="rounded-full" />
        </div>

        {/* Featured — distinguished by gold left border and slightly larger type */}
        {featured.length > 0 && (
          <section className="mt-6">
            <p className="text-[10px] uppercase tracking-[2px] text-kente-gold/40 font-medium mb-2">
              Featured
            </p>
            {featured.map((biz, i) => (
              <BusinessRow key={biz._id} business={biz} featured index={i} />
            ))}
          </section>
        )}

        {/* All businesses */}
        {regular.length > 0 && (
          <section className={featured.length > 0 ? "mt-6" : "mt-6"}>
            {featured.length > 0 && (
              <p className="text-[10px] uppercase tracking-[2px] text-white/15 font-medium mb-2">
                All
              </p>
            )}
            {regular.map((biz, i) => (
              <BusinessRow
                key={biz._id}
                business={biz}
                index={featured.length + i}
              />
            ))}
          </section>
        )}

        {/* Empty */}
        {businesses && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/20 text-[14px]">No businesses found</p>
          </motion.div>
        )}

        {/* Loading */}
        {!businesses && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 rounded-full border border-white/10 border-t-white/40 animate-spin" />
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}

/* ─── Tab Button ─── */
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 text-[12px] rounded-full whitespace-nowrap transition-all duration-200
        ${active
          ? "text-onyx bg-kente-gold font-medium"
          : "text-white/30 hover:text-white/50"
        }
      `}
    >
      {label}
    </button>
  );
}

/* ─── Business Row ─── */
function BusinessRow({
  business,
  featured = false,
  index = 0,
}: {
  business: any;
  featured?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 + index * 0.03 }}
    >
      <Link href={`/directory/${business._id}`} className="group block">
        <div
          className={`
            py-4 border-b border-white/[0.03]
            ${featured ? "border-l-2 border-l-kente-gold pl-4 -ml-0.5" : ""}
          `}
        >
          {/* Name + Rating */}
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={`
                font-display tracking-tight text-white/90
                group-hover:text-white transition-colors duration-200
                ${featured ? "text-[17px] font-semibold" : "text-[15px] font-medium"}
              `}
            >
              {business.name}
            </h3>
            <span className="flex items-center gap-1 text-[12px] text-white/25 shrink-0">
              <Star size={11} fill="currentColor" className="text-kente-gold/50" />
              {business.rating}
            </span>
          </div>

          {/* Category + Location */}
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[12px] text-white/30">{business.category}</span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1 text-[12px] text-white/20">
              <MapPin size={10} />
              {business.location}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
