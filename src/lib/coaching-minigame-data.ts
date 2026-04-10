export type Axis = "vision" | "teamfight" | "macro" | "risk" | "tempo";

export const AXES: Axis[] = [
  "vision",
  "teamfight",
  "macro",
  "risk",
  "tempo",
];

export const axisLabels: Record<Axis, string> = {
  vision: "시야·정보",
  teamfight: "한타·교전",
  macro: "운영·라인",
  risk: "리스크·올인",
  tempo: "템포·타이밍",
};

export type SituationTag = {
  id: string;
  label: string;
  hint: string;
};

export const situationTags: SituationTag[] = [
  { id: "tf_heavy", label: "상대 한타 강함", hint: "5v5가 자주 난다" },
  { id: "vision_gap", label: "시야 열세", hint: "와드 싸움이 불리하다" },
  { id: "gold_behind", label: "골드 뒤처짐", hint: "한 방 싸움이 부담이다" },
  { id: "obj_soon", label: "오브젝트 임박", hint: "다음 콘테스트가 곧이다" },
  { id: "lane_pressure", label: "라인 압박", hint: "측면/스플릿이 중요하다" },
  { id: "scaling", label: "후반 스케일", hint: "시간이 필요한 조합이다" },
];

export type PriorityRound = {
  id: string;
  question: string;
  sub: string;
  left: { label: string; axis: Axis };
  right: { label: string; axis: Axis };
};

export const priorityRounds: PriorityRound[] = [
  {
    id: "r1",
    question: "이번 판, 더 비중을 둘 축은?",
    sub: "데이터 코칭에서 ‘우선순위’를 고르는 단계입니다.",
    left: { label: "시야·정보 장악", axis: "vision" },
    right: { label: "한타 승부", axis: "teamfight" },
  },
  {
    id: "r2",
    question: "리스크를 어떻게 가져갈까?",
    sub: "안전한 운영 vs 공격적 올인",
    left: { label: "안전 운영", axis: "macro" },
    right: { label: "리스크 올인", axis: "risk" },
  },
  {
    id: "r3",
    question: "템포는 어디로?",
    sub: "느린 확장 운영 vs 빠른 강행",
    left: { label: "느린 템포·확장", axis: "macro" },
    right: { label: "빠른 템포·강행", axis: "tempo" },
  },
];

export function getRounds(): PriorityRound[] {
  return priorityRounds;
}

export type ActionOption = {
  id: string;
  title: string;
  hook: string;
  checklist: [string, string];
  axes: Partial<Record<Axis, number>>;
  tagSynergy: Partial<Record<string, number>>;
};

export const actionOptions: ActionOption[] = [
  {
    id: "a1",
    title: "비전 박스 → 교전 각도 좁히기",
    hook: "시야를 먼저 깔고, 한타 입장을 강제한다.",
    checklist: [
      "진입 20초 전 핑크/렌즈 타이밍 맞추기",
      "플랭크 각도 1개만 연다(과확장 금지)",
    ],
    axes: { vision: 1, teamfight: 0.75, macro: 0.4, risk: 0.35, tempo: 0.45 },
    tagSynergy: { vision_gap: 2.2, tf_heavy: 1.2, obj_soon: 1 },
  },
  {
    id: "a2",
    title: "오브젝트 교환·스플릿 압박",
    hook: "싸움 대신 ‘바꿔치기’로 이득을 쌓는다.",
    checklist: [
      "상대 주요 자원 타이머에 맞춰 반대 축 밀기",
      "교환 실패 시 즉시 리콜 라인으로 복귀",
    ],
    axes: { vision: 0.35, teamfight: 0.3, macro: 1, risk: 0.55, tempo: 0.65 },
    tagSynergy: { lane_pressure: 2, gold_behind: 1.5, scaling: 1.2 },
  },
  {
    id: "a3",
    title: "짧은 한타: 핵심 CC만 맞추기",
    hook: "길게 싸우지 않고, 승률 높은 교전 길이로 맞춘다.",
    checklist: [
      "진입 신호는 ‘스킬 2개 이상 겹칠 때’만",
      "포커스 타겟 1명 고정(콜 통일)",
    ],
    axes: { vision: 0.45, teamfight: 1, macro: 0.35, risk: 0.5, tempo: 0.85 },
    tagSynergy: { tf_heavy: 1.8, gold_behind: 1, obj_soon: 1.4 },
  },
  {
    id: "a4",
    title: "리스크 올인: 타이밍 콜",
    hook: "불리할수록 ‘한 번의 올바른 올인’으로 역전을 노린다.",
    checklist: [
      "템 파워 스파이크 타이밍만 노출",
      "패배 시 바로 손절(추격 금지)",
    ],
    axes: { vision: 0.25, teamfight: 0.7, macro: 0.25, risk: 1, tempo: 0.9 },
    tagSynergy: { gold_behind: 2, scaling: 0.8, obj_soon: 1.2 },
  },
  {
    id: "a5",
    title: "시야 선점 → 슬로우 템포 운영",
    hook: "빠르게 이기려 하지 않고, 실수를 줄이는 운영.",
    checklist: [
      "와드 체인을 미리 설계(루트 고정)",
      "미니언 라인 우선 정리 후 행동",
    ],
    axes: { vision: 0.85, teamfight: 0.4, macro: 0.95, risk: 0.2, tempo: 0.35 },
    tagSynergy: { scaling: 2.2, gold_behind: 0.9, vision_gap: 1.3 },
  },
  {
    id: "a6",
    title: "강행 타이밍: 오브젝트 선콜",
    hook: "다음 한 방을 데이터로 고정하고, 팀 합을 맞춘다.",
    checklist: [
      "30초 전 ‘싸울/바꿀’ 단일 결정",
      "시야 2칸 확보 후 진입",
    ],
    axes: { vision: 0.55, teamfight: 0.65, macro: 0.55, risk: 0.6, tempo: 0.95 },
    tagSynergy: { obj_soon: 2.4, tf_heavy: 1, vision_gap: 0.8 },
  },
];

