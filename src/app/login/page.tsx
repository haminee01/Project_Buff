import { LoginClient } from "@/components/auth/login-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 | Buff",
  description: "Buff 계정으로 로그인",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[]; notice?: string | string[] }>;
}) {
  const sp = await searchParams;
  const demoAvailable = Boolean(
    process.env.BUFF_DEMO_EMAIL?.trim() && process.env.BUFF_DEMO_PASSWORD,
  );

  return (
    <div className="buff-bg relative min-h-screen text-white">
      <div className="scan-line pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10">
        <LoginClient
          demoAvailable={demoAvailable}
          error={sp.error}
          notice={sp.notice}
        />
      </div>
    </div>
  );
}
