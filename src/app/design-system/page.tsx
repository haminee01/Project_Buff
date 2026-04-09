import ProjectShell from "@/components/project/project-shell";

const components = [
  {
    name: "Navigation Pattern",
    fe: "상단 글로벌 네비 + 좌측 섹션 네비를 구조적으로 분리",
    ux: "현재 위치와 다음 행동을 동시에 인지할 수 있게 함",
  },
  {
    name: "Insight Card",
    fe: "공통 카드 레이아웃과 타이포 계층을 컴포넌트 단위로 통일",
    ux: "요약-근거-액션 흐름을 짧은 시선 이동으로 읽게 함",
  },
  {
    name: "Feedback Chips",
    fe: "토글 버튼 패턴과 상태 스타일(active/hover/disabled) 정의",
    ux: "감정 표현을 저마찰 입력으로 전환해 반응 수집률 개선",
  },
  {
    name: "Data Visualization Blocks",
    fe: "차트 컨테이너의 크기/여백/축 스타일을 규칙화",
    ux: "추세 비교 시 인지 부담을 줄이도록 시각 노이즈 최소화",
  },
];

const tokens = [
  {
    key: "Color",
    value: "의미 중심 팔레트: 강조(gold), 경고(red), 보조(muted)",
  },
  { key: "Radius", value: "컴포넌트 모서리 반경을 12/16px 기준으로 통일" },
  { key: "Spacing", value: "8pt scale 기반으로 카드 내부 여백 리듬 유지" },
  { key: "Typography", value: "헤드라인(강조) / 본문(가독) 역할을 분리" },
  { key: "Motion", value: "정보 전달을 방해하지 않는 200~500ms 범위만 사용" },
  { key: "A11y", value: "텍스트 대비와 클릭 타겟(최소 40px) 기준 유지" },
];

export default function DesignSystemPage() {
  return (
    <ProjectShell
      current="design-system"
      eyebrow="DESIGN SYSTEM"
      title="UXUI 컴포넌트 시스템"
      description="시각 스타일을 넘어서, 사용자 행동을 유도하는 인터랙션 규칙까지 포함한 포트폴리오용 시스템 문서입니다."
    >
      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          핵심 컴포넌트 매핑 (구현 + 경험)
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
          디자인 토큰/패턴 규칙
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

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          주요 산출물
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">IA</p>
            <p className="mt-2 text-sm text-white/70">
              대시보드/리포트/피드백 흐름의 정보 구조 정의
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Component Spec
            </p>
            <p className="mt-2 text-sm text-white/70">
              상태별 스타일, 크기, 인터랙션, 사용 맥락을 문서화
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Prototype Rule
            </p>
            <p className="mt-2 text-sm text-white/70">
              모션 타이밍/전환 규칙으로 화면 간 일관성 확보
            </p>
          </div>
        </div>
      </article>
    </ProjectShell>
  );
}
