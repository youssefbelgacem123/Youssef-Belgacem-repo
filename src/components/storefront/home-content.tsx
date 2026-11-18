"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  Cpu,
  Fan,
  HardDrive,
  Headphones,
  MemoryStick,
  Monitor,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/storefront/product-card";
import {
  featuredBuilds,
  formatPrice,
  products,
} from "@/lib/products";

const categories = [
  { title: "Graphics cards", category: "gpu", icon: Monitor, color: "blue", count: "Next-level frames" },
  { title: "Processors", category: "cpu", icon: Cpu, color: "violet", count: "Power every pixel" },
  { title: "Memory", category: "ram", icon: MemoryStick, color: "orange", count: "Speed meets capacity" },
  { title: "Storage", category: "storage", icon: HardDrive, color: "green", count: "Room to create" },
  { title: "Cooling", category: "cooling", icon: Fan, color: "cyan", count: "Keep it chilled" },
  { title: "Cases", category: "case", icon: Box, color: "pink", count: "Make it yours" },
] as const;

const trustItems = [
  { icon: ShieldCheck, title: "2-year warranty", text: "Real support from real hardware people." },
  { icon: Truck, title: "Fast, free shipping", text: "Free delivery on orders over €100." },
  { icon: Headphones, title: "Expert advice", text: "Get the right parts, first time." },
  { icon: Wrench, title: "Built by experts", text: "Professional assembly, if you want it." },
];

