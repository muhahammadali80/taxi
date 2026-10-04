import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/types";

function hasAuthCookies(request: NextRequest): boolean {
  return request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes — pass everything else straight through immediately
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  const hasCookie = hasAuthCookies(request);

  // Fast path for unauthenticated requests (NO Supabase network call required):
  // 1. If accessing /admin/login without cookies, allow immediately
  if (pathname === "/admin/login" && !hasCookie) {
    return NextResponse.next({ request });
  }

  // 2. If accessing protected /admin/* without cookies, redirect to login immediately
  if (pathname !== "/admin/login" && !hasCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // If auth cookies exist, verify user session with a timeout
  let supabaseResponse = NextResponse.next({ request });
  let isAuthenticated = false;

  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // Timeout after 2.5s so proxy never hangs
    const userPromise = supabase.auth.getUser();
    const timeoutPromise = new Promise<{
      data: { user: null };
      error: Error;
    }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: { user: null },
            error: new Error("Auth verification timeout"),
          }),
        2500,
      ),
    );

    const { data, error } = await Promise.race([userPromise, timeoutPromise]);

    if (
      !error &&
      data.user &&
      data.user.email &&
      data.user.is_anonymous !== true
    ) {
      isAuthenticated = true;
    }
  } catch (err) {
    console.error("[proxy] Supabase error:", err);
    if (pathname !== "/admin/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Not authenticated -> redirect to login
  if (!isAuthenticated && pathname !== "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Authenticated and visiting /admin/login -> redirect to dashboard
  if (isAuthenticated && pathname === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
