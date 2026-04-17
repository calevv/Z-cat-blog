// ───────────────────────────────
// Supabase 클라이언트 초기화
// 역할: 브라우저(클라이언트)에서 Supabase 연결
// 서버용은 필요하면 만들자
// ───────────────────────────────
import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// 서버 컴포넌트, 미들웨어에서 사용
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}
