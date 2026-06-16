"use client";
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

const faqs = [
  {
    q: "كيف يمكنني الطلب؟",
    a: "تصفّحي منتجاتنا، أضيفي ما يعجبكِ إلى السلة، ثم أكملي عملية الدفع بسهولة.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نقبل الدفع عبر بطاقة EDAHABIA وCIB عبر منصة Chargily Pay الآمنة.",
  },
  {
    q: "كم تستغرق مدة التوصيل؟",
    a: "يتراوح وقت التوصيل بين 3 إلى 7 أيام عمل حسب ولايتكِ.",
  },
  {
    q: "هل يمكنني إرجاع المنتج؟",
    a: "نعم، يمكنكِ طلب الإرجاع خلال 7 أيام من استلام الطلب، شريطة أن يكون المنتج بحالته الأصلية.",
  },
  {
    q: "هل المنتجات أصلية؟",
    a: "بالطبع، جميع منتجاتنا مختارة بعناية ومضمونة الجودة.",
  },
  {
    q: "كيف أتابع طلبي؟",
    a: "بعد تأكيد الطلب ستصلكِ رسالة مع تفاصيل التتبع، أو يمكنكِ التواصل معنا مباشرة.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

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
            ✦ الأسئلة الشائعة
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 8vw, 52px)",
            fontWeight: 300,
            color: "var(--ivory)",
          }}>
            كيف <em style={{ color: "var(--gold)" }}>نساعدكِ؟</em>
          </h1>
        </FadeIn>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "640px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div
                style={{
                  background: open === i ? "var(--charcoal)" : "var(--sand)",
                  border: `0.5px solid ${open === i ? "#444441" : "var(--border)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "background 0.3s ease, border-color 0.3s ease",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%", padding: "20px 20px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "transparent", border: "none", cursor: "pointer",
                    textAlign: "right",
                    gap: "12px",
                  }}
                >
                  <span style={{
                    fontSize: "14px", fontWeight: 500,
                    color: open === i ? "var(--gold)" : "var(--charcoal)",
                    transition: "color 0.3s ease",
                    flex: 1, textAlign: "right",
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    color: open === i ? "var(--gold)" : "var(--taupe)",
                    fontSize: "18px",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    flexShrink: 0,
                  }}>
                    +
                  </span>
                </button>
                {open === i && (
                  <div style={{
                    padding: "0 20px 20px",
                    fontSize: "13px",
                    color: "var(--taupe)",
                    lineHeight: 1.8,
                    textAlign: "right",
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Still have questions */}
        <FadeIn delay={500}>
          <div style={{
            marginTop: "48px",
            background: "var(--charcoal)",
            borderRadius: "20px",
            padding: "32px 24px",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px", fontWeight: 300,
              color: "var(--ivory)", marginBottom: "8px",
            }}>
              لديكِ سؤال آخر؟
            </div>
            <div style={{ fontSize: "13px", color: "var(--taupe)", marginBottom: "20px" }}>
              فريقنا مستعد للمساعدة
            </div>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                background: "var(--gold)",
                color: "var(--charcoal)",
                padding: "12px 32px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              تواصلي معنا
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}