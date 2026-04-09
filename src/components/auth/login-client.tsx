"use client";

import {
  loginAsDemo,
  signInWithEmail,
  signUpWithEmail,
} from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  demoAvailable: boolean;
  error?: string | string[];
  notice?: string | string[];
};

function firstString(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export function LoginClient({ demoAvailable, error, notice }: Props) {
  const err = firstString(error);
  const ntc = firstString(notice);
  const [oauthBusy, setOauthBusy] = useState<"google" | "github" | null>(null);
  const [oauthErr, setOauthErr] = useState<string | null>(null);

  async function oauth(provider: "google" | "github") {
    setOauthErr(null);
    setOauthBusy(provider);
    try {
      const supabase = createClient();
      const { error: e } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (e) {
        const msg = e.message ?? "";
        if (
          msg.includes("not enabled") ||
          msg.includes("Unsupported provider") ||
          msg.includes("validation_failed")
        ) {
          setOauthErr(
            "Supabase에서 이 소셜 로그인이 아직 켜져 있지 않습니다. [대시보드 → Authentication → Providers]에서 Google 또는 GitHub를 켜고, Client ID·Secret을 넣은 뒤 저장하세요. 외부 OAuth 앱의 리다이렉트 URL에는 https://(프로젝트ref).supabase.co/auth/v1/callback 을 등록해야 합니다.",
          );
        } else {
          setOauthErr(msg || "소셜 로그인 요청에 실패했습니다.");
        }
        setOauthBusy(null);
      }
    } catch {
      setOauthErr("소셜 로그인을 시작할 수 없습니다.");
      setOauthBusy(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-4 py-12">
      <div>
        <Link
          href="/"
          className="text-sm text-white/55 transition hover:text-amber-200"
        >
          ← 홈으로
        </Link>
        <h1 className="mt-4 font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          로그인
        </h1>
        <p className="mt-2 text-sm text-white/60">
          이메일 또는 소셜 계정으로 Buff에 접속하세요.
        </p>
      </div>

      {err ? (
        <p className="rounded-xl border border-red-400/35 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {err}
        </p>
      ) : null}
      {ntc ? (
        <p className="rounded-xl border border-amber-300/30 bg-amber-950/25 px-4 py-3 text-sm text-amber-100/90">
          {ntc}
        </p>
      ) : null}

      {demoAvailable ? (
        <form action={loginAsDemo} className="glass-card rounded-2xl p-5">
          <p className="text-xs tracking-wide text-amber-200/80">
            면접 · 데모용
          </p>
          <p className="mt-1 text-sm text-white/70">
            별도 가입 없이 미리 준비된 계정으로 바로 들어갑니다.
          </p>
          <button
            type="submit"
            className="buff-glow mt-4 w-full rounded-full bg-amber-300 py-3 text-sm font-bold text-black transition hover:bg-amber-200"
          >
            데모 계정으로 입장
          </button>
        </form>
      ) : null}

      <div className="glass-card space-y-3 rounded-2xl p-5">
        <p className="text-sm font-medium text-white/85">소셜 로그인</p>
        {oauthErr ? (
          <p className="text-sm text-red-300">{oauthErr}</p>
        ) : null}
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            disabled={oauthBusy !== null}
            onClick={() => void oauth("google")}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white/90 transition hover:border-amber-300/40 hover:text-amber-100 disabled:opacity-50"
          >
            {oauthBusy === "google" ? "연결 중…" : "Google"}
          </button>
          <button
            type="button"
            disabled={oauthBusy !== null}
            onClick={() => void oauth("github")}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white/90 transition hover:border-amber-300/40 hover:text-amber-100 disabled:opacity-50"
          >
            {oauthBusy === "github" ? "연결 중…" : "GitHub"}
          </button>
        </div>
      </div>

      <div className="glass-card space-y-4 rounded-2xl p-5">
        <p className="text-sm font-medium text-white/85">이메일</p>
        <form className="space-y-3">
          <label className="block text-xs text-white/50">
            이메일
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-white outline-none ring-amber-300/30 focus:border-amber-300/45 focus:ring-2"
            />
          </label>
          <label className="block text-xs text-white/50">
            비밀번호
            <input
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-white outline-none ring-amber-300/30 focus:border-amber-300/45 focus:ring-2"
            />
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              formAction={signInWithEmail}
              className="rounded-full border border-amber-300/40 bg-amber-300/15 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/25"
            >
              로그인
            </button>
            <button
              type="submit"
              formAction={signUpWithEmail}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/85 transition hover:border-amber-300/35 hover:text-amber-100"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
