"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface FeedCardProps {
  href: string;
  image?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  featured?: boolean;
  index?: number;
}

export function FeedCard({
  href,
  title,
  subtitle,
  badge,
  featured = false,
  index = 0,
}: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link href={href} className="group block">
        <div className={`
          py-4 flex items-center justify-between gap-3
          border-b border-white/[0.04]
          ${featured ? "border-l-2 border-l-kente-gold pl-4 -ml-0.5" : ""}
        `}>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <h3 className="text-[15px] font-medium text-white/90 truncate group-hover:text-white transition-colors duration-200">
                {title}
              </h3>
              {badge && (
                <span className="shrink-0 text-[10px] text-white/20 uppercase tracking-wider">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-white/35 mt-0.5 truncate">
              {subtitle}
            </p>
          </div>
          <ChevronRight
            size={16}
            className="shrink-0 text-white/10 group-hover:text-white/30 transition-colors duration-200"
          />
        </div>
      </Link>
    </motion.div>
  );
}
