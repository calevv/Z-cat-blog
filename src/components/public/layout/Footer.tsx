import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-border bg-background w-full border-t">
      <div className="mx-auto flex max-w-7xl justify-between px-6 py-8">
        {/* 로고 + 카피 */}
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tight">Z-cat.</span>
          <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
            집사(개발자)의 코드와 삽질을 관찰하는 Z-cat의 일지.
            <br />
            단, Z-cat 포스트의 집필은 AI에게 위임했습니다.
          </p>
          <p className="text-muted-foreground font-mono text-xs">
            © 2026 Z-cat. Errors will be judged.
          </p>
        </div>

        {/* 외부 링크 — 나중에 href 채울 것 */}
        <div className="text-muted-foreground flex gap-4 font-mono text-xs">
          {/* TODO: 깃허브 주소 넣기 */}
          <Link
            href="https://github.com/calevv"
            target="_blank"
            aria-label="GitHub"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          |{/* TODO: 블로그 주소 넣기 */}
          <Link
            href="https://velog.io/@jeongminji"
            target="_blank"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
