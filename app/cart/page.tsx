"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { useEffect, useRef, useState } from "react";

function AnimateIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      {children}
    </div>
  );
}

const features: { title: string; icon: React.ReactNode }[] = [
  {
    title: "توصيل سريع",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "ضمان الجودة",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "دفع آمن 100%",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="var(--charcoal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

if (!isHydrated) {
  return <div style={{ background: "var(--ivory)", minHeight: "100vh" }} />;
}
  if (items.length === 0) {
    return (
      <div style={{ background: "var(--ivory)", minHeight: "100vh", direction: "rtl" }}>

        {/* Cart count header */}
        <AnimateIn delay={0}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 16px", borderBottom: "0.5px solid var(--border)",
          }}>
            <span style={{ fontSize: "15px", color: "var(--charcoal)", fontWeight: 500 }}>سلة التسوق</span>
            <span style={{ fontSize: "13px", color: "var(--taupe)" }}>0 منتجات</span>
          </div>
        </AnimateIn>

        {/* Empty state */}
        <AnimateIn delay={100}>
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", padding: "40px 20px 32px", gap: "16px",
          }}>
            <div style={{
              width: "110px", height: "110px",
              background: "var(--charcoal)",
              borderRadius: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
                stroke="var(--ivory)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px", fontWeight: 700,
              color: "var(--charcoal)", textAlign: "center",
            }}>
              سلتك فارغة حالياً
            </h2>

            <p style={{
              fontSize: "13px", color: "var(--taupe)",
              textAlign: "center", lineHeight: 1.7, maxWidth: "240px",
            }}>
              أضيفي منتجاتك المفضلة إلى السلة وابدئي تجربة تسوق استثنائية
            </p>
          </div>
        </AnimateIn>

        {/* Buttons */}
        <AnimateIn delay={200}>
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/products" style={{
              display: "block",
              background: "var(--charcoal)",
              color: "var(--ivory)",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              textAlign: "center",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
            >
              اكتشفي المجموعة
            </Link>

           
           
          </div>
        </AnimateIn>

        {/* Features */}
        <AnimateIn delay={300}>
          <div style={{
            margin: "24px 16px 0",
            background: "var(--sand)",
            borderRadius: "14px",
            overflow: "hidden",
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 16px",
                borderBottom: i < features.length - 1 ? "0.5px solid var(--border)" : "none",
              }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--charcoal)" }}>
                    {f.title}
                  </div>

                </div>
                <div style={{
                  width: "36px", height: "36px",
                  background: "var(--ivory)",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

      </div>
    );
  }

  return (
    <div style={{ background: "var(--ivory)", minHeight: "100vh", paddingBottom: "160px"}}>


      {/* الهيدر */}
      <AnimateIn delay={0}>
        <div style={{ padding: "20px", borderBottom: "0.5px solid var(--border)" }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "28px",
            fontWeight: 300, color: "var(--charcoal)",
          }}>
            سلة <em style={{ fontStyle: "italic", color: "var(--gold)" }}>المشتريات</em>
          </h1>
          <p style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "4px" }}>
            {items.length} منتج
          </p>
        </div>
      </AnimateIn>

      {/* المنتجات */}
      <div style={{ padding: "0 20px" }}>
        {items.map((item, index) => (
          <AnimateIn key={`${item.id}-${item.color}`} delay={index * 80}>
            <div style={{
              display: "flex", gap: "14px",
              padding: "20px 0",
              borderBottom: "0.5px solid var(--border)",
              transition: "opacity 0.3s ease",
            }}>
              <div style={{
                width: "90px", height: "90px",
                background: "var(--sand)", flexShrink: 0, overflow: "hidden",
                borderRadius: "4px",
              }}>
                <img src={item.image} alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: "var(--charcoal)", fontWeight: 400, marginBottom: "4px" }}>
                  {item.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <span style={{
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: item.colorHex, border: "0.5px solid var(--border)", display: "block",
                  }} />
                  <span style={{ fontSize: "11px", color: "var(--taupe)", fontWeight: 300 }}>{item.color}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                      style={{
                        width: "32px", height: "32px", border: "0.5px solid var(--border)",
                        background: "transparent", cursor: "pointer", fontSize: "18px",
                        color: "var(--charcoal)", transition: "background 0.2s ease",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "var(--sand)"}
                      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                    >−</button>
                    <span style={{
                      width: "36px", height: "32px", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "13px", border: "0.5px solid var(--border)",
                      borderRight: "none", borderLeft: "none",
                    }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                      style={{
                        width: "32px", height: "32px", border: "0.5px solid var(--border)",
                        background: "transparent", cursor: "pointer", fontSize: "18px",
                        color: "var(--charcoal)", transition: "background 0.2s ease",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "var(--sand)"}
                      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                    >+</button>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: "var(--gold)" }}>
                    {(item.price * item.quantity).toLocaleString()} دج
                  </div>
                </div>
              </div>

              <button onClick={() => removeItem(item.id, item.color)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--taupe)", fontSize: "16px", alignSelf: "flex-start",
                  padding: "4px", transition: "color 0.2s ease, transform 0.2s ease",
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = "#c0392b"; e.currentTarget.style.transform = "rotate(90deg)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "var(--taupe)"; e.currentTarget.style.transform = "rotate(0deg)"; }}
              >✕</button>
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* الملخص الثابت */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--ivory)", borderTop: "0.5px solid var(--border)",
        padding: "16px 20px", paddingBottom: "calc(16px + env(safe-area-inset-bottom))", zIndex: 150,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "13px", color: "var(--taupe)", fontWeight: 300 }}>المجموع</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--charcoal)" }}>
            {totalPrice().toLocaleString()} دج
          </span>
        </div>
        <Link href="/checkout" style={{
          display: "block", background: "var(--charcoal)", color: "var(--ivory)",
          padding: "15px 0", textAlign: "center", fontSize: "12px",
          letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
          fontFamily: "var(--font-body)", transition: "background 0.3s ease",
        }}
          onMouseOver={(e) => e.currentTarget.style.background = "var(--gold)"}
          onMouseOut={(e) => e.currentTarget.style.background = "var(--charcoal)"}
        >
          ✦ إتمام الطلب
        </Link>
      </div>
    </div>
  );
}