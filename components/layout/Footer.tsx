"use client";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      style={{
        // ✅ عزل z-index
        isolation: "isolate",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* BRAND SECTION */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "48px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "14px",
            }}
          >
            ✦ قصتنا
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: 300,
              color: "var(--ivory)",
            }}
          >
            حيث يلتقي <em style={{ color: "var(--gold)" }}>الذوق الرفيع</em>{" "}
            بالأصالة
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "var(--taupe)",
              lineHeight: 1.9,
            }}
          >
            رونق ليست مجرد متجر — هي رحلة اكتشاف الجمال في أبسط التفاصيل.
          </p>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <div
        style={{
          background: "var(--charcoal)",
          color: "var(--taupe)",
          padding: "40px 20px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* LOGO */}
          <div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "var(--champagne)",
              }}
            >
              RONAQ
            </div>
          </div>

          {/* LINKS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <div>
              <div style={{ color: "var(--gold)", marginBottom: "14px" }}>
                تسوقي
              </div>

              {[
                { label: "جميع المنتجات", href: "/products" },
                { label: "محافظ", href: "/categories/wallets" },
                { label: "العروض", href: "/sale" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "var(--taupe)",
                    marginBottom: "10px",
                    textDecoration: "none",
                    pointerEvents: "auto", // ✅ مهم
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <div style={{ color: "var(--gold)", marginBottom: "14px" }}>
                مساعدة
              </div>

              {[
                { label: "من نحن", href: "/about" },
                { label: "اتصلي بنا", href: "/contact" },
                { label: "الأسئلة الشائعة", href: "/faq" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: "var(--taupe)",
                    marginBottom: "10px",
                    textDecoration: "none",
                    pointerEvents: "auto", // ✅ مهم
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "14px",
              }}
            >
              تابعينا
            </div>

            <div style={{ display: "flex", gap: "14px" }}>
              {[
                {
                  icon: <FaInstagram size={18} />,
                  href: "https://www.instagram.com/ronaqe_store?igsh=dDcyMjNwOXQwNThv",
                },
                {
                  icon: <FaFacebook size={18} />,
                  href: "https://facebook.com/groups/737449800372905/",
                },
                {
                  icon: <FaTiktok size={18} />,
                  href: "https://www.tiktok.com",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid var(--taupe)",
                    color: "var(--taupe)",
                    transition: "all 0.3s ease",
                    pointerEvents: "auto", // ✅ مهم
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "var(--gold)";
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 12px rgba(212,175,55,0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "var(--taupe)";
                    e.currentTarget.style.borderColor = "var(--taupe)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* COPYRIGHT */}
          <div
            style={{
              borderTop: "0.5px solid #444441",
              paddingTop: "20px",
              fontSize: "10px",
              color: "#5F5E5A",
            }}
          >
            © 2025 Ronaq Store — جميع الحقوق محفوظة
          </div>
        </div>
      </div>

      
    </footer>
  );
}