"use client";

import { useState } from "react";
import { T, F } from "@/lib/theme";
import { Icon } from "@/components/Icon";

interface ThemedSearchProps {
  placeholder?: string;
  color: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function ThemedSearch({ placeholder = "Search...", color, value, onChange }: ThemedSearchProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 18px",
        borderRadius: T.rs,
        background: T.white,
        border: `1.5px solid ${focused ? color : T.border}`,
        boxShadow: focused ? `0 4px 20px ${color}18` : T.s1,
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Icon name="search" size={18} color={focused ? color : T.tertiary} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 15,
          fontFamily: F.sans,
          color: T.ink,
        }}
      />
    </div>
  );
}
