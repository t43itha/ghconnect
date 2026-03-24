import { T, F } from "@/lib/theme";

interface MonoProps {
  children: string;
  size?: number;
  color?: string;
  darkColor?: string;
}

export function Mono({ children, size = 48, color = T.green, darkColor }: MonoProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        flexShrink: 0,
        background: `linear-gradient(145deg, ${color}, ${darkColor || color})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.serif,
        fontSize: size * 0.42,
        fontWeight: 700,
        color: T.white,
        boxShadow: T.s1,
        letterSpacing: -0.5,
      }}
    >
      {children}
    </div>
  );
}
