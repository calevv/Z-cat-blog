// ───────────────────────────────
// 로그인 페이지
// 역할: 관리자 로그인 UI
// "use client" — onChange, useState 필요
// ───────────────────────────────
"use client";

import { signIn } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    <div className="flex min-h-screen flex-col justify-between">
      <header className="text-muted-foreground flex h-20 flex-row-reverse items-center px-10 text-right text-xs">
        <Button
          variant={"ghost"}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        >
          <ArrowLeft /> BACK TO SITE
        </Button>
      </header>
      <article className="grid flex-1 place-items-center">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs text-zinc-500">[ADMIN_PORTAL]</p>
            <h1 className="text-3xl leading-9 font-bold text-zinc-900">
              Sign in
            </h1>
            <p className="text-sm text-zinc-500">
              Administrator credentials required.
            </p>
          </div>
          <div className="h-px w-full bg-neutral-200"></div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* autoComplete="new-password" 자동완성 방지 */}
            {/* 이메일 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="admin-email"
                className="font-mono text-[10px] leading-4 font-medium tracking-wider text-zinc-500"
              >
                ADMIN EMAIL
              </label>
              <input
                id="admin-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="YOUR_EMAIL"
                autoComplete="new-password"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary h-12 w-full rounded border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="admin-password"
                className="font-mono text-[10px] leading-4 font-medium tracking-wider text-zinc-500"
              >
                PASSWORD
              </label>
              <input
                id="admin-password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="YOUR_PASSWORD"
                autoComplete="new-password"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary h-12 w-full rounded border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
              />
            </div>

            {/* 전송 버튼 */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !isValid}
                className="h-11 w-full rounded bg-zinc-900 py-3.5 font-mono text-xs leading-4 tracking-widest text-white uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {loading ? "VERIFYING..." : "Access System"}
              </button>
            </div>
          </form>
          <p className="text-center text-xs text-zinc-400 uppercase">
            Unauthorized access is logged and judged by Z-cat.
          </p>
        </div>
      </article>
      <footer className="border-accent flex h-20 items-center border-t px-10 text-left text-xs text-zinc-400">
        <p>© 2026 Z-cat. Errors will be judged.</p>
      </footer>
    </div>
  );
}
