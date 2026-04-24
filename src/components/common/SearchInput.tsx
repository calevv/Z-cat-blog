"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

export default function SearchInput({ basePath }: { basePath: string }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";

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
    router.replace(`${basePath}?${params.toString()}`);
  };
  return (
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
  );
}
