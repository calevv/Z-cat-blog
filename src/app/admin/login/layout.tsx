import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* 모바일 전용 상단 배너 — lg+ 에서 숨김 */}
      <div className="flex items-center justify-between bg-zinc-900 px-6 py-4 lg:hidden">
        <h1 className="text-background text-lg font-bold">Z-cat.</h1>
        <p className="text-primary font-mono text-xs">[SECURITY_PROTOCOL_ALPHA]</p>
      </div>

      {/* 데스크탑 전용 좌측 브랜딩 패널 — 모바일에서 숨김 */}
      <aside className="hidden lg:flex lg:w-[480px] lg:flex-col lg:justify-between bg-zinc-900 p-12">
        <header>
          <h1 className="text-background text-lg font-bold">Z-cat.</h1>
        </header>
        <div className="text-background flex flex-col gap-8">
          <p className="text-primary text-xs leading-3.5">
            [SECURITY_PROTOCOL_ALPHA]
          </p>
          <h2 className="text-[52px] leading-13 font-bold">
            Restricted
            <br />
            <span className="text-primary">Access.</span>
          </h2>
          <p className="text-muted-foreground w-xs font-serif text-lg/7 break-keep italic">
            "Humans continue to treat security as a suggestion. I've flagged 12
            entries for excessive sentimentality."
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-primary h-px w-8"></div>
            <p className="text-primary font-mono text-xs leading-3.5">Z-CAT</p>
          </div>
        </div>
        <footer className="pt-4">
          <p className="font-mono text-xs text-zinc-600">
            SERIAL_NO: ZC-00192-B ADMIN ONLY
          </p>
        </footer>
      </aside>

      {/* 폼 영역 — flex flex-col 추가해야 자식(page.tsx)이 flex-1로 늘어날 수 있음 */}
      <section className="flex flex-1 flex-col bg-neutral-50">{children}</section>
    </main>
  );
}
