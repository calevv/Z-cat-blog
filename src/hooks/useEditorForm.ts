import { useEffect, useState } from "react";
import { generateSlug } from "@/lib/utils";

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
  };
}
