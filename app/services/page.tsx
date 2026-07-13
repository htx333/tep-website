import type { Metadata } from "next";
import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import ImageSlot from "@/components/services/ImageSlot";
import { TierIcon } from "@/components/services/TierIcon";

export const metadata: Metadata = {
  title: "服務 | 五大服務計畫 | TEP",
};

type Card = {
  id: string;
  metal: string;
  metalColor: string; // hex
  en: string;
  cn: string;
  audience: string;
  desc: string;
  dark?: boolean;
};

const CARDS: Card[] = [
  {
    id: "foundation",
    metal: "青銅",
    metalColor: "#B08355",
    en: "Foundation",
    cn: "啟航計畫",
    audience: "在校學生 / 應屆畢業生 / 職涯初探者",
    desc: "金融行業簡介、職涯諮詢、簡歷精修、錄像面試技巧打磨。",
  },
  {
    id: "premier",
    metal: "白銀",
    metalColor: "#97A2B0",
    en: "Premier",
    cn: "尊享計畫",
    audience: "已完成定位、鎖定名企目標的求職者",
    desc: "疊加：優先終面機會、系統智能內推、線下面試技巧打磨。",
  },
  {
    id: "private",
    metal: "黃金",
    metalColor: "#C9A659",
    en: "Private",
    cn: "私享計畫",
    audience: "志在投行、資管等核心崗位的衝刺者",
    desc: "疊加：在職導師內推、實習機會保障、線下面試技巧打磨。",
  },
  {
    id: "sovereign",
    metal: "鉑金",
    metalColor: "#6C7A8A",
    en: "Sovereign",
    cn: "卓越計畫",
    audience: "志在銀行、財富管理前台的持牌後備軍",
    desc: "疊加：專業資格賦能 — HKSI、SFC、IIQE、IQE 系統攻克。",
  },
  {
    id: "apex",
    metal: "鑽石",
    metalColor: "#C9A659",
    en: "Apex",
    cn: "至尊計畫",
    audience: "志在私人銀行、家族辦公室頂層賽道的少數人",
    desc: "疊加：20年+資歷銀行家親授，師徒制全維度賦能。",
    dark: true,
  },
];

const CONSULT_FEATURES = [
  { title: "高度客製化", sub: "量身打造專屬策略", icon: "shield" },
  { title: "絕對保密", sub: "尊重隱私安心對談", icon: "lock" },
  { title: "專業洞察", sub: "資深顧問深度陪伴", icon: "clock" },
] as const;

