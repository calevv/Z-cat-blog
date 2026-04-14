import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface PostForm {
  title_ko: string;
  title_en: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  author_type: "zcat" | "human";
  published: boolean;
}
export default function EditorPreview({ form }: { form: PostForm }) {
  return (
    <div className="flex flex-1 flex-col gap-8 overflow-y-auto bg-neutral-50 p-6">
      <div className="flex flex-col">
        {/* 제목 동기화 */}
        {form.title_ko && (
          <h1 className="font-heading mb-2 text-3xl font-bold text-zinc-900">
            {form.title_ko}
          </h1>
        )}

        {/* 태그 동기화 */}
        {form.tags.length > 0 && (
          <div className="mb-6 flex gap-2">
            {form.tags.map((tag) => (
              <span key={tag} className="text-primary font-mono text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>By {form.author_type}</div>
      {/* prose 클래스가 마크다운 스타일링을 담당, max-w-none으로 너비 제한 해제 */}
      <article className="prose prose-zinc max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {form.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
