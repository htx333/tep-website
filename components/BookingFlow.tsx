"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { bookingTypes, contact } from "@/lib/content";

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type") ?? "consult";
  const bookingType =
    bookingTypes.find((type) => type.id === typeId) ?? bookingTypes[0];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap justify-center gap-3">
        {bookingTypes.map((type) => (
          <Link
            key={type.id}
            href={`/booking?type=${type.id}`}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              type.id === bookingType.id
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-ink-soft hover:border-navy hover:text-navy"
            }`}
          >
            {type.title}
          </Link>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
        {bookingType.desc}
      </p>

      <form
        data-contact-form="true"
        action={`mailto:${contact.email}`}
        method="post"
        encType="text/plain"
        className="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-mist/45 p-6 shadow-sm sm:p-10"
      >
        <input type="hidden" name="inquiryType" value={bookingType.id} />

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-navy">姓名</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="請輸入你的姓名"
              className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-navy">電話號碼</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              placeholder="例如：+852 9123 4567"
              className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-navy">聯絡電郵</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-blue"
        >
          以電郵傳送資料
          <span aria-hidden="true">→</span>
        </button>
        <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft">
          按下後會開啟你的電郵程式，並將以上資料寄送至 TEP。
        </p>
      </form>
    </div>
  );
}
