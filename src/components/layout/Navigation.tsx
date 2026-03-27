import Link from "next/link";

export default function Navigation() {
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
            className="hover:text-foreground transition-colors text-foreground border-b-2 border-primary pb-1"
          >
            About
          </Link>
          <Link
            href="/diary"
            className="hover:text-foreground transition-colors pb-1"
          >
            Diary
          </Link>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors pb-1"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
