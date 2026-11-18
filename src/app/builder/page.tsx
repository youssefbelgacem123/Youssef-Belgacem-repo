import type { Metadata } from "next";
import { BuilderConfigurator } from "@/components/storefront/builder-configurator";

export const metadata: Metadata = { title: "PC Builder" };

export default async function BuilderPage({
  searchParams,
}: {
  searchParams?: Promise<{ preset?: string }>;
}) {
  const query = await searchParams;
  return (
    <div className="page-shell container">
      <BuilderConfigurator preset={query?.preset} />
    </div>
  );
}
