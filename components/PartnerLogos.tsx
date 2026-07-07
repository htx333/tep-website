import { partners } from "@/lib/content";

// 合作夥伴牆：目前以灰階文字標誌示意，之後可替換為正式 logo 圖片
export default function PartnerLogos() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((name) => (
        <div
          key={name}
          className="flex h-24 items-center justify-center bg-white px-4"
        >
          <span className="text-center font-display text-lg font-semibold tracking-wide text-ink-soft/60 grayscale transition-colors hover:text-navy">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
