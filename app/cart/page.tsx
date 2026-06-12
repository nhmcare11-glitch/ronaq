"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "40px 20px",
        background: "var(--ivory)",
      }}>
        <div style={{ fontSize: "48px" }}>🛍</div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: 300,
          color: "var(--charcoal)",
        }}>
          سلتك فارغة
        </h2>
        <p style={{ fontSize: "13px", color: "var(--taupe)", fontWeight: 300 }}>
          اكتشفي مجموعتنا وأضيفي ما يعجبكِ
        </p>
        <Link href="/products" style={{
          background: "var(--charcoal)",
          color: "var(--ivory)",
          padding: "14px 32px",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textDecoration: "none",
          marginTop: "8px",
        }}>
          تسوقي الآن
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      background: "var(--ivory)",
      minHeight: "100vh",
      paddingBottom: "120px",
    }}>

      {/* الهيدر */}
      <div style={{
        padding: "20px",
        borderBottom: "0.5px solid var(--border)",
      }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 300,
          color: "var(--charcoal)",
        }}>
          سلة <em style={{ fontStyle: "italic", color: "var(--gold)" }}>المشتريات</em>
        </h1>
        <p style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "4px" }}>
          {items.length} منتج
        </p>
      </div>

      {/* المنتجات */}
      <div style={{ padding: "0 20px" }}>
        {items.map((item) => (
          <div key={`${item.id}-${item.color}`} style={{
            display: "flex",
            gap: "14px",
            padding: "20px 0",
            borderBottom: "0.5px solid var(--border)",
          }}>

            {/* الصورة */}
            <div style={{
              width: "90px",
              height: "90px",
              background: "var(--sand)",
              flexShrink: 0,
              overflow: "hidden",
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* المعلومات */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "13px",
                color: "var(--charcoal)",
                fontWeight: 400,
                marginBottom: "4px",
              }}>
                {item.name}
              </div>

              {/* اللون */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
              }}>
                <span style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: item.colorHex,
                  border: "0.5px solid var(--border)",
                  display: "block",
                }} />
                <span style={{ fontSize: "11px", color: "var(--taupe)", fontWeight: 300 }}>
                  {item.color}
                </span>
              </div>

              {/* الكمية والسعر */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "0.5px solid var(--border)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "var(--charcoal)",
                    }}
                  >
                    −
                  </button>
                  <span style={{
                    width: "36px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    border: "0.5px solid var(--border)",
                    borderRight: "none",
                    borderLeft: "none",
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "0.5px solid var(--border)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "var(--charcoal)",
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  color: "var(--gold)",
                }}>
                  {(item.price * item.quantity).toLocaleString()} دج
                </div>
              </div>
            </div>

            {/* حذف */}
            <button
              onClick={() => removeItem(item.id, item.color)}
              aria-label="حذف"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--taupe)",
                fontSize: "18px",
                alignSelf: "flex-start",
                padding: "0",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ملخص الطلب — ثابت في الأسفل */}
      <div style={{
        position: "fixed",
        bottom: "64px",
        left: 0,
        right: 0,
        background: "var(--ivory)",
        borderTop: "0.5px solid var(--border)",
        padding: "16px 20px",
        zIndex: 150,
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}>
          <span style={{ fontSize: "13px", color: "var(--taupe)", fontWeight: 300 }}>
            المجموع
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            color: "var(--charcoal)",
          }}>
            {totalPrice().toLocaleString()} دج
          </span>
        </div>

        <Link href="/checkout" style={{
          display: "block",
          background: "var(--charcoal)",
          color: "var(--ivory)",
          padding: "15px 0",
          textAlign: "center",
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "var(--font-body)",
        }}>
          إتمام الطلب
        </Link>
      </div>

    </div>
  );
}