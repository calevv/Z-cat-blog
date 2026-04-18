// ───────────────────────────────
// Posts Server Action
// 역할: 포스트 저장 (임시저장/발행)
// ───────────────────────────────
"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import { PostForm } from "@/types/database.types";
import { revalidatePath } from "next/cache";

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

// draft 완전 삭제
export async function deleteDraft(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("published", false); // published된 글은 실수로 못 지우게 방어

  if (error) return { success: false };
  return { success: true };
}

//  글 soft delete
export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("posts")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, message: "삭제 실패" };

  revalidatePath("/admin");
  revalidatePath("/diary");

  return { success: true, message: "삭제됐다, 인간." };
}
