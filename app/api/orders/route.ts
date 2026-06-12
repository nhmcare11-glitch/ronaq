import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, phone, wilaya, address, notes, items, total, userId } = await req.json();

    if (!name || !phone || !wilaya || !address || !items?.length) {
      return NextResponse.json(
        { error: "بيانات الطلب غير مكتملة" },
        { status: 400 }
      );
    }

    const order = await db.order.create({
      data: {
        name,
        phone,
        wilaya,
        address,
        notes: notes || "",
        total,
        userId: userId || null, // ✅ من localStorage، اختياري
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            productId: item.productId || item.id,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "تم استلام طلبك بنجاح", orderId: order.id },
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