import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/storefront/cart-view";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <div className="page-shell container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><span>Cart</span></div>
      <p className="eyebrow">YOUR NEXT UPGRADE</p>
      <h1 className="page-title">Your cart.</h1>
      <p className="page-intro">Take one last look. You can update quantities or remove items here.</p>
      <CartView />
    </div>
  );
}
