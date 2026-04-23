"use client";

import { Post } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { restorePost, permanentDeletePost } from "@/lib/actions/posts.action";
import { RotateCcw, Trash2 } from "lucide-react";
export default function TrashTable({ posts }: { posts: Post[] }) {
  const THEAD_TITLE = ["Title", "Tags", "Deleted At", "Actions"];

  return (
    <div className="flex h-full w-full flex-col" role="table">
      <div className="border-t border-b border-neutral-200" role="rowgroup">
        <ul
          className="grid h-10 grid-cols-4 items-center bg-neutral-50"
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
              className="grid h-16 grid-cols-4 items-center border-b border-neutral-200"
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
                {formatDate(post.deleted_at ?? "")}
              </li>

              <li role="cell" className="px-6">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      if (confirm("복구할까요?")) await restorePost(post.id);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 text-zinc-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      if (confirm("영구삭제할까요? 되돌릴 수 없어요.")) {
                        await permanentDeletePost(post.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
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
