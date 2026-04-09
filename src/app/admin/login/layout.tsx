import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full">
      <aside className="flex w-[480px] flex-col justify-between bg-zinc-900 p-12">
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
          {/* border-zinc-800 border-t */}
          <p className="font-mono text-xs text-zinc-600">
            SERIAL_NO: ZC-00192-B ADMIN ONLY
          </p>
        </footer>
      </aside>
      <section className="flex-1 bg-neutral-50">{children}</section>
    </main>
  );
}
