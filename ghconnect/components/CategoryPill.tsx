"use client";

import { motion } from "motion/react";

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ label, active = false, onClick }: CategoryPillProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        shrink-0 rounded-full px-5 py-2 text-sm font-medium
        transition-colors duration-200 cursor-pointer
        border select-none
        ${
          active
            ? "bg-kente-gold text-onyx border-kente-gold shadow-[0_0_12px_rgba(252,209,22,0.3)]"
            : "bg-gold-mist text-white/70 border-gold-border hover:text-white hover:border-kente-gold/30"
        }
      `}
    >
      {label}
    </motion.button>
  );
}
