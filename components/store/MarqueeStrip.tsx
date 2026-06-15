export default function MarqueeStrip() {
  const text = "&nbsp;✦&nbsp; جلد طبيعي أصيل &nbsp;✦&nbsp; ضمان الجودة &nbsp;✦&nbsp; &nbsp;✦&nbsp; مجموعات حصرية &nbsp;✦&nbsp;";

  return (
    <div style={{
      background: "var(--charcoal)",
      color: "var(--champagne)",
      padding: "10px 0",
      overflow: "hidden",
      whiteSpace: "nowrap",
    }}>
      <div style={{
        display: "inline-block",
        animation: "marquee 20s linear infinite",
        fontSize: "10px",
        letterSpacing: "0.2em",
        fontFamily: "var(--font-body)",
        fontWeight: 300,
      }}
        dangerouslySetInnerHTML={{ __html: text + text }}
      />
    </div>
  );
}