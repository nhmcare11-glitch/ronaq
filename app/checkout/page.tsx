"use client";
import dynamic from "next/dynamic";

const CheckoutForm = dynamic(() => import("./CheckoutForm"), {
  ssr: false,
});

export default function CheckoutPage() {
  return <CheckoutForm />;
}