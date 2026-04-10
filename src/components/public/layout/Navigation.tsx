"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <header className="bg-background/80 border-muted/50 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Z-cat.
        </Link>

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
          <button
            className="hover:bg-muted rounded-full p-2 transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
