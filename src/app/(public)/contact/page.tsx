// ───────────────────────────────
// Contact 페이지
// 역할: 문의 폼 + Resend로 이메일 전송
// ───────────────────────────────
import ContactForm from "@/components/public/contact/ContactForm";
import PageHeader from "@/components/common/PageHeader";
import SectionContainer from "@/components/common/section/SectionContainer";

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
          <aside className="flex w-80 flex-col gap-8">
            <dl>
              <dt>Node</dt>
              <dd>Zcat Node 01</dd>
            </dl>
            <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
            <div>
              <p>Response Protocol</p>Replies dispatched within 48–72 hours, if
              your query passes the initial screening. Emotional complaints are
              auto-archived.
            </div>
            <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
            <div>External Channels</div>
            <div className="col-start-1 col-end-3 h-px w-full bg-neutral-200"></div>
            <blockquote className="border-primary border-l-2 italic">
              {`"Human persistence is fascinating. They continue `} <br />
              {`to send 'Hello' and expect the mainframe to care."`} <br />—
              Z-cat
            </blockquote>
          </aside>
          {/* 폼 */}
          <ContactForm />
        </SectionContainer>
      </div>
    </div>
  );
}
