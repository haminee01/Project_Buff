import ProjectShell from "@/components/project/project-shell";

const choices = [
  {
    stack: "Next.js (App Router)",
    reason:
      "페이지/레이아웃 단위 구성이 명확해 문서형 페이지와 제품 화면을 같은 규칙으로 운영할 수 있습니다.",
    tradeoff:
      "버전 변경 폭이 커 문서와 마이그레이션 가이드를 계속 확인해야 합니다.",
  },
  {
    stack: "Tailwind CSS",
    reason:
      "컴포넌트 단에서 스타일 의도를 바로 표현할 수 있어 FE/디자인 협업 속도가 빠릅니다.",
    tradeoff:
      "유틸리티 클래스가 길어지면 가독성이 떨어질 수 있어 공통 패턴 정리가 필요합니다.",
  },
  {
    stack: "Framer Motion",
    reason:
      "입장/전환 애니메이션을 짧은 선언형 코드로 구현해 HUD 느낌을 전달하기 쉽습니다.",
    tradeoff:
      "모든 영역에 과도하게 적용하면 성능/집중도 저하가 생겨 최소 범위 적용 원칙이 필요합니다.",
  },
  {
    stack: "Supabase",
    reason:
      "DB + Auth + Realtime을 단일 플랫폼에서 운영해 반응 로그 기능을 빠르게 실험할 수 있습니다.",
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
      description="각 기술의 장점뿐 아니라 감수한 트레이드오프를 함께 기록해 의사결정 근거를 남깁니다."
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
          운영 원칙
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            문서와 구현을 동시에 업데이트해서 설계-코드 간격을 줄입니다.
          </li>
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            인터랙션은 "의미 있는 피드백"이 있는 구간에만 적용합니다.
          </li>
          <li className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
            데이터 수집은 UI 편의보다 신뢰 가능한 스키마와 권한 모델을
            우선합니다.
          </li>
        </ul>
      </article>
    </ProjectShell>
  );
}
