"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function StoreChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // لوحة الإدارة لها هيدر وقائمة خاصة بها (app/admin/layout.tsx)،
    // فلا نريد ظهور الـ Navbar/Footer الخاصين بالمتجر فوقها — كانا
    // يتعارضان مع زر القائمة وعناصر التحكم في الإدارة على الهاتف.
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "56px" }}>{children}</main>
      <Footer />
    </>
  );
}