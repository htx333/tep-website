import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlanSection from "@/components/PlanSection";
import PlanNextStep from "@/components/PlanNextStep";
import { planDetails, tiers } from "@/lib/content";

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
  const index = tiers.findIndex((t) => t.id === tierId);
  const tier = tiers[index];
  const detail = planDetails.find((d) => d.tierId === tierId);
  if (!tier || !detail) notFound();

  return (
    <>
      {/* 麵包屑 */}
      <div className="border-b border-line bg-mist/60">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-4 text-sm text-ink-soft sm:px-6">
          <Link href="/services" className="transition-colors hover:text-navy">
            服務
          </Link>
          <span>/</span>
          <span className="font-medium text-navy">
            {tier.metal}・{tier.planEn} {tier.planName}
          </span>
        </div>
      </div>

      <PlanSection detail={detail} tier={tier} index={0} />

      {/* 計畫成果 + 下一步 */}
      <PlanNextStep tierId={tierId} />
    </>
  );
}
