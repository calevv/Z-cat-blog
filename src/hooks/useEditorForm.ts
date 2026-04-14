import { useEffect, useState } from "react";
import { generateSlug } from "@/lib/utils";
import { savePost } from "@/actions/posts";
import { PostForm } from "@/types/database.types";

export function useEditorForm() {
  const [form, setForm] = useState<PostForm>({
    title_ko: "",
    title_en: "",
    slug: "",
    content: "",
    excerpt: "",
    tags: [],
    author_type: "zcat",
    published: false,
  });

  const [postId, setPostId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "unsaved"
  );
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    // title_ko가 없으면 실행 안 함
    if (!form.title_ko.trim()) return;

    // 1초 후 번역 실행
    const timer = setTimeout(async () => {
      try {
        // MyMemory API 호출
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(form.title_ko)}&langpair=ko|en`
        );
        const data = await res.json();
        const translated = data.responseData.translatedText as string;

        // 번역 결과로 slug 생성
        const slug = generateSlug(translated);

        setForm((prev) => ({
          ...prev,
          title_en: translated,
          slug,
        }));
      } catch (error) {
        console.error("번역 실패:", error);
      }
    }, 1000); // 1초
    // Todo: 몇초가 적당한지 고민...

    // 클린업: title_ko가 또 바뀌면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [form.title_ko]);

  // 자동저장
  useEffect(() => {
    // 제목이나 내용이 없으면 실행 안 함
    if (!form.title_ko.trim() || !form.content.trim()) return;
    // slug 생성 전이면 실행 안 함
    if (!form.slug.trim()) return;

    const timer = setTimeout(async () => {
      setSaveStatus("saving");

      const result = await savePost({
        id: postId ?? undefined,
        ...form,
        published: false,
      });

      if (result.success) {
        if (result.id) setPostId(result.id);
        setSaveStatus("saved");
        setLastSavedAt(new Date());
      } else {
        setSaveStatus("unsaved");
      }
    }, 3000); // 3초 디바운스

    return () => clearTimeout(timer);
  }, [form.title_ko, form.content, form.slug, form.tags, form.author_type]);

  //  핸들러
  const handleTitleChange = (value: string) => {
    setForm((prev) => ({ ...prev, title_ko: value }));
  };

  const handleContentChange = (value: string) => {
    setForm((prev) => ({ ...prev, content: value }));
  };

  const handleSlugChange = (value: string) => {
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const addTag = (tag: string) => {
    setForm((prev) =>
      prev.tags.includes(tag) ? prev : { ...prev, tags: [...prev.tags, tag] }
    );
  };

  const removeLastTag = () => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.slice(0, -1),
    }));
  };

  const toggleAuthor = () => {
    setForm((prev) => ({
      ...prev,
      author_type: prev.author_type === "zcat" ? "human" : "zcat",
    }));
  };

  return {
    form,
    handleTitleChange,
    handleContentChange,
    handleSlugChange,
    addTag,
    removeLastTag,
    toggleAuthor,
    setForm,
    saveStatus,
    setSaveStatus,
    postId,
    lastSavedAt,
    setPostId,
  };
}
