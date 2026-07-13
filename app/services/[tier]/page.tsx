import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TierDetail from "@/components/services/TierDetail";
import { tiers } from "@/lib/content";

export function generateStaticParams() {
  return tiers.map((t) => ({ tier: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: tierId } = await params;
  const tier = tiers.find((t) => t.id === tierId);
  return {
    title: tier ? `${tier.planEn} ${tier.planName} | TEP` : "服務 | TEP",
  };
}

export default async function TierDetailPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: tierId } = await params;
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) notFound();

  return <TierDetail tierId={tierId} />;
}
