// ───────────────────────────────
// ContactForm 컴포넌트
// 역할: 문의 폼 UI + 전송 상태 관리
// "use client" — useState, form 상태 필요

// TODO: ui 시안대로 수정
// ───────────────────────────────
"use client";

import { useRef, useState } from "react";
import { sendContactEmail } from "@/actions/contact";
import { toast } from "sonner";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    setLoading(false);

    // 전송 성공 후
    if (result.success) {
      toast.success(result.message, { position: "top-center" });
      formRef.current?.reset();
    } else {
      toast.error(result.message, { position: "top-center" });
    }
  }

  return (
    <article className="w-3xl rounded-[10px] border border-neutral-200 bg-white px-10 py-10">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="grid grid-cols-2 gap-8"
      >
        {/* 이름 */}
        <div className="flex flex-col gap-1">
          <label className="text-muted-foreground font-mono text-xs">
            NAME
          </label>
          <input
            type="text"
            name="name"
            placeholder="YOUR_IDENTIFIER"
            className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded border bg-neutral-50 px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
          />
        </div>

        {/* 이메일 */}
        <div className="flex flex-col gap-1">
          <label className="text-muted-foreground font-mono text-xs">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            placeholder="YOUR_RETURN_ADDRESS"
            className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded border bg-neutral-50 px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
          />
        </div>
        <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
        {/* 메시지 */}
        <div className="col-start-1 col-end-3 flex flex-col gap-1">
          <label className="text-muted-foreground font-mono text-xs">
            MESSAGE
          </label>
          <textarea
            name="message"
            placeholder="STATE YOUR QUERY. CONCISELY."
            rows={6}
            className="border-border text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded border bg-neutral-50 px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
          />
        </div>

        {/* 전송 버튼 */}
        <div className="col-start-1 col-end-3 flex justify-between">
          <div className="font-space text-[10px] leading-4 font-normal tracking-wider text-zinc-400 uppercase">
            All fields required
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary px-8 py-3 font-mono text-xs text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {loading ? "TRANSMITTING..." : "TRANSMIT_MESSAGE"}
          </button>
        </div>
      </form>
    </article>
  );
}
