import { comparison } from "@/lib/content";

function Crown() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mx-auto h-5 w-5 text-gold"
      fill="currentColor"
    >
      <path d="M3 8l4.5 3L12 5l4.5 6L21 8l-1.8 10H4.8L3 8Zm1.8 12h14.4v2H4.8v-2Z" />
    </svg>
  );
}

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
      <table className="w-full min-w-[840px] border-collapse text-sm">
        <thead>
          <tr className="bg-navy text-white">
            <th className="sticky left-0 z-10 bg-navy px-5 py-4 text-left font-medium">
              計畫／服務
            </th>
            {comparison.features.map((f) => (
              <th
                key={f}
                className="px-3 py-4 text-center text-xs font-medium leading-snug"
              >
                {f}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.plans.map((plan, r) => (
            <tr
              key={plan.en}
              className={
                plan.crowned
                  ? "bg-blue/[0.08]"
                  : r % 2 === 0
                    ? "bg-white"
                    : "bg-mist/60"
              }
            >
              <td
                className={`sticky left-0 z-10 px-5 py-4 ${
                  plan.crowned ? "bg-[#eaf1f9]" : r % 2 === 0 ? "bg-white" : "bg-[#f0f4fa]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-display text-base font-bold text-navy">
                      {plan.en}
                    </div>
                    <div className="text-xs text-ink-soft">{plan.name}</div>
                  </div>
                  {plan.crowned && <Crown />}
                </div>
              </td>
              {plan.dots.map((on, c) => (
                <td key={c} className="px-3 py-4 text-center">
                  {on ? (
                    <span
                      className={`inline-block h-4 w-4 rounded-full ${
                        plan.crowned && c === plan.dots.length - 1
                          ? "bg-gold ring-2 ring-gold/40"
                          : "bg-blue"
                      }`}
                    />
                  ) : (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-line" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
