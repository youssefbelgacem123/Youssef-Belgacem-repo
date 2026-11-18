"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Heart, PackageCheck, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/product-card";
import { useCart } from "@/components/storefront/cart-provider";
import { formatPrice, type Product } from "@/lib/products";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageView, setImageView] = useState(0);
  const [saved, setSaved] = useState(false);

  function addToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      kind: "product",
      slug: product.slug,
      specs: product.specs,
    }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const compatibility =
    product.category === "laptops"
      ? "Everything you need is already matched and tested."
      : product.category === "cpu"
        ? "Check your motherboard socket and cooler support before checkout."
        : product.category === "motherboard"
          ? "Match the socket to your CPU and the board size to your case."
          : product.category === "gpu"
            ? "Allow room in your case and check your power supply capacity."
            : "Need a second opinion? Our team can help check your full setup.";

  return (
    <>
      <div className="breadcrumbs">
        <Link href="/">Home</Link><ChevronRight size={13} />
        <Link href={`/shop/${product.category}`}>{product.category}</Link><ChevronRight size={13} />
        <span>{product.name}</span>
      </div>
      <div className="detail-layout">
        <div>
          <div className={`detail-image detail-image-view-${imageView}`}>
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 760px) 100vw, 55vw" />
            {product.oldPrice && <Badge variant="sale" className="detail-sale">Limited offer</Badge>}
          </div>
          <div className="detail-gallery-thumbs">
            {[0, 1, 2].map((index) => (
              <button
                className={`detail-thumb ${imageView === index ? "active" : ""}`}
                key={index}
                onClick={() => setImageView(index)}
                aria-label={`View product image ${index + 1}`}
                type="button"
              >
                <span className={`detail-thumb-crop crop-${index}`}><Image src={product.image} alt="" fill sizes="80px" /></span>
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-brand"><Badge variant="subtle">{product.brand}</Badge><span className="product-rating">★ 4.8 <span>(24 reviews)</span></span></div>
          <h1>{product.name}</h1>
          <p className="detail-summary">{product.summary}. Carefully selected by the BG&apos;s Store team for dependable, everyday performance.</p>
          <div className="detail-price-row">
            <strong className="detail-price">{formatPrice(product.price)}</strong>
            {product.oldPrice && <span className="detail-old-price">{formatPrice(product.oldPrice)}</span>}
            {product.oldPrice && <Badge variant="sale">Save {Math.round((1 - product.price / product.oldPrice) * 100)}%</Badge>}
          </div>
          <div className="detail-stock-note"><span className="stock-dot" /> In stock — ready to ship</div>
          <div className="delivery-note"><Truck size={17} /> Order today for estimated delivery in 2–4 business days.</div>
          <div className="detail-buy-row">
            <input
              className="quantity-input"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Math.min(product.stock, Number(event.target.value) || 1)))}
              aria-label="Quantity"
            />
            <Button size="lg" onClick={addToCart}>{added ? <><Check size={17} /> Added to cart</> : <><ShoppingBag size={17} /> Add to cart</>}</Button>
            <Button size="icon" variant="outline" aria-label={saved ? "Remove from saved items" : "Save item"} onClick={() => setSaved((value) => !value)}>
              <Heart size={17} fill={saved ? "currentColor" : "none"} />
            </Button>
          </div>
          <ul className="detail-points">
            <li><ShieldCheck size={16} /> 2-year BG&apos;s Store warranty</li>
            <li><PackageCheck size={16} /> Free shipping on orders over €100</li>
            <li><Check size={16} /> {compatibility}</li>
          </ul>
          <div className="detail-specs">
            <h2>At a glance</h2>
            <table className="spec-table"><tbody>
              {Object.entries(product.details).map(([label, value]) => (
                <tr key={label}><th>{label}</th><td>{value}</td></tr>
              ))}
              <tr><th>Availability</th><td>{product.stock > 0 ? `${product.stock} in stock` : "Back soon"}</td></tr>
            </tbody></table>
          </div>
        </div>
      </div>
      <section className="detail-section">
        <h2>Good with this</h2>
        <p className="section-subtitle">A few handpicked additions to complete your setup.</p>
        <div className="related-grid">
          {related.map((item) => <ProductCard product={item} key={item.id} />)}
        </div>
      </section>
    </>
  );
}
