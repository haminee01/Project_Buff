"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function loginErrorRedirect(message: string): never {
  redirect(`/login?error=${encodeURIComponent(message)}`);
}

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    loginErrorRedirect("이메일과 비밀번호를 입력하세요.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    loginErrorRedirect(error.message);
  }
  redirect("/");
}

export async function signUpWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    loginErrorRedirect("이메일과 비밀번호를 입력하세요.");
  }
  if (password.length < 6) {
    loginErrorRedirect("비밀번호는 6자 이상이어야 합니다.");
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${base}/auth/callback`,
    },
  });
  if (error) {
    loginErrorRedirect(error.message);
  }
  redirect("/login?notice=" + encodeURIComponent("가입 확인 메일이 있으면 링크를 눌러 주세요."));
}

export async function loginAsDemo() {
  const email = process.env.BUFF_DEMO_EMAIL?.trim();
  const password = process.env.BUFF_DEMO_PASSWORD;
  if (!email || !password) {
    loginErrorRedirect("데모 로그인이 서버에 설정되지 않았습니다. (BUFF_DEMO_EMAIL / BUFF_DEMO_PASSWORD)");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    loginErrorRedirect(
      `데모 로그인 실패: ${error.message}. Supabase에 동일 이메일 사용자가 있고 비밀번호가 일치하는지 확인하세요.`,
    );
  }
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
