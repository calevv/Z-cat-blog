"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EditorPage() {
  // 입력한 마크다운 텍스트를 담을 상태
  const [content, setContent] = useState<string>(
    "# 제트캣의 관찰 일지\n\n여기에 에러를 기록해라 인간.",
  );

  return (
    <div className="flex h-screen w-full flex-col">
      {/* 상단 액션 바 (저장/발행 버튼 등) */}
      <header className="flex h-14 items-center justify-between border-b px-6">
        <h1 className="font-bold">Z-cat Archive Editor</h1>
        <button className="bg-[#C2410C] px-4 py-2 text-sm text-white font-bold rounded">
          Publish
        </button>
      </header>

      {/* 에디터 메인 영역 (좌우 분할) */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 마크다운 입력창 */}
        <div className="w-1/2 border-r border-border/40 p-6 bg-muted">
          <textarea
            className="h-full w-full resize-none bg-transparent font-mono outline-none"
            placeholder="마크다운을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 우측: 실시간 미리보기 (마크다운 뷰어) */}
        <div className="w-1/2 overflow-y-auto bg-white p-6">
          {/* prose 클래스가 마크다운 스타일링을 담당, max-w-none으로 너비 제한 해제 */}
          <article className="prose prose-zinc max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
