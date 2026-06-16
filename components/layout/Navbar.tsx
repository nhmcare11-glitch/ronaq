"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser, FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { useCartStore } from "@/lib/store/cartStore";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "var(--charcoal)" : "#fff";

  const btnStyle: React.CSSProperties = {
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    color: textColor,
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
    flexShrink: 0,
    transition: "color 0.3s ease",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,

        height: "56px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 4px",

        background: scrolled ? "var(--ivory)" : "transparent",
        borderBottom: scrolled
          ? "0.5px solid var(--border)"
          : "none",

        transition: "all 0.3s ease",
      }}
    >
      {/* يمين: سلة + حساب */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Link
          href="/cart"
          aria-label="السلة"
          style={{ ...btnStyle, position: "relative" }}
        >
          <FiShoppingCart size={22} />

          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 14,
                height: 14,
                background: "var(--gold)",
                borderRadius: "50%",
                fontSize: "9px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                border: scrolled
                  ? "1.5px solid var(--ivory)"
                  : "1.5px solid transparent",
              }}
            >
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </Link>

        <Link href="/account" aria-label="حسابي" style={btnStyle}>
          <FiUser size={22} />
        </Link>
      </div>

      {/* وسط: الشعار */}
      <Link
        href="/"
        style={{
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: textColor,
            lineHeight: 1,
            transition: "color 0.3s ease",
          }}
        >
          RONAQ
        </div>

        <div
          style={{
            fontSize: "8px",
            letterSpacing: "0.28em",
            color: "var(--gold)",
            fontWeight: 300,
            marginTop: "1px",
          }}
        >
          رونق — Store
        </div>
      </Link>

      {/* يسار: مفضلة + بحث */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link href="/favorites" aria-label="المفضلة" style={btnStyle}>
          <FiHeart size={22} />
        </Link>

        <Link href="/search" aria-label="بحث" style={btnStyle}>
          <FiSearch size={22} />
        </Link>
      </div>
    </nav>
  );
}