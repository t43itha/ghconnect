"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Mono } from "@/components/Mono";
import { ThemedPill } from "@/components/ThemedPill";
import { ThemedSearch } from "@/components/ThemedSearch";
import Link from "next/link";

const categories = ["All", "Restaurant", "Legal", "Fashion", "Transport", "Finance", "Health"];

export default function DirectoryPage() {
  const businesses = useQuery(api.businesses.list);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered =
    businesses === undefined
      ? undefined
      : businesses.filter((b) => {
          const matchesCat = cat === "All" || b.category === cat;
          if (!matchesCat) return false;
          if (!search.trim()) return true;
          const q = search.toLowerCase();
          return (
            b.name.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            (b.description ?? "").toLowerCase().includes(q)
          );
        });

  const hv = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    e.currentTarget.style.transform = on ? "translateY(-2px)" : "";
    e.currentTarget.style.boxShadow = on ? T.s3 : "";
  };

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
            Directory
          </h1>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              margin: "4px 0 0",
            }}
          >
            Trusted Ghanaian businesses across the UK
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div style={{ marginTop: 20 }}>
          <ThemedSearch placeholder="Search businesses..." color={SECTION.directory.color} value={search} onChange={setSearch} />
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            marginTop: 16,
            paddingBottom: 4,
            scrollbarWidth: "none",
          }}
        >
          {categories.map((c) => (
            <ThemedPill
              key={c}
              active={cat === c}
              onClick={() => setCat(c)}
              color={SECTION.directory.color}
            >
              {c}
            </ThemedPill>
          ))}
        </div>
      </Reveal>

      <div style={{ marginTop: 16 }}>
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
            No businesses found
          </p>
        )}

        {filtered?.map((b, i) => (
          <Reveal key={b._id} delay={200 + i * 60}>
            <Link href={`/directory/${b._id}`} style={{ textDecoration: "none" }}>
              <div
                onMouseEnter={(e) => hv(e, true)}
                onMouseLeave={(e) => hv(e, false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 14px",
                  background: T.surface,
                  borderRadius: T.rs,
                  marginBottom: 10,
                  border: `1px solid ${T.border}`,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <Mono size={48} color={SECTION.directory.color} darkColor={SECTION.directory.dark}>
                  {b.name[0]}
                </Mono>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      fontFamily: F.sans,
                      fontSize: 16,
                      fontWeight: 700,
                      margin: 0,
                      color: T.ink,
                    }}
                  >
                    {b.name}
                  </h4>
                  <p
                    style={{
                      fontFamily: F.sans,
                      fontSize: 13,
                      color: T.secondary,
                      margin: "2px 0 0",
                    }}
                  >
                    {b.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Icon name="star" size={11} color={T.gold} />
                      <span
                        style={{
                          fontFamily: F.sans,
                          fontSize: 12,
                          fontWeight: 700,
                          color: T.ink,
                        }}
                      >
                        {b.rating}
                      </span>
                    </span>
                    <span style={{ color: T.faint }}>&middot;</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Icon name="pin" size={11} color={T.tertiary} />
                      <span style={{ fontFamily: F.sans, fontSize: 12, color: T.tertiary }}>
                        {b.location}
                      </span>
                    </span>
                  </div>
                </div>
                <Icon name="arrow" size={15} color={T.faint} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
