"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function SecondaryButton({
  children,
  onClick,
  href,
  className = "",
}: SecondaryButtonProps) {
  const baseClass = `inline-flex items-center justify-center border border-kente-gold text-kente-gold text-sm font-semibold font-body rounded-full px-5 py-2.5 ${className}`;

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={baseClass}
    >
      {children}
    </motion.button>
  );
}
