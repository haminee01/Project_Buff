"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  CornerDownRight,
  Loader2,
  SendHorizontal,
  Sparkles,
  User,
} from "lucide-react";
import { ReactionLogBar } from "@/components/reactions/reaction-log-bar";
import { useCallback, useMemo, useState } from "react";

const quickLines = [
  "PVE 보스 패턴 대처 순서만 알려줘.",
  "역습 각 잡는 타이밍 3가지.",
  "캐릭터 빌드: 공격 vs 방어 밸런스 추천.",
];

function messageText(content: {
  parts: Array<{ type: string; text?: string }>;
}): string {
  return content.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function HudChat() {
  const [input, setInput] = useState("");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status, error, stop } = useChat({ transport });

  const submitting = status === "submitted" || status === "streaming";

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const q = input.trim();
      if (!q || submitting) return;
      setInput("");
      await sendMessage({ text: q });
    },
    [input, sendMessage, submitting]
  );

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/25 via-transparent to-red-500/20 opacity-80 blur-sm" />
      <div className="glass-card relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 opacity-[0.12]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(214,178,94,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(214,178,94,0.08) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
          <div className="flex items-center gap-2">
            <Bot className="size-5 text-amber-300" />
            <div>
              <p className="font-[var(--font-display)] text-sm font-bold tracking-wider text-white">
                TACTICAL CHANNEL
              </p>
              <p className="text-xs text-white/50">Gemini · 스트리밍</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/45 sm:inline">
              UPLINK
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] ${
                submitting
                  ? "border-amber-400/40 text-amber-200"
                  : "border-emerald-500/35 text-emerald-300"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  submitting ? "animate-pulse bg-amber-300" : "bg-emerald-400"
                }`}
              />
              {submitting ? "RX…" : "READY"}
            </span>
          </div>
        </div>

        <div className="relative h-[min(58vh,420px)] space-y-3 overflow-y-auto px-3 py-4 md:h-[480px] md:px-4">
          <AnimatePresence initial={false}>
            {messages.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-dashed border-amber-400/25 bg-black/25 px-4 py-6 text-center text-sm text-white/55"
              >
                <Sparkles className="mx-auto mb-2 size-6 text-amber-300/80" />
                전술 채널에 연결되었습니다. 질문을 입력하거나 아래 빠른 질문을
                누르세요.
              </motion.div>
            )}
            {messages.map((m, idx) => {
              const text = messageText({ parts: m.parts });
              const isUser = m.role === "user";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.35 }}
                  className={`flex gap-2 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`mt-1 grid size-8 shrink-0 place-content-center rounded-lg border ${
                      isUser
                        ? "border-red-400/35 bg-red-950/40"
                        : "border-amber-400/35 bg-black/50"
                    }`}
                  >
                    {isUser ? (
                      <User className="size-4 text-red-200/90" />
                    ) : (
                      <Bot className="size-4 text-amber-200" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl border px-3 py-2 text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                      isUser
                        ? "border-red-500/25 bg-red-950/35 text-white/95"
                        : "border-white/10 bg-black/40 text-white/90"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/40">
                      <CornerDownRight className="size-3" />
                      {isUser ? "OPERATOR" : "COACH"}
                    </div>
                    <p className="whitespace-pre-wrap">{text}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-red-500/35 bg-red-950/40 px-3 py-2 text-sm text-red-200/95"
            >
              {error.message ||
                "요청에 실패했습니다. API 키와 네트워크를 확인하세요."}
            </motion.div>
          )}
        </div>

        <div className="relative border-t border-white/10 bg-black/20 px-3 py-2 md:px-4">
          <div className="mb-3">
            <ReactionLogBar scope="strategy" compact />
          </div>
          <div className="mb-2 flex flex-wrap gap-2">
            {quickLines.map((q) => (
              <button
                key={q}
                type="button"
                disabled={submitting}
                onClick={() => sendMessage({ text: q })}
                className="rounded-full border border-amber-400/25 bg-black/35 px-3 py-1 text-xs text-amber-100/90 transition hover:border-amber-300/55 hover:bg-black/50 disabled:opacity-45"
              >
                {q}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="전술 질문을 입력…"
              className="min-h-11 flex-1 rounded-xl border border-white/15 bg-black/45 px-3 text-sm text-white placeholder:text-white/35 outline-none ring-amber-400/30 focus:border-amber-400/40 focus:ring-2"
              disabled={submitting}
            />
            {submitting ? (
              <button
                type="button"
                onClick={() => void stop()}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-black/50 px-4 text-xs font-semibold uppercase tracking-wide text-white/80 hover:border-red-400/40 hover:text-red-200"
              >
                중지
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="buff-glow inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-300 px-4 text-black hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendHorizontal className="size-5" />
              </button>
            )}
          </form>
          {submitting && (
            <p className="mt-2 flex items-center gap-2 text-xs text-white/45">
              <Loader2 className="size-3.5 animate-spin" />
              응답 수신 중…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
