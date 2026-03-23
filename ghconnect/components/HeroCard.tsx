"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface HeroCardProps {
  href: string;
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function HeroCard({
  href,
  label,
  title,
  subtitle,
  className = "",
}: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      <Link
        href={href}
        className="block p-4 bg-surface border border-gold-border rounded-xl min-h-[140px] relative"
      >
        {label && (
          <p className="text-xs uppercase tracking-wider text-white/60 mb-1">
            {label}
          </p>
        )}
        <h2 className="font-display text-2xl text-white">{title}</h2>
        {subtitle && (
          <p className="font-body text-sm text-white/60 mt-1">{subtitle}</p>
        )}
        <ChevronRight
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
        />
      </Link>
    </motion.div>
  );
}
