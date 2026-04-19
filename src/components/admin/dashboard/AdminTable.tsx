"use client";

// TODO : 대시보드 내 작성자 구별 표시 고민
// TODO : 대시보드 내 스크롤 수정

import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/posts.action";
import { cn, formatDate } from "@/lib/utils";
import { AdminTableProps } from "@/types/database.types";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

export interface AdminTablePostProp {
  posts: AdminTableProps[];
}

export default function AdminTable({ posts }: AdminTablePostProp) {
  const THEAD_TITLE = ["Title", "Tags", "Date", "Status", "Actions"];

  return (
    <div className="flex h-full w-full flex-col" role="table">
      <div className="border-t border-b border-neutral-200" role="rowgroup">
        <ul
          className="grid h-10 grid-cols-5 items-center bg-neutral-50"
          role="row"
        >
          {THEAD_TITLE.map((title) => (
            <li
              key={title}
              role="columnheader"
              className="font-space px-6 text-left text-xs leading-4 font-bold tracking-wider text-zinc-500 uppercase"
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="custom-scrollbar flex-1 overflow-y-auto" role="rowgroup">
        {posts.map((post) => {
          return (
            <ul
              role="row"
              key={post.id}
              className="grid h-16 grid-cols-5 items-center border-b border-neutral-200"
            >
              <li
                role="cell"
                className="font-heading px-6 text-xs leading-5 font-bold text-zinc-900"
              >
                {post.title_ko}
              </li>
              <li role="cell" className="px-6">
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
              <li
                role="cell"
                className="font-space px-6 text-xs leading-4 font-normal text-zinc-500"
              >
                {formatDate(post.created_at)}
              </li>
              <li role="cell" className="px-6">
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
              <li role="cell" className="px-6">
                <div className="flex gap-2">
                  <Button variant={"ghost"} asChild>
                    <Link href={`/admin/editor/${post.id}`}>
                      <SquarePen className="h-4 w-4 text-zinc-500" />
                    </Link>
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={async () => {
                      if (confirm("정말 삭제할까요?")) {
                        await deletePost(post.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-zinc-500" />
                  </Button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
