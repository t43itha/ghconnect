"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Mono } from "@/components/Mono";
import { DetailView } from "@/components/DetailView";
import { InfoRow } from "@/components/InfoRow";
import { ActionBtn } from "@/components/ActionBtn";
import { handleShare } from "@/lib/share";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"jobs">;
  const j = useQuery(api.jobs.getById, id ? { id } : "skip");

  if (!j) {
    return (
      <p
        style={{
          fontFamily: F.sans,
          fontSize: 14,
          color: T.secondary,
          textAlign: "center",
          padding: "80px 0",
        }}
      >
        Loading...
      </p>
    );
  }

  const S = SECTION.jobs;

  return (
    <DetailView onBack={() => router.back()} color={S.color}>
      <Reveal delay={50}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, paddingTop: 12 }}>
          <Mono size={56} color={S.color} darkColor={S.dark}>
            {j.company[0]}
          </Mono>
          <div>
            <h1
              style={{
                fontFamily: F.sans,
                fontSize: 22,
                fontWeight: 700,
                margin: 0,
                color: T.ink,
              }}
            >
              {j.title}
            </h1>
            <p
              style={{
                fontFamily: F.sans,
                fontSize: 15,
                color: T.secondary,
                margin: "4px 0 0",
              }}
            >
              {j.company}
            </p>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {[j.location, j.type].map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: F.sans,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 12px",
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
                  padding: "4px 12px",
                  borderRadius: 100,
                  background: S.soft,
                  color: S.color,
                }}
              >
                {j.salary}
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div style={{ marginTop: 28 }}>
          <InfoRow icon="briefcase" label="Employment type" value={j.type} />
          <InfoRow icon="pin" label="Location" value={j.location} />
          <InfoRow icon="clock" label="Posted" value={`${j.postedDate} ago`} />
          <InfoRow icon="users" label="Applicants" value="23 applicants" />
        </div>
      </Reveal>

      <Reveal delay={250}>
        <div
          style={{
            marginTop: 20,
            padding: 18,
            background: T.surfaceAlt,
            borderRadius: T.rs,
          }}
        >
          <h4
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              fontWeight: 700,
              margin: 0,
              color: T.ink,
            }}
          >
            About the role
          </h4>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              color: T.secondary,
              margin: "8px 0 0",
              lineHeight: 1.6,
            }}
          >
            {j.description}
          </p>
        </div>
      </Reveal>

      <Reveal delay={320}>
        <div
          style={{
            marginTop: 16,
            padding: 18,
            background: T.surfaceAlt,
            borderRadius: T.rs,
          }}
        >
          <h4
            style={{
              fontFamily: F.sans,
              fontSize: 14,
              fontWeight: 700,
              margin: 0,
              color: T.ink,
            }}
          >
            Key requirements
          </h4>
          {j.requirements?.map((req, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: i === 0 ? 10 : 8,
              }}
            >
              <Icon name="check" size={14} color={S.color} strokeWidth={2.5} />
              <span style={{ fontFamily: F.sans, fontSize: 14, color: T.secondary }}>
                {req}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <ActionBtn label="Apply Now" icon="arrow" color={S.color} onClick={() => {}} />
          <ActionBtn
            label="Share"
            icon="share"
            color={S.color}
            outline
            onClick={() =>
              handleShare(j.title, `${j.title} at ${j.company} — ${j.salary} | ${j.location}`)
            }
          />
        </div>
      </Reveal>
    </DetailView>
  );
}
