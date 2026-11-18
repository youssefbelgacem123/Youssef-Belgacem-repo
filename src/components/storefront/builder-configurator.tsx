"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronRight, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/storefront/cart-provider";
import {
  categoryLabels,
  categoryOrder,
  formatPrice,
  products,
  type Category,
  type Product,
} from "@/lib/products";

const starterSelection: Record<Category, string> = {
  laptops: "",
  cpu: "cpu-ryzen-7800x3d",
  motherboard: "mb-b650-tomahawk",
  ram: "ram-vengeance-32",
  gpu: "gpu-rtx-4070-super",
  storage: "ssd-990-pro-2tb",
  psu: "psu-rm850e",
  case: "case-north",
  cooling: "cooler-peerless-assassin",
};

const presetSelections: Record<string, Record<Category, string>> = {
  starter: starterSelection,
  creator: {
    ...starterSelection,
    cpu: "cpu-ryzen-9700x",
    ram: "ram-dominator-64",
    gpu: "gpu-rtx-4080-super",
    storage: "ssd-firecuda-4tb",
    psu: "psu-bequiet-1000",
    cooling: "cooler-kraken-360",
  },
  compact: {
    ...starterSelection,
    cpu: "cpu-ryzen-7600",
    motherboard: "mb-b650m-pro",
    ram: "ram-flare-32",
    gpu: "gpu-rx-7800-xt",
    storage: "ssd-p3-plus-1tb",
    psu: "psu-focus-750",
    case: "case-pop-mini",
    cooling: "cooler-peerless-assassin",
  },
};

const categoryDescriptions: Record<string, string> = {
  cpu: "The brain of your build",
  motherboard: "Your parts' home base",
  ram: "Fast multitasking memory",
  gpu: "Frames, renders, and AI",
  storage: "Room for all the good stuff",
  psu: "Clean, reliable power",
  case: "The look and airflow",
  cooling: "Keep things running cool",
};

const categoryNumbers: Record<string, string> = {
  cpu: "01", motherboard: "02", ram: "03", gpu: "04",
  storage: "05", psu: "06", case: "07", cooling: "08",
};

function findPart(id: string) {
  return products.find((product) => product.id === id);
}

