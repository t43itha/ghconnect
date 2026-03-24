import { BottomTabBar } from "@/components/BottomTabBar";
import { KenteBorder } from "@/components/KenteBorder";
import { T } from "@/lib/theme";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: T.bg,
        position: "relative",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <KenteBorder />
      <main>{children}</main>
      <BottomTabBar />
    </div>
  );
}
