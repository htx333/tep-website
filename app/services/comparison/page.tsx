import type { Metadata } from "next";
import ComparisonTable from "@/components/ComparisonTable";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "項目比對 | TEP",
  description: "一表看清 TEP 五大計畫的服務覆蓋範圍。",
};

export default function ServicesComparisonPage() {
  return (
    <section
      data-service-view="comparison"
      className="min-h-screen bg-navy-deep py-24"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
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
          各計畫細節，歡迎預約 1 對 1 諮詢了解。
        </p>
      </div>
    </section>
  );
}
