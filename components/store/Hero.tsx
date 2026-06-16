"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/hero/slide1.jpg",
    tag: "✦ مجموعة صيف ٢٠٢٥",
    title: "الأناقة في كل تفصيلة",
    desc: "حقائب نسائية تجمع بين الاناقة و الرقي.",
    btn: "اكتشفي",
    link: "/products",
  },
  {
    id: 2,
    image: "/hero/slide2.jpg",
    tag: "✦ الأكثر مبيعاً",
    title: "ستايل يعكس شخصيتك",
    desc: "اختاري ما يناسبك بكل أناقة.",
    btn: "تسوقي",
    link: "/products",
  },
  {
    id: 3,
    image: "/hero/slide3.jpg",
    tag: "✦ جديد",
    title: "جديد هذا الموسم",
    desc: "تشكيلة جديدة تصل أسبوعياً.",
    btn: "اكتشفي",
    link: "/products",
  },
];

const DURATION = 2.5;
const TOTAL = slides.length;

export default function Hero() {
  const [manualIdx, setManualIdx] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const touchX = useRef(0);
  const touchY = useRef(0);

  function goTo(i: number) {
    setManualIdx(i);
    setIsManual(true);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = touchX.current - e.changedTouches[0].clientX;
    const dy = touchY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < 40) return;
    const next =
      dx > 0
        ? (manualIdx + 1) % TOTAL
        : (manualIdx - 1 + TOTAL) % TOTAL;
    goTo(next);
  }

  const autoKeyframes = slides
    .map((_, i) => {
      const start = (i / TOTAL) * 100;
      const show = (1 / TOTAL) * 100;
      const fadeIn = 1.5;
      const fadeOut = 1.5;
      return `
      @keyframes slide${i} {
        0%                              { opacity: ${i === 0 ? 1 : 0}; }
        ${Math.max(0, start - fadeIn)}% { opacity: 0; }
        ${start}%                       { opacity: 1; }
        ${start + show - fadeOut}%      { opacity: 1; }
        ${start + show}%                { opacity: 0; }
        100%                            { opacity: ${i === 0 ? 1 : 0}; }
      }
    `;
    })
    .join("\n");

  const currentSlide = slides[isManual ? manualIdx : 0];

  return (
    <>
      <style>{`
        ${autoKeyframes}

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes tagFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-content-anim .hero-tag {
          animation: tagFadeIn 0.5s ease 0.1s forwards;
          opacity: 0;
        }
        .hero-content-anim .hero-title {
          animation: heroFadeUp 0.6s ease 0.25s forwards;
          opacity: 0;
        }
        .hero-content-anim .hero-desc {
          animation: heroFadeUp 0.6s ease 0.4s forwards;
          opacity: 0;
        }
        .hero-content-anim .hero-btn-wrap {
          animation: heroFadeUp 0.6s ease 0.55s forwards;
          opacity: 0;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-family: var(--font-body);
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(212, 175, 100, 0.15);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
        }

        .hero-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .hero-btn:hover {
          border-color: rgba(212, 175, 100, 0.9);
          color: #d4af64;
        }

        .hero-btn-arrow {
          transition: transform 0.3s ease;
          font-size: 14px;
        }

        .hero-btn:hover .hero-btn-arrow {
          transform: translateX(-4px);
        }
      `}</style>

      <section
        className="hero-root"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          height: "92dvh",
          minHeight: 480,
          overflow: "hidden",
          background: "#1a1814",
          touchAction: "pan-y pinch-zoom",
          userSelect: "none",
          isolation: "isolate",
        }}
      >
        {/* الصور */}
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            loading={i === 0 ? "eager" : "lazy"}
            style={
              isManual
                ? {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: i === manualIdx ? 1 : 0,
                    transition: "opacity 0.8s ease",
                    pointerEvents: "none",
                  }
                : {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: i === 0 ? 1 : 0,
                    pointerEvents: "none",
                    // @ts-ignore
                    "--anim": `slide${i}`,
                    animationName: `slide${i}`,
                    animationDuration: `${TOTAL * DURATION}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                  }
            }
          />
        ))}

        {/* Overlay متدرج من الأسفل والأعلى */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* المحتوى — في المنتصف تماماً */}
        <div
          key={`${isManual}-${manualIdx}`}
          className="hero-content-anim"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            zIndex: 5,
            padding: "0 24px",
            paddingBottom: "60px",
            pointerEvents: "none",
          }}
        >
          {/* التاج */}
          <div
            className="hero-tag"
            style={{
              fontSize: 11,
              opacity: 0,
              letterSpacing: "0.15em",
              color: "rgba(212,175,100,0.9)",
              marginBottom: 14,
              fontWeight: 300,
            }}
          >
            {currentSlide.tag}
          </div>

          {/* العنوان */}
          <h1
            className="hero-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 9vw, 58px)",
              fontWeight: 300,
              margin: "0 0 14px",
              lineHeight: 1.2,
              color: "#fff",
              letterSpacing: "0.02em",
              opacity: 0,
            }}
          >
            {currentSlide.title}
          </h1>

          {/* الوصف */}
          <p
            className="hero-desc"
            style={{
              opacity: 0,
              fontSize: "clamp(13px, 3.5vw, 16px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 320,
              marginBottom: 32,
            }}
          >
            {currentSlide.desc}
          </p>

          {/* الزر */}
          <div className="hero-btn-wrap" style={{ opacity: 0, pointerEvents: "auto" }}>
            <Link href={currentSlide.link} className="hero-btn">
              {currentSlide.btn}
              <span className="hero-btn-arrow">←</span>
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 8,
            zIndex: 10,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              type="button"
              style={{
                width: isManual && i === manualIdx ? 24 : 8,
                height: 8,
                borderRadius: 10,
                background:
                  isManual && i === manualIdx
                    ? "rgba(212,175,100,0.9)"
                    : "rgba(255,255,255,0.4)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s, background 0.3s",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}