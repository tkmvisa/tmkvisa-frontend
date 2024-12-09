import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwt")?.value;
  const userAlreadySignInPath = request.nextUrl?.pathname;
  const languageSegment = `/${userAlreadySignInPath.split("/")[1]}/`;

  if (userAlreadySignInPath.includes("login")) {
    if (jwtToken) {
      return NextResponse.redirect(
        new URL(`${languageSegment}/dashboard`, request.url)
      );
    }
  } else {
    if (!jwtToken) {
      return NextResponse.redirect(
        new URL(`${languageSegment}login`, request.url)
      );
    }
  }
}

export const config = {
  matcher: [
    "/en/dashboard/:path*",
    "/en/login",
    "/ru/dashboard/:path*",
    "/ru/login",
    "/tr/dashboard/:path*",
    "/tr/login",
    "/en/application-status",
    "/ru/application-status",
    "/tr/application-status",
    "/en/new-application",
    "/ru/new-application",
    "/tr/new-application",
  ],
};
