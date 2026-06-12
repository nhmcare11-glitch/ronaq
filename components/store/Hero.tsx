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

const DURATION = 4;
const TOTAL = slides.length;

export default function Hero() {
  const [offset, setOffset] = useState(0);
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
      const fadeIn = 2;
      const fadeOut = 2;
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

  return (
    <>
      <style>{`
        ${autoKeyframes}

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-auto-img {
          animation: var(--anim) ${TOTAL * DURATION}s linear infinite;
        }

        .hero-root * {
          transition: none !important;
        }
        .hero-content-anim {
          animation: heroFadeUp 0.6s ease forwards;
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
          /* ✅ الإصلاح الرئيسي: pan-y pinch-zoom بدلاً من pan-y فقط */
          touchAction: "pan-y pinch-zoom",
          userSelect: "none",
          /* ✅ حذف contain: "layout paint" — كان يكسر touch events على iOS */
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
              "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 60%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* النص */}
        <div
          key={`${isManual}-${manualIdx}`}
          className="hero-content-anim"
          style={{
            position: "absolute",
            bottom: 72,
            left: 20,
            right: 20,
            color: "#fff",
            zIndex: 5,
            pointerEvents: "none", // ✅ الـ div نفسه لا يحتاج events، فقط أبناؤه
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: "0.08em", pointerEvents: "none" }}>
            {slides[isManual ? manualIdx : 0].tag}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 7vw, 44px)",
              fontWeight: 300,
              margin: "8px 0",
              lineHeight: 1.2,
              color: "#fff",
              pointerEvents: "none",
            }}
          >
            {slides[isManual ? manualIdx : 0].title}
          </h1>
          <p
            style={{
              opacity: 0.82,
              fontSize: "clamp(13px, 3.5vw, 15px)",
              lineHeight: 1.6,
              pointerEvents: "none",
            }}
          >
            {slides[isManual ? manualIdx : 0].desc}
          </p>
          <Link
            href={slides[isManual ? manualIdx : 0].link}
            style={{
              display: "inline-block",
              marginTop: 16,
              background: "#fff",
              color: "#000",
              padding: "11px 22px",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.06em",
              WebkitTapHighlightColor: "transparent",
              pointerEvents: "auto", // ✅ الرابط يحتاج events
              position: "relative",
              zIndex: 6,
            }}
          >
            {slides[isManual ? manualIdx : 0].btn}
          </Link>
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
            pointerEvents: "none", // ✅ الـ div لا يحتاج events
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              type="button"
              style={{
                width: isManual && i === manualIdx ? 20 : 8,
                height: 8,
                borderRadius: 10,
                background:
                  isManual && i === manualIdx
                    ? "#fff"
                    : "rgba(255,255,255,0.45)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                pointerEvents: "auto", // ✅ الأزرار تحتاج events
                position: "relative",
                zIndex: 11,
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}