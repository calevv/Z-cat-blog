"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/database.types";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, SearchIcon } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export function SearchDialog() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open) return; // 모달 열릴 때만 fetch

    const supabase = createClient();
    supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .is("deleted_at", null)
      .order("published_at", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setPosts(data);
      });
  }, [open]);

  const filtered = query.trim()
    ? posts.filter(
        (p) =>
          p.title_ko.toLowerCase().includes(query.toLowerCase()) ||
          p.title_en.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : posts;

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value === "암호") {
      router.push("/admin/login");
      setOpen(false);
    }
  };
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setQuery(""), 200);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Search Modal</DialogTitle>
            <DialogDescription></DialogDescription>
          </VisuallyHidden.Root>
          <div className="flex h-9 items-center gap-3 rounded border border-neutral-200 bg-neutral-50 px-3 focus-within:border-orange-600 focus-within:bg-white">
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Search posts..."
              name="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full bg-transparent text-xs"
            />{" "}
            {/* query 있을 때만 ESC 버튼 표시 */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] transition-colors hover:bg-neutral-200"
              >
                ESC
              </button>
            )}
          </div>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 h-[50vh] overflow-y-auto px-4">
          {isLoading ? (
            <p className="text-muted-foreground py-8 text-center font-mono text-xs">
              LOADING...
            </p>
          ) : (
            filtered.map((post, index) => (
              <Link
                key={post.id}
                href={`/diary/${post.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-start gap-4 border-b border-neutral-100 px-2 py-3 hover:bg-neutral-50"
              >
                <span className="text-muted-foreground w-6 font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{post.title_ko}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {formatDate(post.published_at ?? "")}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-primary font-mono text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
