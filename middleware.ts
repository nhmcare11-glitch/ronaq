import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ فقط حماية صفحات الأدمن
 if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const auth = req.cookies.get("ronaq-admin")?.value;
    if (auth !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};