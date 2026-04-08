import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="bg-foreground w-[480px] flex-col justify-between p-12 lg:flex">
        <div className="text-background">
          <h1 className="text-lg font-bold">Z-cat.</h1>
          <div className="mt-40">
            <p className="text-primary text-sm">[SECURITY_PROTOCOL_ALPHA]</p>
            <h2 className="text-6xl leading-tight font-bold">
              Restricted
              <br />
              Access.
            </h2>
            <p>
              "Humans continue to treat security as a suggestion. I've flagged
              12 entries for excessive sentimentality."
            </p>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            SERIAL_NO: ZC-00192-B ADMIN ONLY
          </div>
        </div>
      </aside>
      {children}
    </div>
  );
}
