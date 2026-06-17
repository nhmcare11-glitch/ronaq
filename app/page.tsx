import Hero from "@/components/store/Hero";
import MarqueeStrip from "@/components/store/MarqueeStrip";
import ProductsSection from "@/components/store/ProductsSection";

export default function Home() {
  return (
    <>
      <div style={{ marginTop: "-56px" }}>
        <Hero />
      </div>
      <MarqueeStrip />
      <ProductsSection />
    </>
  );
}