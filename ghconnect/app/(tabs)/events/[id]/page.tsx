"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "convex/values";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DetailView } from "@/components/DetailView";
import { InfoRow } from "@/components/InfoRow";
import { ActionBtn } from "@/components/ActionBtn";
import { handleShare } from "@/lib/share";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"events">;
  const ev = useQuery(api.events.getById, id ? { id } : "skip");

  if (!ev) {
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

  const S = SECTION.events;
  const d = new Date(ev.date);
  const dateStr = d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <DetailView onBack={() => router.back()} color={S.color}>
      {/* Header */}
      <Reveal delay={50}>
        <div style={{ paddingTop: 12 }}>
          <span
            style={{
              fontFamily: F.sans,
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 100,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              background: S.soft,
              color: S.color,
            }}
          >
            {ev.category}
          </span>
          <h1
            style={{
              fontFamily: F.serif,
              fontSize: 32,
              fontWeight: 700,
              margin: "14px 0 0",
              color: T.ink,
              letterSpacing: -0.5,
              lineHeight: 1.15,
            }}
          >
            {ev.title}
          </h1>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 16,
              color: T.secondary,
              margin: "6px 0 0",
            }}
          >
            {ev.description}
          </p>
        </div>
      </Reveal>

      {/* Date hero strip */}
      <Reveal delay={120}>
        <div
          style={{
            marginTop: 24,
            padding: "20px 22px",
            borderRadius: T.rs,
            background: `linear-gradient(135deg, ${S.color}, ${S.dark})`,
            display: "flex",
            alignItems: "center",
            gap: 18,
            boxShadow: S.shadow,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: F.sans,
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {d.toLocaleDateString("en-GB", { month: "short" })}
            </span>
            <div
              style={{
                fontFamily: F.serif,
                fontSize: 40,
                fontWeight: 700,
                color: T.white,
                lineHeight: 1,
              }}
            >
              {d.getDate()}
            </div>
          </div>
          <div style={{ width: 1, height: 44, background: "rgba(255,255,255,0.2)" }} />
          <div>
            <p
              style={{
                fontFamily: F.sans,
                fontSize: 14,
                color: T.white,
                margin: 0,
                fontWeight: 600,
              }}
            >
              {dateStr}
            </p>
            <p
              style={{
                fontFamily: F.sans,
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                margin: "4px 0 0",
              }}
            >
              Doors open 6:30 PM
            </p>
          </div>
        </div>
      </Reveal>

      {/* Info rows */}
      <Reveal delay={200}>
        <div style={{ marginTop: 24 }}>
          <InfoRow icon="pin" label="Location" value={ev.location} />
          <InfoRow icon="clock" label="Time" value={ev.time} />
          <InfoRow icon="users" label="Attending" value="148 going" />
          <InfoRow icon="briefcase" label="Price" value="Free" color={T.green} />
        </div>
      </Reveal>

      {/* About section */}
      <Reveal delay={280}>
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
            About this event
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
            Join fellow Ghanaians for an unforgettable evening of culture, networking, and
            community. This event brings together the diaspora to celebrate, connect, and build
            lasting relationships.
          </p>
        </div>
      </Reveal>

      {/* Action buttons */}
      <Reveal delay={360}>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <ActionBtn label="Get Tickets" icon="calendar" color={S.color} onClick={() => {}} />
          <ActionBtn
            label="Share"
            icon="share"
            color={S.color}
            outline
            onClick={() =>
              handleShare(
                ev.title,
                `${ev.description} — ${dateStr}, ${ev.location} | Free`
              )
            }
          />
        </div>
      </Reveal>
    </DetailView>
  );
}
