import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET profile by userId
export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "missing userId" }, { status: 400 });
  }

  const profile = await db.guestProfile.findUnique({
    where: { userId },
  });

  return NextResponse.json(profile);
}

// CREATE / UPDATE profile
export async function PUT(req: Request) {
  const { userId, name, phone, wilaya, address } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "missing userId" }, { status: 400 });
  }

  const profile = await db.guestProfile.upsert({
    where: { userId },
    update: { name, phone, wilaya, address },
    create: { userId, name, phone, wilaya, address },
  });

  return NextResponse.json(profile);
}