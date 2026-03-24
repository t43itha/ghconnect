"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Mono } from "@/components/Mono";
import { ThemedSearch } from "@/components/ThemedSearch";
import Link from "next/link";

export default function JobsPage() {
  const jobs = useQuery(api.jobs.list);
  const S = SECTION.jobs;

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
            Opportunities
          </h1>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              margin: "4px 0 0",
            }}
          >
            Build your career in the diaspora
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div style={{ marginTop: 20 }}>
          <ThemedSearch placeholder="Search roles, companies..." color={S.color} />
        </div>
      </Reveal>

      <div style={{ marginTop: 18 }}>
        {jobs === undefined && (
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

        {jobs !== undefined && jobs.length === 0 && (
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            No jobs found
          </p>
        )}

        {jobs?.map((j, i) => (
          <Reveal key={j._id} delay={160 + i * 70}>
            <Link href={`/jobs/${j._id}`} style={{ textDecoration: "none" }}>
              <div
                onMouseEnter={(e) => hv(e, true)}
                onMouseLeave={(e) => hv(e, false)}
                style={{
                  background: T.surface,
                  borderRadius: T.rs,
                  padding: 20,
                  marginBottom: 12,
                  border: `1px solid ${T.border}`,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <Mono size={42} color={S.color} darkColor={S.dark}>
                      {j.company[0]}
                    </Mono>
                    <div>
                      <h4
                        style={{
                          fontFamily: F.sans,
                          fontSize: 16,
                          fontWeight: 700,
                          margin: 0,
                          color: T.ink,
                        }}
                      >
                        {j.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: F.sans,
                          fontSize: 13,
                          color: T.secondary,
                          margin: "2px 0 0",
                        }}
                      >
                        {j.company}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: F.sans,
                      fontSize: 11,
                      color: T.tertiary,
                      marginTop: 2,
                    }}
                  >
                    {j.postedDate}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                  {[j.location, j.type].map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: F.sans,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "5px 12px",
                        borderRadius: 100,
                        background: T.surfaceAlt,
                        color: T.secondary,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    style={{
                      fontFamily: F.sans,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 12px",
                      borderRadius: 100,
                      background: S.soft,
                      color: S.color,
                    }}
                  >
                    {j.salary}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
