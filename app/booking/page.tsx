import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "聯絡資料 | TEP",
};

export default function BookingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-mist to-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Contact Form"
            title="留下聯絡資料"
            sub="填寫基本資料後，TEP 團隊將按你的聯絡目的跟進。"
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
