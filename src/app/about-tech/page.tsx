import ProjectShell from "@/components/project/project-shell";

const choices = [
  {
    stack: "Next.js (App Router)",
    reason:
      "케이스 페이지를 섹션 단위로 분해해 포트폴리오 정보 구조를 빠르게 확장할 수 있습니다.",
    tradeoff:
      "버전 변경 폭이 커 문서와 마이그레이션 가이드를 계속 확인해야 합니다.",
  },
  {
    stack: "Tailwind CSS",
    reason:
      "디자인 의도를 코드에 직접 반영해 시안-구현 간 불일치를 줄일 수 있습니다.",
    tradeoff:
      "유틸리티 클래스가 길어지면 가독성이 떨어질 수 있어 공통 패턴 정리가 필요합니다.",
  },
  {
    stack: "Framer Motion",
    reason:
      "마이크로 인터랙션을 빠르게 프로토타이핑해 '정적인 포트폴리오'를 '경험형 포트폴리오'로 전환할 수 있습니다.",
    tradeoff:
      "모든 영역에 과도하게 적용하면 성능/집중도 저하가 생겨 최소 범위 적용 원칙이 필요합니다.",
  },
  {
    stack: "Supabase",
    reason:
      "UX 가설 검증에 필요한 행동 로그와 실시간 피드백 루프를 짧은 사이클로 실험할 수 있습니다.",
    tradeoff:
      "권한 정책(RLS)과 테이블 설계를 초기에 명확히 하지 않으면 확장 시 수정 비용이 커집니다.",
  },
  {
    stack: "Recharts",
    reason:
      "대시보드형 시각화(Area/Bar) 구현이 빠르고 데이터 변경 대응이 쉽습니다.",
    tradeoff:
      "복잡한 차트 상호작용은 커스텀 로직이 늘어날 수 있어 요구사항 선별이 중요합니다.",
  },
];

export default function AboutTechPage() {
  return (
    <ProjectShell
      current="about-tech"
      eyebrow="ABOUT TECH"
      title="왜 이 스택을 선택했는지"
      description="디자인 전달력, 협업 효율, UX 실험 속도 관점에서 기술 선택 근거를 명확히 남겼습니다."
    >
      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          선택 근거와 트레이드오프
        </h2>
        <div className="mt-4 space-y-3">
          {choices.map((item) => (
            <section
              key={item.stack}
              className="rounded-xl border border-white/10 bg-black/25 p-4"
            >
              <p className="gold-text text-sm font-semibold">{item.stack}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                <span className="text-white">선택 이유:</span> {item.reason}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                <span className="text-white">고려한 한계:</span> {item.tradeoff}
              </p>
            </section>
          ))}
        </div>
      </article>

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          UXUI 포트폴리오 운영 원칙
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            디자인 의사결정의 이유를 UI 결과와 함께 기록합니다.
          </li>
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            인터랙션은 미적 효과보다 정보 전달의 선명함을 우선합니다.
          </li>
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            구현 기술은 '디자인을 빠르게 검증하는 도구'로 사용합니다.
          </li>
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            케이스 스터디는 문제, 결정, 결과를 같은 형식으로 유지합니다.
          </li>
        </ul>
      </article>
    </ProjectShell>
  );
}
