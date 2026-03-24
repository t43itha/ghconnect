import { T } from "@/lib/theme";

export function KenteBorder() {
  const colors = [T.red, T.gold, T.green, T.ink];
  return (
    <div style={{ height: 10, display: "flex", width: "100%" }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          style={{ flex: 1, background: colors[i % 4], opacity: 0.9 }}
        />
      ))}
    </div>
  );
}
