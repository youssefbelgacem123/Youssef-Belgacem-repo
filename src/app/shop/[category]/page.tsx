import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopCatalog } from "@/components/storefront/shop-catalog";
import { categoryLabels, products, type Category } from "@/lib/products";

const categories = Object.keys(categoryLabels) as Category[];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!categories.includes(category as Category)) return { title: "Shop" };
  return { title: categoryLabels[category as Category] };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryParam } = await params;
  if (!categories.includes(categoryParam as Category)) notFound();
  const category = categoryParam as Category;
  const items = products.filter((product) => product.category === category);
  return (
    <div className="page-shell container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/shop">Shop</Link><span>›</span><span>{categoryLabels[category]}</span></div>
      <p className="eyebrow">THE BG&apos;S STORE COLLECTION</p>
      <h1 className="page-title">{categoryLabels[category]}.</h1>
      <p className="page-intro">Carefully selected {categoryLabels[category].toLowerCase()} for high-performance setups. Compare the details, find your fit, and make it yours.</p>
      <ShopCatalog products={items} />
    </div>
  );
}
