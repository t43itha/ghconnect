interface CompanyLogoProps {
  name: string;
  className?: string;
}

export default function CompanyLogo({ name, className = "" }: CompanyLogoProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      className={`w-[72px] h-[72px] rounded-lg bg-surface border border-gold-border flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="font-display text-2xl text-kente-gold">{initial}</span>
    </div>
  );
}
