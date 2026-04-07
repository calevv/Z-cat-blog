// ───────────────────────────────
// Auth Server Action
// 역할: 로그인 / 로그아웃 처리
// TODO : 로그인 상태면 로그인페이지 못가게
// ───────────────────────────────
"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: "인증 실패. 집사 맞아?" };
  }

  // 로그인 성공 → 어드민 대시보드로 이동
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
