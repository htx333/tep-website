"use client";

import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import PartnerLogos from "@/components/PartnerLogos";
import { background, mentors } from "@/lib/content";

const SECTION_IDS = ["background", "mentors", "targets"] as const;

type TabId = (typeof SECTION_IDS)[number];

export default function AboutTabs() {
  // 顯示哪一分區由 ?section= 查詢參數決定；切換由導覽列「關於我們」下拉選單觸發。
  // App Router 會即時反映查詢參數變化，故同頁切換也能重新渲染。
  const param = useSearchParams().get("section") ?? "";
  const active: TabId = (SECTION_IDS as readonly string[]).includes(param)
    ? (param as TabId)
    : "background";

  return (
    <div>
      {/* ── TEP 背景 ─────────────────────────────────── */}
      {active === "background" && (
        <section className="bg-gradient-to-b from-mist to-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeading eyebrow="About TEP" title="TEP 背景" />
            <p className="mt-10 text-center font-display text-2xl font-semibold leading-relaxed text-blue">
              「{background.slogan}」
            </p>
            <div className="mt-12 space-y-8">
              {background.sections.map((s) => (
                <div key={s.heading} className="border-l-4 border-blue/70 pl-5">
                  <h3 className="font-display text-lg font-bold text-navy">
                    {s.heading}
                  </h3>
                  <p className="mt-2 text-base leading-loose text-ink-soft">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-2xl bg-mist px-8 py-8">
              <p className="text-lg leading-relaxed text-navy">
                {background.closing}
              </p>
              <p className="mt-4 text-right font-display text-lg italic text-blue">
                —— {background.signedBy}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 導師團隊 ─────────────────────────────────── */}
      {active === "mentors" && (
        <section className="bg-mist py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Mentors"
              title="導師團隊"
              sub="香港行內頂級在職導師，全程一對一跟進。"
            />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {mentors.map((m, i) => (
                <TeamCard key={i} {...m} />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-ink-faint">
              首席培訓師領銜，導師陣容持續擴充中。
            </p>
          </div>
        </section>
      )}

      {/* ── 目標公司 ─────────────────────────────────── */}
      {active === "targets" && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Target Companies"
              title="目標公司"
              sub="導師與內推網絡覆蓋全球頂級金融機構。"
            />
            <div className="mt-14">
              <PartnerLogos />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
