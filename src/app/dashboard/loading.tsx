import { SiteHeader } from "@/components/layout/site-header";

export default function DashboardLoading() {
  return (
    <div className="buff-bg min-h-screen text-white">
      <div className="scan-line pointer-events-none fixed inset-0 opacity-50" />
      <div className="relative z-10">
        <SiteHeader />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-6 py-6 md:px-10">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="glass-card h-32 animate-pulse rounded-2xl bg-white/5"
            />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="glass-card h-80 animate-pulse rounded-2xl bg-white/5 lg:col-span-3" />
          <div className="glass-card h-80 animate-pulse rounded-2xl bg-white/5 lg:col-span-2" />
        </div>
      </div>
    </div>
  );
}
