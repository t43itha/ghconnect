import { BottomTabBar } from "@/components/BottomTabBar";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="pb-20">{children}</main>
      <BottomTabBar />
    </>
  );
}
