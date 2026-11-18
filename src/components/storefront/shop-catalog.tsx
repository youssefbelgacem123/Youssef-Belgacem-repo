"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/storefront/product-card";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  initialQuery?: string;
};

export function ShopCatalog({ products, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState("all");
  const [availability, setAvailability] = useState(false);
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState("all");
  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))).sort(),
    [products],
  );
  const visibleProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products
      .filter((product) => brand === "all" || product.brand === brand)
      .filter((product) => !availability || product.stock > 0)
      .filter((product) => maxPrice === "all" || product.price <= Number(maxPrice))
      .filter(
        (product) =>
          !search ||
          `${product.name} ${product.brand} ${product.summary}`
            .toLowerCase()
            .includes(search),
      )
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, brand, availability, maxPrice, sort, query]);

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-filters">
          <label className="catalog-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this collection"
              aria-label="Search this collection"
            />
          </label>
          <select
            className="select-input"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            aria-label="Filter by brand"
          >
            <option value="all">All brands</option>
            {brands.map((name) => <option key={name}>{name}</option>)}
          </select>
          <select
            className="select-input"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            aria-label="Filter by maximum price"
          >
            <option value="all">Any price</option>
            <option value="250">Up to €250</option>
            <option value="500">Up to €500</option>
            <option value="1000">Up to €1,000</option>
            <option value="1500">Up to €1,500</option>
          </select>
          <label className="availability-toggle">
            <input
              type="checkbox"
              checked={availability}
              onChange={(event) => setAvailability(event.target.checked)}
            />
            In stock
          </label>
        </div>
        <div className="catalog-sort">
          <span className="catalog-count">{visibleProducts.length} products</span>
          <select
            className="select-input"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
      <div className="catalog-grid">
        {visibleProducts.length ? (
          visibleProducts.map((product) => <ProductCard product={product} key={product.id} />)
        ) : (
          <div className="empty-state">
            <h2>No matches just yet</h2>
            <p>Try a different search or clear one of your filters.</p>
            <button className="text-link"             onClick={() => { setQuery(""); setBrand("all"); setAvailability(false); setMaxPrice("all"); }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
