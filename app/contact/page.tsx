import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "聯繫我們 | TEP",
};

const infoRows = [
  { label: "電郵", value: contact.email },
  { label: "電話", value: contact.phone },
  { label: "WhatsApp", value: contact.whatsapp },
  { label: "地址", value: contact.address },
  { label: "辦公時間", value: contact.hours },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-mist to-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading eyebrow="Contact Us" title="聯繫我們" />
          <p className="mt-6 font-display text-xl font-semibold tracking-[0.12em] text-blue">
            {contact.echo}
          </p>
        </div>
      </section>

      <section className="bg-white pb-28">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          {/* 聯絡資訊 */}
          <div className="rounded-2xl border border-line bg-mist p-10">
            <h2 className="text-xl font-bold text-navy">聯絡資訊</h2>
            <dl className="mt-8 space-y-6">
              {infoRows.map((row) => (
                <div key={row.label} className="flex gap-6">
                  <dt className="w-20 shrink-0 text-sm font-semibold text-blue">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-ink-soft">
              以上資訊將於正式營運前更新。歡迎先透過表單留言，我們會盡快回覆。
            </p>
          </div>

          {/* 留言表單（前端示意，之後接後端／表單服務） */}
          <form className="rounded-2xl border border-line bg-white p-10 shadow-sm">
            <h2 className="text-xl font-bold text-navy">預約 1 對 1 諮詢</h2>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-ink">姓名</span>
                <input
                  type="text"
                  name="name"
                  placeholder="你的姓名"
                  className="mt-2 w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink">電郵</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink">留言</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="想了解哪個服務計畫？"
                  className="mt-2 w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue"
                />
              </label>
              <button
                type="button"
                className="w-full rounded-md bg-navy px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue"
              >
                送出（示意）
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
