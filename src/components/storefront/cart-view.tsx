"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LockKeyhole, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/storefront/cart-provider";
import { formatPrice } from "@/lib/products";

const shippingFor = (subtotal: number) => (subtotal >= 100 || subtotal === 0 ? 0 : 8.9);

export function CartView() {
  const { items, subtotal, removeItem, setQuantity } = useCart();
  const shipping = shippingFor(subtotal);

  if (!items.length) {
    return (
      <div className="empty-cart">
        <span className="empty-cart-icon"><ShoppingBag size={25} /></span>
        <h2>Your cart is ready for something good.</h2>
        <p>Browse the store, find your next upgrade, and it&apos;ll show up here.</p>
        <Link href="/shop"><Button>Explore the shop <ArrowRight size={16} /></Button></Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-lines">
        {items.map((item) => (
          <article className="cart-line" key={item.id}>
            <div className="cart-line-image">
              {item.image && <Image src={item.image} alt={item.name} fill sizes="100px" />}
            </div>
            <div className="cart-line-info">
              <strong>{item.name}</strong>
              <span>{item.specs?.slice(0, 3).join(" · ") || "BG's Store selected"}</span>
              {item.kind === "build" && <span className="cart-build-label">Custom build · demo configuration</span>}
              {item.slug && <Link href={`/products/${item.slug}`} className="cart-view-product">View product <ArrowUpRight size={12} /></Link>}
            </div>
            <div className="cart-line-actions">
              <input
                aria-label={`Quantity for ${item.name}`}
                className="cart-quantity"
                type="number"
                min={1}
                max={item.kind === "build" ? 1 : 99}
                value={item.quantity}
                disabled={item.kind === "build"}
                onChange={(event) => setQuantity(item.id, Number(event.target.value))}
              />
              <span className="cart-line-price">{formatPrice(item.price * item.quantity)}</span>
              <button className="remove-button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 size={16} /></button>
            </div>
          </article>
        ))}
        <Link href="/shop" className="continue-shopping"><ArrowRight size={14} /> Keep browsing</Link>
      </div>
      <aside className="summary-card">
        <h2>Order summary</h2>
        <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
        <div className="summary-row"><span>Shipping</span><strong>{shipping ? formatPrice(shipping) : "Free"}</strong></div>
        <div className="summary-row"><span>VAT</span><strong>Included</strong></div>
        <div className="summary-row total"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
        <Link href="/checkout"><Button size="lg">Continue to checkout <ArrowRight size={16} /></Button></Link>
        <p className="summary-note"><LockKeyhole size={12} /> Demo checkout. No payment is collected.</p>
      </aside>
    </div>
  );
}
