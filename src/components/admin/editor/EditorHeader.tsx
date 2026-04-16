"use client";

import React, { useState } from "react";

interface EditorHeaderProps {
  title: string;
  tags: string[];
  slug: string;

  onTitleChange: (value: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveLastTag: () => void;
  onSlugChange: (value: string) => void;
}

export default function EditorHeader({
  title,
  slug,
  tags,
  onTitleChange,
  onAddTag,
  onRemoveLastTag,
  onSlugChange,
}: EditorHeaderProps) {
  const [tagError, setTagError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      tags.length > 0
    ) {
      onRemoveLastTag();
      return;
    }
    {
      /* TODO: 동일 태그 입력시 표시 확실하게 */
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const value = e.currentTarget.value.trim().toLowerCase();
      if (!value) return;
      //  먼저 중복 체크
      if (tags.includes(value)) {
        setTagError("이미 추가된 태그입니다");
        return;
      }

      //  정상 추가
      onAddTag(value);
      e.currentTarget.value = "";
      setTagError(""); // 에러 제거
    }
  };

  return (
    <header className="flex h-44 flex-col gap-6 border-b border-neutral-200 px-8 pt-6">
      {/* TODO: 타이틀과 태그는 이후 보여주기창과 동기화 기능 필요*/}

      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        type="text"
        name="title"
        placeholder="POST_TITLE"
        className="font-heading text-3xl font-bold text-zinc-500 placeholder:text-zinc-300"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-1">
          <label className="text-muted-foreground font-mono text-xs">
            TAGS:
          </label>
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-600 uppercase"
            >
              # {tag}
            </span>
          ))}

          {/* 실제 입력창 */}
          <input
            type="text"
            onKeyDown={handleKeyDown}
            onChange={() => {
              if (tagError) setTagError("");
            }}
            name={"tags"}
            placeholder={tags.length === 0 ? "ADD_TAGS..." : ""}
            className="font-space text-xs font-normal tracking-wide text-zinc-500 placeholder:text-zinc-300"
          />
        </div>
        {tagError && (
          <p className="absolute top-full left-0 mt-1 text-xs text-red-500">
            {tagError}
          </p>
        )}
      </div>
      <div className="flex gap-1">
        <label className="text-muted-foreground font-mono text-xs">
          URL_SLUG:
        </label>
        <input
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          type="text"
          name="slug"
          placeholder="POST_URL_SLUG"
          className="font-space flex-1 text-xs font-normal tracking-wide text-red-500 transition-colors placeholder:text-red-300 focus:outline-none"
        />
      </div>
    </header>
  );
}
