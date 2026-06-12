import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    const order = await db.order.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ" },
      { status: 500 }
    );
  }
}