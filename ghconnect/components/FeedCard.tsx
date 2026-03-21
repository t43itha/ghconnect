"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GradientHero } from "./GradientHero";

interface FeedCardProps {
  href: string;
  image: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  featured?: boolean;
  index?: number;
}

export function FeedCard({
  href,
  image,
  icon,
  title,
  subtitle,
  badge,
  featured = false,
  index = 0,
}: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link href={href} className="block group">
        <div
          className={`
            rounded-2xl overflow-hidden
            transition-all duration-300
            bg-surface
            border
            ${
              featured
                ? "border-kente-gold/40 shadow-[0_0_20px_rgba(252,209,22,0.12)]"
                : "border-gold-border hover:border-kente-gold/25"
            }
            hover:shadow-[0_4px_24px_rgba(252,209,22,0.08)]
            hover:-translate-y-0.5
          `}
        >
          {/* Gradient thumbnail */}
          <GradientHero
            image={image}
            icon={icon}
            className="h-36 rounded-t-2xl"
          />

          {/* Content */}
          <div className="p-4 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-white leading-snug line-clamp-1 group-hover:text-kente-gold transition-colors duration-200">
                {title}
              </h3>
              {badge && (
                <span className="shrink-0 rounded-full bg-gold-mist border border-gold-border px-2.5 py-0.5 text-xs font-medium text-kente-gold">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
