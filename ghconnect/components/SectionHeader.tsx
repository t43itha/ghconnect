import Link from "next/link";
import { KenteStrip } from "./KenteStrip";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
}

export default function SectionHeader({ title, viewAllHref }: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-kente-gold">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-white/60">
            View all
          </Link>
        )}
      </div>
      <KenteStrip className="mt-2" />
    </div>
  );
}
