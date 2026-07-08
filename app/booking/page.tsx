import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "預約諮詢 | TEP",
};

export default function BookingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-mist to-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Booking"
            title="預約諮詢"
            sub="三步完成預約：選擇日期、挑選時段、留下聯絡資料。"
          />
        </div>
      </section>
      <section className="bg-white pb-28">
        <div className="px-4 sm:px-6">
          <Suspense fallback={null}>
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </>
  );
}
