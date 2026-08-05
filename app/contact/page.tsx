import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { bookingTypes, contact, socialLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "聯繫我們 | TEP",
};

const infoRows = [
  { label: "地址", value: contact.address },
  { label: "電話", value: contact.phone },
  { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
  { label: "微信", value: contact.wechat },
  { label: "電郵", value: contact.email },
  { label: "網站", value: contact.website },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <path
        d="M24 6.5a17 17 0 0 0-14.7 25.5L7 41l9.2-2.4A17 17 0 1 0 24 6.5Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 15.8c.4-.8.9-.8 1.4-.8h1c.3 0 .7.1.9.7l1.5 3.6c.2.5.1.9-.2 1.3l-1.2 1.5c-.3.3-.2.7 0 1.1 1.4 2.6 3.5 4.7 6.1 6.1.4.2.8.3 1.1 0l1.8-2.1c.3-.4.8-.5 1.2-.3l3.5 1.7c.5.2.7.6.7 1.1-.1 1.8-.9 3.4-2.4 4.5-1.3.9-3 1.2-4.5.8-3.5-.9-6.8-2.8-9.4-5.4-2.4-2.4-4.2-5.3-5.2-8.5-.6-1.8-.3-3.8.7-5.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="currentColor" aria-hidden="true">
      <path d="M20.5 8C12.5 8 6 13.3 6 19.8c0 3.7 2.1 7 5.4 9.2l-1.3 4.2 4.9-2.4c1.7.5 3.6.8 5.5.8h.8a10.8 10.8 0 0 1-.3-2.5c0-6.6 6.3-12 14.3-12h.2C34 11.9 27.8 8 20.5 8Zm-5 7.2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
      <path d="M35.3 19.4C28.5 19.4 23 23.7 23 29s5.5 9.6 12.3 9.6c1.6 0 3.1-.2 4.5-.7l4.1 2-1.1-3.6A9 9 0 0 0 47.5 29c0-5.3-5.5-9.6-12.2-9.6Zm-4.1 7.2a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm8.3 0a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z" />
    </svg>
  );
}

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
                  <dd className="min-w-0 text-sm text-ink">
                    {row.href ? (
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:text-navy"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-ink-soft">
              以上資訊將於正式營運前更新。
            </p>
          </div>

          {/* 三大聯繫入口 */}
          <div className="rounded-2xl border border-line bg-white p-10 shadow-sm">
            <h2 className="text-xl font-bold text-navy">聯絡 TEP</h2>
            <p className="mt-2 text-sm text-ink-soft">
              選擇你的聯絡目的，留下基本資料讓 TEP 團隊跟進。
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
                    留下聯絡資料
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

            <div className="mt-10 border-t border-line pt-8 text-center">
              <p className="text-sm text-ink-soft">
                不使用電郵？你也可以直接聯絡我們
              </p>
              <div className="mt-5 flex items-center justify-center gap-4">
                <a
                  href={socialLinks.whatsapp}
                  data-contact-social="whatsapp"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="透過 WhatsApp 加入 TEP Careers"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/35 text-[#178f47] transition-all hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-lg"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href={socialLinks.wechat}
                  data-contact-social="wechat"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="透過微信加入 TEP Careers"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-[#07C160]/35 text-[#078d49] transition-all hover:-translate-y-1 hover:border-[#07C160] hover:bg-[#07C160] hover:text-white hover:shadow-lg"
                >
                  <WeChatIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
