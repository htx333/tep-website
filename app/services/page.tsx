import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PlanSection from "@/components/PlanSection";
import ComparisonTable from "@/components/ComparisonTable";
import { planDetails, tiers } from "@/lib/content";

export const metadata: Metadata = {
  title: "服務 | TEP",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── 頁首 ───────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-mist to-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Programmes"
            title="五大服務計畫"
            sub="由青銅到鑽石，每一級在前一級之上疊加更稀缺的資源與更深度的帶教。"
          />
          {/* 快速跳轉 */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {tiers.map((t) => (
              <Link
                key={t.id}
                href={`#${t.id}`}
                className="rounded-full border border-line bg-white px-5 py-2 text-sm text-ink-soft transition-colors hover:border-blue hover:text-navy"
              >
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: `var(--${t.metalColor})` }}
                />
                {t.metal}・{t.planEn}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 五大計畫深度介紹 ───────────────────────────── */}
      {planDetails.map((detail, i) => {
        const tier = tiers.find((t) => t.id === detail.tierId)!;
        return (
          <PlanSection key={detail.tierId} detail={detail} tier={tier} index={i} />
        );
      })}

      {/* ── 項目比對 ───────────────────────────────────── */}
      <section className="bg-navy-deep py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            light
            eyebrow="Comparison"
            title="項目比對"
            sub="一表看清五大計畫的服務覆蓋範圍。"
          />
          <div className="mt-14">
            <ComparisonTable />
          </div>
          <p className="mt-6 text-center text-xs text-white/50">
            各計畫定價與細節，歡迎預約 1 對 1 諮詢了解。
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-white px-8 py-3 text-sm font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
            >
              預約諮詢
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
