"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDialog } from "./SearchDialog";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { PawPrint } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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
        {/* Centered Nav */}
        <nav className="text-muted-foreground hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            href="/"
            className={`border-b-2 pb-1 transition-colors ${
              pathname === "/"
                ? "text-foreground border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            About
          </Link>
          <Link
            href="/diary"
            className={`border-b-2 pb-1 transition-colors ${
              pathname.startsWith("/diary")
                ? "text-foreground border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            Diary
          </Link>
          <Link
            href="/contact"
            className={`border-b-2 pb-1 transition-colors ${
              pathname === "/contact"
                ? "text-foreground border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Section (Search Icon Placeholder) */}
        <div>
          <SearchDialog />
        </div>
      </div>
    </header>
  );
}
