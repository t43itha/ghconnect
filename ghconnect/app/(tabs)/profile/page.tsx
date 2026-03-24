"use client";

import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const viewer = useQuery(api.users.viewer);

  const initials = viewer?.name
    ? viewer.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "G";

  return (
    <div style={{ padding: "0 24px 120px" }}>
      <Reveal>
        <div style={{ paddingTop: 56, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: T.ink, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: T.s2, position: "relative", overflow: "hidden" }}>
            {isAuthenticated && viewer?.image ? (
              <img src={viewer.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontFamily: F.serif, fontSize: 38, fontWeight: 700, color: T.white }}>{initials}</span>
            )}
            {!isAuthenticated && (
              <div style={{ position: "absolute", bottom: -2, right: -2, width: 26, height: 26, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${T.bg}` }}>
                <Icon name="plus" size={12} color={T.white} strokeWidth={2.5} />
              </div>
            )}
          </div>

          {isLoading ? (
            <p style={{ fontFamily: F.sans, fontSize: 14, color: T.secondary, margin: "14px 0 0" }}>Loading...</p>
          ) : isAuthenticated && viewer ? (
            <>
              <h2 style={{ fontFamily: F.serif, fontSize: 28, fontWeight: 700, margin: "14px 0 0", color: T.ink }}>{viewer.name ?? "User"}</h2>
              <p style={{ fontFamily: F.sans, fontSize: 14, color: T.secondary, margin: "4px 0 0" }}>{viewer.email ?? ""}</p>
              <div
                onClick={() => void signOut()}
                style={{
                  marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
                  background: T.ink, borderRadius: 100, padding: "14px 30px",
                  fontFamily: F.sans, fontSize: 15, fontWeight: 700, color: T.white,
                  cursor: "pointer", boxShadow: T.s2, transition: "transform 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "")}
              >
                Sign Out
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: F.serif, fontSize: 28, fontWeight: 700, margin: "14px 0 0", color: T.ink }}>Welcome</h2>
              <p style={{ fontFamily: F.sans, fontSize: 14, color: T.secondary, margin: "4px 0 0" }}>Sign in to unlock everything</p>
              <div
                onClick={() => void signIn("google", { redirectTo: "/profile" })}
                style={{
                  marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
                  background: T.green, borderRadius: 100, padding: "14px 30px",
                  fontFamily: F.sans, fontSize: 15, fontWeight: 700, color: T.white,
                  cursor: "pointer", boxShadow: T.sGreen, transition: "transform 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "")}
              >
                Create Account
              </div>
            </>
          )}
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div style={{ marginTop: 36 }}>
          {[
            { icon: "grid", label: "My Businesses", sub: "Manage your listings", c: SECTION.directory.color },
            { icon: "heart", label: "Saved", sub: "Events & businesses you love", c: SECTION.events.color },
            { icon: "briefcase", label: "Applications", sub: "Track job applications", c: SECTION.jobs.color },
            { icon: "user", label: "Network", sub: "Your connections", c: T.ink },
            { icon: "bell", label: "Notifications", sub: "Stay updated", c: T.ink },
          ].map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: 14, padding: "15px 0",
                borderBottom: i < 4 ? `1px solid ${T.borderLight}` : "none",
                cursor: "pointer", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${it.c}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={it.icon} size={17} color={it.c} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 700, margin: 0, color: T.ink }}>{it.label}</h4>
                <p style={{ fontFamily: F.sans, fontSize: 12, color: T.tertiary, margin: "1px 0 0" }}>{it.sub}</p>
              </div>
              <Icon name="arrow" size={14} color={T.faint} />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
