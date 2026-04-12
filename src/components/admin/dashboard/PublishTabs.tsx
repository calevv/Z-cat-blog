"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";

export default function PublishTabs() {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "all";
  const TABS = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <div className="flex justify-between px-6 py-4">
      <div className="flex gap-1">
        {TABS.map((tab) => {
          const isActive = currentStatus === tab.value;
          return (
            <Link
              key={tab.value}
              href={
                tab.value === "all" ? "/admin" : `/admin?status=${tab.value}`
              }
              className={cn(
                "font-space flex h-7 items-center justify-center rounded px-4 text-xs leading-4 font-medium tracking-wide uppercase",
                isActive
                  ? "bg-zinc-900 text-white" // 활성화 상태
                  : "bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600" // 비활성화 상태
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div className="flex h-9 items-center gap-3 rounded border border-neutral-200 bg-neutral-50 px-3 focus-within:border-orange-600 focus-within:bg-white">
        <Search size={14} className="text-zinc-400" />
        <input
          type="text"
          placeholder="Search posts..."
          name="search"
          className="w-full bg-transparent text-xs"
        />
      </div>
    </div>
  );
}
