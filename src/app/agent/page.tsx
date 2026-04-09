import type { Metadata } from "next";
import HudChat from "@/components/agent/hud-chat";
import { AuthNav } from "@/components/layout/auth-nav";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "AI 코치 | Buff",
  description: "HUD 스타일 전술 코치 — Gemini 스트리밍",
};

export default function AgentPage() {
  return (
    <div className="buff-bg relative min-h-screen text-white">
      <div className="scan-line pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10">
        <SiteHeader rightSlot={<AuthNav />} />
        <div className="mx-auto max-w-3xl px-6 pb-6 pt-2 text-center md:px-10">
          <p className="gold-text text-sm tracking-[0.2em]">TACTICAL UPLINK</p>
          <h1 className="mt-2 font-[var(--font-display)] text-2xl font-extrabold tracking-tight md:text-3xl">
            전술 코치 채널
          </h1>
        </div>
        <div className="relative z-10 px-4 pb-16 md:px-8">
          <HudChat />
        </div>
      </div>
    </div>
  );
}
