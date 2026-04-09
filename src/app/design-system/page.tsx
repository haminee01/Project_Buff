import ProjectShell from "@/components/project/project-shell";

const components = [
  {
    name: "Top Navigation",
    fe: "공통 헤더/링크 상태를 라우트별로 재사용",
    ux: "항상 같은 위치에서 핵심 액션을 찾게 해 탐색 피로를 낮춤",
  },
  {
    name: "Glass Card",
    fe: "재사용 가능한 시각 컨테이너 클래스(`glass-card`)로 통일",
    ux: "시각적 계층을 명확히 분리해 정보 스캔 속도를 높임",
  },
  {
    name: "Reaction Log Bar",
    fe: "클릭 이벤트와 Realtime 구독이 결합된 인터랙티브 컴포넌트",
    ux: "피드백 즉시 반영으로 사용자의 조작 결과를 빠르게 확인",
  },
  {
    name: "Chart Blocks",
    fe: "Recharts 래퍼와 데이터 구조를 분리해 유지보수 용이성 확보",
    ux: "주간 추이/선호도 정보를 한눈에 이해할 수 있는 시각 패턴 제공",
  },
];

const tokens = [
  { key: "Color", value: "gold, red, muted, foreground, background" },
  { key: "Radius", value: "rounded-xl / rounded-2xl 중심 통일" },
  { key: "Spacing", value: "p-3 ~ p-6, mt-2/4/6 리듬 고정" },
  { key: "Typography", value: "디스플레이 폰트 + 본문 폰트 역할 분리" },
  { key: "Motion", value: "입장 애니메이션은 짧고 강조는 hover 위주" },
];

export default function DesignSystemPage() {
  return (
    <ProjectShell
      current="design-system"
      eyebrow="DESIGN SYSTEM"
      title="컴포넌트 문서화"
      description="프론트엔드 구조와 UXUI 의도를 같은 표에서 관리해 구현/디자인 언어를 일치시킵니다."
    >
      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          핵심 컴포넌트 매핑
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/55">
                <th className="px-3 py-2 font-medium">컴포넌트</th>
                <th className="px-3 py-2 font-medium">프론트엔드 관점</th>
                <th className="px-3 py-2 font-medium">UXUI 관점</th>
              </tr>
            </thead>
            <tbody>
              {components.map((item) => (
                <tr
                  key={item.name}
                  className="border-b border-white/5 align-top"
                >
                  <td className="px-3 py-3 text-white">{item.name}</td>
                  <td className="px-3 py-3 text-white/70">{item.fe}</td>
                  <td className="px-3 py-3 text-white/70">{item.ux}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          토큰/패턴 규칙
        </h2>
        <dl className="mt-4 grid gap-3 md:grid-cols-2">
          {tokens.map((token) => (
            <div
              key={token.key}
              className="rounded-xl border border-white/10 bg-black/25 p-4"
            >
              <dt className="gold-text text-xs uppercase tracking-[0.16em]">
                {token.key}
              </dt>
              <dd className="mt-2 text-sm text-white/70">{token.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </ProjectShell>
  );
}
