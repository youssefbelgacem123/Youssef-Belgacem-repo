import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, Mail, MessageCircle, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Support" };

const topics = [
  { icon: Headphones, title: "Talk to a real human", text: "Our friendly team can help you choose parts or figure out what went wrong. Email hello@bgstore.example." },
  { icon: Wrench, title: "Build advice", text: "Share your goals and budget. We can help check sockets, case fit, power needs, and cooling." },
  { icon: ShieldCheck, title: "Warranty & returns", text: "Every BG's Store pick comes with a 2-year store warranty. We keep the process clear and fair." },
  { icon: Truck, title: "Shipping", text: "Free delivery on orders over €100. Most in-stock items leave us within one or two business days." },
  { icon: MessageCircle, title: "PC assembly", text: "Choose professional assembly in the PC Builder. Our technicians assemble and test your selected parts." },
  { icon: Mail, title: "Get in touch", text: "Send a note to hello@bgstore.example or call +49 30 5550 0180, Monday to Friday." },
];

export default function SupportPage() {
  return (
    <div className="page-shell container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><span>Support</span></div>
      <p className="eyebrow">HERE WHEN YOU NEED US</p>
      <h1 className="page-title">Good tech. Good people.</h1>
      <p className="page-intro">From choosing the right GPU to a question about delivery, we&apos;re happy to help. BG&apos;s Store is a demo storefront; contact details are illustrative.</p>
      <div className="support-grid">{topics.map(({ icon: Icon, title, text }) => (
        <article className="support-card" key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></article>
      ))}</div>
      <div className="support-cta"><div><h2>Putting a build together?</h2><p>Our configurator keeps the key compatibility checks in view as you pick parts.</p></div><Link href="/builder"><Button>Open PC Builder</Button></Link></div>
    </div>
  );
}
