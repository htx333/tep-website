import Link from "next/link";

/** Metal-colored tier pill (solid), matching the design's TierBadge. */
const METAL: Record<string, { cn: string; color: string }> = {
  bronze: { cn: "青銅", color: "#B08355" },
  silver: { cn: "白銀", color: "#97A2B0" },
  gold: { cn: "黃金", color: "#C9A659" },
  platinum: { cn: "鉑金", color: "#6C7A8A" },
  diamond: { cn: "鑽石", color: "#4E93C4" },
};

export function TierBadge({ metal }: { metal: string }) {
  const m = METAL[metal] ?? METAL.gold;
  return (
    <span
      className="inline-flex items-center rounded-md px-[18px] py-1.5 text-[13px] font-semibold tracking-[0.2em] text-white"
      style={{ background: m.color }}
    >
      {m.cn}
    </span>
  );
}

/** Left/centre section heading — eyebrow + serif title + optional sub. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`font-display text-[13px] font-semibold uppercase tracking-[0.3em] ${
          light ? "text-blue-soft" : "text-blue"
        }`}
      >
        {eyebrow}
      </div>
      <h2
        className={`mt-3 font-display text-[32px] font-bold leading-[1.3] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-base leading-[1.75] ${light ? "text-white/70" : "text-ink-soft"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

/** Four-step process row with a connecting hairline. */
export function ProcessSteps({
  steps,
  border,
  text,
}: {
  steps: { n: string; title: string; desc: string }[];
  border: string;
  text: string;
}) {
  return (
    <div className="relative mt-14">
      <div className="absolute left-6 right-6 top-[23px] hidden border-t border-line sm:block" />
      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n}>
            <div
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white font-display text-[15px] font-bold"
              style={{ border: `1px solid ${border}`, color: text }}
            >
              {s.n}
            </div>
            <h3 className="mt-4 text-[15px] font-bold text-navy">{s.title}</h3>
            <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Outcomes card + navy "next step" card. */
export function OutcomesNext({
  outcomes,
  next,
}: {
  outcomes: string[];
  next: { title: string; desc: string; label: string; href: string };
}) {
  return (
    <div className="mx-auto grid max-w-[1152px] grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[20px] border border-line bg-white p-10">
        <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-blue">
          Outcomes
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-navy">計畫成果</h2>
        <div className="mt-6 flex flex-col gap-3.5">
          {outcomes.map((o) => (
            <div key={o} className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className="mt-0.5 shrink-0"
                fill="none"
                stroke="#3E77A6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-sm leading-[1.7] text-ink">{o}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col rounded-[20px] bg-navy-deep p-10">
        <div className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-blue-soft">
          Next Step
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-white">{next.title}</h2>
        <p className="mt-4 flex-1 text-sm leading-[1.8] text-white/70">{next.desc}</p>
        <div className="mt-7">
          <Link
            href={next.href}
            className="inline-block rounded-md bg-white px-7 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
          >
            {next.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Centered serif line with gold dashes (inline closing). */
export function InlineQuote({ text }: { text: string }) {
  return (
    <p className="mx-auto mt-[72px] max-w-[1152px] text-center font-display text-[19px] font-semibold tracking-[0.08em] text-navy">
      <span className="text-gold">──</span>　{text}　<span className="text-gold">──</span>
    </p>
  );
}
