import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { FavoritesProvider } from "@/lib/FavoritesContext";

export const metadata: Metadata = {
  title: "رونق | Ronaq Store",
  description: "متجر الحقائب النسائية الفاخرة",
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