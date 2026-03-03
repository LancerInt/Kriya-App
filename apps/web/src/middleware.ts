import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/offline-packs")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const session = await verifySession(token);

    if (pathname.startsWith("/admin") && session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/offline-packs") && session.status !== "APPROVED") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/offline-packs/:path*"]
};
