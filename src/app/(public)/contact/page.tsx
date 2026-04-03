// ───────────────────────────────
// Contact 페이지
// 역할: 문의 폼 + Resend로 이메일 전송
// ───────────────────────────────
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-background w-full">
      {/* 헤더 */}
      <section>
        <div className="border-border mx-auto max-w-3xl border-b px-6 py-16">
          <p className="text-muted-foreground font-mono text-xs">
            [HUMAN_TRANSMISSION]
          </p>
          <h1 className="text-foreground mt-2 text-5xl font-bold">
            Submit your query.
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">
            If it's worth the bandwidth.
          </p>
        </div>
      </section>

      {/* 폼 */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <ContactForm />
      </section>
    </div>
  );
}
