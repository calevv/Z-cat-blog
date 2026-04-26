import { useEffect, useRef, useState } from "react";
import { generateSlug } from "@/lib/utils";
import { savePost } from "@/lib/actions/posts.action";
import { Post, PostForm } from "@/types/database.types";
import { createClient } from "@/lib/supabase";

export function useEditorForm({
  isEditMode,
  initialData,
}: {
  isEditMode: boolean;
  initialData?: Post;
}) {
  const [form, setForm] = useState<PostForm>({
    title_ko: initialData?.title_ko ?? "",
    title_en: initialData?.title_en ?? "",
    slug: initialData?.slug ?? "",
    content: initialData?.content ?? "",
    excerpt: initialData?.excerpt ?? "",
    tags: initialData?.tags ?? [],
    author_type: initialData?.author_type ?? "zcat",
    published: initialData?.published ?? false,
  });

  const [postId, setPostId] = useState<string | null>(initialData?.id ?? null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "unsaved"
  );
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isFirstRender = useRef(true);
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "available" | "duplicate"
  >(isEditMode ? "available" : "idle");

  const isFirstSlugCheck = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
          slug: isEditMode ? prev.slug : slug,
        }));
      } catch (error) {
        console.error("번역 실패:", error);
      }
    }, 1000); // 1초
    // Todo: 몇초가 적당한지 고민...

    // 클린업: title_ko가 또 바뀌면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [form.title_ko, isEditMode]);

  useEffect(() => {
    if (isFirstSlugCheck.current) {
      isFirstSlugCheck.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      if (!form.slug.trim()) {
        setSlugStatus("idle");
        return;
      }

      setSlugStatus("checking");

      const supabase = createClient();
      let query = supabase.from("posts").select("id").eq("slug", form.slug);
      if (postId) query = query.neq("id", postId);

      const { data } = await query;
      setSlugStatus(data && data.length > 0 ? "duplicate" : "available");
    }, 300);

    return () => clearTimeout(timer);
  }, [form.slug, postId]);

  // 자동저장
  useEffect(() => {
    if (isEditMode) return;

    // 제목이나 내용이 없으면 실행 안 함
    if (!form.title_ko.trim() || !form.content.trim()) return;
    // slug 생성 전이면 실행 안 함
    if (!form.slug.trim()) return;

    const timer = setTimeout(async () => {
      setSaveStatus("saving");

      const result = await savePost({
        id: postId ?? undefined,
        title_ko: form.title_ko,
        title_en: form.title_en,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt,
        tags: form.tags,
        author_type: form.author_type,
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
  }, [
    form.title_ko,
    form.title_en,
    form.content,
    form.slug,
    form.excerpt,
    form.tags,
    form.author_type,
    isEditMode,
    postId,
  ]);

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
    slugStatus,
  };
}
