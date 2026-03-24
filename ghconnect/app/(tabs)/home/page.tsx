"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Mono } from "@/components/Mono";
import { ThemedSearch } from "@/components/ThemedSearch";

export default function HomePage() {
  const router = useRouter();
  const [gr, setGr] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    setGr(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const businesses = useQuery(api.businesses.list);
  const events = useQuery(api.events.list);
  const [search, setSearch] = useState("");

  const filteredBusinesses = useMemo(() => {
    if (businesses === undefined) return undefined;
    if (!search.trim()) return businesses.slice(0, 4);
    const q = search.toLowerCase();
    return businesses
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (b.description ?? "").toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [businesses, search]);

  const filteredEvents = useMemo(() => {
    if (events === undefined) return undefined;
    if (!search.trim()) return events.slice(0, 3);
    const q = search.toLowerCase();
    return events
      .filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          (ev.description ?? "").toLowerCase().includes(q) ||
          ev.location.toLowerCase().includes(q)
      )
      .slice(0, 3);
  }, [events, search]);

  const hv = (e: React.MouseEvent<HTMLDivElement>, on: boolean) => {
    e.currentTarget.style.transform = on ? "translateY(-2px)" : "";
    e.currentTarget.style.boxShadow = on ? T.s3 : "";
  };

  const tiles = [
    { ...SECTION.marketplace, label: "High Commission", sub: "Embassy info", icon: "building", tab: "/highcom" },
    { ...SECTION.events, label: "Events", sub: "What's on", icon: "calendar", tab: "/events" },
    { ...SECTION.jobs, label: "Jobs", sub: "Opportunities", icon: "briefcase", tab: "/jobs" },
    { ...SECTION.directory, label: "Directory", sub: "Find businesses", icon: "grid", tab: "/directory" },
  ];

  return (
    <div style={{ padding: "0 24px 120px" }}>
      <Reveal delay={80}>
        <div style={{ paddingTop: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: F.sans, fontSize: 13, color: T.tertiary, margin: 0, letterSpacing: 0.5, fontWeight: 500 }}>{gr}</p>
            <h1 style={{ fontFamily: F.serif, fontSize: 38, fontWeight: 700, margin: "2px 0 0", color: T.ink, letterSpacing: -1, lineHeight: 1.05 }}>
              Ghana<span style={{ color: T.green }}>Connect</span>
            </h1>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: T.s1, border: `1px solid ${T.border}`, cursor: "pointer", marginTop: 10 }}>
            <Icon name="bell" size={18} color={T.ink} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div style={{ marginTop: 22 }}>
          <ThemedSearch placeholder="Search businesses, events, jobs..." color={T.green} value={search} onChange={setSearch} />
        </div>
      </Reveal>

      <Reveal delay={280}>
        <div style={{ marginTop: 26, borderRadius: T.r, overflow: "hidden", background: T.ink, position: "relative", padding: "34px 26px 30px" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, background: `radial-gradient(circle, ${T.green}25 0%, transparent 65%)` }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, background: `radial-gradient(circle, ${SECTION.events.color}15 0%, transparent 65%)` }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "18px 18px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,107,63,0.15)", borderRadius: 100, padding: "5px 14px 5px 9px", marginBottom: 18 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, color: "#F5F5F5", letterSpacing: 1.5, textTransform: "uppercase" }}>Diaspora Network</span>
            </div>
            <h2 style={{ fontFamily: F.serif, fontSize: 32, fontWeight: 700, color: "#F5F5F5", margin: 0, lineHeight: 1.12, letterSpacing: -0.8 }}>
              One Community.<br /><span style={{ color: "#4ADE80" }}>Infinite Possibility.</span>
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: 14, color: "rgba(245,245,245,0.45)", margin: "14px 0 0", lineHeight: 1.55, maxWidth: 270 }}>
              120,000+ Ghanaians across the UK &amp; Ireland. Connect, build, and thrive.
            </p>
            <div
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
              style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8, background: T.green, borderRadius: 100, padding: "13px 24px", fontFamily: F.sans, fontSize: 14, fontWeight: 700, color: T.white, cursor: "pointer", boxShadow: T.sGreen, transition: "transform 0.2s" }}
            >
              Join the Community <Icon name="arrow" size={15} color={T.white} strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={420}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 26 }}>
          {tiles.map((it, i) => (
            <div
              key={i}
              onClick={() => router.push(it.tab)}
              style={{ background: it.color, borderRadius: T.rs, padding: "24px 18px", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", position: "relative", overflow: "hidden", boxShadow: it.shadow }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
            >
              <div style={{ position: "absolute", top: -12, right: -12, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", bottom: -8, left: -8, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon name={it.icon} size={18} color={T.white} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 700, margin: 0, color: T.white }}>{it.label}</h4>
              <p style={{ fontFamily: F.sans, fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "3px 0 0" }}>{it.sub}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={560}>
        <div style={{ marginTop: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <h3 style={{ fontFamily: F.serif, fontSize: 26, fontWeight: 700, margin: 0, color: T.ink, letterSpacing: -0.5 }}>Featured</h3>
            <span onClick={() => router.push("/directory")} style={{ fontFamily: F.sans, fontSize: 13, color: SECTION.directory.color, cursor: "pointer", fontWeight: 600 }}>View all</span>
          </div>
          <div style={{ display: "flex", gap: 13, overflowX: "auto", margin: "0 -24px", padding: "0 24px 8px", scrollbarWidth: "none" }}>
            {filteredBusinesses === undefined ? (
              <p style={{ fontFamily: F.sans, fontSize: 14, color: T.tertiary, textAlign: "center", width: "100%" }}>Loading...</p>
            ) : (
              filteredBusinesses.map(b => (
                <div
                  key={b._id}
                  onMouseEnter={e => hv(e, true)}
                  onMouseLeave={e => hv(e, false)}
                  style={{ minWidth: 190, background: T.surface, borderRadius: T.rs, padding: 18, border: `1px solid ${T.border}`, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0 }}
                >
                  <Mono size={42} color={SECTION.directory.color} darkColor={SECTION.directory.dark}>{b.name[0]}</Mono>
                  <h4 style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 700, margin: "12px 0 2px", color: T.ink }}>{b.name}</h4>
                  <p style={{ fontFamily: F.sans, fontSize: 12, color: T.secondary, margin: 0, lineHeight: 1.4 }}>{b.category}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                    <Icon name="star" size={12} color={T.gold} />
                    <span style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: T.ink }}>{b.rating ?? "—"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={680}>
        <div style={{ marginTop: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <h3 style={{ fontFamily: F.serif, fontSize: 26, fontWeight: 700, margin: 0, color: T.ink, letterSpacing: -0.5 }}>Upcoming</h3>
            <span onClick={() => router.push("/events")} style={{ fontFamily: F.sans, fontSize: 13, color: SECTION.events.color, cursor: "pointer", fontWeight: 600 }}>See all</span>
          </div>
          {filteredEvents === undefined ? (
            <p style={{ fontFamily: F.sans, fontSize: 14, color: T.tertiary, textAlign: "center" }}>Loading...</p>
          ) : (
            filteredEvents.map((ev, i) => {
              const d = new Date(ev.date);
              return (
                <div key={ev._id} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: i < 2 ? `1px solid ${T.borderLight}` : "none", cursor: "pointer" }}>
                  <div style={{ width: 50, height: 56, borderRadius: T.rxs, background: T.surface, border: `1.5px solid ${T.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    <div style={{ width: "100%", height: 3, background: SECTION.events.color }} />
                    <span style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, color: SECTION.events.color, textTransform: "uppercase", marginTop: 5, letterSpacing: 0.5 }}>
                      {d.toLocaleDateString("en-GB", { month: "short" })}
                    </span>
                    <span style={{ fontFamily: F.serif, fontSize: 22, fontWeight: 700, color: T.ink, lineHeight: 1 }}>
                      {d.getDate()}
                    </span>
                  </div>
                  <div style={{ flex: 1, paddingTop: 1 }}>
                    <h4 style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 700, margin: 0, color: T.ink }}>{ev.title}</h4>
                    <p style={{ fontFamily: F.sans, fontSize: 13, color: T.secondary, margin: "2px 0 0" }}>{ev.description}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7 }}>
                      <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 100, background: T.surfaceAlt, color: T.secondary }}>{ev.location}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Reveal>
    </div>
  );
}
