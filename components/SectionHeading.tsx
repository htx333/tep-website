export default function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div
          className={`font-display text-sm font-semibold uppercase tracking-[0.3em] ${
            light ? "text-blue-soft" : "text-blue"
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`mt-3 text-3xl font-bold leading-snug sm:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/70" : "text-ink-soft"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
