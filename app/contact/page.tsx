import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { bookingTypes, contact } from "@/lib/content";

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
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[380px_1fr]">
          {/* 聯絡資訊（保留） */}
          <div className="self-start rounded-2xl border border-line bg-mist p-10">
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
              以上資訊將於正式營運前更新。
            </p>
          </div>

          {/* 預約諮詢：三大入口方框 */}
          <div className="rounded-2xl border border-line bg-white p-10 shadow-sm">
            <h2 className="text-xl font-bold text-navy">預約諮詢</h2>
            <p className="mt-2 text-sm text-ink-soft">
              選擇你的身份，預約與 TEP 團隊的 1 對 1 面談。
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {bookingTypes.map((bt) => (
                <Link
                  key={bt.id}
                  href={`/booking?type=${bt.id}`}
                  className="group relative flex min-h-60 flex-col justify-between gap-4 overflow-hidden border border-line bg-mist/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-navy hover:bg-navy hover:shadow-xl"
                >
                  <div>
                    <div className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-blue transition-colors duration-300 group-hover:text-blue-soft">
                      {bt.subtitle}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-navy transition-colors duration-300 group-hover:text-white">
                      {bt.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-ink-soft opacity-90 transition-colors duration-300 group-hover:text-white/75">
                      {bt.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-navy transition-colors duration-300 group-hover:text-white">
                    立即預約
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
                  {/* 底部層級色線（hover 時浮現） */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-blue-soft transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-ink-soft">
              預約確認通知將發送至你填寫的電郵。如需即時協助，請直接透過左側聯絡方式與我們聯繫。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
