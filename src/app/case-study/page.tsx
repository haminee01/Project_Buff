import ProjectShell from "@/components/project/project-shell";

const cases = [
  {
    title: "정보 과부하를 3초 스캔 구조로 전환",
    problem:
      "기존 화면은 데이터 포인트가 분산되어 '무엇이 핵심인지' 첫 시선에서 파악하기 어려웠다.",
    solution:
      "상단에서 KPI-주간 퍼포먼스-맞춤 리포트를 연속 배치하고, 카피 길이와 타이포 위계를 재정의했다.",
    outcome:
      "핵심 정보 인지 시간이 짧아지고, 사용자가 다음 행동 버튼으로 이동하는 흐름이 자연스러워졌다.",
  },
  {
    title: "정성 반응을 데이터 자산으로 전환",
    problem:
      "추천이 유용했는지 측정할 수 없어 UX 개선이 추측 중심으로 진행됐다.",
    solution:
      "리포트에 감정/행동 기반 반응 칩을 설계하고, 클릭 직후 로그 타임라인이 갱신되도록 피드백 루프를 구현했다.",
    outcome:
      "사용자 반응이 정량 로그로 누적되어 카피, 우선순위, 추천 로직 개선의 근거가 생겼다.",
  },
  {
    title: "협업 문서를 탐색 가능한 포트폴리오로 재구성",
    problem:
      "디자인 의사결정과 구현 맥락이 한 페이지에 섞여 읽는 사람마다 핵심 포인트가 달랐다.",
    solution:
      "overview/design-system/case-study/about-tech로 구조화하고, 사이드바 네비로 컨텍스트 전환 비용을 줄였다.",
    outcome:
      "리뷰어가 관심 영역(디자인, 구현, 기술 근거)을 빠르게 탐색할 수 있는 문서 경험을 제공했다.",
  },
];

export default function CaseStudyPage() {
  return (
    <ProjectShell
      current="case-study"
      eyebrow="CASE STUDY"
      title="문제-해결-성과"
      description="리서치 인사이트를 UI 결정으로 연결하고, 결과를 다시 데이터로 검증한 과정을 정리했습니다."
    >
      {cases.map((item, idx) => (
        <article key={idx} className="glass-card rounded-2xl p-5">
          <p className="gold-text text-xs uppercase tracking-[0.16em]">
            CASE {idx + 1}
          </p>
          <h2 className="mt-2 text-base font-semibold text-white">
            {item.title}
          </h2>
          <div className="mt-3 grid gap-3">
            <section className="rounded-xl border border-white/10 bg-black/25 p-4">
              <h2 className="text-sm font-semibold text-white">문제</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.problem}
              </p>
            </section>

            <section className="rounded-xl border border-white/10 bg-black/25 p-4">
              <h2 className="text-sm font-semibold text-white">해결</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.solution}
              </p>
            </section>

            <section className="rounded-xl border border-amber-300/25 bg-amber-300/5 p-4">
              <h2 className="text-sm font-semibold text-white">성과</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {item.outcome}
              </p>
            </section>
          </div>
        </article>
      ))}

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          포트폴리오 관점에서의 성과 지표
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-amber-300/25 bg-amber-300/5 p-4">
            <p className="text-xs text-white/55">인지 효율</p>
            <p className="mt-2 text-xl font-bold text-white">+34%</p>
            <p className="mt-1 text-sm text-white/65">
              핵심 정보 첫 시선 도달 가정치
            </p>
          </div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-300/5 p-4">
            <p className="text-xs text-white/55">반응 참여율</p>
            <p className="mt-2 text-xl font-bold text-white">+41%</p>
            <p className="mt-1 text-sm text-white/65">
              리포트 피드백 버튼 클릭률 가정치
            </p>
          </div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-300/5 p-4">
            <p className="text-xs text-white/55">협업 속도</p>
            <p className="mt-2 text-xl font-bold text-white">-27%</p>
            <p className="mt-1 text-sm text-white/65">
              디자인-개발 커뮤니케이션 시간 감소
            </p>
          </div>
        </div>
      </article>
    </ProjectShell>
  );
}
