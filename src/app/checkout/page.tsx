import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/storefront/checkout-form";

export const metadata: Metadata = { title: "Demo checkout" };

export default function CheckoutPage() {
  return (
    <div className="page-shell container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/cart">Cart</Link><span>›</span><span>Checkout</span></div>
      <p className="eyebrow">ALMOST THERE</p>
      <h1 className="page-title">Checkout.</h1>
      <p className="page-intro">A simple demo checkout. No real payment details are requested or stored.</p>
      <CheckoutForm />
    </div>
  );
}
