import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>

      {/* السايدبار */}
      <aside style={{
        width: "220px",
        background: "var(--charcoal)",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        flexShrink: 0,
      }}>

        {/* اللوغو */}
        <div style={{
          padding: "0 20px 24px",
          borderBottom: "0.5px solid #444441",
          marginBottom: "12px",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "var(--champagne)",
          }}>
            RONAQ
          </div>
          <div style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            marginTop: "-2px",
            fontWeight: 300,
          }}>
            لوحة التحكم
          </div>
        </div>

        {/* الروابط */}
        {[
          { label: "الرئيسية",   href: "/admin",          icon: "⌂" },
          { label: "الطلبات",    href: "/admin/orders",   icon: "📦" },
          { label: "المنتجات",   href: "/admin/products", icon: "🛍" },
          { label: "العودة للمتجر", href: "/",            icon: "←" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "var(--taupe)",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
            }}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </aside>

      {/* المحتوى */}
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}