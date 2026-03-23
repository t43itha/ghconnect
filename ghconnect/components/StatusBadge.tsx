interface StatusBadgeProps {
  variant: "new" | "hot";
}

export default function StatusBadge({ variant }: StatusBadgeProps) {
  const styles =
    variant === "new"
      ? "bg-forest text-white"
      : "bg-kente-gold text-onyx";

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles}`}>
      {variant === "new" ? "New" : "Hot"}
    </span>
  );
}
