"use client";

import { motion } from "framer-motion";
import { Activity, Crosshair, Timer, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReactionLogBar } from "@/components/reactions/reaction-log-bar";
import {
  characterPreference,
  getPlaystyleReport,
  sessionStats,
  weeklyPerformance,
} from "@/lib/mock/player-data";

const gold = "#d6b25e";
const muted = "#6b6b76";

function Kpi({
  label,
  value,
  hint,
  icon: Icon,
  delay,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof Activity;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.16em] text-white/45">
          {label}
        </span>
        <Icon className="size-4 text-amber-300/90" />
      </div>
      <p className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-2 text-xs text-white/50">{hint}</p>
    </motion.div>
  );
}

export default function DashboardExperience() {
  const report = getPlaystyleReport(sessionStats);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-6 pb-16 pt-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <p className="gold-text text-sm tracking-[0.18em]">
          PLAYSTYLE INTELLIGENCE
        </p>
        <h1 className="mt-2 font-[var(--font-display)] text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          이번 주, 당신의 전장 리듬
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
          Buff는 Mock 데이터를 사용해 실제 분석 파이프라인과 동일한 카드·차트
          UX를 보여 줍니다. Supabase 연동 시 같은 화면에 실데이터를 연결하면
          됩니다.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="주간 플레이"
          value={`${sessionStats.playHoursWeek}h`}
          hint="집중 피크: 금·토 야간"
          icon={Timer}
          delay={0.05}
        />
        <Kpi
          label="승률"
          value={`${(sessionStats.winRate * 100).toFixed(1)}%`}
          hint="목표 구간: 70% 이상"
          icon={TrendingUp}
          delay={0.1}
        />
        <Kpi
          label="평균 반응"
          value={`${sessionStats.avgReactionMs}ms`}
          hint="클러치 교전 유리"
          icon={Crosshair}
          delay={0.15}
        />
        <Kpi
          label="연속 기록"
          value={`${sessionStats.streakDays}일`}
          hint="Log 시스템과 연동 예정"
          icon={Activity}
          delay={0.2}
        />
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-5">
        <motion.div
          className="glass-card flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl p-5 lg:col-span-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          <div className="mb-4 flex shrink-0 items-end justify-between gap-2">
            <div>
              <h2 className="font-[var(--font-display)] text-lg font-bold text-white">
                주간 퍼포먼스
              </h2>
              <p className="text-xs text-white/50">종합 전술 지수 (모의)</p>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <div className="h-64 min-h-64 w-full min-w-0 max-w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
                minHeight={256}
                debounce={48}
              >
                <AreaChart data={weeklyPerformance}>
                  <defs>
                    <linearGradient id="buffArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={gold} stopOpacity={0.5} />
                      <stop offset="95%" stopColor={gold} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 6"
                    stroke={muted}
                    opacity={0.35}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#a2a2ab", fontSize: 12 }}
                    axisLine={{ stroke: "#3b3b44" }}
                  />
                  <YAxis
                    tick={{ fill: "#a2a2ab", fontSize: 12 }}
                    axisLine={{ stroke: "#3b3b44" }}
                    domain={[50, "auto"]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(12,12,16,0.92)",
                      border: "1px solid rgba(214,178,94,0.35)",
                      borderRadius: 12,
                      color: "#f3f3f3",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke={gold}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#buffArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <aside className="glass-card relative min-w-0 overflow-hidden rounded-2xl p-5 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
            className="contents"
          >
            <div className="pointer-events-none absolute -right-8 -top-16 size-40 rounded-full bg-amber-400/15 blur-2xl" />
            <h2 className="font-[var(--font-display)] text-lg font-bold text-white">
              맞춤 리포트
            </h2>
            <p className="gold-text mt-3 text-xl font-semibold">
              {report.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {report.body}
            </p>
            <div className="mt-5">
              <ReactionLogBar scope="report" />
            </div>
          </motion.div>
        </aside>
      </div>

      <motion.div
        className="glass-card min-w-0 overflow-hidden rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <h2 className="font-[var(--font-display)] text-lg font-bold text-white">
          캐릭터 · 역할 선호도
        </h2>
        <p className="text-xs text-white/50">
          주간 픽 비율(%). 공략 추천과 연동하기 좋은 요약 지표입니다.
        </p>
        <div className="mt-4 h-72 min-h-72 w-full min-w-0 shrink-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={288}
            debounce={48}
          >
            <BarChart
              data={characterPreference}
              layout="vertical"
              margin={{ left: 8 }}
            >
              <CartesianGrid
                strokeDasharray="4 6"
                stroke={muted}
                opacity={0.25}
                horizontal={false}
              />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={52}
                tick={{ fill: "#cfcfd6", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(214,178,94,0.08)" }}
                contentStyle={{
                  background: "rgba(12,12,16,0.92)",
                  border: "1px solid rgba(214,178,94,0.35)",
                  borderRadius: 12,
                  color: "#f3f3f3",
                }}
              />
              <Bar
                dataKey="value"
                fill={gold}
                radius={[0, 8, 8, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
