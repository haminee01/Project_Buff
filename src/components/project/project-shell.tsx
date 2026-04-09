import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type NavKey = "overview" | "design-system" | "case-study" | "about-tech";

const navItems: Array<{
  key: NavKey;
  href: string;
  label: string;
  desc: string;
}> = [
  {
    key: "overview",
    href: "/project",
    label: "프로젝트 개요",
    desc: "프론트엔드/UXUI 전체 구조",
  },
  {
    key: "design-system",
    href: "/design-system",
    label: "Design System",
    desc: "컴포넌트 문서화",
  },
  {
    key: "case-study",
    href: "/case-study",
    label: "Case Study",
    desc: "문제-해결-성과",
  },
  {
    key: "about-tech",
    href: "/about-tech",
    label: "About Tech",
    desc: "스택 선택 근거",
  },
];

export default function ProjectShell({
  current,
  eyebrow,
  title,
  description,
  children,
}: {
  current: NavKey;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="buff-bg relative min-h-screen overflow-hidden px-6 py-8 text-white md:px-10">
      <div className="scan-line pointer-events-none absolute inset-0" />

      <header className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/75 transition hover:text-amber-200"
          >
            <ArrowLeft className="size-4" />
            홈으로
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="glass-card rounded-full px-4 py-2 text-sm text-white/90 transition hover:border-amber-300/50 hover:text-amber-200"
            >
              대시보드 미리보기
            </Link>
            <Link
              href="/agent"
              className="glass-card rounded-full px-4 py-2 text-sm text-white/90 transition hover:border-red-400/60 hover:text-red-200"
            >
              AI 코치 체험하기
            </Link>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <p className="gold-text text-sm tracking-[0.18em]">{eyebrow}</p>
          <h1 className="mt-3 font-[var(--font-display)] text-3xl font-extrabold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
            {description}
          </p>
        </div>
      </header>

      <div className="mx-auto mt-8 grid w-full max-w-6xl gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="glass-card h-fit rounded-2xl p-4 lg:sticky lg:top-6">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-white/45">
            PROJECT INDEX
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = current === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block rounded-xl border px-3 py-3 transition ${
                    active
                      ? "border-amber-300/45 bg-amber-300/10"
                      : "border-white/10 bg-black/25 hover:border-amber-300/35"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-white/55">{item.desc}</p>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-5">{children}</section>
      </div>
    </main>
  );
}
