"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Store, Briefcase, User } from "lucide-react";
import { motion } from "motion/react";

const tabs = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Explore", icon: Search, href: "/explore" },
  { label: "Directory", icon: Store, href: "/directory" },
  { label: "Jobs", icon: Briefcase, href: "/jobs" },
  { label: "More", icon: User, href: "/vision" },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-lg border-t border-gold-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(({ label, icon: Icon, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 relative py-1 px-3"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative"
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.2 : 1.6}
                  className={`transition-colors duration-200 ${
                    active
                      ? "text-kente-gold drop-shadow-[0_0_8px_rgba(252,209,22,0.5)]"
                      : "text-white/35"
                  }`}
                />
                {active && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-kente-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  active ? "text-kente-gold" : "text-white/35"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicators */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
