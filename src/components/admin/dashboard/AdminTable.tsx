import { formatDate } from "@/lib/utils";
import { SquarePen, Trash2 } from "lucide-react";

export interface Post {
  id: string;
  slug: string;
  title_ko: string;
  title_en: string;
  content: string;
  excerpt: string;
  author_type: "human" | "zetcat";
  tags: string[];
  published: boolean;
  published_at: string;
  created_at: string;
}

export interface AdminTablePostProp {
  posts: Post[];
}

export default function AdminTable({ posts }: AdminTablePostProp) {
  const THEAD_TITLE = ["Title", "Tags", "Date", "Status", "Actions"];

  return (
    <table className="w-full">
      <thead className="h-10 border-t border-b border-neutral-200 bg-neutral-50">
        <tr>
          {THEAD_TITLE.map((title) => (
            <th
              key={title}
              className="font-space px-6 text-left text-xs leading-4 font-bold tracking-wider text-zinc-500 uppercase"
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => {
          return (
            <tr key={post.id} className="h-16 border-b border-neutral-200">
              <td className="font-heading px-6 text-xs leading-5 font-bold text-zinc-900">
                {post.title_ko}
              </td>
              <td className="px-6">
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
              </td>
              <td className="font-space px-6 text-xs leading-4 font-normal text-zinc-500">
                {formatDate(post.created_at)}
              </td>
              <td className="px-6">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                    post.published
                      ? "bg-green-50 text-green-600"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  {post.published ? "ㆍPUBLISHED" : "ㆍDRAFT"}
                </span>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <SquarePen className="color-zinc-500 h-4 w-4" />
                  <Trash2 className="color-zinc-500 h-4 w-4" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
