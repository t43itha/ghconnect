"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "convex/values";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Mono } from "@/components/Mono";
import { DetailView } from "@/components/DetailView";
import { InfoRow } from "@/components/InfoRow";
import { ActionBtn } from "@/components/ActionBtn";
import { handleShare } from "@/lib/share";

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as Id<"businesses">;
  const business = useQuery(api.businesses.getById, id ? { id } : "skip");

  if (!business) {
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

  const S = SECTION.directory;

  return (
    <DetailView onBack={() => router.back()} color={S.color}>
      <Reveal delay={50}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingTop: 12,
          }}
        >
          <Mono size={72} color={S.color} darkColor={S.dark}>
            {business.name[0]}
          </Mono>
          <h1
            style={{
              fontFamily: F.serif,
              fontSize: 30,
              fontWeight: 700,
              margin: "16px 0 0",
              color: T.ink,
              letterSpacing: -0.5,
            }}
          >
            {business.name}
          </h1>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 15,
              color: T.secondary,
              margin: "4px 0 0",
            }}
          >
            {business.description}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
            <Icon name="star" size={14} color={T.gold} />
            <span style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 700, color: T.ink }}>
              {business.rating}
            </span>
            <span style={{ fontFamily: F.sans, fontSize: 13, color: T.tertiary }}>(reviews)</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div style={{ marginTop: 28 }}>
          <InfoRow icon="pin" label="Location" value={business.location} />
          <InfoRow icon="grid" label="Category" value={business.category} />
          <InfoRow icon="clock" label="Hours" value="Mon – Sat, 9am – 6pm" />
          <InfoRow
            icon="phone"
            label="Phone"
            value={business.contactPhone || "Not available"}
          />
          <InfoRow
            icon="globe"
            label="Website"
            value={business.website || "Not available"}
            color={S.color}
          />
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
            About
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
            {business.description}
          </p>
        </div>
      </Reveal>

      <Reveal delay={350}>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <ActionBtn label="Contact" icon="phone" color={S.color} onClick={() => {}} />
          <ActionBtn
            label="Share"
            icon="share"
            color={S.color}
            outline
            onClick={() =>
              handleShare(
                business.name,
                `${business.description} — ${business.location} | GhanaConnect`
              )
            }
          />
        </div>
      </Reveal>
    </DetailView>
  );
}
