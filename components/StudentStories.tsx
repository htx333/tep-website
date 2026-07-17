import Link from "next/link";

/**
 * 學生分享 — imported from the "學生分享 v2" design (claude.ai/design).
 * The film hero stays pinned (position: fixed) while the white 成功案例
 * panel scrolls up and seamlessly covers it — matching the home page's
 * "image 4 → 服務體系" cover transition. Then a 3-column grid of student
 * success stories and a navy CTA band. Video and later cases are placeholders.
 */

type Story = { title: string; excerpt: string; date: string };

const STORIES: Story[] = [
  {
    title: "Success Story — 同學A — 從零基礎到 10 個面試",
    excerpt:
      "「過去的我，對金融的認知只停留在『商科畢業的出路』。是 TEP 帶我深入了解各個金融賽道，短短半年內，從零基礎的金融新手，轉變為斬獲 10 個實習面試機會的求職者。」",
    date: "2026-05-20",
  },
  {
    title: "Success Story — 同學B — 專業資格全數掛牌",
    excerpt:
      "「在導師的高效指導與精準佈局下，我在短時間內連續考取 HKSI、SFC、IIQE 及 IQE 等多項專業核心資格，並由 TEP 協助順利完成掛牌，最終斬獲心儀金融機構的 Offer。」",
    date: "2026-03-14",
  },
  {
    title: "Success Story — 同學C — 家族企業接班人",
    excerpt:
      "「進入 TEP 後，我逐漸建立起決策力與領導潛質；藉由平台加入家族聯盟，在全球視野下拓展關鍵商業人脈。如今，我已向父母證明自己是能承擔家族重任的接班人。」",
    date: "2025-12-08",
  },
  {
    title: "Success Story —（案例標題預留）",
    excerpt:
      "（案例摘要預留：一段約兩至三行的分享節錄，描述學員背景、TEP 的介入方式與最終成果。）",
    date: "2025-10-02",
  },
  {
    title: "Success Story —（案例標題預留）",
    excerpt:
      "（案例摘要預留：一段約兩至三行的分享節錄，描述學員背景、TEP 的介入方式與最終成果。）",
    date: "2025-07-18",
  },
  {
    title: "Success Story —（案例標題預留）",
    excerpt:
      "（案例摘要預留：一段約兩至三行的分享節錄，描述學員背景、TEP 的介入方式與最終成果。）",
    date: "2025-04-25",
  },
];

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-[#3E77A6]">
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-[32px] font-bold leading-[1.3] text-[#14406B]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-[1.75] text-[#5B6B82]">{sub}</p>
    </div>
  );
}

export default function StudentStories() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* spacer so the pinned hero shows first */}
      <div style={{ height: "100vh" }} />

      {/* Pinned film hero — the panel below scrolls up and covers it */}
      <section
        aria-label="學生分享 · 影片"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "50vh",
            flex: "none",
            background: "#0A1F3D",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.85)" }}>
            <div className="mx-auto mb-[18px] flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border border-white/45 transition-colors hover:bg-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: 3 }}>
                <path d="M6 4l14 8-14 8z" />
              </svg>
            </div>
            <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A659" }}>
              Student Stories Film
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 13, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)" }}>
              宣傳影片預留位置（16:9）
            </p>
          </div>
          <svg
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 120, opacity: 0.06, pointerEvents: "none" }}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
          >
            <path d="M0 160V90h60V50h40v110M140 160V70h70v90M250 160V30h50V10h30v150M370 160V80h60v80M470 160V40h45v120M555 160V95h55v65M650 160V20h40v20h35v120M765 160V70h60v90M865 160V50h50v110M955 160V85h55v75M1050 160V35h45v125M1135 160V75h65v85" />
          </svg>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ textAlign: "center" }}>
            <Heading eyebrow="STUDENT STORIES" title="學生分享" sub="來自 TEP 學員的真實蛻變歷程" />
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "#5B6B82" }}>
              <span style={{ fontSize: 12, letterSpacing: "0.25em" }}>向下滾動</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16M6 14l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Panel that slides up over the hero */}
      <div style={{ position: "relative", zIndex: 5 }}>
        <section
          aria-label="成功案例"
          style={{
            background: "#ffffff",
            minHeight: "100vh",
            padding: "104px 24px 96px",
            boxShadow: "0 -24px 60px rgba(10,31,61,0.18)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: 1152, margin: "0 auto" }}>
            <Heading
              eyebrow="SUCCESS STORIES"
              title="成功案例"
              sub="每一段分享，都是一次精準錨定後的躍升。"
            />
            <div className="mt-[72px] grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {STORIES.map((c) => (
                <article
                  key={c.title + c.date}
                  className="flex cursor-pointer flex-col gap-3.5 border-t border-[#DDE6F0] pt-[22px] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5"
                >
                  <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, lineHeight: 1.5, color: "#14406B" }}>
                    {c.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "#5B6B82" }} className="text-pretty">
                    {c.excerpt}
                  </p>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingTop: 6 }}>
                    <span style={{ fontSize: 13, letterSpacing: "0.06em", color: "#16233A" }}>{c.date}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", color: "#3E77A6" }}>瞭解更多 →</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-20 flex justify-center">
              <button
                type="button"
                className="rounded-md border border-[#14406B]/25 px-10 py-3.5 text-[15px] font-medium text-[#14406B] transition-colors hover:border-[#14406B] hover:bg-mist"
              >
                載入更多
              </button>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section style={{ background: "#0A1F3D", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A659" }}>
            Begin Your Journey
          </p>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, color: "#ffffff" }}>
            下一個分享，由你書寫
          </h2>
          <p style={{ margin: "0 auto 32px", maxWidth: 560, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.72)" }}>
            將方向轉化為路徑，將努力轉化為成果。預約一次諮詢，開啟你的金融職涯。
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-white px-10 py-3.5 text-[15px] font-medium text-[#14406B] transition-colors hover:bg-blue-soft hover:text-white"
          >
            預約諮詢
          </Link>
        </section>
      </div>
    </div>
  );
}
