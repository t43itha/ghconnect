"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilter?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onFilter,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 mb-4">
      <div className="flex-1 flex items-center gap-2 bg-surface border border-gold-border rounded-xl px-3 py-2">
        <Search size={16} className="shrink-0 text-white/40" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
        />
      </div>

      {onFilter && (
        <button
          onClick={onFilter}
          className="flex items-center justify-center w-10 h-10 bg-surface border border-gold-border rounded-xl shrink-0"
          aria-label="Filter"
        >
          <SlidersHorizontal size={16} className="text-white/60" />
        </button>
      )}
    </div>
  );
}
