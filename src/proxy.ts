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

  // 1. [접근 제한] 로그인 안 됐는데 /admin 페이지에 접근한 경우
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // 2. [역 리다이렉트] 이미 로그인됐는데 /admin/login 페이지에 접근한 경우 (뒤로가기 방지)
  if (user && request.nextUrl.pathname === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin"; // 또는 가고 싶은 관리자 메인 페이지
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ["/admin/:path*"],
};