const initialWeights = (): Record<Axis, number> => ({
  vision: 1,
  teamfight: 1,
  macro: 1,
  risk: 1,
  tempo: 1,
});

export function applyRoundWeight(
  weights: Record<Axis, number>,
  axis: Axis,
  delta = 2,
): Record<Axis, number> {
  return { ...weights, [axis]: weights[axis] + delta };
}

export function scoreOption(
  opt: ActionOption,
  weights: Record<Axis, number>,
  tags: string[],
): number {
  let s = 0;
  for (const a of AXES) {
    const w = opt.axes[a] ?? 0;
    s += w * weights[a];
  }
  for (const t of tags) {
    s += opt.tagSynergy[t] ?? 0;
  }
  return s;
}

export function rankActions(
  weights: Record<Axis, number>,
  tags: string[],
): Array<{ opt: ActionOption; score: number }> {
  return actionOptions
    .map((opt) => ({ opt, score: scoreOption(opt, weights, tags) }))
    .sort((a, b) => b.score - a.score);
}

export function topAxisContribution(
  opt: ActionOption,
  weights: Record<Axis, number>,
): { axis: Axis; value: number } | null {
  let best: Axis | null = null;
  let bestV = 0;
  for (const a of AXES) {
    const w = (opt.axes[a] ?? 0) * weights[a];
    if (w > bestV) {
      bestV = w;
      best = a;
    }
  }
  return best && bestV > 0 ? { axis: best, value: bestV } : null;
}

export function topTagSynergy(
  opt: ActionOption,
  tags: string[],
): { tag: string; bonus: number } | null {
  let best: string | null = null;
  let bestB = 0;
  for (const t of tags) {
    const b = opt.tagSynergy[t] ?? 0;
    if (b > bestB) {
      bestB = b;
      best = t;
    }
  }
  return best && bestB > 0 ? { tag: best, bonus: bestB } : null;
}

export function buildReasonLine(
  opt: ActionOption,
  weights: Record<Axis, number>,
  tags: string[],
): string {
  const axisPart = topAxisContribution(opt, weights);
  const tagPart = topTagSynergy(opt, tags);
  const tagLabel = situationTags.find((x) => x.id === tagPart?.tag)?.label;

  if (tagPart && tagLabel && tagPart.bonus >= 1.5) {
    return `선택한 상황 “${tagLabel}”과 시너지가 큽니다.`;
  }
  if (axisPart) {
    return `${axisLabels[axisPart.axis]} 축의 가중치와 가장 잘 맞물립니다.`;
  }
  return "우선순위와 상황 태그를 종합해 추천되었습니다.";
}

export function initialUserWeights() {
  return initialWeights();
}
