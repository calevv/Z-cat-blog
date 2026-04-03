// ───────────────────────────────
// Supabase 클라이언트 초기화
// 역할: 브라우저(클라이언트)에서 Supabase 연결
// 서버용은 필요하면 만들자
// ───────────────────────────────
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
}
