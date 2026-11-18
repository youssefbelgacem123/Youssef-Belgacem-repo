import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Your account" };

export default function AccountPage() {
  return (
    <div className="page-shell container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><span>Account</span></div>
      <div className="content-card account-panel">
        <span className="brand-mark"><UserRound size={20} /></span>
        <p className="eyebrow">BG&apos;S STORE ACCOUNT</p>
        <h1 className="page-title">Your setup, all in one place.</h1>
        <p>Accounts and order history aren&apos;t connected in this demo yet. For now, you can browse the store or start planning a custom build.</p>
        <Link href="/builder"><Button><Cpu size={16} /> Start a build</Button></Link>
      </div>
    </div>
  );
}
