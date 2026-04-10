import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CoachingMinigame from "@/components/project/coaching-minigame";
import ProjectShell from "@/components/project/project-shell";

const docs = [
  {
    href: "/design-system",
    title: "Design System",
    subtitle: "프론트엔드 + UXUI 컴포넌트 문서화",
    description:
      "토큰, 공통 컴포넌트, 인터랙션 규칙을 정리해 화면 확장 시 일관성을 유지합니다.",
  },
  {
    href: "/case-study",
    title: "Case Study",
    subtitle: "문제-해결-성과 구조",
    description:
      "핵심 사용자 문제를 어떻게 정의했고 어떤 UX/UI 결정으로 해결했는지 결과까지 추적합니다.",
  },
  {
    href: "/about-tech",
    title: "About Tech",
    subtitle: "스택 선택 근거",
    description:
      "왜 Next.js, Tailwind, Supabase를 선택했는지 운영/개발 효율 관점으로 근거를 명시합니다.",
  },
];

export default function ProjectPage() {
  return (
    <ProjectShell
      current="overview"
      eyebrow="UXUI PORTFOLIO"
      title="BUFF: 데이터 기반 게임 코칭 경험 설계"
      description="문제 정의부터 인터랙션 설계, 컴포넌트 시스템, 구현 협업까지 한 흐름으로 정리한 케이스입니다."
    >
      <article className="glass-card overflow-hidden rounded-2xl p-5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Case Snapshot
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold">
              UXUI 디자이너 포트폴리오
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              데이터 기반 코칭 경험을 &quot;짧게 읽고 바로 행동하는 화면&quot;으로
              재설계한 프로젝트입니다. 아래 배지는 본 케이스에서의 제 역할을
              한눈에 보여줍니다.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                역할: UXUI Designer
              </span>
              <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs text-white/80">
                기여도: UXUI 80% · FE 20%
              </span>
              <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs text-white/80">
                기간: 2026.03.27 - 2026.04.10 (3주)
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-white/45">핵심 성과</p>
              <p className="mt-2 text-sm text-white/75">
                정보 인지 효율 향상, 피드백 참여율 개선, 협업 문서화 체계를
                동시에 달성했습니다.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl border border-amber-300/25 bg-[radial-gradient(circle_at_20%_20%,rgba(214,178,94,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(223,47,69,0.18),transparent_40%),#0a0a0f] p-4">
            <div className="rounded-xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                Project Cover
              </p>
              <h3 className="mt-2 font-[var(--font-display)] text-xl font-bold text-white">
                BUFF
              </h3>
              <p className="mt-1 text-sm text-white/65">
                Data-informed coaching UX for competitive gamers
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-white/10 bg-black/35 p-3">
                <p className="text-xs text-white/45">Domain</p>
                <p className="mt-1 text-sm text-white">Gaming</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/35 p-3">
                <p className="text-xs text-white/45">Platform</p>
                <p className="mt-1 text-sm text-white">Web</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/35 p-3">
                <p className="text-xs text-white/45">Focus</p>
                <p className="mt-1 text-sm text-white">UXUI</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/35 p-4">
              <p className="text-sm leading-relaxed text-white/70">
                &quot;복잡한 데이터도 한 번의 시선으로 이해하고, 다음 행동까지
                이어지게 한다.&quot;
              </p>
            </div>
          </div>
        </div>
      </article>

      <CoachingMinigame />

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          프로젝트 브리프
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs text-white/45">문제</p>
            <p className="mt-2 text-sm text-white/70">
              플레이어가 경기 직전 필요한 전략을 빠르게 이해하지 못함
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs text-white/45">목표</p>
            <p className="mt-2 text-sm text-white/70">
              분석 결과를 3초 내 스캔 가능한 UI로 재구성
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs text-white/45">역할</p>
            <p className="mt-2 text-sm text-white/70">
              UX 리서치, 정보 구조, UI 시스템, 프론트 구현 협업
            </p>
          </div>
        </div>
      </article>

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          디자인 프로세스
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Discover
            </p>
            <p className="mt-2 text-sm text-white/70">
              로그/반응 데이터로 핵심 pain point 도출
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Define
            </p>
            <p className="mt-2 text-sm text-white/70">
              정보 우선순위를 KPI-리포트-액션 순서로 정렬
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Design
            </p>
            <p className="mt-2 text-sm text-white/70">
              카드/차트/피드백 패턴을 컴포넌트 시스템으로 통합
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-xs uppercase tracking-[0.16em]">
              Validate
            </p>
            <p className="mt-2 text-sm text-white/70">
              반응 로그 기반으로 카피와 우선순위 반복 개선
            </p>
          </div>
        </div>
      </article>

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          포트폴리오 문서
        </h2>
        <p className="mt-2 text-sm text-white/65">
          아래 3개 문서를 통해 설계 의도와 결과를 분리해 확인할 수 있습니다.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {docs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="rounded-xl border border-white/10 bg-black/25 p-4 transition hover:border-amber-300/40"
            >
              <p className="gold-text text-xs uppercase tracking-[0.16em]">
                {doc.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {doc.subtitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {doc.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-amber-200">
                열기 <ChevronRight className="size-4" />
              </p>
            </Link>
          ))}
        </div>
      </article>
    </ProjectShell>
  );
}
