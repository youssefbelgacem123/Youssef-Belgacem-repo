import Link from "next/link";
import { Cpu, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="support">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand">
            <span className="brand-mark"><Cpu size={21} /></span>
            <span className="brand-word">BG&apos;S <span>STORE</span></span>
          </Link>
          <p>Great hardware. Straightforward advice. Ready for your next build.</p>
          <div className="footer-contact"><Mail size={15} /> hello@bgstore.example</div>
          <div className="footer-contact"><Phone size={15} /> +216 51 688 972</div>
          <div className="footer-contact"><MapPin size={15} /> Tunisia / Sousse</div>
        </div>
        <div className="footer-column">
          <h3>Shop</h3>
          <Link href="/shop/laptops">Laptops</Link>
          <Link href="/shop/cpu">Processors</Link>
          <Link href="/shop/gpu">Graphics cards</Link>
          <Link href="/shop">All products</Link>
        </div>
        <div className="footer-column">
          <h3>Build</h3>
          <Link href="/builder">PC configurator</Link>
          <Link href="/shop?deal=true">Latest deals</Link>
          <Link href="/support">Assembly service</Link>
          <Link href="/support">Compatibility help</Link>
        </div>
        <div className="footer-column">
          <h3>We&apos;re here</h3>
          <Link href="/support">Contact support</Link>
          <Link href="/support">Shipping & returns</Link>
          <Link href="/support">Warranty</Link>
          <Link href="/account">Your account</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 BG&apos;s Store. Demo storefront — sample data only.</span>
        <span>Built for curious minds & powerful machines.</span>
      </div>
    </footer>
  );
}
