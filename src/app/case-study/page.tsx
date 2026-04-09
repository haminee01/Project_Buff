import ProjectShell from "@/components/project/project-shell";

const cases = [
  {
    problem:
      "지표와 추천이 흩어져 있어 사용자가 '지금 뭘 해야 하는지'를 빠르게 판단하기 어려웠다.",
    solution:
      "대시보드 상단에 KPI/주간 그래프/맞춤 리포트를 묶고, 동일 톤의 컴포넌트로 정보 계층을 통일했다.",
    outcome:
      "읽기 순서가 명확해져 분석 카드의 맥락 파악 시간이 줄고, 주요 액션 버튼 도달률이 높아지는 구조를 만들었다.",
  },
  {
    problem:
      "추천 품질에 대한 사용자 반응을 수집하지 못해 개인화 개선 근거가 부족했다.",
    solution:
      "리포트 카드에 반응 버튼 세트를 배치하고, 클릭을 Supabase Realtime 로그와 연결해 즉시 누적되게 설계했다.",
    outcome:
      "사용자 피드백이 정량 데이터로 남아 추천 모델/카피 개선을 반복할 수 있는 루프가 완성됐다.",
  },
  {
    problem:
      "콘텐츠가 많아지면 페이지가 길어져서 프론트엔드 설명과 UXUI 설명이 뒤섞였다.",
    solution:
      "사이드바 기반 문서 내비게이션을 도입해 Design System / Case Study / About Tech를 분리했다.",
    outcome:
      "개발자와 디자이너가 필요한 문서만 빠르게 찾을 수 있어 커뮤니케이션 비용을 줄였다.",
  },
];

export default function CaseStudyPage() {
  return (
    <ProjectShell
      current="case-study"
      eyebrow="CASE STUDY"
      title="문제-해결-성과"
      description="실제 사용자 문제를 기준으로 구현 결정을 역추적할 수 있게 구성했습니다."
    >
      {cases.map((item, idx) => (
        <article key={idx} className="glass-card rounded-2xl p-5">
          <p className="gold-text text-xs uppercase tracking-[0.16em]">
            CASE {idx + 1}
          </p>
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
    </ProjectShell>
  );
}
