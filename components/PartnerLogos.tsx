import { partners } from "@/lib/content";

/**
 * 目標公司 logo 牆 — 淺灰底、乾淨網格、底部「And more…」。
 * 每格為一個 logo 位：提供 `logo` 圖檔路徑時顯示圖片（灰階），
 * 未提供前以公司名稱示意，待放入正式 logo 圖檔後即自動替換。
 */
export default function PartnerLogos() {
  return (
    <div className="rounded-2xl bg-[#ededf0] px-6 py-14 sm:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((p) => (
          <div key={p.name} className="flex h-12 w-full items-center justify-center px-1">
            {p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-12 max-w-full object-contain opacity-80 grayscale transition-opacity hover:opacity-100"
              />
            ) : (
              <span className="text-center font-display text-[15px] font-semibold tracking-wide text-ink-soft/70">
                {p.name}
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-ink-faint">And more…</p>
    </div>
  );
}
