import { NextRequest, NextResponse } from "next/server";

// Routes that are publicly accessible (no auth required)
const publicPaths = [
  "/login",
  "/admin-login",
  "/register",
  "/verify-otp",
  "/forgot-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The backend may set HttpOnly cookies named "access"/"refresh".
  // As a fallback the login page also sets a client-readable "accessToken" cookie.
  const accessToken =
    request.cookies.get("access")?.value ||
    request.cookies.get("accessToken")?.value;

  const role = request.cookies.get("role")?.value;

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = pathname.startsWith("/admin");

  // Unauthenticated user trying to access any non-public route → login
  if (!isPublicPath && !accessToken) {
    const loginUrl = new URL(isAdminPath ? "/admin-login" : "/login", request.url);
    // Preserve where the user was trying to go
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control for authenticated users
  if (accessToken) {
    // Authenticated user trying to access login/register → redirect to appropriate dashboard
    if (isPublicPath) {
      return NextResponse.redirect(new URL(role === "admin" ? "/admin/dashboard" : "/", request.url));
    }

    // Lawyer trying to access admin panel
    if (isAdminPath && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Admin trying to access lawyer panel
    if (!isAdminPath && !isPublicPath && role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};