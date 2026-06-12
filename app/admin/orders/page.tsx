import { db } from "@/lib/db";
import OrderStatusUpdater from "./OrderStatusUpdater";

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "6px",
          fontWeight: 300,
        }}>
          ✦ إدارة
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "32px",
          fontWeight: 300,
          color: "var(--charcoal)",
        }}>
          الطلبات <em style={{ fontStyle: "italic", color: "var(--gold)" }}>الواردة</em>
        </h1>
      </div>

      {orders.length === 0 ? (
        <div style={{
          border: "0.5px solid var(--border)",
          padding: "40px",
          textAlign: "center",
          fontSize: "13px",
          color: "var(--taupe)",
          fontWeight: 300,
        }}>
          لا توجد طلبات بعد
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              border: "0.5px solid var(--border)",
              background: "var(--ivory)",
            }}>
              {/* هيدر الطلب */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                padding: "16px 20px",
                borderBottom: "0.5px solid var(--border)",
                alignItems: "center",
                background: "var(--sand)",
              }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    color: "var(--gold)",
                  }}>
                    #{order.id.slice(-6).toUpperCase()}
                  </div>
                  <div style={{
                    fontSize: "10px",
                    color: "var(--taupe)",
                    marginTop: "2px",
                    fontWeight: 300,
                  }}>
                    {new Date(order.createdAt).toLocaleDateString("ar-DZ")}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "var(--charcoal)" }}>
                    {order.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--taupe)", fontWeight: 300 }}>
                    {order.phone}
                  </div>
                </div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  color: "var(--charcoal)",
                }}>
                  {order.total.toLocaleString()} دج
                </div>
                <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
              </div>

              {/* تفاصيل الطلب */}
              <div style={{ padding: "16px 20px" }}>
                <div style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--taupe)",
                  marginBottom: "10px",
                }}>
                  العنوان: {order.wilaya} — {order.address}
                </div>

                {/* المنتجات */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontSize: "12px",
                      color: "var(--charcoal)",
                    }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        background: "var(--sand)",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}>
                        <img
                          src={item.image}
                          alt={item.product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <span style={{ flex: 1 }}>{item.product.name}</span>
                      <span style={{ color: "var(--taupe)", fontWeight: 300 }}>
                        {item.color}
                      </span>
                      <span>× {item.quantity}</span>
                      <span style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--gold)",
                        fontSize: "14px",
                      }}>
                        {(item.price * item.quantity).toLocaleString()} دج
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}