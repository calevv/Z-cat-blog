import { Search } from "lucide-react";

export default function PublishTabs() {
  return (
    <div className="flex justify-between px-6 py-4">
      <div>PublishTabs</div>
      <div className="flex">
        <Search
          size={18}
          className="text-zinc-400 group-focus-within:text-orange-600"
        />
        <input type="text" placeholder="검색어를 입력하세요..." name="search" />
      </div>
    </div>
  );
}
