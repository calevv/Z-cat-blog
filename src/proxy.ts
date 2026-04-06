// ───────────────────────────────
// 미들웨어 >> 프록시
// 역할: /admin 접근 시 로그인 여부 확인
// 로그인 안 됐으면 /admin/login으로 리다이렉트
// ───────────────────────────────
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 미들웨어용 Supabase 클라이언트
  // cookies()를 못 쓰기 때문에 request/response에서 직접 처리
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 현재 로그인된 유저 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin/login 제외한 /admin 경로 접근 시
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    // 로그인 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ["/admin/:path*"],
};
