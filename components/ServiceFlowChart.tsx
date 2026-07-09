import { flowRibbons, tiers } from "@/lib/content";

// 每個層級的簡約線條圖示（呼應 DBC 概念圖的圓形圖標）
function TierIcon({ tierId }: { tierId: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (tierId) {
    case "foundation": // 紙飛機 — 啟航
      return (
        <svg viewBox="0 0 24 24" className="h-8 w-8" {...common}>
          <path d="M21 4 3 11l7 3 2 6 3.5-5" />
          <path d="M21 4 10 14" />
        </svg>
      );
    case "premier": // 箭靶 — 精準內推
      return (
        <svg viewBox="0 0 24 24" className="h-8 w-8" {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12 19 5" />
        </svg>
      );
    case "private": // 人物與時鐘 — 在職導師
      return (
        <svg viewBox="0 0 24 24" className="h-8 w-8" {...common}>
          <circle cx="10" cy="8" r="3.2" />
          <path d="M4.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" />
          <circle cx="18" cy="7" r="3" />
          <path d="M18 5.8V7l.9.7" />
        </svg>
      );
    case "sovereign": // 盾徽 — 專業資格
      return (
        <svg viewBox="0 0 24 24" className="h-8 w-8" {...common}>
          <path d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-3Z" />
          <path d="m12 8 1.2 2.4 2.6.4-1.9 1.9.4 2.6L12 14l-2.3 1.3.4-2.6-1.9-1.9 2.6-.4L12 8Z" />
        </svg>
      );
    default: // 鑽石 — 至尊
      return (
        <svg viewBox="0 0 24 24" className="h-8 w-8" {...common}>
          <path d="M7 4h10l4 5-9 11L3 9l4-5Z" />
          <path d="M3 9h18M9.5 9 12 20 14.5 9M7 4l2.5 5L12 4l2.5 5L17 4" />
        </svg>
      );
  }
}

export default function ServiceFlowChart() {
  return (
    <div>
      {/* 頂部虛線與兩個標籤（呼應 DBC 概念圖） */}
      <div className="relative mx-auto mb-12 hidden max-w-4xl items-center justify-center gap-6 lg:flex">
        <span className="absolute left-0 right-0 top-1/2 border-t border-dashed border-blue-soft/60" />
        {flowRibbons.map((r) => (
          <span
            key={r}
            className="relative rounded-sm border border-blue/30 bg-white px-6 py-2.5 text-sm tracking-wide text-navy shadow-sm"
          >
            {r}
          </span>
        ))}
        <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-navy" />
        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-navy" />
      </div>

      {/* 五欄服務流程 */}
      <div className="grid grid-cols-1 gap-y-12 rounded-2xl border border-line bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-line lg:p-10">
        {tiers.map((tier) => (
          <div key={tier.id} className="flex flex-col items-center px-4">
            {/* 圖示圓 */}
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-mist"
              style={{ color: `var(--${tier.metalColor})` }}
            >
              <TierIcon tierId={tier.id} />
            </div>

            {/* 層級與計畫名 */}
            <div
              className="mt-6 text-sm font-semibold tracking-[0.3em]"
              style={{ color: `var(--${tier.metalColor})` }}
            >
              {tier.metal}
            </div>
            <h3 className="mt-2 text-center text-xl font-bold text-navy">
              {tier.planEn}
              <span className="block text-lg">{tier.planName}</span>
            </h3>

            {/* 內容／疊加內容 */}
            <div className="mt-4 text-xs tracking-[0.2em] text-ink-soft">
              {tier.baseLabel}
            </div>
            <ul className="mt-3 flex flex-col items-center">
              {tier.items.map((item, i) => (
                <li
                  key={item}
                  className="flex flex-col items-center text-center text-sm leading-relaxed text-ink"
                >
                  {i > 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      className="my-1.5 h-3.5 w-3.5 text-blue-soft"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
