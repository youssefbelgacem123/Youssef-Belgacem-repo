"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/storefront/cart-provider";
import { formatPrice } from "@/lib/products";

const shippingFor = (subtotal: number) => (subtotal >= 100 || subtotal === 0 ? 0 : 8.9);

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState("");
  const shipping = shippingFor(subtotal);

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;
    setOrderNumber(`CF-${Math.floor(100000 + Math.random() * 900000)}`);
    clearCart();
  }

  if (orderNumber) {
    return (
      <div className="success-panel">
        <CheckCircle2 size={36} />
        <h2>Thanks — your demo order is in.</h2>
        <p>Order reference <strong>{orderNumber}</strong>. This is a prototype; no payment was taken and nothing will be shipped.</p>
        <Link href="/shop"><Button>Back to the shop <ArrowRight size={16} /></Button></Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="empty-state checkout-empty">
        <h2>Nothing to check out yet.</h2>
        <p>Add a laptop, component, or custom build to your cart first.</p>
        <Link href="/shop"><Button>Browse products <ArrowRight size={15} /></Button></Link>
      </div>
    );
  }

  return (
    <div className="checkout-grid">
      <form className="form-card" onSubmit={submitOrder}>
        <h2>Delivery details</h2>
        <div className="form-grid">
          <div className="form-field"><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" required /></div>
          <div className="form-field"><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" required /></div>
          <div className="form-field full"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
          <div className="form-field full"><label htmlFor="address">Street address</label><input id="address" name="address" autoComplete="street-address" required /></div>
          <div className="form-field"><label htmlFor="postalCode">Postcode</label><input id="postalCode" name="postalCode" autoComplete="postal-code" required /></div>
          <div className="form-field"><label htmlFor="city">City</label><input id="city" name="city" autoComplete="address-level2" required /></div>
          <div className="form-field full"><label htmlFor="country">Country</label><select id="country" name="country" defaultValue="Germany"><option>Germany</option><option>Austria</option><option>Netherlands</option><option>France</option></select></div>
        </div>
        <div className="demo-payment-note"><LockKeyhole size={15} /><span><strong>Demo checkout only.</strong> This form does not collect payment details and does not create a real order.</span></div>
        <Button type="submit" size="lg">Place demo order · {formatPrice(subtotal + shipping)} <ArrowRight size={16} /></Button>
      </form>
      <aside className="summary-card checkout-summary">
        <h2>Your order</h2>
        <div className="checkout-item-list">
          {items.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span><strong>{item.quantity}×</strong> {item.name}</span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
        <div className="summary-row"><span>Shipping</span><strong>{shipping ? formatPrice(shipping) : "Free"}</strong></div>
        <div className="summary-row total"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
        <Link className="back-to-cart" href="/cart">Edit your cart</Link>
      </aside>
    </div>
  );
}
