// TODO : 대시보드 내 작성자 구별 표시 고민
// TODO : 대시보드 내 스크롤 수정

import { cn, formatDate } from "@/lib/utils";
import { AdminTableProps } from "@/types/database.types";
import { SquarePen, Trash2 } from "lucide-react";

export interface AdminTablePostProp {
  posts: AdminTableProps[];
}

export default function AdminTable({ posts }: AdminTablePostProp) {
  const THEAD_TITLE = ["Title", "Tags", "Date", "Status", "Actions"];

  return (
    <div className="w-full">
      <div className="border-t border-b border-neutral-200">
        <ul className="grid h-10 grid-cols-5 items-center bg-neutral-50">
          {THEAD_TITLE.map((title) => (
            <li
              key={title}
              className="font-space px-6 text-left text-xs leading-4 font-bold tracking-wider text-zinc-500 uppercase"
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="custom-scrollbar h-125 overflow-y-auto">
        {posts.map((post) => {
          return (
            <ul
              key={post.id}
              className="grid h-16 grid-cols-5 items-center border-b border-neutral-200"
            >
              <li className="font-heading px-6 text-xs leading-5 font-bold text-zinc-900">
                {post.title_ko}
              </li>
              <li className="px-6">
                <div className="flex gap-1">
                  {post.tags.map((tag, index) => (
                    <p
                      key={`${post.id}=${index}-${tag}`}
                      className="font-space text-xs leading-4 font-normal tracking-wide text-orange-700"
                    >
                      #{tag}
                    </p>
                  ))}
                </div>
              </li>
              <li className="font-space px-6 text-xs leading-4 font-normal text-zinc-500">
                {formatDate(post.created_at)}
              </li>
              <li className="px-6">
                <div
                  className={cn(
                    "flex h-6 w-fit items-center gap-1.5 rounded-full px-3 transition-colors",
                    post.published
                      ? "bg-green-50 text-green-600"
                      : "border border-neutral-200 bg-neutral-50 text-zinc-500"
                  )}
                >
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      post.published ? "bg-green-600" : "bg-zinc-400"
                    )}
                  ></div>
                  <p className="font-space text-[10px] leading-4 font-medium tracking-wide uppercase">
                    {post.published ? "PUBLISHED" : "DRAFT"}
                  </p>
                </div>
              </li>
              <li className="px-6">
                <div className="flex gap-2">
                  <SquarePen className="h-4 w-4 text-zinc-500" />
                  <Trash2 className="h-4 w-4 text-zinc-500" />
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
