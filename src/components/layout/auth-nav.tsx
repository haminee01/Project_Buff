import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

export async function AuthNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/85 transition hover:border-amber-300/45 hover:text-amber-100 md:px-4"
      >
        <LogIn className="size-4 text-amber-200/90" />
        로그인
      </Link>
    );
  }

  const label =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "계정";

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <span
        className="max-w-[140px] truncate text-xs text-white/55 md:max-w-[200px]"
        title={user.email ?? undefined}
      >
        {label}
      </span>
      <form action={signOut}>
        <button
          type="submit"
          className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/85 transition hover:border-red-400/45 hover:text-red-200 md:px-4"
        >
          <LogOut className="size-4 text-red-200/80" />
          로그아웃
        </button>
      </form>
    </div>
  );
}
