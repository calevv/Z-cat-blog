import { createClient } from "@/lib/supabase";

// 특정 글의 댓글 목록 가져오기
export async function getCommentsByPostId(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
