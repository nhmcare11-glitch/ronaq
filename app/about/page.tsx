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

export default function AboutPage() {
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
            ✦ قصتنا
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 8vw, 52px)",
            fontWeight: 300,
            color: "var(--ivory)",
            lineHeight: 1.3,
          }}>
            حيث يلتقي <em style={{ color: "var(--gold)" }}>الذوق الرفيع</em><br />بالأصالة
          </h1>
        </FadeIn>
      </section>

      {/* Story */}
      <section style={{ padding: "64px 24px", maxWidth: "640px", margin: "0 auto" }}>
        <FadeIn delay={100}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 300,
            color: "var(--charcoal)",
            lineHeight: 1.9,
            marginBottom: "32px",
          }}>
            رونق ليست مجرد متجر — هي رحلة اكتشاف الجمال في أبسط التفاصيل.
            نؤمن بأن كل قطعة تحمل روحاً، وكل تصميم يروي حكاية.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{
            fontSize: "14px",
            color: "var(--taupe)",
            lineHeight: 1.9,
            marginBottom: "24px",
          }}>
            بدأت رونق من شغف حقيقي بالحقائب النسائية الفاخرة وبالمرأة الجزائرية التي تستحق الأفضل.
            نختار كل منتج بعناية فائقة لنضمن لكِ جودة لا تُضاهى وأناقة لا تُنسى.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <p style={{
            fontSize: "14px",
            color: "var(--taupe)",
            lineHeight: 1.9,
          }}>
            كل محفظة، كل حقيبة، كل تفصيل — اخترناه لأجلكِ أنتِ.
          </p>
        </FadeIn>
      </section>

      {/* Values */}
      <section style={{
        background: "var(--sand)",
        padding: "64px 24px",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--gold)",
              marginBottom: "32px", textAlign: "center",
            }}>
              ✦ قيمنا
            </div>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              { title: "الجودة أولاً", desc: "نختار فقط ما يستحق أن يحمل اسم رونق." },
              { title: "الأصالة", desc: "تصاميم تعكس ذوقاً راقياً وشخصية فريدة." },
              { title: "الثقة", desc: "نبني علاقة صادقة مع كل عميلة." },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{
                  background: "var(--ivory)",
                  border: "0.5px solid var(--border)",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "32px", height: "32px",
                    background: "var(--charcoal)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold)", fontSize: "14px", flexShrink: 0,
                  }}>✦</div>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px", fontWeight: 400,
                      color: "var(--charcoal)", marginBottom: "6px",
                    }}>{v.title}</div>
                    <div style={{ fontSize: "13px", color: "var(--taupe)", lineHeight: 1.7 }}>{v.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}