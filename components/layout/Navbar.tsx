"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiMenu, FiSearch, FiUser, FiShoppingCart,
  FiX, FiTag, FiBriefcase, FiShoppingBag,
  FiInfo, FiMessageSquare, FiHeart, FiHome,
} from "react-icons/fi";

const CATEGORIES = [
  { label: "الرئيسية", href: "/" },
  { label: "الكل", href: "/products" },
  { label: "محافظ", href: "/categories/wallets" },
  { label: "حقائب يد", href: "/categories/handbags" },
  { label: "مفضلة", href: "/wishlist" },
  { label: "عروض", href: "/sale" },
];

const DRAWER_ITEMS = [
  { label: "العروض الحصرية", href: "/sale", icon: <FiTag size={18} />, gold: true },
  { label: "محافظ", href: "/categories/wallets", icon: <FiBriefcase size={18} />, gold: false },
  { label: "حقائب يد", href: "/categories/handbags", icon: <FiShoppingBag size={18} />, gold: false },
];

const DRAWER_LINKS = [
  { label: "الرئيسية", href: "/", icon: <FiHome size={18} /> },
  { label: "المفضلة", href: "/wishlist", icon: <FiHeart size={18} /> },
  { label: "من نحن", href: "/about", icon: <FiInfo size={18} /> },
  { label: "اتصلي بنا", href: "/contact", icon: <FiMessageSquare size={18} /> },
];

const SUGGESTIONS = ["محافظ جلد", "حقائب صغيرة", "عروض", "ألوان باستيل"];

export default function Navbar({ cartItems = [] }: { cartItems?: { id: string }[] }) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("الكل");
  const [query, setQuery] = useState("");

  const cartCount = cartItems.length;

  function handleCategoryClick(label: string, href: string) {
    setActiveTab(label);
    router.push(href);
    setSearchOpen(false);
  }

  // ✅ الحل الصحيح: pointer events بدل touch/click منفصلَين
  const btnStyle: React.CSSProperties = {
    width: 48, height: 48,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%", border: "none",
    background: "transparent", color: "var(--charcoal)", cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",   // ✅ يلغي تأخير 300ms
    flexShrink: 0,
    userSelect: "none",
  };

  const linkStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "11px 10px", borderRadius: "10px",
    fontSize: "13px", textDecoration: "none",
    color: "var(--charcoal)", border: "0.5px solid transparent",
  };

  return (
    <>
      {/* ── Drawer Overlay ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 400,
            touchAction: "manipulation",  // ✅
          }}
        />
      )}

      {/* ── Drawer ── */}
      <aside style={{
        position: "fixed",
        top: 0,
        left: drawerOpen ? 0 : "-100%",
        width: "75%", maxWidth: 280, height: "100%",
        background: "var(--ivory)", zIndex: 500,
        padding: "24px 16px", transition: "left 0.3s ease",
        display: "flex", flexDirection: "column", gap: "6px",
        overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.15em" }}>RONAQ</span>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            style={{ ...btnStyle, width: 32, height: 32, border: "0.5px solid var(--taupe)" }}
          >
            <FiX size={14} />
          </button>
        </div>

        {DRAWER_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}
            onClick={() => setDrawerOpen(false)}
            style={{
              ...linkStyle,
              color: item.gold ? "var(--gold)" : "var(--charcoal)",
              border: item.gold ? "0.5px solid #E8D9B8" : "0.5px solid transparent",
              background: item.gold ? "#FAF4E8" : "transparent",
            }}>
            {item.icon}{item.label}
          </Link>
        ))}

        <div style={{ borderTop: "0.5px solid var(--border)", margin: "8px 0" }} />

        {DRAWER_LINKS.map((item) => (
          <Link key={item.href} href={item.href}
            onClick={() => setDrawerOpen(false)}
            style={linkStyle}>
            {item.icon}{item.label}
          </Link>
        ))}
      </aside>

      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div style={{
          position: "fixed", inset: 0,
          background: "var(--ivory)", zIndex: 450,
          padding: "16px",
          display: "flex", flexDirection: "column", gap: "14px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحثي عن منتج..."
              style={{
                flex: 1, background: "var(--bg-muted, #EFECE5)",
                border: "none", borderRadius: "20px",
                padding: "10px 14px", fontSize: "14px",
                color: "var(--charcoal)", outline: "none",
                direction: "rtl", fontFamily: "inherit",
              }}
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setQuery(""); }}
              style={{
                fontSize: "13px", color: "var(--taupe)",
                background: "none", border: "none",
                cursor: "pointer", fontFamily: "inherit",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                padding: "8px",
              }}
            >
              إلغاء
            </button>
          </div>

          <div>
            <span style={{ fontSize: "11px", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>
              تصفح الفئات
            </span>
            <div style={{
              display: "flex", gap: "8px",
              overflowX: "auto", scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch", paddingBottom: "4px",
            }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.href}
                  type="button"
                  onClick={() => handleCategoryClick(cat.label, cat.href)}
                  style={{
                    flexShrink: 0, padding: "6px 14px", borderRadius: "20px",
                    fontSize: "12px", cursor: "pointer",
                    fontFamily: "inherit", whiteSpace: "nowrap",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    background: activeTab === cat.label ? "var(--charcoal)" : "transparent",
                    color: activeTab === cat.label ? "var(--ivory)" : "var(--charcoal)",
                    border: activeTab === cat.label ? "0.5px solid var(--charcoal)" : "0.5px solid var(--taupe)",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "11px", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>
              بحث مقترح
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  style={{
                    padding: "6px 14px", border: "0.5px solid var(--taupe)",
                    borderRadius: "20px", fontSize: "12px",
                    color: "var(--charcoal)", cursor: "pointer",
                    background: "transparent", fontFamily: "inherit",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav style={{
        background: "var(--ivory)",
        borderBottom: "0.5px solid var(--border)",
        position: "sticky", top: 0,
        zIndex: 100,
        height: "56px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        padding: "0 4px",
      }}>
        {/* يسار — سلة + حساب */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/cart" aria-label="السلة"
            style={{ ...btnStyle, textDecoration: "none", position: "relative" }}>
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: 6, right: 6,
                width: 14, height: 14, background: "var(--gold)",
                borderRadius: "50%", fontSize: "9px", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 600, border: "1.5px solid var(--ivory)",
              }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
          <Link href="/account" aria-label="حسابي"
            style={{ ...btnStyle, textDecoration: "none" }}>
            <FiUser size={22} />
          </Link>
        </div>

        {/* وسط — شعار */}
        <Link href="/" style={{ textDecoration: "none", textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "18px",
            fontWeight: 600, letterSpacing: "0.22em", color: "var(--charcoal)", lineHeight: 1,
          }}>RONAQ</div>
          <div style={{
            fontSize: "8px", letterSpacing: "0.28em",
            color: "var(--gold)", fontWeight: 300, marginTop: "1px",
          }}>رونق — Store</div>
        </Link>

        {/* يمين — بحث + قائمة */}
        <div style={{ display: "flex", alignItems: "center" }}>
         <button
  type="button"
  onClick={() => {
    console.log("SEARCH CLICKED");
    setSearchOpen(true);
  }}
  aria-label="بحث"
  style={btnStyle}
>
  <FiSearch size={22} />
</button>
         <button
  type="button"
  onClick={() => {
    console.log("MENU CLICKED");
    setDrawerOpen(true);
  }}
  aria-label="القائمة"
  style={btnStyle}
>
  <FiMenu size={22} />
</button>
        </div>
      </nav>
    </>
  );
}