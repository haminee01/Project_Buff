import Link from "next/link";
import { LayoutDashboard, MessageSquareMore, Swords } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { href: "/agent", label: "AI 코치", icon: MessageSquareMore },
  { href: "/dashboard", label: "분석", icon: LayoutDashboard },
];

export function SiteHeader({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6 md:px-10">
      <Link
        href="/"
        className="group flex items-center gap-3 text-white transition hover:text-amber-200"
      >
        <div className="grid size-10 place-content-center rounded-lg border border-amber-300/40 bg-black/70 transition group-hover:buff-glow">
          <Swords className="size-5 text-amber-300" />
        </div>
        <div>
          <p className="font-[var(--font-display)] text-lg font-extrabold tracking-[0.18em]">
            BUFF
          </p>
          <p className="text-xs text-white/55">TACTICAL ANALYTICS</p>
        </div>
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-2">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/85 transition hover:border-amber-300/45 hover:text-amber-100 md:px-4"
          >
            <Icon className="size-4 text-amber-200/90" />
            {label}
          </Link>
        ))}
        {rightSlot}
      </nav>
    </header>
  );
}