export function BuilderConfigurator({ preset = "starter" }: { preset?: string }) {
  const { addItem } = useCart();
  const [selection, setSelection] = useState(
    () => presetSelections[preset] ?? starterSelection,
  );
  const [assembly, setAssembly] = useState(false);
  const [added, setAdded] = useState(false);

  const selected = useMemo(() => {
    return Object.fromEntries(
      categoryOrder.map((category) => [category, findPart(selection[category])]),
    ) as Partial<Record<Category, Product>>;
  }, [selection]);
  const chosen = categoryOrder.map((category) => selected[category]).filter((item): item is Product => Boolean(item));
  const hardwareTotal = chosen.reduce((sum, item) => sum + item.price, 0);
  const total = hardwareTotal + (assembly ? 149 : 0);
  const cpu = selected.cpu;
  const board = selected.motherboard;
  const gpu = selected.gpu;
  const psu = selected.psu;
  const pcCase = selected.case;
  const warnings: string[] = [];

  if (cpu?.socket && board?.socket && cpu.socket !== board.socket) {
    warnings.push(`Socket mismatch: ${cpu.socket} CPU does not fit a ${board.socket} motherboard.`);
  }
  if (board?.formFactor && pcCase?.supportedFormFactors && !pcCase.supportedFormFactors.includes(board.formFactor)) {
    warnings.push(`${pcCase.name} does not support ${board.formFactor} motherboards.`);
  }
  const estimatedDraw =
    (cpu?.powerDraw ?? 0) +
    (gpu?.powerDraw ?? 0) +
    150;
  const recommendedWattage = Math.ceil((estimatedDraw * 1.25) / 50) * 50;
  if (psu?.wattage && psu.wattage < recommendedWattage) {
    warnings.push(`Estimated draw is ${estimatedDraw}W; choose at least a ${recommendedWattage}W power supply.`);
  }

  function updateSelection(category: Category, id: string) {
    setSelection((current) => ({ ...current, [category]: id }));
    setAdded(false);
  }

  function addBuild() {
    if (chosen.length !== categoryOrder.length || warnings.length > 0) return;
    const parts = categoryOrder.map((category) => selected[category]).filter((item): item is Product => Boolean(item));
    addItem({
      id: `build-${Date.now()}`,
      kind: "build",
      name: "Your custom BG's Store PC",
      price: total,
      image: selected.case?.image ?? selected.gpu?.image ?? "",
      specs: [
        ...parts.map((part) => part.name),
        ...(assembly ? ["Professional assembly"] : []),
      ],
    });
    setAdded(true);
  }

  return (
    <>
      <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13} /><span>PC Builder</span></div>
      <div className="builder-heading">
        <div><p className="eyebrow">YOUR BUILD, YOUR CALL</p><h1 className="page-title">Build your PC.</h1><p className="page-intro">Choose the parts that fit your needs. We&apos;ll keep an eye on socket, case, and power compatibility as you go.</p></div>
        <div className="builder-heading-note"><ShieldCheck size={17} /> Compatibility checked as you build</div>
      </div>
      <div className="builder-layout">
        <div className="builder-steps">
          {categoryOrder.map((category) => {
            const options = products.filter((product) => product.category === category);
            const part = selected[category];
            return (
              <div className="builder-step" key={category}>
                <span className="step-number">{categoryNumbers[category]}</span>
                <div className="builder-step-main">
                  <label className="builder-step-label" htmlFor={`builder-${category}`}>
                    {categoryLabels[category]} <span>{categoryDescriptions[category]}</span>
                  </label>
                  <select
                    className="builder-select"
                    id={`builder-${category}`}
                    value={selection[category]}
                    onChange={(event) => updateSelection(category, event.target.value)}
                  >
                    <option value="">Choose {categoryLabels[category].toLowerCase()}...</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name} — {formatPrice(option.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="builder-selected-price">{part ? formatPrice(part.price) : "—"}</span>
              </div>
            );
          })}
        </div>

        <aside className="builder-summary">
          <div className="builder-summary-title"><div><p className="eyebrow">LIVE CONFIGURATION</p><h2>Your build</h2></div><Cpu size={21} /></div>
          <p className="builder-summary-subtitle">{chosen.length} of 8 components selected</p>
          {chosen.length > 0 && selected.case && (
            <div className="builder-preview">
              <Image src={selected.case.image} alt="Selected PC case" fill sizes="280px" />
              <span><CheckCircle2 size={13} /> {selected.case.name}</span>
            </div>
          )}
          <div className="builder-part-list">
            {categoryOrder.map((category) => (
              <div className="builder-part-row" key={category}>
                <span>{categoryLabels[category]}</span>
                <strong>{selected[category]?.name ?? "Not selected"}</strong>
              </div>
            ))}
          </div>
          <div className="builder-power"><span>Estimated system draw</span><strong>{estimatedDraw}W <small> · {recommendedWattage}W PSU recommended</small></strong></div>
          <div className={`compatibility-box ${warnings.length ? "warning" : ""}`}>
            <p className="compatibility-title">{warnings.length ? <><AlertTriangle size={14} /> Check your compatibility</> : <><CheckCircle2 size={14} /> Looking good</>}</p>
            {warnings.length ? (
              <ul className="compatibility-list">{warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
            ) : (
              <p className="compatibility-copy">Your selected CPU, motherboard, case, and power supply look compatible.</p>
            )}
          </div>
          <label className="assembly-option">
            <input type="checkbox" checked={assembly} onChange={(event) => setAssembly(event.target.checked)} />
            <span><strong>Assemble it for me</strong><br />Our technicians build and test your PC. <b>+ €149</b></span>
          </label>
          <div className="builder-total"><span>Build total</span><strong>{formatPrice(total)}</strong></div>
          <Button size="lg" onClick={addBuild} disabled={chosen.length !== categoryOrder.length || warnings.length > 0}>
            {added ? <><CheckCircle2 size={16} /> Added to cart</> : <>Add complete build <ChevronRight size={16} /></>}
          </Button>
          <p className="builder-note">Demo configurator — compatibility checks are estimates. Always verify exact product clearances before purchase.</p>
        </aside>
      </div>
    </>
  );
}
