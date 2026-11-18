"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/storefront/cart-provider";
import { formatPrice, type Product } from "@/lib/products";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      kind: "product",
      slug: product.slug,
      specs: product.specs,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-image-wrap">
        {product.oldPrice && <Badge variant="sale" className="product-sale">Save {Math.round((1 - product.price / product.oldPrice) * 100)}%</Badge>}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 25vw"
          className="product-image"
        />
        <span className="product-image-link"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="product-card-body">
        <div className="product-rating"><Star size={13} fill="currentColor" /> 4.8 <span>(24)</span></div>
        <Link href={`/products/${product.slug}`} className="product-title">{product.name}</Link>
        <p className="product-summary">{product.summary}</p>
        <div className="product-stock"><span /> In stock · Ships in 1–2 days</div>
        <div className="product-card-bottom">
          <div className="product-price">
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <Button size="icon" aria-label={`Add ${product.name} to cart`} onClick={addToCart}>
            {added ? <Check size={18} /> : <Plus size={18} />}
          </Button>
        </div>
      </div>
    </article>
  );
}
