interface CategoryBadgeProps {
  label: string;
  icon?: React.ReactNode;
}

export default function CategoryBadge({ label, icon }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 bg-gold-mist text-kente-gold text-xs font-medium px-2 py-0.5 rounded-full">
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </span>
  );
}
