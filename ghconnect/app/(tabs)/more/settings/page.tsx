import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function MoreSettingsPage() {
  return (
    <div className="min-h-dvh px-4 pt-4 pb-24">
      <PageHeader title="Settings">
        <Link href="/more" className="text-white/60 hover:text-white">
          <ArrowLeft size={22} />
        </Link>
      </PageHeader>

      <div className="flex items-center justify-center pt-24">
        <p className="text-white/40 text-sm">Coming soon</p>
      </div>
    </div>
  );
}
