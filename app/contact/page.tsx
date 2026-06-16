"use client";
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa6";

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

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  return (
    <div style={{ background: "var(--ivory)", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{
        background: "var(--charcoal)",
        padding: "80px 24px 64px",
        textAlign: "center",
      }}>
        <FadeIn>
          <div style={{
            fontSize: "10px", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "var(--gold)",
            marginBottom: "16px",
          }}>
            ✦ تواصلي معنا
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 8vw, 52px)",
            fontWeight: 300,
            color: "var(--ivory)",
          }}>
            نحن هنا <em style={{ color: "var(--gold)" }}>لأجلكِ</em>
          </h1>
        </FadeIn>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "560px", margin: "0 auto" }}>

        {/* Social links */}
        <FadeIn delay={100}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{
              fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--gold)",
              marginBottom: "20px",
            }}>تابعينا</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: <FaInstagram size={18} />, label: "Instagram", sub: "@ronaqe_store", href: "https://www.instagram.com/ronaqe_store", color: "#E1306C" },
                { icon: <FaFacebook size={18} />, label: "Facebook", sub: "Ronaq Store", href: "https://facebook.com/groups/737449800372905/", color: "#1877F2" },
                { icon: <FaTiktok size={18} />, label: "TikTok", sub: "@ronaq", href: "https://www.tiktok.com", color: "#ffffff" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: "var(--charcoal)",
                  border: "0.5px solid #444441",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  textDecoration: "none",
                  transition: "transform 0.2s ease",
                }}
                  onMouseOver={e => e.currentTarget.style.transform = "translateX(-4px)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translateX(0)"}
                >
                  <div style={{ color: s.color }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ivory)" }}>{s.label}</div>
                    <div style={{ fontSize: "11px", color: "var(--taupe)" }}>{s.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Message form */}
        <FadeIn delay={200}>
          <div style={{
            fontSize: "10px", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "var(--gold)",
            marginBottom: "20px",
          }}>أرسلي رسالة</div>

          {sent ? (
            <div style={{
              background: "var(--charcoal)",
              borderRadius: "16px",
              padding: "40px 24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>✦</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--gold)", marginBottom: "8px" }}>
                شكراً لكِ
              </div>
              <div style={{ fontSize: "13px", color: "var(--taupe)" }}>
                سنتواصل معكِ في أقرب وقت
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="text"
                placeholder="اسمكِ"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "var(--sand)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "12px",
                  fontSize: "14px", color: "var(--charcoal)",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  textAlign: "right",
                }}
              />
              <textarea
                placeholder="رسالتكِ..."
                rows={5}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "var(--sand)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "12px",
                  fontSize: "14px", color: "var(--charcoal)",
                  fontFamily: "var(--font-body)",
                  outline: "none", resize: "none",
                  textAlign: "right",
                }}
              />
              <button
                onClick={() => { if (form.name && form.message) setSent(true); }}
                style={{
                  background: "var(--charcoal)",
                  color: "var(--gold)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                إرسال ✦
              </button>
            </div>
          )}
        </FadeIn>
      </section>
    </div>
  );
}