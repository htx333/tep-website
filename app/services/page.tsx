import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ComparisonTable from "@/components/ComparisonTable";
import { tiers } from "@/lib/content";

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
        </div>
      </section>

      {/* ── 計畫成果 + 下一步（借鑑服務詳情設計） ─────────── */}
      <section className="bg-mist px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Outcomes */}
          <div className="rounded-[20px] border border-line bg-white p-10">
            <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-blue">
              Outcomes
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy">計畫成果</h2>
            <div className="mt-6 flex flex-col gap-3.5">
              {[
                "由職涯定位、簡歷精修到面試實戰的完整整備",
                "導師親推與系統內推，直達核心招聘渠道",
                "專業資格賦能與實習保障，累積硬實力",
                "20年+ 銀行家師徒帶教，登上頂層賽道",
              ].map((o) => (
                <div key={o} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    className="mt-0.5 shrink-0"
                    fill="none"
                    stroke="#3E77A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm leading-[1.7] text-ink">{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next step */}
          <div className="flex flex-col rounded-[20px] bg-navy-deep p-10">
            <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-blue-soft">
              Next Step
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-white">
              下一步：預約專屬諮詢
            </h2>
            <p className="mt-4 flex-1 text-sm leading-[1.8] text-white/70">
              與顧問進行一對一深度對談，為您匹配最合適的服務計畫，規劃專屬的職涯路徑。
            </p>
            <div className="mt-7">
              <Link
                href="/contact"
                className="inline-block rounded-md bg-white px-7 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
              >
                立即預約諮詢
              </Link>
            </div>
          </div>
        </div>

        {/* closing line */}
        <p className="mx-auto mt-[72px] max-w-6xl text-center font-display text-[19px] font-semibold tracking-[0.08em] text-navy">
          <span className="text-gold">──</span>　機會不靠等待，而靠精準抵達。
          <span className="text-gold">──</span>
        </p>
      </section>
    </>
  );
}
