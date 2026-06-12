import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_SECRET) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("ronaq-admin", process.env.ADMIN_SECRET!, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // أسبوع
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "خطأ" }, { status: 401 });
}