export function HomeContent() {
  const reducedMotion = useReducedMotion();
  const laptops = products.filter((product) => product.category === "laptops").slice(0, 4);
  const popularComponents = [
    "gpu-rtx-4070-super",
    "cpu-ryzen-7800x3d",
    "ram-vengeance-32",
    "ssd-990-pro-2tb",
  ].map((id) => products.find((product) => product.id === id)).filter((product) => product !== undefined);
  const deals = products.filter((product) => product.oldPrice).slice(0, 3);

  return (
    <>
      <section className="hero-section">
        <div className="hero-grid-pattern" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="container hero-inner">
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="hero-pill"><Sparkles size={13} /> YOUR NEXT BUILD STARTS HERE</Badge>
            <h1>Power your<br /><span>next big thing.</span></h1>
            <p className="hero-description">
              Handpicked laptops and components for people who care about what&apos;s under the hood.
              Great gear, honest advice, zero guesswork.
            </p>
            <div className="hero-actions">
              <Link href="/builder"><Button size="lg">Build your PC <ArrowRight size={17} /></Button></Link>
              <Link href="/shop/laptops"><Button variant="outline" size="lg">Shop laptops <ArrowUpRight size={17} /></Button></Link>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div>
              <div><strong>Built for enthusiasts</strong><small>5,000+ happy setups and counting</small></div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div className="hero-visual-orbit orbit-one" />
            <div className="hero-visual-orbit orbit-two" />
            <div className="hero-image-frame">
              <Image
                src="/products/laptop-2.jpg"
                alt="Powerful laptop ready for work and play"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 52vw"
                className="hero-image"
              />
              <div className="hero-image-shade" />
            </div>
            <div className="hero-float-card hero-float-top">
              <span className="float-icon"><Zap size={17} /></span>
              <div><small>PERFORMANCE</small><strong>Uncompromised.</strong></div>
            </div>
            <div className="hero-float-card hero-float-bottom">
              <span className="stock-pulse" />
              <div><small>THE BG&apos;S STORE PROMISE</small><strong>Ready to ship</strong></div>
              <ArrowUpRight size={17} />
            </div>
            <span className="hero-visual-caption">DESIGNED FOR WHAT&apos;S NEXT <ArrowDownRight size={14} /></span>
          </motion.div>
        </div>
        <div className="container hero-bottom-line">
          <span><span className="line-dot" /> Independent tech shop</span>
          <span>Performance, without the noise.</span>
          <Link href="/shop">Explore all gear <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <div className="trust-item" key={title}>
              <span className="trust-icon"><Icon size={20} /></span>
              <div><strong>{title}</strong><span>{text}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container category-section">
        <div className="section-heading">
          <div><p className="eyebrow">PICK YOUR PIECES</p><h2>Find your next upgrade.</h2></div>
          <Link href="/shop" className="text-link">Browse everything <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          {categories.map(({ title, category, icon: Icon, color, count }, index) => (
            <motion.div
              key={category}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.38, delay: index * 0.04 }}
            >
              <Link href={`/shop/${category}`} className={`category-tile category-${color}`}>
                <span className="category-icon"><Icon size={21} /></span>
                <div><strong>{title}</strong><span>{count}</span></div>
                <ArrowUpRight size={17} className="category-arrow" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div><p className="eyebrow">TAKE IT ANYWHERE</p><h2>Made to move. Built to perform.</h2><p className="section-subtitle">A few of our favourite machines, ready for whatever you throw at them.</p></div>
          <Link href="/shop/laptops" className="text-link">All laptops <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid">
          {laptops.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div><p className="eyebrow">THE GOOD STUFF UNDER THE HOOD</p><h2>Popular components.</h2><p className="section-subtitle">Solid choices for a fast, reliable, no-compromise setup.</p></div>
          <Link href="/shop/cpu" className="text-link">Shop components <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid">
          {popularComponents.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="section container">
        <div className="builder-banner">
          <div className="builder-banner-copy">
            <Badge variant="subtle"><Cpu size={13} /> THE BG&apos;S STORE PC BUILDER</Badge>
            <h2>Your build.<br /><span>Your rules.</span></h2>
            <p>Pick each part, see the total update live, and get a heads-up if anything doesn&apos;t fit. No spreadsheets required.</p>
            <Link href="/builder"><Button variant="light" size="lg">Start building <ArrowRight size={17} /></Button></Link>
            <div className="builder-banner-foot"><BadgeCheck size={16} /> Compatibility checks included</div>
          </div>
          <div className="builder-banner-art">
            <div className="banner-ring banner-ring-one" />
            <div className="banner-ring banner-ring-two" />
            <Image
              src="/products/pc-build.jpg"
              alt="Custom PC components inside a desktop case"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="builder-art-image"
            />
            <div className="builder-art-label"><span><Cpu size={16} /></span><div><small>BUILT AROUND YOU</small><strong>Every part, your call.</strong></div></div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div><p className="eyebrow">GOOD GEAR. BETTER PRICES.</p><h2>Deals worth a closer look.</h2></div>
          <Link href="/shop?deal=true" className="text-link">See all deals <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid">
          {deals.map((product) => <ProductCard key={product.id} product={product} />)}
          <Card className="deal-cta-card">
            <div className="deal-graphic"><span>CF</span><div /></div>
            <Badge variant="sale">LIMITED-TIME PICKS</Badge>
            <h3>Good gear.<br />Less spend.</h3>
            <p>Smart upgrades, special prices. No weird catches.</p>
            <Link href="/shop?deal=true" className="text-link">Find your deal <ArrowRight size={15} /></Link>
          </Card>
        </div>
      </section>

      <section className="section container builds-section">
        <div className="section-heading">
          <div><p className="eyebrow">A LITTLE INSPIRATION</p><h2>Builds with a point of view.</h2><p className="section-subtitle">Start from a setup we love, then make it yours.</p></div>
          <Link href="/builder" className="text-link">Make your own <ArrowRight size={16} /></Link>
        </div>
        <div className="build-grid">
          {featuredBuilds.map((build, index) => (
            <Link href={`/builder?preset=${build.preset}`} className="build-card" key={build.name}>
              <div className="build-card-image">
                <Image src={build.image} alt={build.name} fill sizes="(max-width: 768px) 90vw, 33vw" />
                <span className="build-index">0{index + 1}</span>
                <span className="build-open"><ArrowUpRight size={18} /></span>
              </div>
              <div className="build-card-copy">
                <div><span className="eyebrow">BG&apos;S STORE BUILD</span><strong>{build.name}</strong><p>{build.description}</p></div>
                <span className="build-price">From {formatPrice(build.price)}</span>
              </div>
              <div className="build-tags">{build.tags.map((tag) => <Badge key={tag} variant="subtle">{tag}</Badge>)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container newsletter-inner">
          <div><p className="eyebrow">NO SPAM. JUST SIGNAL.</p><h2>Stay in the loop.</h2><p>New gear, honest guides, and the occasional very good deal.</p></div>
          <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
            <input aria-label="Email address" type="email" placeholder="you@example.com" required />
            <Button type="submit">Keep me posted <ArrowRight size={16} /></Button>
            <span>By subscribing, you agree to our demo privacy policy.</span>
          </form>
        </div>
      </section>
    </>
  );
}
