"use client";

import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { bookingTypes } from "@/lib/content";

const CALENDLY_URL =
  "https://calendly.com/cs-tepcareers/30min?primary_color=1f4d96";

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

      <div
        className="calendly-inline-widget mt-10 w-full overflow-hidden"
        data-url={CALENDLY_URL}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
