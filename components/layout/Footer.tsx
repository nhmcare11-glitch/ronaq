"use client";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ isolation: "isolate", position: "relative", zIndex: 1 }}>

      {/* BRAND SECTION */}
      <section style={{
        background: "var(--charcoal)",
        padding: "48px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}>
        <FadeIn>
          <div>
            <div style={{
              fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--gold)",
              marginBottom: "14px",
            }}>
              ✦ قصتنا
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "32px",
              fontWeight: 300, color: "var(--ivory)",
            }}>
              حيث يلتقي <em style={{ color: "var(--gold)" }}>الذوق الرفيع</em> بالأصالة
            </h2>
            <p style={{ fontSize: "13px", color: "var(--taupe)", lineHeight: 1.9 }}>
              رونق ليست مجرد متجر — هي رحلة اكتشاف الجمال في أبسط التفاصيل.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* MAIN FOOTER */}
      <div style={{ background: "var(--charcoal)", color: "var(--taupe)", padding: "40px 20px 30px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>

          <FadeIn delay={100}>
            <div style={{ fontSize: "26px", fontWeight: 600, color: "var(--champagne)" }}>
              RONAQ
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <div style={{ color: "var(--gold)", marginBottom: "14px" }}>تسوقي</div>
                {[
                  { label: "جميع المنتجات", href: "/products" },
                  { label: "محافظ", href: "/categories/wallets" },
                  { label: "العروض", href: "/sale" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} style={{
                    display: "block", fontSize: "12px", color: "var(--taupe)",
                    marginBottom: "10px", textDecoration: "none",
                  }}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div>
                <div style={{ color: "var(--gold)", marginBottom: "14px" }}>مساعدة</div>
                {[
                  { label: "من نحن", href: "/about" },
                  { label: "اتصلي بنا", href: "/contact" },
                  { label: "الأسئلة الشائعة", href: "/faq" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} style={{
                    display: "block", fontSize: "12px", color: "var(--taupe)",
                    marginBottom: "10px", textDecoration: "none",
                  }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div>
              <div style={{
                fontSize: "10px", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--gold)", marginBottom: "14px",
              }}>
                تابعينا
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
              {[
  { icon: <FaInstagram size={20} />, href: "https://www.instagram.com/ronaqe_store?igsh=dDcyMjNwOXQwNThv", color: "#E1306C" },
  { icon: <FaFacebook size={20} />, href: "https://facebook.com/groups/737449800372905/", color: "#1877F2" },
  { icon: <FaTiktok size={20} />, href: "https://www.tiktok.com", color: "#ffffff" },
].map((item, i) => (
  <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer"
    style={{
      width: "48px", height: "48px", display: "flex",
      alignItems: "center", justifyContent: "center",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "var(--taupe)",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.color = item.color;
      e.currentTarget.style.borderColor = item.color;
      e.currentTarget.style.transform = "translateY(-6px) scale(1.1)";
      e.currentTarget.style.background = `${item.color}22`;
      e.currentTarget.style.boxShadow = `0 8px 20px ${item.color}44`;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.color = "var(--taupe)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      e.currentTarget.style.boxShadow = "none";
    }}
    onTouchStart={(e) => {
      e.currentTarget.style.color = item.color;
      e.currentTarget.style.transform = "scale(0.95)";
      e.currentTarget.style.background = `${item.color}22`;
    }}
    onTouchEnd={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    {item.icon}
  </Link>
))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div style={{
              borderTop: "0.5px solid #444441", paddingTop: "20px",
              fontSize: "10px", color: "#5F5E5A",
            }}>
              © 2025 Ronaq Store — جميع الحقوق محفوظة
            </div>
          </FadeIn>

        </div>
      </div>
    </footer>
  );
}