import Link from "next/link";
import { Calendar, Eye, Settings, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const menuItems = [
  {
    icon: Calendar,
    label: "Community Events",
    href: "/more/events",
  },
  {
    icon: Eye,
    label: "Vision & Impact",
    href: "/more/vision",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/more/settings",
  },
];

export default function MorePage() {
  return (
    <div className="min-h-dvh px-4 pt-4 space-y-3 pb-24">
      <PageHeader title="More" />

      <div className="space-y-3 pt-4">
        {menuItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 p-4 bg-surface border border-gold-border rounded-xl"
          >
            <Icon size={20} className="text-kente-gold shrink-0" />
            <span className="flex-1 text-base font-semibold text-white">
              {label}
            </span>
            <ChevronRight size={16} className="text-white/40 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
