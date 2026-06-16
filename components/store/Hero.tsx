
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

const pearls = [
  { size: 5, left: "10%", delay: "0s",   duration: "2.2s" },
  { size: 4, left: "25%", delay: "0.4s", duration: "2.6s" },
  { size: 6, left: "42%", delay: "0.2s", duration: "2s"   },
  { size: 4, left: "58%", delay: "0.7s", duration: "2.4s" },
  { size: 5, left: "74%", delay: "0.1s", duration: "2.8s" },
  { size: 3, left: "88%", delay: "0.5s", duration: "2.1s" },
];

export default function Hero() {
  const [manualIdx, setManualIdx] = useState(0);
  const [isManual, setIsManual] = useState(false);
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

        @keyframes pearlFloat {
          0%   { transform: translateY(0px) scale(1);    opacity: 0.9; }
          50%  { transform: translateY(-10px) scale(1.1); opacity: 1;   }
          100% { transform: translateY(0px) scale(1);    opacity: 0.9; }
        }

        @keyframes pearlGlow {
          0%   { box-shadow: 0 0 4px 1px rgba(255,255,255,0.5), inset 0 1px 2px rgba(255,255,255,0.8); }
          50%  { box-shadow: 0 0 10px 3px rgba(212,175,100,0.6), inset 0 1px 3px rgba(255,255,255,0.9); }
          100% { box-shadow: 0 0 4px 1px rgba(255,255,255,0.5), inset 0 1px 2px rgba(255,255,255,0.8); }
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
        .hero-content-anim .hero-pearls {
          animation: heroFadeUp 0.6s ease 0.5s forwards;
          opacity: 0;
        }
        .hero-content-anim .hero-btn-wrap {
          animation: heroFadeUp 0.6s ease 0.65s forwards;
          opacity: 0;
        }

        .pearl {
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffffff, #d4af64 60%, #a0834a);
          box-shadow: 0 0 4px 1px rgba(255,255,255,0.5), inset 0 1px 2px rgba(255,255,255,0.8);
          animation: pearlFloat var(--dur) ease-in-out var(--delay) infinite,
                     pearlGlow var(--dur) ease-in-out var(--delay) infinite;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 40px;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-family: var(--font-body);
          transition: border-color 0.3s ease, color 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,100,0.2), rgba(212,175,100,0.05));
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
        }

        .hero-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        .hero-btn:hover {
          border-color: rgba(212,175,100,0.9);
          color: #d4af64;
        }

        .hero-btn-arrow {
          transition: transform 0.3s ease;
          font-size: 15px;
          opacity: 0.8;
        }

        .hero-btn:hover .hero-btn-arrow {
          transform: translateX(-5px);
          opacity: 1;
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

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.38) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* المحتوى — في المنتصف */}
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
          {/* التاج — أبيض واضح مع shadow */}
          <div
            className="hero-tag"
            style={{
              fontSize: 12,
              opacity: 0,
              letterSpacing: "0.2em",
              color: "#ffffff",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              marginBottom: 14,
              fontWeight: 400,
              background: "rgba(212,175,100,0.18)",
              border: "0.5px solid rgba(212,175,100,0.4)",
              padding: "5px 16px",
              backdropFilter: "blur(4px)",
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
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
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
              color: "rgba(255,255,255,0.85)",
              maxWidth: 300,
              marginBottom: 28,
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            {currentSlide.desc}
          </p>

          {/* اللؤلؤات المتحركة */}
          <div
            className="hero-pearls"
            style={{
              opacity: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 10,
              marginBottom: 14,
              height: 28,
            }}
          >
            {pearls.map((p, i) => (
              <div
                key={i}
                className="pearl"
                style={{
                  width: p.size,
                  height: p.size,
                  flexShrink: 0,
                  // @ts-ignore
                  "--dur": p.duration,
                  "--delay": p.delay,
                  alignSelf: i % 2 === 0 ? "flex-start" : "flex-end",
                }}
              />
            ))}
          </div>

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
