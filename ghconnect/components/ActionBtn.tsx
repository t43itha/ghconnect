"use client";

import { T, F } from "@/lib/theme";
import { Icon } from "@/components/Icon";

interface ActionBtnProps {
  label: string;
  icon: string;
  color: string;
  outline?: boolean;
  onClick?: () => void;
}

export function ActionBtn({ label, icon, color, outline, onClick }: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "15px 16px",
        borderRadius: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: F.sans,
        fontSize: 15,
        fontWeight: 700,
        background: outline ? "transparent" : color,
        color: outline ? color : T.white,
        border: outline ? `2px solid ${color}` : "none",
        boxShadow: outline ? "none" : `0 4px 16px ${color}30`,
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
    >
      <Icon name={icon} size={17} color={outline ? color : T.white} strokeWidth={2} />
      {label}
    </button>
  );
}
