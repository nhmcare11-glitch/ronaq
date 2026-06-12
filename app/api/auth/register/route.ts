import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم مسبقاً" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashed,
      },
    });

    return NextResponse.json(
      { message: "تم إنشاء الحساب بنجاح", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "حدث خطأ، حاولي مجدداً" },
      { status: 500 }
    );
  }
}