import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login"];

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("token_dashboard");
  return !!token?.value;
}

function isPublicRoute(pathname: string): boolean {
  // Remove locale prefix to check the base path
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  // Check if it's a public route
  return PUBLIC_ROUTES.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);
  const publicRoute = isPublicRoute(pathname);
  // Handle root path redirect based on authentication
  if (pathname === "/" || pathname ==="/ar") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/statistics", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // If not authenticated and trying to access protected route
  if (!authenticated && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If authenticated and trying to access login page, redirect to dashboard
  if (authenticated && pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/statistics", request.url));
  }
  const i18nMiddleware = createMiddleware(routing);
  const response = i18nMiddleware(request);

  return response;
}
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
