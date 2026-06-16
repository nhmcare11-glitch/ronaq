import type { Metadata, Viewport } from "next";
import "./globals.css";
export const dynamic = "force-dynamic";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { FavoritesProvider } from "@/lib/FavoritesContext";

export const metadata: Metadata = {
  title: "رونق | Ronaq Store",
  description: "متجر الحقائب النسائية الفاخرة",
};

// ← أضف هذا
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <FavoritesProvider>
           <Navbar /> 
          <main style={{ paddingBottom: "80px" }}>{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}