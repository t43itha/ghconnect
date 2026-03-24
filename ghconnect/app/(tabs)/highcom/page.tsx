"use client";

import { useState } from "react";
import { T, F, SECTION } from "@/lib/theme";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { InfoRow } from "@/components/InfoRow";
import { ActionBtn } from "@/components/ActionBtn";
import { handleShare } from "@/lib/share";

const S = SECTION.marketplace;

export default function HighCommissionPage() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("104 Highgate Hill, London N6 5HE").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: "0 24px 120px" }}>
      <Reveal>
        <div style={{ paddingTop: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: S.soft, borderRadius: 100, padding: "4px 12px", marginBottom: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: S.color, letterSpacing: 0.5, textTransform: "uppercase" }}>Official</span>
          </div>
          <h1 style={{ fontFamily: F.serif, fontSize: 34, fontWeight: 700, margin: 0, color: T.ink, letterSpacing: -0.8, lineHeight: 1.1 }}>Ghana High Commission</h1>
          <p style={{ fontFamily: F.sans, fontSize: 15, color: T.secondary, margin: "6px 0 0" }}>Embassy of Ghana in London, England</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
            <Icon name="star" size={14} color={T.gold} />
            <span style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 700, color: T.ink }}>3.4</span>
            <span style={{ fontFamily: F.sans, fontSize: 13, color: T.tertiary }}>(389 reviews)</span>
          </div>
        </div>
      </Reveal>

      {/* Quick Actions */}
      <Reveal delay={100}>
        <div style={{ display: "flex", gap: 10, marginTop: 24, overflowX: "auto", scrollbarWidth: "none" }}>
          {[
            { icon: "phone", label: "Call", action: () => window.open("tel:+442033022288") },
            { icon: "pin", label: "Directions", action: () => window.open("https://maps.google.com/?q=Ghana+High+Commission+London") },
            { icon: "globe", label: "Website", action: () => window.open("https://ghanahighcommissionuk.com") },
            { icon: "share", label: "Share", action: () => handleShare("Ghana High Commission", "104 Highgate Hill, London N6 5HE\nTel: 020 3302 2288") },
          ].map((item, i) => (
            <div
              key={i}
              onClick={item.action}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                cursor: "pointer", minWidth: 72, transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                border: `2px solid ${T.border}`, background: T.surface,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={item.icon} size={20} color={S.color} strokeWidth={1.8} />
              </div>
              <span style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: T.secondary }}>{item.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Info Rows */}
      <Reveal delay={200}>
        <div style={{ marginTop: 28 }}>
          <InfoRow icon="pin" label="Address" value="104 Highgate Hill, London N6 5HE" />
          <InfoRow icon="phone" label="Telephone" value="020 3302 2288" />
          <InfoRow icon="globe" label="Website" value="ghanahighcommissionuk.com" color={S.color} />
          <InfoRow icon="mail" label="Email" value="info@ghanahighcommissionuk.com" />
          <InfoRow icon="clock" label="Opening Hours" value="Mon – Fri, 9:30 AM – 3:30 PM" />
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="calendar" size={16} color={T.secondary} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: F.sans, fontSize: 11, color: T.tertiary, margin: 0, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Status</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <span style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 600, color: "#DC2626" }}>Closed</span>
                <span style={{ fontFamily: F.sans, fontSize: 14, color: T.secondary }}>· Opens 9:30 AM Wed</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Consular Services */}
      <Reveal delay={300}>
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontFamily: F.serif, fontSize: 22, fontWeight: 700, margin: 0, color: T.ink, letterSpacing: -0.3 }}>Consular Services</h3>
          <div style={{ marginTop: 14 }}>
            {[
              { title: "Passport Applications", desc: "New passports, renewals, and emergency travel documents" },
              { title: "Visa Services", desc: "Tourist, business, and transit visas for travel to Ghana" },
              { title: "Birth & Death Registration", desc: "Register births and deaths for Ghanaian nationals" },
              { title: "Document Legalisation", desc: "Attestation and authentication of documents" },
              { title: "Notarial Services", desc: "Oaths, affidavits, and certified copies" },
              { title: "Dual Citizenship", desc: "Application for dual citizenship status" },
            ].map((svc, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0",
                borderBottom: i < 5 ? `1px solid ${T.borderLight}` : "none",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: S.color,
                  marginTop: 6, flexShrink: 0, opacity: 0.6,
                }} />
                <div>
                  <h4 style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 700, margin: 0, color: T.ink }}>{svc.title}</h4>
                  <p style={{ fontFamily: F.sans, fontSize: 13, color: T.secondary, margin: "2px 0 0" }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Important Information */}
      <Reveal delay={380}>
        <div style={{ marginTop: 24, padding: 18, background: S.soft, borderRadius: T.rs, border: `1px solid ${S.color}15` }}>
          <h4 style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 700, margin: 0, color: T.ink }}>Important Information</h4>
          <p style={{ fontFamily: F.sans, fontSize: 14, color: T.secondary, margin: "8px 0 0", lineHeight: 1.6 }}>
            All consular services are by appointment only. Please book through the official website or call the embassy directly. Bring valid identification and relevant supporting documents.
          </p>
        </div>
      </Reveal>

      {/* Copy Address + Share */}
      <Reveal delay={440}>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <ActionBtn label={copied ? "Copied!" : "Copy Address"} icon={copied ? "check" : "link"} color={S.color} onClick={copyAddress} />
          <ActionBtn label="Share" icon="share" color={S.color} outline onClick={() => handleShare("Ghana High Commission", "104 Highgate Hill, London N6 5HE\nTel: 020 3302 2288\nghanahighcommissionuk.com")} />
        </div>
      </Reveal>
    </div>
  );
}
