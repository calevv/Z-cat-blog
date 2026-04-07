// ───────────────────────────────
// 로그인 페이지
// 역할: 관리자 로그인 UI
// "use client" — onChange, useState 필요
// ───────────────────────────────
"use client";

import { signIn } from "@/actions/auth";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  // 입력값 상태 관리
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 입력값 변경 핸들러
  // name 속성으로 email/password 구분
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    console.log("로그인", form);
    const result = await signIn(form);

    // redirect가 일어나면 여기 아래는 실행 안 됨
    if (result?.success === false) {
      toast.error(result.message);
    }
    setLoading(false);
  }

  // 버튼 활성화 조건 — 둘 다 입력됐을 때만
  const isValid = form.email.trim() !== "" && form.password.trim() !== "";

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-sm px-6">
        {/* 헤더 */}
        <div className="mb-8">
          <p className="text-muted-foreground font-mono text-xs">
            [ADMIN_ACCESS]
          </p>
          <h1 className="text-foreground mt-2 text-3xl font-bold">
            Identify yourself.
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            인증되지 않은 접근은 기록된다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* autoComplete="new-password" 자동완성 방지 */}
          {/* 이메일 */}
          <div className="flex flex-col gap-1">
            <label className="text-muted-foreground font-mono text-xs">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="YOUR_EMAIL"
              autoComplete="new-password"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1">
            <label className="text-muted-foreground font-mono text-xs">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="YOUR_PASSWORD"
              autoComplete="new-password"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
            />
          </div>

          {/* 전송 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !isValid}
              className="bg-primary px-8 py-3 font-mono text-xs text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "CONFIRM_IDENTITY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
