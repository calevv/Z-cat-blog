"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { ChangeEvent } from "react";

export default function PublishTabs() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "all";
  const currentQuery = searchParams.get("query") ?? "";

  const TABS = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ];
  // 검색어 변경 핸들러
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    // 주소창 업데이트 (replace를 써서 뒤로가기 기록이 너무 많이 남지 않게 함)
    router.replace(`/admin?${params.toString()}`);
  };
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
      <div className="flex h-9 items-center gap-3 rounded border border-neutral-200 bg-neutral-50 px-3 focus-within:border-orange-600 focus-within:bg-white">
        <Search size={14} className="text-zinc-400" />
        <input
          type="text"
          placeholder="Search posts..."
          name="search"
          defaultValue={currentQuery}
          onChange={handleSearch}
          className="w-full bg-transparent text-xs"
        />
      </div>
    </div>
  );
}
