import type { Metadata } from "next";
import Link from "next/link";
import { ShopCatalog } from "@/components/storefront/shop-catalog";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop all tech" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; deal?: string }>;
}) {
  const query = await searchParams;
  const dealsOnly = query?.deal === "true";
  const items = dealsOnly ? products.filter((product) => product.oldPrice) : products;
  return (
    <div className="page-shell container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><span>Shop</span></div>
      <p className="eyebrow">{dealsOnly ? "SMART UPGRADES, BETTER PRICES" : "THE BG'S STORE COLLECTION"}</p>
      <h1 className="page-title">{dealsOnly ? "Deals worth a closer look." : "Find your next upgrade."}</h1>
      <p className="page-intro">{dealsOnly ? "A rotating selection of great gear at a little less." : "Handpicked laptops and components, chosen for performance, value, and build quality."}</p>
      <ShopCatalog products={items} initialQuery={query?.query ?? ""} />
    </div>
  );
}
