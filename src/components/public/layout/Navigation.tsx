"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "./SearchDialog";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { PawPrint } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "About", exact: true },
  { href: "/diary", label: "Diary", exact: false },
  { href: "/contact", label: "Contact", exact: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  // onAuthStateChange → 로그인/로그아웃 실시간 감지
  useEffect(() => {
    const supabase = createClient();

    // 초기 세션 체크
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session?.user);
    });

    // 로그인/로그아웃 실시간 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAdmin(!!session?.user);
    });

    // 클린업
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="bg-background/80 border-muted/50 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Z-cat.
          </Link>
          {isAdmin && (
            <Link href="/admin">
              <PawPrint size={16} className="fill-foreground" />
            </Link>
          )}
        </div>

        {/* 데스크탑 Nav */}
        <nav className="text-muted-foreground hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={`border-b-2 pb-1 transition-colors ${
                isActive(href, exact)
                  ? "text-foreground border-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 오른쪽 영역 */}
        <div className="flex items-center gap-1">
          <SearchDialog />
          {/* 햄버거 버튼 — 모바일 전용 */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
            className="hover:bg-muted rounded p-2 transition-colors md:hidden"
          >
            {menuOpen ? (
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <nav className="border-muted/50 bg-background border-t md:hidden">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block border-b px-4 py-4 text-sm transition-colors ${
                isActive(href, exact)
                  ? "text-primary bg-primary/5 border-muted/30 font-medium"
                  : "text-muted-foreground hover:text-foreground border-muted/30 hover:bg-muted/30"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
