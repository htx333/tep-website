import type { Metadata } from "next";
import ServicePlansFlowchart from "@/components/ServicePlansFlowchart";

export const metadata: Metadata = {
  title: "輔導遞升系統 | TEP",
  description: "TEP 輔導服務・遞升路徑 — 五級計畫，逐站抵達。",
};

export default function SystemPage() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1400px]">
        <ServicePlansFlowchart />
        <p className="mt-6 text-center text-xs text-ink-faint">
          將游標移至各進階計畫的「計畫內容」標題，即可展開該級已含的前級服務。
        </p>
      </div>
    </section>
  );
}
