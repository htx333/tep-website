import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { tiers } from "@/lib/content";

export const metadata: Metadata = {
  title: "服務 | TEP",
};

export default function ServicesPage() {
  return (
    <div data-service-view="overview">
      {/* ── 頁首 ───────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-mist to-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Programmes"
            title="五大服務計畫"
            sub="由青銅到鑽石，每一級在前一級之上疊加更稀缺的資源與更深度的帶教。"
          />
        </div>
      </section>

      {/* ── 五大計畫方框（Julius Baer 式） ──────────────── */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Link
                key={tier.id}
                href={`/services/${tier.id}`}
                className="group relative flex flex-col border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-lg"
              >
                {/* 層級色頂線 */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ backgroundColor: `var(--${tier.metalColor})` }}
                />
                <div
                  className="text-xs font-semibold tracking-[0.35em]"
                  style={{ color: `var(--${tier.metalColor})` }}
                >
                  {tier.metal}
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold text-navy">
                  {tier.planEn}
                </h2>
                <div className="mt-1 text-lg font-medium text-ink">
                  {tier.planName}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  {tier.baseLabel === "疊加內容" ? "疊加：" : ""}
                  {tier.items.join("、")}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-blue">
                  瞭解更多
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            ))}

            {/* 第六格：諮詢引導（補齊版面） */}
            <div className="flex flex-col justify-center border border-line bg-navy-deep p-8 text-white">
              <h2 className="font-display text-2xl font-semibold">
                不確定哪個計畫適合你？
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                預約 1 對 1 諮詢，由顧問為你評估背景與賽道定位。
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block w-fit rounded-md bg-white px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
              >
                預約諮詢
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
