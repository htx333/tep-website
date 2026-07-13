/**
 * ImageSlot — placeholder for imagery the client will supply later.
 * Mirrors the design handoff's <image-slot>: a mist panel with the
 * spec/意象 note centred, so the layout reads correctly before real
 * photos or motion assets are dropped in.
 */
export default function ImageSlot({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center p-6 text-center ${
        dark ? "bg-white/[0.04] text-white/45" : "bg-mist text-ink-faint"
      }`}
    >
      <div className="flex max-w-[85%] flex-col items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.6" />
          <path d="m21 16-5-5L5 19" />
        </svg>
        <span className="text-[11px] leading-relaxed tracking-wider">{label}</span>
      </div>
    </div>
  );
}
