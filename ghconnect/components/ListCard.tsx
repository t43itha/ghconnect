"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface ListCardProps {
  href: string;
  thumbnail?: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  trailing?: React.ReactNode;
  index?: number;
}

export default function ListCard({
  href,
  thumbnail,
  title,
  subtitle,
  badge,
  trailing,
  index = 0,
}: ListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="flex flex-row items-center gap-3 p-3 bg-surface border border-gold-border rounded-xl"
      >
        {thumbnail && <div className="shrink-0">{thumbnail}</div>}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{title}</p>
          {subtitle && (
            <p className="text-sm text-white/60 truncate mt-0.5">{subtitle}</p>
          )}
          {badge && <div className="mt-1">{badge}</div>}
        </div>

        <div className="shrink-0 flex items-center gap-1">
          {trailing && <div>{trailing}</div>}
          <ChevronRight size={16} className="text-white/40" />
        </div>
      </Link>
    </motion.div>
  );
}
