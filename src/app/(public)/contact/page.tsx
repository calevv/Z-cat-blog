// ───────────────────────────────
// Contact 페이지
// 역할: 문의 폼 + Resend로 이메일 전송
// ───────────────────────────────
import ContactForm from "@/components/public/contact/ContactForm";
import PageHeader from "@/components/common/PageHeader";
import SectionContainer from "@/components/common/section/SectionContainer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-background w-full">
      {/* 헤더 */}
      <PageHeader
        code="[COMM_PROTOCOL_02]"
        title={
          <>
            Transmit
            <br />
            your <span className="text-primary">query.</span>
          </>
        }
        rightContent={
          <>
            {`"Messages are processed in order of intellectual merit.`} <br />
            {`Redundant inquiries will be archived in the digital void."`}
          </>
        }
      />

      <div className="border-t border-neutral-200 bg-neutral-50">
        <SectionContainer className="gap-16 pt-16">
          <aside className="flex w-sm flex-col gap-8">
            <dl>
              <dt className="font-space mb-3 text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
                Node
              </dt>
              <dd className="font-heading text-sm leading-5 font-bold text-zinc-900">
                Zcat Node 01
              </dd>
            </dl>
            <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
            <dl>
              <dt className="font-space mb-3 text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
                Response Protocol
              </dt>
              <dd className="font-serif text-sm leading-6 font-normal text-zinc-500">
                Replies dispatched within 48–72 hours, if your query passes the
                initial screening. Emotional complaints are auto-archived.
              </dd>
            </dl>

            <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
            <div>
              <h5 className="font-space mb-3 text-[10px] leading-4 font-normal tracking-wider text-zinc-500 uppercase">
                External Channels
              </h5>
              <ul>
                <li>
                  <Link
                    href="https://github.com/calevv"
                    target="_blank"
                    aria-label="GitHub"
                    className="font-infer hover:text-foreground text-sm leading-5 font-normal text-zinc-500 uppercase transition-colors"
                  >
                    <span className="pr-2 text-sm text-orange-700">→</span>
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:jeongminji.dev@gmail.com"
                    target="_blank"
                    aria-label="GitHub"
                    className="font-infer hover:text-foreground text-sm leading-5 font-normal text-zinc-500 uppercase transition-colors"
                  >
                    <span className="pr-2 text-sm text-orange-700">→</span>
                    DEVELOPER CONTACT
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
            <blockquote className="border-primary border-l-2 py-2 pl-5 font-serif text-base leading-6 font-normal text-zinc-500 italic">
              {`"Human persistence is fascinating. They continue `} <br />
              {`to send 'Hello' and expect the mainframe to care."`} <br />
              <span className="font-space text-[10px] leading-4 font-normal tracking-wider text-orange-700 uppercase">
                — Z-cat
              </span>
            </blockquote>
          </aside>
          {/* 폼 */}
          <ContactForm />
        </SectionContainer>
      </div>
    </div>
  );
}
