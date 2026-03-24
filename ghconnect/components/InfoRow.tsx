"use client";

import { T, F } from "@/lib/theme";
import { Icon } from "@/components/Icon";

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  color?: string;
}

export function InfoRow({ icon, label, value, color = T.ink }: InfoRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 0",
        borderBottom: `1px solid ${T.borderLight}`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: T.surfaceAlt,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={16} color={T.secondary} />
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontFamily: F.sans,
            fontSize: 11,
            color: T.tertiary,
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: 600,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: F.sans,
            fontSize: 15,
            color,
            margin: "2px 0 0",
            fontWeight: 500,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
