"use client";

import { ReactNode } from "react";
import { T, F } from "@/lib/theme";

interface ThemedPillProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
  color: string;
}

export function ThemedPill({ children, active, onClick, color }: ThemedPillProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "9px 20px",
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: F.sans,
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        background: active ? color : "transparent",
        color: active ? T.white : T.secondary,
        boxShadow: active
          ? `0 4px 16px ${color}30`
          : `inset 0 0 0 1.5px ${T.border}`,
      }}
    >
      {children}
    </button>
  );
}
