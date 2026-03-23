import { KenteStrip } from "./KenteStrip";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div>
      <div
        className="flex items-center justify-between px-4"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <h1 className="font-display text-[28px] text-kente-gold">{title}</h1>
        {children && <div className="shrink-0">{children}</div>}
      </div>
      <KenteStrip className="mt-2" />
    </div>
  );
}
