"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Cpu,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { componentCategories } from "@/lib/products";
import { useCart } from "@/components/storefront/cart-provider";

export function SiteHeader() {
  const router = useRouter();
  const { itemCount } = useCart();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/shop?query=${encodeURIComponent(value)}` : "/shop");
    setMobileOpen(false);
    setMobileSearchOpen(false);
  }

  function openMobileSearch() {
    if (window.innerWidth <= 760) {
      setMobileSearchOpen(true);
      window.setTimeout(() => searchInput.current?.focus(), 0);
    }
  }

  const links = (
    <>
      <Link href="/shop/laptops" onClick={() => setMobileOpen(false)}>Laptops</Link>
      <div className="nav-dropdown group">
        <Link href="/shop/cpu" className="inline-flex items-center gap-1">
          Components <ChevronDown size={14} />
        </Link>
        <div className="nav-dropdown-menu">
          {componentCategories.map((item) => (
            <Link
              href={item.href}
              key={item.category}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <Link href="/builder" onClick={() => setMobileOpen(false)}>PC Builder</Link>
      <Link href="/shop?deal=true" onClick={() => setMobileOpen(false)}>Deals</Link>
      <Link href="/support" onClick={() => setMobileOpen(false)}>Support</Link>
    </>
  );

  return (
    <header className="site-header">
      <div className="announcement">
        <span className="announcement-dot" />
        Free delivery on orders over €100
      </div>
      <div className="header-main container">
        <button
          className="icon-button mobile-menu-button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/" className="brand" aria-label="BG's Store home">
          <span className="brand-mark"><Cpu size={21} strokeWidth={2.2} /></span>
          <span className="brand-word">BG&apos;S <span>STORE</span></span>
        </Link>
        <form
          className={`search-form ${mobileSearchOpen ? "search-open" : ""}`}
          onSubmit={search}
          onClick={openMobileSearch}
          role="search"
        >
          <Search size={17} />
          <input
            ref={searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search products"
            placeholder="Search laptops, components..."
          />
          <kbd>⌘ K</kbd>
        </form>
        <div className="header-actions">
          <Link href="/account" className="header-action" aria-label="Account">
            <UserRound size={20} /><span>Account</span>
          </Link>
          <Link href="/cart" className="header-action cart-action" aria-label={`Cart, ${itemCount} items`}>
            <span className="cart-icon-wrap"><ShoppingBag size={20} />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </span>
            <span>Cart</span>
          </Link>
        </div>
      </div>
      <nav className="main-nav">
        <div className="container nav-links">{links}</div>
      </nav>
      {mobileOpen && <nav className="mobile-nav">{links}</nav>}
    </header>
  );
}
