"use client";

import { ReactNode } from "react";
import { T, F } from "@/lib/theme";
import { Icon } from "@/components/Icon";

interface DetailViewProps {
  onBack: () => void;
  color: string;
  children: ReactNode;
}

export function DetailView({ onBack, color, children }: DetailViewProps) {
  return (
    <div>
      {/* Colored header bar */}
      <div style={{ height: 4, background: color, width: "100%" }} />
      {/* Nav */}
      <div
        style={{
          padding: "12px 20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: F.sans,
            fontSize: 14,
            fontWeight: 600,
            color: T.secondary,
            padding: "8px 0",
          }}
        >
          <Icon name="back" size={18} color={T.secondary} strokeWidth={2} /> Back
        </button>
      </div>
      <div style={{ padding: "8px 24px 60px" }}>{children}</div>
    </div>
  );
}
