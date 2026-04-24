"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchInput from "@/components/common/SearchInput";

export default function PublishTabs() {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "all";
  const currentQuery = searchParams.get("query") ?? "";

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
          // 탭 이동 시 검색어도 유지되도록 링크 구성
          const href =
            tab.value === "all"
              ? currentQuery
                ? `/admin?query=${currentQuery}`
                : "/admin"
              : `/admin?status=${tab.value}${currentQuery ? `&query=${currentQuery}` : ""}`;
          return (
            <Link
              key={tab.value}
              href={href}
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
      <SearchInput basePath="/admin" />
    </div>
  );
}
