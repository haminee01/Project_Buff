"use client";

import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, ScrollText } from "lucide-react";
import {
  type ReactionScope,
  useReactionLog,
} from "@/hooks/use-reaction-log";

const PRESETS: { emoji: string; label: string }[] = [
  { emoji: "👍", label: "도움됨" },
  { emoji: "🔥", label: "핵심" },
  { emoji: "💡", label: "인사이트" },
  { emoji: "❤️", label: "공감" },
  { emoji: "⚡", label: "바로 적용" },
];

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const scopeTitle: Record<ReactionScope, string> = {
  strategy: "공략 · 실시간 반응",
  report: "리포트 · 실시간 반응",
};

export function ReactionLogBar({
  scope,
  compact,
}: {
  scope: ReactionScope;
  compact?: boolean;
}) {
  const {
    entries,
    pushReaction,
    live,
    statusMessage,
    actionsDisabled,
    lastError,
  } = useReactionLog(scope);

  return (
    <div
      className={clsx(
        "rounded-xl border border-amber-400/20 bg-black/30",
        compact ? "p-3" : "p-4",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ScrollText className="size-4 text-amber-300/90" />
          <p className="font-[var(--font-display)] text-xs font-bold tracking-wide text-white/90">
            {scopeTitle[scope]}
          </p>
        </div>
        <div
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px]",
            live
              ? "border-emerald-500/35 text-emerald-200/95"
              : "border-white/15 text-white/45",
          )}
        >
          <Radio
            className={clsx(
              "size-3",
              live ? "text-emerald-300" : "text-white/40",
            )}
          />
          {live ? "LIVE" : "LOCAL"}
        </div>
      </div>

      <p className="mt-1 text-[11px] leading-snug text-white/45">
        {statusMessage}
      </p>
      {lastError ? (
        <p className="mt-2 rounded-lg border border-red-500/35 bg-red-950/35 px-2 py-1.5 text-[11px] text-red-200/95">
          {lastError}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map(({ emoji, label }) => (
          <button
            key={label}
            type="button"
            disabled={actionsDisabled}
            title={label}
            onClick={() => void pushReaction(emoji, label)}
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-black/40 px-3 py-1.5 text-sm transition hover:border-amber-300/50 hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <span aria-hidden>{emoji}</span>
            <span className="text-[11px] text-amber-100/85">{label}</span>
          </button>
        ))}
      </div>

      <div
        className={clsx(
          "mt-3 overflow-y-auto rounded-lg border border-white/10 bg-black/25",
          compact ? "max-h-28" : "max-h-36",
        )}
      >
        {entries.length === 0 ? (
          <p className="px-3 py-3 text-center text-[11px] text-white/40">
            아직 반응 로그가 없습니다. 위 버튼으로 첫 로그를 남겨 보세요.
          </p>
        ) : (
          <ul className="divide-y divide-white/5 px-1 py-1">
            <AnimatePresence initial={false}>
              {entries
                .slice()
                .reverse()
                .map((e) => (
                  <motion.li
                    key={e.id}
                    layout
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 px-2 py-2 text-[11px] text-white/70"
                  >
                    <span className="shrink-0 tabular-nums text-white/35">
                      {formatTime(e.at)}
                    </span>
                    <span className="text-base leading-none" aria-hidden>
                      {e.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-white/80">{e.label}</span>
                      {e.from ? (
                        <span className="text-white/40"> · {e.from}</span>
                      ) : null}
                    </span>
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
