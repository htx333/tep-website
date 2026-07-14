import type { Metadata } from "next";
import ServicePlansFlowchart from "@/components/ServicePlansFlowchart";

export const metadata: Metadata = {
  title: "輔導遞升系統 | TEP",
  description: "TEP 輔導服務・遞升路徑 — 五級計畫，逐站抵達。",
};

export default function SystemPage() {
  return (
    <section
      className="min-h-screen px-4 py-16 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, #dde7f2 0%, #e7eef5 45%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        <ServicePlansFlowchart />
        <p className="mt-4 text-center text-xs text-ink-faint">
          將游標移至各進階計畫的「計畫內容」標題，即可展開該級已含的前級服務。
        </p>
      </div>
    </section>
  );
}
