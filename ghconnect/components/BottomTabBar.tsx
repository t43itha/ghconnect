"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Store, Briefcase, User } from "lucide-react";

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
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-onyx/90 backdrop-blur-xl border-t border-white/[0.04]">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map(({ label, icon: Icon, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-[3px] py-1 px-4"
            >
              <Icon
                size={20}
                strokeWidth={active ? 2 : 1.5}
                className={`transition-colors duration-300 ${
                  active ? "text-kente-gold" : "text-white/25"
                }`}
              />
              <span
                className={`text-[9px] tracking-wide transition-colors duration-300 ${
                  active ? "text-kente-gold font-medium" : "text-white/25"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
