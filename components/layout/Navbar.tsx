import Link from "next/link";
import { FiUser, FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";

export default function Navbar({
  cartItems = [],
}: {
  cartItems?: { id: string }[];
}) {
  const cartCount = cartItems.length;

  const btnStyle: React.CSSProperties = {
    width: 48, height: 48,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%", border: "none", background: "transparent",
    color: "var(--charcoal)", textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation", flexShrink: 0,
  };

  return (
    <nav style={{
      background: "var(--ivory)",
      borderBottom: "0.5px solid var(--border)",
      position: "sticky", top: 0, zIndex: 100,
      height: "56px",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      padding: "0 4px",
    }}>

      {/* يمين: سلة + حساب */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Link href="/cart" aria-label="السلة" style={{ ...btnStyle, position: "relative" }}>
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: 6, right: 6,
              width: 14, height: 14,
              background: "var(--gold)", borderRadius: "50%",
              fontSize: "9px", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 600, border: "1.5px solid var(--ivory)",
            }}>
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>
        <Link href="/account" aria-label="حسابي" style={btnStyle}>
          <FiUser size={22} />
        </Link>
      </div>

      {/* وسط: شعار */}
      <Link href="/" style={{ textDecoration: "none", textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "18px", fontWeight: 600,
          letterSpacing: "0.22em", color: "var(--charcoal)", lineHeight: 1,
        }}>RONAQ</div>
        <div style={{
          fontSize: "8px", letterSpacing: "0.28em",
          color: "var(--gold)", fontWeight: 300, marginTop: "1px",
        }}>رونق — Store</div>
      </Link>

      {/* يسار: مفضلة + بحث */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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