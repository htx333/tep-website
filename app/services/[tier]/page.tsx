import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlanSection from "@/components/PlanSection";
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

  const prev = tiers[index - 1];
  const next = tiers[index + 1];

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

      {/* 上一級／下一級導覽 */}
      <section className="border-t border-line bg-mist py-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          {prev ? (
            <Link
              href={`/services/${prev.id}`}
              className="text-sm text-ink-soft transition-colors hover:text-navy"
            >
              ← {prev.metal}・{prev.planEn} {prev.planName}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/contact"
            className="rounded-md bg-navy px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue"
          >
            預約諮詢此計畫
          </Link>
          {next ? (
            <Link
              href={`/services/${next.id}`}
              className="text-sm text-ink-soft transition-colors hover:text-navy"
            >
              {next.metal}・{next.planEn} {next.planName} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  );
}
