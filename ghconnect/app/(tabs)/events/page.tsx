"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { ThemedPill } from "@/components/ThemedPill";
import { ThemedSearch } from "@/components/ThemedSearch";
import Link from "next/link";

const types = ["All", "Cultural", "Business", "Social"];

export default function EventsPage() {
  const events = useQuery(api.events.list);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered =
    events === undefined
      ? undefined
      : events.filter((e) => {
          const matchesType = filter === "All" || e.category === filter;
          if (!matchesType) return false;
          if (!search.trim()) return true;
          const q = search.toLowerCase();
          return (
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q)
          );
        });

  const hv = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    e.currentTarget.style.transform = on ? "translateY(-2px)" : "";
    e.currentTarget.style.boxShadow = on ? T.s3 : "";
  };

  const S = SECTION.events;

  return (
    <div style={{ padding: "0 24px 120px" }}>
      <Reveal>
        <div style={{ paddingTop: 56 }}>
          <h1
            style={{
              fontFamily: F.serif,
              fontSize: 38,
              fontWeight: 700,
              margin: 0,
              color: T.ink,
              letterSpacing: -1,
            }}
          >
            Events
          </h1>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              margin: "4px 0 0",
            }}
          >
            Gatherings that bring us together
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div style={{ marginTop: 20 }}>
          <ThemedSearch
            placeholder="Search events..."
            color={S.color}
            value={search}
            onChange={setSearch}
          />
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 16,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {types.map((t) => (
            <ThemedPill
              key={t}
              active={filter === t}
              onClick={() => setFilter(t)}
              color={S.color}
            >
              {t}
            </ThemedPill>
          ))}
        </div>
      </Reveal>

      <div style={{ marginTop: 18 }}>
        {filtered === undefined && (
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Loading...
          </p>
        )}

        {filtered !== undefined && filtered.length === 0 && (
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            No events found
          </p>
        )}

        {filtered?.map((ev, i) => {
          const d = new Date(ev.date);
          return (
            <Reveal key={ev._id} delay={160 + i * 70}>
              <Link href={`/events/${ev._id}`} style={{ textDecoration: "none" }}>
                <div
                  onMouseEnter={(e) => hv(e, true)}
                  onMouseLeave={(e) => hv(e, false)}
                  style={{
                    background: T.surface,
                    borderRadius: T.r,
                    padding: 20,
                    marginBottom: 12,
                    border: `1px solid ${T.border}`,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 4,
                      height: "100%",
                      background: S.color,
                      borderRadius: `${T.r}px 0 0 ${T.r}px`,
                    }}
                  />

                  <div style={{ display: "flex", gap: 16 }}>
                    {/* Date block */}
                    <div style={{ textAlign: "center", flexShrink: 0, minWidth: 46 }}>
                      <span
                        style={{
                          fontFamily: F.sans,
                          fontSize: 10,
                          fontWeight: 700,
                          color: S.color,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                        }}
                      >
                        {d.toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                      <div
                        style={{
                          fontFamily: F.serif,
                          fontSize: 36,
                          fontWeight: 700,
                          color: T.ink,
                          lineHeight: 1,
                          marginTop: 1,
                        }}
                      >
                        {d.getDate()}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontFamily: F.sans,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 100,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                          background: S.soft,
                          color: S.color,
                        }}
                      >
                        {ev.category}
                      </span>
                      <h4
                        style={{
                          fontFamily: F.serif,
                          fontSize: 21,
                          fontWeight: 700,
                          margin: "8px 0 0",
                          color: T.ink,
                          letterSpacing: -0.3,
                          lineHeight: 1.15,
                        }}
                      >
                        {ev.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: F.sans,
                          fontSize: 13,
                          color: T.secondary,
                          margin: "4px 0 0",
                        }}
                      >
                        {ev.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginTop: 10,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Icon name="pin" size={12} color={T.tertiary} />
                          <span
                            style={{
                              fontFamily: F.sans,
                              fontSize: 12,
                              color: T.secondary,
                            }}
                          >
                            {ev.location}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
