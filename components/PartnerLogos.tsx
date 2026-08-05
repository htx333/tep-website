import { partnerRows } from "@/lib/content";

/**
 * 目標公司 logo 牆 — 四行無框排列。
 * 圖片常駐輕微模糊並與白色背景混合，保留可辨識輪廓。
 */
export default function PartnerLogos() {
  return (
    <div className="px-2 py-4 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
        {partnerRows.map((row, rowIndex) => (
          <section key={rowIndex} data-logo-row={rowIndex + 1}>
            <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-12">
              {row.map((company) => (
                <div
                  key={company.name}
                  data-company-name={company.name}
                  className="flex h-20 w-full items-center justify-center px-3 py-3 sm:h-24"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-11 w-auto max-w-full object-contain opacity-80 mix-blend-multiply blur-[2px] sm:max-h-12"
                    style={{ transform: `scale(${company.scale ?? 1})` }}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-14 text-center text-sm text-ink-faint">And more…</p>
    </div>
  );
}
