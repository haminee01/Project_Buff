import type { Metadata } from "next";
import DashboardExperience from "@/components/dashboard/dashboard-experience";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "분석 | Buff",
  description: "플레이 스타일 인텔리전스 대시보드",
};

export default function DashboardPage() {
  return (
    <div className="buff-bg relative min-h-screen text-white">
      <div className="scan-line pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10">
        <SiteHeader />
        <DashboardExperience />
      </div>
    </div>
  );
}
