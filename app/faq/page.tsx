import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ | TEP",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-mist to-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="常見問題"
            sub="關於 TEP 服務，你最想知道的答案。"
          />
        </div>
      </section>

      {/* WST 風格：編號直列，粗體問題＋縮排答案 */}
      <section className="bg-white pb-28">
        <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6">
          {faq.map((item, i) => (
            <article
              key={item.q}
              tabIndex={0}
              className="group flex cursor-pointer gap-6 border-b border-line pb-10 outline-none last:border-b-0"
            >
              <div className="font-display text-4xl font-semibold text-blue-soft/70 transition-colors duration-300 group-hover:text-blue group-focus-within:text-blue">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold leading-relaxed text-navy transition-colors duration-300 group-hover:text-blue group-focus-within:text-blue">
                  「{item.q}」
                </h2>
                {/* 答案：游標移至問題時展開 */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-4 whitespace-pre-line text-base leading-loose text-ink-soft opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-2xl bg-mist p-10 text-center">
            <p className="text-ink">還有其他問題？我們樂意為你解答。</p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-md bg-navy px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue"
            >
              聯繫我們
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
