"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import PartnerLogos from "@/components/PartnerLogos";
import { background, founder, mentors } from "@/lib/content";

const tabs = [
  { id: "background", label: "TEP背景" },
  { id: "founder", label: "創始人" },
  { id: "mentors", label: "導師團隊" },
  { id: "targets", label: "目標公司" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AboutTabs() {
  const [active, setActive] = useState<TabId>("background");

  return (
    <div>
      {/* 頁內切換列（緊貼導覽列下方） */}
      <div className="sticky top-16 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl justify-center gap-1 overflow-x-auto px-4 sm:gap-3 sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative shrink-0 px-4 py-4 text-sm transition-colors sm:px-6 ${
                active === tab.id
                  ? "font-semibold text-navy"
                  : "text-ink-soft hover:text-navy"
              }`}
            >
              {tab.label}
              {active === tab.id && (
                <span className="absolute inset-x-4 bottom-0 h-0.5 rounded bg-blue sm:inset-x-6" />
              )}
            </button>
          ))}
        </div>
      </div>

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