function ConsultIcon({ name }: { name: string }) {
  const c = {
    fill: "none",
    stroke: "#C9A659",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...c}>
      {name === "shield" && <path d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-3Z" />}
      {name === "lock" && (
        <>
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </>
      )}
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-mist to-white px-6 pb-[72px] pt-[104px]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-blue">
            Our Programmes
          </div>
          <h1 className="mt-4 font-display text-[44px] font-bold leading-[1.25] text-navy">
            五大服務計畫
          </h1>
          <div className="mx-auto mt-6 h-px w-12 bg-gold" />
          <p className="mt-[22px] text-base leading-[1.75] text-ink-soft">
            由青銅到鑽石，層層疊加、步步進階。
            <br />
            每一級在前一級之上，疊加更稀缺的資源與更深度的帶教。
          </p>
        </div>

        {/* ribbon */}
        <div className="relative mx-auto mt-14 hidden max-w-[680px] items-center justify-center gap-6 sm:flex">
          <span className="absolute left-0 right-0 top-1/2 border-t border-dashed border-blue-soft/60" />
          <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-navy" />
          <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-navy" />
          {["1v1求職顧問全程跟進", "實時掌握招聘動態"].map((r) => (
            <span
              key={r}
              className="relative rounded-md border border-blue/30 bg-white px-6 py-2.5 text-sm text-navy shadow-[0_4px_20px_rgba(10,31,61,0.06)]"
            >
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* ── Five tier cards ──────────────────────────────── */}
      <section className="bg-white px-6 pb-24 pt-2">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CARDS.map((c) => (
            <Link
              key={c.id}
              href={`/services/${c.id}`}
              className={`group relative flex flex-col overflow-hidden rounded-xl border p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
                c.dark
                  ? "border-gold/55 bg-navy-deep hover:shadow-[0_12px_32px_rgba(10,31,61,0.14)]"
                  : "border-line bg-white hover:border-navy/45 hover:shadow-[0_12px_32px_rgba(10,31,61,0.1)]"
              }`}
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: c.metalColor }}
              />
              <TierIcon id={c.id} color={c.metalColor} />
              <div
                className="mt-5 text-[11px] font-semibold tracking-[0.35em]"
                style={{ color: c.metalColor }}
              >
                {c.metal}
              </div>
              <h2
                className={`mt-2.5 font-display text-[clamp(20px,2vw,26px)] font-bold ${
                  c.dark ? "text-white" : "text-navy"
                }`}
              >
                {c.en}
              </h2>
              <div
                className={`mt-0.5 text-[15px] font-medium ${
                  c.dark ? "text-white/85" : "text-ink"
                }`}
              >
                {c.cn}
              </div>
              <div
                className={`mt-[18px] border-t pt-4 text-[11px] tracking-[0.2em] ${
                  c.dark ? "border-white/15 text-white/50" : "border-line text-ink-faint"
                }`}
              >
                適合對象
              </div>
              <p
                className={`mt-1.5 text-[13px] leading-[1.7] ${
                  c.dark ? "text-white/75" : "text-ink-soft"
                }`}
              >
                {c.audience}
              </p>
              <p
                className={`mt-3.5 flex-1 text-[13px] leading-[1.8] ${
                  c.dark ? "text-white/75" : "text-ink-soft"
                }`}
              >
                {c.desc}
              </p>
              <div
                className="mt-[22px] flex items-center gap-2 text-[13px] font-medium"
                style={{ color: c.dark ? "#C9A659" : "#3E77A6" }}
              >
                瞭解更多
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 項目比對 ─────────────────────────────────────── */}
      <section className="bg-mist px-6 py-24">
        <div className="mx-auto max-w-[1152px]">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-blue">
              Comparison
            </div>
            <h2 className="mt-3 font-display text-[32px] font-bold text-navy">項目比對</h2>
            <p className="mt-4 text-base leading-[1.75] text-ink-soft">
              一表看清五大計畫的服務覆蓋範圍。
            </p>
          </div>
          <div className="mt-14">
            <ComparisonTable />
          </div>
          <p className="mt-6 text-center text-xs text-ink-faint">
            各計畫定價與細節，歡迎預約 1 對 1 諮詢了解。
          </p>
        </div>
      </section>

      {/* ── Consultation CTA band ────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0">
          <ImageSlot dark label="背景圖・比例 21:9（建議 2560×1080）・意象：維港夜景天際線，冷色調" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,31,61,0.94)_0%,rgba(10,31,61,0.82)_55%,rgba(10,31,61,0.55)_100%)]" />
        <div className="relative mx-auto max-w-[1152px] px-6 py-[104px]">
          <div className="max-w-[640px]">
            <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-blue-soft">
              Private Consultation
            </div>
            <h2 className="mt-4 font-display text-[34px] font-bold leading-[1.35] text-white">
              專屬諮詢，開啟您的職涯新章
            </h2>
            <p className="mt-[18px] text-[15px] leading-[1.75] text-white/70">
              與我們的顧問進行一對一深度對談，釐清方向、發掘可能，為您量身打造專屬的職涯策略。
            </p>
            <div className="mt-9 flex flex-wrap gap-8">
              {CONSULT_FEATURES.map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  <ConsultIcon name={f.icon} />
                  <div>
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="text-xs text-white/55">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-md bg-white px-10 py-3.5 text-[15px] font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
            >
              立即預約諮詢
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
