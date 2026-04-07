export const weeklyPerformance = [
  { day: "월", score: 62 },
  { day: "화", score: 68 },
  { day: "수", score: 71 },
  { day: "목", score: 66 },
  { day: "금", score: 74 },
  { day: "토", score: 79 },
  { day: "일", score: 77 },
];

export const characterPreference = [
  { name: "돌격", value: 32 },
  { name: "교란", value: 24 },
  { name: "지원", value: 18 },
  { name: "방어", value: 14 },
  { name: "원거리", value: 12 },
];

export const sessionStats = {
  playHoursWeek: 18.5,
  winRate: 0.674,
  avgReactionMs: 210,
  streakDays: 6,
};

export function getPlaystyleReport(stats: typeof sessionStats): {
  title: string;
  body: string;
} {
  const { winRate, playHoursWeek, avgReactionMs } = stats;
  if (winRate >= 0.62 && avgReactionMs < 240 && playHoursWeek >= 14) {
    return {
      title: "야성적인 공격형 코어",
      body: "높은 승률과 짧은 반응 시간이 맞물려 돌입 타이밍에서 우위를 만듭니다. 교전 초반 압박을 강화하면 리포트 점수 상승 폭이 가장 큽니다.",
    };
  }
  if (winRate >= 0.55) {
    return {
      title: "균형 잡힌 적응형",
      body: "다양한 상황에서 무난한 판단을 유지합니다. 승률을 밀어 올리려면 '교전 전 시야' 데이터를 주 1회 점검하는 루틴을 추천합니다.",
    };
  }
  return {
    title: "성장 여지 큰 실전형",
    body: "플레이 시간 대비 변동성이 큽니다. 데스 후 리스폰 루트를 고정하고, 한 라인 집중보다 로테이션 빈도를 높이는 쪽이 효과적입니다.",
  };
}
