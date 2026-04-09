import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
      eyebrow="PROJECT HUB"
      title="프론트엔드 파트와 UXUI 디자인 파트를 분리해 정리했습니다."
      description="아래 3개 문서는 각각 목적이 분명하게 나뉘어 있습니다. 사이드바에서 언제든 전환해 전체 흐름을 빠르게 파악할 수 있습니다."
    >
      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          문서 구조 안내
        </h2>
        <p className="mt-2 text-sm text-white/65">
          구현 설명을 기능 중심으로 흩어두지 않고, 실제 협업에 맞게 설계 문서
          성격으로 구분했습니다.
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

      <article className="glass-card rounded-2xl p-5">
        <h2 className="font-[var(--font-display)] text-lg font-bold">
          분리 기준
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-sm font-semibold">프론트엔드 파트</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              컴포넌트 책임, 상태/데이터 연결, 재사용 가능한 API와 같은 구현
              구조를 중심으로 문서화합니다.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="gold-text text-sm font-semibold">UXUI 디자인 파트</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              정보 구조, 사용자 흐름, 인터랙션, 피드백 경험처럼 사용자가
              체감하는 품질을 중심으로 설명합니다.
            </p>
          </div>
        </div>
      </article>
    </ProjectShell>
  );
}
