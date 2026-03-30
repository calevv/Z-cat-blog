"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-muted/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight">
          Z-cat.
        </Link>

        {/* Centered Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="/"
            className={`transition-colors pb-1 border-b-2 ${
              pathname === "/"
                ? "text-foreground border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            About
          </Link>
          <Link
            href="/diary"
            className={`transition-colors pb-1 border-b-2 ${
              pathname === "/diary"
                ? "text-foreground border-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            Diary
          </Link>
          <Link
            href="/contact"
            className={`transition-colors pb-1 border-b-2 ${
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
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
