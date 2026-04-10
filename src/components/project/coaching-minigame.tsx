"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import {
  Check,
  ChevronRight,
  Crosshair,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  applyRoundWeight,
  buildReasonLine,
  getRounds,
  initialUserWeights,
  rankActions,
  situationTags,
  type Axis,
} from "@/lib/coaching-minigame-data";

type Phase = "intro" | "situation" | "priority" | "result";

const steps: Array<{ id: Phase; label: string }> = [
  { id: "intro", label: "시작" },
  { id: "situation", label: "상황" },
  { id: "priority", label: "우선순위" },
  { id: "result", label: "추천" },
];

const rounds = getRounds();

export default function CoachingMinigame() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [tags, setTags] = useState<string[]>([]);
  const [weights, setWeights] = useState(initialUserWeights);
  const [roundIndex, setRoundIndex] = useState(0);

  const ranked = useMemo(() => rankActions(weights, tags), [weights, tags]);
  const topThree = ranked.slice(0, 3);

  const stepIndex = steps.findIndex((s) => s.id === phase);
  const progress =
    phase === "intro"
      ? 0
      : phase === "situation"
        ? 0.33
        : phase === "priority"
          ? 0.33 + (roundIndex / rounds.length) * 0.34
          : 1;

  function reset() {
    setPhase("intro");
    setTags([]);
    setWeights(initialUserWeights());
    setRoundIndex(0);
  }

  function toggleTag(id: string) {
    setTags((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 2) return [prev[0], id];
      return [...prev, id];
    });
  }

  function startFromIntro() {
    setWeights(initialUserWeights());
    setRoundIndex(0);
    setPhase("situation");
  }

  function confirmSituation() {
    if (tags.length !== 2) return;
    setPhase("priority");
  }

  function pickPriority(axis: Axis) {
    setWeights((w) => applyRoundWeight(w, axis));
    if (roundIndex >= rounds.length - 1) {
      setPhase("result");
      return;
    }
    setRoundIndex((i) => i + 1);
  }

  const transition = reduceMotion
    ? {}
    : { type: "spring" as const, stiffness: 380, damping: 32 };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-amber-300/20 bg-[linear-gradient(145deg,rgba(12,12,18,0.92),rgba(8,8,12,0.96))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-6"
      style={{
        boxShadow:
          "0 0 0 1px rgba(214,178,94,0.08) inset, 0 24px 80px rgba(0,0,0,0.45)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="gold-text text-xs uppercase tracking-[0.2em]">
              Interactive demo
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-xl font-bold tracking-tight md:text-2xl">
              60초 코칭 미니게임
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              상황 2개와 우선순위 3회 선택만으로, 규칙 기반 추천 플레이를
              체험합니다.{" "}
              <span className="text-white/45">
                (실제 경기 데이터가 아닌 포트폴리오 데모입니다.)
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white/60">
            <Crosshair className="size-3.5 text-amber-200/90" aria-hidden />
            데모 · 규칙 엔진
          </div>
        </div>

        <div className="mt-6">
          <div className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-400/90 via-amber-300 to-red-500/80"
              initial={false}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.14em] text-white/40 md:text-xs">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className={clsx(
                  i <= stepIndex ? "text-amber-200/90" : "text-white/35",
                )}
              >
                {i + 1}. {s.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 min-h-[280px] md:min-h-[300px]">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="rounded-2xl border border-white/10 bg-black/35 px-6 py-10 md:px-12">
                <Sparkles className="mx-auto size-10 text-amber-200/90" />
                <p className="mt-4 font-[var(--font-display)] text-lg font-semibold text-white md:text-xl">
                  경기 직전, 코치가 고르는 순서
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/65">
                  상황 태그 2개 → 우선순위 3회 → 추천 플레이 3안. 약 1분이면
                  끝납니다.
                </p>
                <button
                  type="button"
                  onClick={startFromIntro}
                  className="buff-glow mt-8 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-gradient-to-b from-amber-300/25 to-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-200/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300/80"
                >
                  <Play className="size-4 fill-current" />
                  시작하기
                </button>
              </div>
            </motion.div>
          )}

          {phase === "situation" && (
            <motion.div
              key="situation"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <p className="text-sm font-medium text-white/90">
                이번 판에 가장 가깝다고 느끼는 상황을{" "}
                <span className="text-amber-200">2개</span> 고르세요.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {situationTags.map((t) => {
                  const on = tags.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTag(t.id)}
                      className={clsx(
                        "group relative flex flex-col rounded-xl border px-4 py-4 text-left transition",
                        on
                          ? "border-amber-300/55 bg-amber-300/10 shadow-[0_0_0_1px_rgba(214,178,94,0.2)_inset]"
                          : "border-white/10 bg-black/30 hover:border-amber-300/35 hover:bg-black/40",
                      )}
                    >
                      <span
                        className={clsx(
                          "flex size-8 items-center justify-center rounded-lg border text-xs transition",
                          on
                            ? "border-amber-300/50 bg-amber-300/15 text-amber-100"
                            : "border-white/15 bg-white/5 text-white/50 group-hover:text-white/75",
                        )}
                      >
                        {on ? (
                          <Check className="size-4" strokeWidth={2.5} />
                        ) : (
                          <span className="text-[10px] opacity-60">선택</span>
                        )}
                      </span>
                      <span className="mt-3 text-sm font-semibold text-white">
                        {t.label}
                      </span>
                      <span className="mt-1 text-xs leading-relaxed text-white/55">
                        {t.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPhase("intro")}
                  className="text-sm text-white/50 transition hover:text-white/80"
                >
                  이전
                </button>
                <button
                  type="button"
                  disabled={tags.length !== 2}
                  onClick={confirmSituation}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300/80",
                    tags.length === 2
                      ? "border border-amber-300/45 bg-amber-300/15 text-amber-50 hover:bg-amber-300/25"
                      : "cursor-not-allowed border border-white/10 bg-white/5 text-white/35",
                  )}
                >
                  다음 <ChevronRight className="size-4" />
                </button>
              </div>
            </motion.div>
          )}

          {phase === "priority" && rounds[roundIndex] && (
            <motion.div
              key={`priority-${roundIndex}`}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={transition}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  우선순위 {roundIndex + 1} / {rounds.length}
                </p>
                <p className="text-xs text-white/40">
                  더 맞다고 느끼는 쪽을 고르세요
                </p>
              </div>
              <p className="mt-3 font-[var(--font-display)] text-lg font-semibold text-white md:text-xl">
                {rounds[roundIndex].question}
              </p>
              <p className="mt-1 text-sm text-white/55">
                {rounds[roundIndex].sub}
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    pickPriority(rounds[roundIndex].left.axis)
                  }
                  className="group rounded-2xl border border-white/12 bg-gradient-to-br from-black/50 to-black/30 p-5 text-left transition hover:border-amber-300/45 hover:shadow-[0_0_40px_rgba(214,178,94,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300/70 md:min-h-[120px]"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-amber-200/80">
                    A
                  </span>
                  <span className="mt-2 block text-base font-semibold text-white">
                    {rounds[roundIndex].left.label}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/45 transition group-hover:text-amber-200/90">
                    선택 <ChevronRight className="size-3.5" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    pickPriority(rounds[roundIndex].right.axis)
                  }
                  className="group rounded-2xl border border-white/12 bg-gradient-to-br from-red-950/30 to-black/30 p-5 text-left transition hover:border-red-400/35 hover:shadow-[0_0_40px_rgba(223,47,69,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/60 md:min-h-[120px]"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-red-200/85">
                    B
                  </span>
                  <span className="mt-2 block text-base font-semibold text-white">
                    {rounds[roundIndex].right.label}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/45 transition group-hover:text-red-200/90">
                    선택 <ChevronRight className="size-3.5" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="gold-text text-xs uppercase tracking-[0.18em]">
                    Recommended plays
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white md:text-xl">
                    이번 조합에 맞는 추천 플레이
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-amber-300/40 hover:text-amber-100"
                >
                  <RotateCcw className="size-3.5" />
                  다시하기
                </button>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {topThree.map((row, i) => (
                  <motion.article
                    key={row.opt.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...transition,
                      delay: reduceMotion ? 0 : i * 0.06,
                    }}
                    className={clsx(
                      "relative flex flex-col rounded-2xl border p-4 md:p-5",
                      i === 0
                        ? "border-amber-300/45 bg-[linear-gradient(160deg,rgba(214,178,94,0.14),rgba(8,8,12,0.85))]"
                        : "border-white/12 bg-black/35",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={clsx(
                          "inline-flex size-8 items-center justify-center rounded-full text-xs font-bold",
                          i === 0
                            ? "bg-amber-300/25 text-amber-100"
                            : "bg-white/10 text-white/80",
                        )}
                      >
                        {i + 1}
                      </span>
                      {i === 0 && (
                        <span className="rounded-full border border-amber-300/35 bg-black/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-100/90">
                          Top pick
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-[var(--font-display)] text-base font-bold leading-snug text-white md:text-lg">
                      {row.opt.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {row.opt.hook}
                    </p>
                    <ul className="mt-3 space-y-2 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/60">
                      {row.opt.checklist.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-300/70" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 rounded-lg border border-white/8 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white/55">
                      <span className="text-white/40">근거 · </span>
                      {buildReasonLine(row.opt, weights, tags)}
                    </p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/case-study"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-5 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-300/20"
                >
                  Case Study로 설계 흐름 보기
                  <ChevronRight className="size-4" />
                </Link>
                <Link
                  href="/design-system"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/30"
                >
                  Design System
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
