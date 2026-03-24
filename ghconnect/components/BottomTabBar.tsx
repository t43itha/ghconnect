"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { T, F, SECTION } from "@/lib/theme";

const TABS = [
  { id: "home", icon: "home", label: "Home", href: "/home" },
  { id: "directory", icon: "grid", label: "Directory", href: "/directory" },
  { id: "events", icon: "calendar", label: "Events", href: "/events" },
  { id: "jobs", icon: "briefcase", label: "Jobs", href: "/jobs" },
  { id: "profile", icon: "user", label: "Profile", href: "/profile" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "rgba(250,250,250,0.82)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        borderTop: `1px solid ${T.border}`,
        padding: "6px 6px max(env(safe-area-inset-bottom, 10px), 10px)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      {TABS.map((tab) => {
        const active =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        const activeColor =
          SECTION[tab.id as keyof typeof SECTION]?.color || T.green;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px 14px",
              borderRadius: 12,
              position: "relative",
              textDecoration: "none",
            }}
          >
            {active && (
              <span
                style={{
                  position: "absolute",
                  top: -1,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 18,
                  height: 2.5,
                  borderRadius: 2,
                  background: activeColor,
                }}
              />
            )}
            <Icon
              name={tab.icon}
              size={21}
              color={active ? activeColor : T.tertiary}
              strokeWidth={active ? 2 : 1.5}
            />
            <span
              style={{
                fontFamily: F.sans,
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                color: active ? activeColor : T.tertiary,
                letterSpacing: 0.3,
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
