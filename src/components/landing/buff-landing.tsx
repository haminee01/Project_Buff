"use client";

import { motion } from "framer-motion";
import { ChevronRight, Radar, Sparkles, Swords, Trophy } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "AI Agentic HUD",
    description: "실시간 전략 가이드를 스트리밍으로 제공하는 몰입형 전술 인터페이스",
  },
  {
    icon: Radar,
    title: "Playstyle Intelligence",
    description: "플레이 로그를 분석해 승률, 성향, 성장 지점을 시각적으로 리포트",
  },
  {
    icon: Trophy,
    title: "Competitive Readiness",
    description: "기록과 반응 데이터를 통해 다음 경기의 의사결정을 빠르게 강화",
  },
];

export default function BuffLanding() {
  return (
    <main className="buff-bg relative min-h-screen overflow-hidden px-6 py-8 text-white md:px-10">
      <div className="scan-line pointer-events-none absolute inset-0" />

      <motion.header
        className="mx-auto flex w-full max-w-6xl items-center justify-between"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="buff-glow grid size-10 place-content-center rounded-lg border border-amber-300/40 bg-black/70">
            <Swords className="size-5 text-amber-300" />
          </div>
          <div>
            <p className="font-[var(--font-display)] text-xl font-extrabold tracking-[0.18em]">
              BUFF
            </p>
            <p className="text-xs text-white/60">TACTICAL ANALYTICS PLATFORM</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm text-white/75 transition hover:text-amber-200"
          >
            로그인
          </Link>
          <Link
            href="/dashboard"
            className="glass-card rounded-full px-4 py-2 text-sm text-white/90 transition hover:border-amber-300/50 hover:text-amber-200"
          >
            대시보드 미리보기
          </Link>
        </div>
      </motion.header>

      <section className="mx-auto mt-16 grid w-full max-w-6xl gap-10 md:mt-24 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="gold-text mb-4 text-sm tracking-[0.18em]">
            CONNECTING DATA, EMPOWERING PLAYERS
          </p>
          <h1 className="font-[var(--font-display)] text-5xl leading-[1.06] font-extrabold tracking-tight md:text-7xl">
            데이터로
            <br />
            승리를 설계하다.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Buff는 AI와 플레이 데이터를 결합해 유저의 실제 게임 스타일을 해석하고,
            경기 직전에 필요한 전략을 즉시 제안합니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="buff-glow inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-black transition hover:bg-amber-200"
            >
              전략 분석 시작
            </Link>
            <Link
              href="/agent"
              className="glass-card inline-flex rounded-full px-5 py-3 text-sm transition hover:border-red-400/60 hover:text-red-200"
            >
              AI 코치 체험하기
            </Link>
          </div>
        </motion.div>

        <motion.aside
          className="glass-card relative rounded-2xl p-5 md:p-6"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.08 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-white/60">LIVE INSIGHT</p>
            <span className="inline-flex items-center gap-2 text-xs text-emerald-300">
              <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
              ONLINE
            </span>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-black/25 p-3">
              <p className="text-xs text-white/50">추천 전술</p>
              <p className="mt-1 text-sm text-white/90">
                돌진 후 12초 이내 역습 확률 <span className="gold-text">+18%</span>
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-3">
              <p className="text-xs text-white/50">플레이 성향</p>
              <p className="mt-1 text-sm text-white/90">
                당신은 <span className="gold-text">야성적인 공격형</span> 성향입니다.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-3">
              <p className="text-xs text-white/50">승률 예측</p>
              <p className="mt-1 text-sm text-white/90">
                다음 매치 예상 승률 <span className="text-red-300">67.4%</span>
              </p>
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="mx-auto mt-16 grid w-full max-w-6xl gap-4 md:mt-20 md:grid-cols-3">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              className="glass-card rounded-2xl p-5 transition hover:-translate-y-1 hover:border-amber-300/40"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 + idx * 0.1 }}
            >
              <Icon className="mb-4 size-5 text-amber-300" />
              <h2 className="font-[var(--font-display)] text-lg font-bold tracking-wide">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {feature.description}
              </p>
            </motion.article>
          );
        })}
      </section>

      <motion.footer
        className="mx-auto mt-12 flex w-full max-w-6xl items-center justify-between border-t border-white/10 py-8 text-sm text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
      >
        <p>Buff © 2026. Connecting Data, Empowering Players.</p>
        <button className="inline-flex items-center gap-1 text-amber-200 transition hover:gap-2">
          프로젝트 자세히 보기 <ChevronRight className="size-4" />
        </button>
      </motion.footer>
    </main>
  );
}
