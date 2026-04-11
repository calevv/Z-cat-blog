import { SquarePen, Trash2 } from "lucide-react";

export default function AdminTable() {
  const THEAD_TITLE = ["Title", "Tags", "Date", "Status", "Actions"];

  interface Post {
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

  const MOCK_POSTS: Post[] = [
    {
      id: "uuid-1",
      slug: "nextjs-search-params",
      title_ko: "Next.js 15 searchParams 완벽 정리",
      title_en: "Mastering searchParams in Next.js 15",
      content: "서버 컴포넌트와 클라이언트 컴포넌트의 차이점은...",
      excerpt: "헷갈리는 앱 라우터의 쿼리 처리를 한눈에 정리합니다.",
      author_type: "human",
      tags: ["Next.js", "React"],
      published: true,
      published_at: "2026-04-10T14:00:00Z",
      created_at: "2026-04-10T12:00:00Z",
    },
    {
      id: "uuid-2",
      slug: "zcat-opinion-1",
      title_ko: "인간들이 코드를 짜는 방식에 대하여",
      title_en: "How Humans Write Code",
      content: "한심하군, 아직도 세미콜론을 빠뜨리다니.",
      excerpt: "AI 고양이 루트의 냉소적인 개발 관찰기.",
      author_type: "zetcat",
      tags: ["Z-cat", "Diary"],
      published: true,
      published_at: "2026-04-09T09:00:00Z",
      created_at: "2026-04-09T08:30:00Z",
    },
    {
      id: "uuid-3",
      slug: "tailwind-oklch",
      title_ko: "OKLCH 컬러 스페이스 활용법",
      title_en: "Using OKLCH Color Space",
      content: "더 선명하고 일관된 색상을 위해...",
      excerpt: "새로운 CSS 컬러 표준 OKLCH를 소개합니다.",
      author_type: "human",
      tags: ["CSS", "Design"],
      published: false, // Draft 상태
      published_at: "",
      created_at: "2026-04-08T15:00:00Z",
    },
    {
      id: "uuid-4",
      slug: "zcat-opinion-1",
      title_ko: "인간들이 코드를 짜는 방식에 대하여",
      title_en: "How Humans Write Code",
      content: "한심하군, 아직도 세미콜론을 빠뜨리다니.",
      excerpt: "AI 고양이 루트의 냉소적인 개발 관찰기.",
      author_type: "zetcat",
      tags: ["Z-cat", "Diary"],
      published: true,
      published_at: "2026-04-09T09:00:00Z",
      created_at: "2026-04-09T08:30:00Z",
    },
  ];

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
        {MOCK_POSTS.map((post) => {
          const date = new Date(post.created_at);
          const createTime = date.toLocaleDateString();
          return (
            <tr className="h-16 border-b border-neutral-200">
              <td className="font-heading px-6 text-xs leading-5 font-bold text-zinc-900">
                {post.title_ko}
              </td>
              <td className="px-6">
                <div className="flex gap-1">
                  {post.tags.map((tag) => (
                    <p className="font-space text-xs leading-4 font-normal tracking-wide text-orange-700">
                      #{tag}
                    </p>
                  ))}
                </div>
              </td>
              <td className="font-space px-6 text-xs leading-4 font-normal text-zinc-500">
                {createTime}
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
