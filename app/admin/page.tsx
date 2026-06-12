import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const ordersCount    = await db.order.count();
  const productsCount  = await db.product.count();
  const pendingOrders  = await db.order.count({ where: { status: "PENDING" } });
  const recentOrders   = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "إجمالي الطلبات",    value: ordersCount,   color: "var(--gold)"    },
    { label: "طلبات معلقة",       value: pendingOrders, color: "#E67E22"        },
    { label: "إجمالي المنتجات",   value: productsCount, color: "var(--charcoal)" },
  ];

  return (
    <div>
      {/* الهيدر */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "6px",
          fontWeight: 300,
        }}>
          ✦ مرحباً
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "32px",
          fontWeight: 300,
          color: "var(--charcoal)",
        }}>
          لوحة <em style={{ fontStyle: "italic", color: "var(--gold)" }}>التحكم</em>
        </h1>
      </div>

      {/* الإحصائيات */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: "var(--ivory)",
            border: "0.5px solid var(--border)",
            padding: "20px",
            borderTop: `3px solid ${stat.color}`,
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "36px",
              fontWeight: 300,
              color: stat.color,
              lineHeight: 1,
              marginBottom: "6px",
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: "11px",
              color: "var(--taupe)",
              letterSpacing: "0.08em",
              fontWeight: 300,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* آخر الطلبات */}
      <div style={{
        background: "var(--ivory)",
        border: "0.5px solid var(--border)",
        padding: "20px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 300,
            color: "var(--charcoal)",
          }}>
            آخر الطلبات
          </h2>
          <Link href="/admin/orders" style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
          }}>
            عرض الكل ←
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ fontSize: "13px", color: "var(--taupe)", fontWeight: 300 }}>
            لا توجد طلبات بعد
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {/* رأس الجدول */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              padding: "10px 0",
              borderBottom: "0.5px solid var(--border)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--taupe)",
            }}>
              <span>رقم الطلب</span>
              <span>العميلة</span>
              <span>المجموع</span>
              <span>الحالة</span>
            </div>

            {recentOrders.map((order) => (
              <div key={order.id} style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                padding: "14px 0",
                borderBottom: "0.5px solid var(--border)",
                fontSize: "13px",
                color: "var(--charcoal)",
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--gold)",
                  fontSize: "14px",
                }}>
                  #{order.id.slice(-6).toUpperCase()}
                </span>
                <span style={{ fontWeight: 300 }}>{order.name}</span>
                <span style={{ fontWeight: 400 }}>{order.total.toLocaleString()} دج</span>
                <span style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  padding: "4px 8px",
                  background: order.status === "PENDING" ? "#FEF3E2" : "#EAF5EA",
                  color: order.status === "PENDING" ? "#E67E22" : "#27AE60",
                  display: "inline-block",
                }}>
                  {order.status === "PENDING"   ? "معلق"    :
                   order.status === "CONFIRMED" ? "مؤكد"    :
                   order.status === "SHIPPED"   ? "مشحون"   :
                   order.status === "DELIVERED" ? "مُسلَّم" : "ملغي"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}