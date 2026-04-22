"use server";

import { createServerSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// 일반 유저 댓글 작성
export async function createComment({
  post_id,
  author_name,
  content,
}: {
  post_id: string;
  author_name: string;
  content: string;
}) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("comments")
    .insert({ post_id, author_name, content, is_zcat: false });

  if (error) return { success: false, message: "댓글 작성 실패" };

  revalidatePath(`/diary`);
  return { success: true, message: "전송됐다, 인간." };
}

// Z-cat 댓글 작성 (어드민)
export async function createZcatComment({
  post_id,
  content,
  parent_id,
}: {
  post_id: string;
  content: string;
  parent_id?: string;
}) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("comments").insert({
    post_id,
    author_name: "Z-cat",
    content,
    is_zcat: true,
    parent_id,
  });

  if (error) return { success: false, message: "Z-cat 댓글 작성 실패" };

  revalidatePath(`/diary`);
  return { success: true, message: "Z-cat이 응답했다." };
}

// 댓글 삭제 (어드민)
export async function deleteComment(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) return { success: false, message: "삭제 실패" };

  revalidatePath(`/diary`);
  return { success: true, message: "삭제됐다." };
}
