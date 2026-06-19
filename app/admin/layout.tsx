"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const links = [
    { label: "الرئيسية", href: "/admin", icon: "⌂" },
    { label: "الطلبات", href: "/admin/orders", icon: "📦" },
    { label: "المنتجات", href: "/admin/products", icon: "🛍" },
    { label: "العودة للمتجر", href: "/", icon: "←" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ivory)",
      }}
    >
      {/* زر القائمة للموبايل */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            position: "fixed",
            top: 12,
            right: 12,
            width: 44,
            height: 44,
            border: "none",
            background: "var(--charcoal)",
            color: "white",
            fontSize: 22,
            cursor: "pointer",
            zIndex: 1100,
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ☰
        </button>
      )}

      {/* Overlay */}
      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            zIndex: 998,
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "220px",
            background: "var(--charcoal)",
            padding: "24px 0",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flexShrink: 0,

            ...(isMobile
              ? {
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999,
                  transform: menuOpen
                    ? "translateX(0)"
                    : "translateX(100%)",
                  transition: "transform .3s ease",
                }
              : {}),
          }}
        >
          {/* إغلاق */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                alignSelf: "flex-start",
                margin: "0 16px 16px",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}

          {/* Logo */}
          <div
            style={{
              padding: "0 20px 24px",
              borderBottom: "0.5px solid #444441",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "var(--champagne)",
              }}
            >
              RONAQ
            </div>

            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "var(--gold)",
                marginTop: "-2px",
                fontWeight: 300,
              }}
            >
              لوحة التحكم
            </div>
          </div>

          {/* Links */}
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 20px",
                minHeight: "48px",
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "var(--taupe)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </aside>

        {/* Content */}
        <main
          style={{
            flex: 1,
            padding: isMobile ? "72px 16px 20px" : "32px",
            overflowX: "hidden",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}