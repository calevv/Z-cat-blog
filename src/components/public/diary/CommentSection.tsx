// ───────────────────────────────
// CommentSection 컴포넌트
// 역할: 댓글 목록 + 작성 폼
// "use client" — 랜덤 닉네임, input 상태 관리 필요
// TODO: Supabase 연결 후 실제 댓글 데이터로 교체
// ───────────────────────────────
"use client";

import { useState } from "react";

// 랜덤 닉네임 생성 함수
function generateNickname() {
  const number = Math.floor(Math.random() * 100);
  return `ANONYMOUS_USER_${String(number).padStart(2, "0")}`;
}

// 더미 댓글 데이터
const DUMMY_COMMENTS = [
  {
    id: "1",
    nickname: "ANONYMOUS_USER_84",
    content:
      "The YAML analogy hits too close to home. Yesterday I spent 4 hours debugging a trailing whitespace. The machines are winning.",
    createdAt: "21 ago",
    isZcat: false,
  },
  {
    id: "2",
    nickname: "ZCAT",
    content:
      "The whitespace is a feature, not a bug. It's the silent protest of the text editor.",
    createdAt: "31 ago",
    isZcat: true,
  },
];

export default function CommentSection() {
  // 랜덤 닉네임 — 컴포넌트 마운트 시 1회 생성
  const [nickname, setNickname] = useState(generateNickname);
  const [comment, setComment] = useState("");

  return (
    <div>
      {/* 섹션 제목 */}
      <p className="text-foreground font-mono text-xs font-bold">
        SYSTEM FEEDBACK
      </p>

      {/* 댓글 목록 */}
      <ul className="mt-6 flex flex-col gap-6">
        {DUMMY_COMMENTS.map((c) => (
          <li key={c.id} className="flex gap-4">
            {/* 이니셜 아바타 */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs font-bold ${
                c.isZcat
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {/* 이름 앞 두 글자 이니셜 */}
              {c.nickname.slice(0, 2)}
            </div>

            {/* 댓글 내용 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-mono text-xs font-bold">
                  {c.nickname}
                </span>
                {/* Z-cat 표시 */}
                {c.isZcat && (
                  <span className="text-primary font-mono text-xs">
                    (AUTHOR)
                  </span>
                )}
                <span className="text-muted-foreground font-mono text-xs">
                  {c.createdAt}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">{c.content}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* 댓글 작성 폼 */}
      <div className="border-border mt-8 border p-6">
        <p className="text-muted-foreground font-mono text-xs">
          HAVE SOMETHING TO SAY?{" "}
          <span className="text-primary">
            (RANDOM NICKNAME WILL BE ASSIGNED)
          </span>
        </p>

        {/* 닉네임 입력 — 랜덤 생성, 수정 가능 */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border-border bg-background text-foreground focus:border-primary mt-4 w-full border px-4 py-2 font-mono text-xs focus:outline-none"
          placeholder="NICKNAME"
        />

        {/* 댓글 textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter observation..."
          rows={4}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary mt-2 w-full resize-none border px-4 py-2 font-mono text-sm focus:outline-none"
        />

        {/* 전송 버튼 */}
        <div className="mt-2 flex justify-end">
          <button className="bg-primary px-6 py-2 font-mono text-xs text-white transition-opacity hover:opacity-80">
            TRANSMIT_MESSAGE
          </button>
        </div>
      </div>
    </div>
  );
}
