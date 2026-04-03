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
    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-4">
      {/* 이름 */}
      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground font-mono text-xs">NAME</label>
        <input
          type="text"
          name="name"
          placeholder="YOUR_IDENTIFIER"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
        />
      </div>

      {/* 이메일 */}
      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground font-mono text-xs">EMAIL</label>
        <input
          type="email"
          name="email"
          placeholder="YOUR_RETURN_ADDRESS"
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
        />
      </div>

      {/* 메시지 */}
      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground font-mono text-xs">
          MESSAGE
        </label>
        <textarea
          name="message"
          placeholder="STATE YOUR QUERY. CONCISELY."
          rows={6}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary w-full resize-none border px-4 py-3 font-mono text-sm transition-colors focus:outline-none"
        />
      </div>

      {/* 전송 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary px-8 py-3 font-mono text-xs text-white transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "TRANSMITTING..." : "TRANSMIT_MESSAGE"}
        </button>
      </div>
    </form>
  );
}
