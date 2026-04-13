// ───────────────────────────────
// Posts Server Action
// 역할: 포스트 저장 (임시저장/발행)
// ───────────────────────────────
"use server";

import { createServerSupabaseClient } from "@/lib/supabase";

interface PostForm {
  id?: string; // 있으면 수정, 없으면 새 글
  title_ko: string;
  title_en: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  author_type: "zcat" | "human";
  published: boolean;
}

// 임시저장 + 발행 공통 함수
export async function savePost(form: PostForm) {
  const supabase = await createServerSupabaseClient();

  // 필수값 체크
  if (!form.title_ko.trim() || !form.slug.trim() || !form.content.trim()) {
    return {
      success: false,
      message: "제목, slug, 내용은 필수다, 인간.",
    };
  }

  // excerpt 자동 생성 (없으면 content 앞 100자)
  const excerpt =
    form.excerpt.trim() ||
    form.content.replace(/[#*`]/g, "").trim().slice(0, 100);

  const payload = {
    title_ko: form.title_ko,
    title_en: form.title_en,
    slug: form.slug,
    content: form.content,
    excerpt,
    tags: form.tags,
    author_type: form.author_type,
    published: form.published,
    published_at: form.published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  // 수정 vs 새 글
  if (form.id) {
    // 수정 (UPDATE)
    const { error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", form.id);

    if (error) return { success: false, message: "저장 실패. 집사 탓이다." };
    return { success: true, message: "저장됐다." };
  } else {
    // 새 글 (INSERT)
    const { data, error } = await supabase
      .from("posts")
      .insert(payload)
      .select("id")
      .single();

    if (error) return { success: false, message: "저장 실패. 집사 탓이다." };
    return { success: true, message: "저장됐다.", id: data.id };
  }
}
