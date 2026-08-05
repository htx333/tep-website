import type { PlanDetail, Tier } from "@/lib/content";

const traditionalBankingPath = ["分析師", "經理", "助理副總裁", "副總裁"];

export default function PlanSection({
  detail,
  tier,
  index,
}: {
  detail: PlanDetail;
  tier: Tier;
  index: number;
}) {
  const alt = index % 2 === 1;
  const isApex = tier.id === "apex";

  const careerArrow = detail.careerArrow ? (
    <div
      data-testid={isApex ? "apex-development-path" : undefined}
      className={
        isApex
          ? "mt-10 rounded-3xl border-2 border-gold bg-gold/10 px-5 py-8 shadow-[0_18px_50px_rgba(201,166,89,0.24)] sm:px-8"
          : "mt-12"
      }
    >
      {isApex && (
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">
            APEX DEVELOPMENT JOURNEY
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
            TEP 深造路徑
          </h3>
        </div>
      )}
      {detail.arrowNote && (
        <p className="text-center text-sm text-ink-soft">
          {detail.arrowNote}
        </p>
      )}
      <div
        className={`relative mt-4 rounded-full bg-gradient-to-r px-8 py-4 text-center ${
          isApex ? "from-gold via-blue to-navy" : "from-blue-soft/30 via-blue to-navy"
        }`}
      >
        <span className="font-display text-base font-semibold tracking-wide text-white sm:text-lg">
          「{detail.arrowQuote}」
        </span>
        <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 border-y-[26px] border-l-[22px] border-y-transparent border-l-navy sm:block" />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-2 text-sm font-medium text-navy">
        {detail.careerArrow.map((stage, i) => (
          <span key={stage} className="flex items-center gap-3">
            {i > 0 && <span className="text-blue-soft">→</span>}
            {stage}
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-between px-2 text-xs text-ink-soft">
        <span>{isApex ? "（深造起點）" : "（入職）"}</span>
        <span>{isApex ? "（1年完成）" : "（約12年）"}</span>
      </div>
      {isApex && (
        <>
          <div className="my-8 flex items-center gap-4" aria-label="路徑對比">
            <span className="h-px flex-1 bg-gold/40" />
            <span className="rounded-full border border-gold bg-white px-5 py-2 text-sm font-bold tracking-[0.25em] text-gold shadow-sm">
              對比
            </span>
            <span className="h-px flex-1 bg-gold/40" />
          </div>

          <div
            data-testid="traditional-banking-path"
            className="rounded-2xl border border-line bg-white/80 px-4 py-6 sm:px-6"
          >
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.28em] text-ink-soft">
                TRADITIONAL INVESTMENT BANKING CAREER
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
                傳統投行職涯路徑
              </h3>
            </div>
            <div className="relative mt-5 rounded-full bg-gradient-to-r from-blue-soft/30 via-blue/70 to-navy/85 px-8 py-4 text-center">
              <span className="font-display text-base font-semibold tracking-wide text-white sm:text-lg">
                「傳統逐級晉升，通常需時約 12 年」
              </span>
              <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 border-y-[26px] border-l-[22px] border-y-transparent border-l-navy/85 sm:block" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-2 text-sm font-medium text-navy">
              {traditionalBankingPath.map((stage, i) => (
                <span key={stage} className="flex items-center gap-3">
                  {i > 0 && <span className="text-blue-soft">→</span>}
                  {stage}
                </span>
              ))}
            </div>
            <div className="mt-2 flex justify-between px-2 text-xs text-ink-soft">
              <span>（入職）</span>
              <span>（約12年）</span>
            </div>
          </div>
        </>
      )}
    </div>
  ) : null;

  return (
    <section
      id={tier.id}
      className={`scroll-mt-24 py-20 ${alt ? "bg-mist" : "bg-white"}`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* 標題列 */}
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="rounded-md px-4 py-1.5 text-sm font-semibold tracking-[0.25em] text-white"
            style={{ backgroundColor: `var(--${tier.metalColor})` }}
          >
            {tier.metal}
          </span>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            {detail.headingEn}{" "}
            <span className="text-xl sm:text-2xl">{tier.planName}</span>
          </h2>
          {detail.overlay && (
            <span className="rounded-full border border-blue/30 bg-white px-3 py-1 text-xs tracking-widest text-blue">
              疊加服務・含前級全部內容
            </span>
          )}
        </div>

        {detail.intro && (
          <p className="mt-4 text-lg font-medium text-ink">{detail.intro}</p>
        )}

        {/* 服務項目列 */}
        {detail.rows.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-xl border border-line">
            {detail.rows.map((row, i) => (
              <div
                key={row.title}
                className={`grid gap-2 px-6 py-5 sm:grid-cols-[200px_1fr] sm:gap-8 ${
                  i % 2 === 0 ? "bg-white" : "bg-mist/60"
                }`}
              >
                <div className="font-semibold text-navy">{row.title}</div>
                <div className="text-sm leading-relaxed text-ink-soft">
                  {row.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 黃金：內推導師網絡 */}
        {detail.referralNote && (
          <p className="mt-6 rounded-xl border border-line bg-white px-6 py-4 text-sm leading-relaxed text-ink-soft">
            {detail.referralNote}
          </p>
        )}

        {/* 黃金：一般錄取率對照 */}
        {detail.stats && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-xl border p-6 text-center ${
                  s.highlight
                    ? "border-gold bg-gold/10 shadow-[0_10px_30px_rgba(201,166,89,0.22)]"
                    : "border-line bg-white"
                }`}
              >
                <div
                  className={`text-xs tracking-[0.2em] ${
                    s.highlight ? "font-semibold text-gold" : "text-ink-soft"
                  }`}
                >
                  {s.note}
                </div>
                <div
                  className={`mt-2 font-display text-4xl font-bold ${
                    s.highlight ? "text-gold" : "text-navy"
                  }`}
                >
                  {s.value}
                </div>
                <div
                  className={`mt-2 text-sm ${
                    s.highlight ? "font-semibold text-navy" : "text-ink"
                  }`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 鉑金：專業資格階梯 */}
        {detail.quals && (
          <div className="mt-10">
            <div className="overflow-hidden rounded-xl border border-line">
              {detail.quals.map((q, i) => (
                <div
                  key={q.code}
                  className={`grid gap-2 px-6 py-5 sm:grid-cols-[220px_1fr] sm:gap-8 ${
                    i % 2 === 0 ? "bg-white" : "bg-mist/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                      style={{
                        backgroundColor: `var(--${tier.metalColor})`,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                      >
                        <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                      </svg>
                    </span>
                    <span className="font-display text-base font-bold text-navy">
                      {q.code}
                    </span>
                  </div>
                  <div className="text-sm leading-relaxed text-ink-soft">
                    {q.desc}
                  </div>
                </div>
              ))}
            </div>
            {detail.qualsQuote && (
              <p className="mt-6 text-center font-display text-xl font-semibold text-blue">
                「{detail.qualsQuote}」
              </p>
            )}
          </div>
        )}

        {isApex && careerArrow}

        {/* 鑽石：四大模組 */}
        {detail.modules && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {detail.modules.map((m) => (
              <div
                key={m.no}
                className="rounded-xl border border-line bg-white p-6"
              >
                <div className="flex items-baseline gap-3 border-b-2 border-navy pb-3">
                  <span className="font-display text-4xl font-bold text-blue">
                    {m.no}
                  </span>
                  <h3 className="text-lg font-bold text-navy">{m.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 非 Apex：保留原有職涯進程箭頭位置 */}
        {!isApex && careerArrow}
      </div>
    </section>
  );
}
