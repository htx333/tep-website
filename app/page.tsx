import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceFlowChart from "@/components/ServiceFlowChart";
import { motto, slogan } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-white">
        {/* 背景裝飾：抽象天際線線條 */}
        <svg
          aria-hidden
          viewBox="0 0 1200 320"
          className="pointer-events-none absolute bottom-0 left-1/2 w-[1400px] -translate-x-1/2 text-navy/[0.06]"
          fill="currentColor"
        >
          <path d="M0 320V240h60v-60h50v60h40V140h70v180h50V200h60v-40h50v160h70V120h30l20-40 20 40h30v200h60V180h80v140h50V90h90v230h60V210h70v110h50v-70h60v70h80V320H0Z" />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 text-center sm:px-6 sm:pt-32">
          <p className="text-sm font-medium tracking-[0.35em] text-blue">
            香港金融行業職業規劃・求職領導品牌
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-navy sm:text-5xl">
            {slogan}
          </h1>

          {/* 品牌格言：Talent → Elite → Professional 逐字浮現 */}
          <div className="mt-10 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 font-display text-3xl font-semibold tracking-[0.08em] text-ink-soft sm:text-4xl">
            {motto.map((word) => (
              <span key={word} className="motto-word">
                <span className="text-blue">{word.charAt(0)}</span>
                {word.slice(1)}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm tracking-[0.25em] text-ink-soft">
            人才 → 菁英 → 專業人士
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="rounded-md bg-navy px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue"
            >
              瞭解服務計畫
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-navy/25 px-8 py-3 text-sm font-medium text-navy transition-colors hover:border-navy hover:bg-mist"
            >
              預約諮詢
            </Link>
          </div>
        </div>
      </section>

      {/* ── TEP 服務體系 ───────────────────────────────── */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Service System"
            title="TEP 服務體系"
            sub="五級服務計畫，由啟航到至尊，層層疊加、步步進階。"
          />
          <div className="mt-16">
            <ServiceFlowChart />
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-navy-deep py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[0.1em] text-white">
            {motto.join(" ")}
          </h2>
          <p className="mt-4 text-white/70">
            將方向轉化為路徑，將努力轉化為成果。
          </p>
          <Link
            href="/services"
            className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
          >
            深入了解五大計畫
          </Link>
        </div>
      </section>
    </>
  );
}
