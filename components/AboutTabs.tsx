"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import PartnerLogos from "@/components/PartnerLogos";
import { background, founder, mentors } from "@/lib/content";

const SECTION_IDS = ["background", "founder", "mentors", "targets"] as const;

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
            <div className="mt-10 space-y-6 text-base leading-loose text-ink">
              {background.paragraphs.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
            <blockquote className="my-12 border-l-4 border-blue bg-mist px-8 py-6">
              <p className="text-lg leading-relaxed text-navy">
                「{background.quote}」
              </p>
              <footer className="mt-3 text-sm text-ink-soft">
                —— {background.quoteBy}
              </footer>
            </blockquote>
            <div className="space-y-6 text-base leading-loose text-ink">
              {background.paragraphsAfterQuote.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 創始人 ───────────────────────────────────── */}
      {active === "founder" && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Founder"
              title="創始人"
              sub={founder.tagline}
            />
            <div className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr]">
              <div className="flex flex-col items-center self-start rounded-2xl border border-line bg-mist p-10 text-center">
                <Image
                  src="/founder.png"
                  alt={`${founder.name} ${founder.nameEn}`}
                  width={144}
                  height={144}
                  className="h-36 w-36 rounded-full object-cover"
                  priority
                />
                <h3 className="mt-6 text-xl font-bold text-navy">
                  {founder.name}
                  <span className="mt-1 block font-display text-lg font-medium">
                    {founder.nameEn}
                  </span>
                </h3>
                <div className="mt-2 text-sm text-blue">{founder.title}</div>
                <p className="mt-6 border-t border-line pt-6 text-sm italic leading-relaxed text-ink-soft">
                  「{founder.quote}」
                </p>
              </div>

              <div className="space-y-8">
                {founder.chapters.map((ch, i) => (
                  <div key={ch.title} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold leading-none text-white">
                        {i + 1}
                      </div>
                      {i < founder.chapters.length - 1 && (
                        <div className="mt-2 w-px flex-1 bg-line" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h4 className="text-lg font-bold text-navy">
                        {ch.title}
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                        {ch.bullets.map((b) => (
                          <li key={b.slice(0, 12)} className="flex gap-2">
                            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-blue" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
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
              {mentors.map((m) => (
                <TeamCard key={m.name} {...m} />
              ))}
            </div>
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
