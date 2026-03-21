import { getGradientStyle } from "@/lib/gradients";

interface GradientHeroProps {
  image: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function GradientHero({
  image,
  icon,
  className = "",
  children,
}: GradientHeroProps) {
  return (
    <div
      className={`flex items-center justify-center relative ${className}`}
      style={getGradientStyle(image)}
    >
      <div className="text-white/80">{icon}</div>
      {children}
    </div>
  );
}
