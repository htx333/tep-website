import Image from "next/image";
import Link from "next/link";

/**
 * 學生分享 — imported from the "學生分享 v2" design (claude.ai/design).
 * The film poster stays pinned while the white 成功案例
 * panel scrolls up and seamlessly covers it — matching the home page's
 * "image 4 → 服務體系" cover transition. Then a 3-column grid of student
 * success stories and a navy CTA band.
 */

type Story = { title: string; excerpt: string; date: string };

const STORIES: Story[] = [
  {
    title: "張同學 — 從零基礎到 5 個面試",
    excerpt:
      "「過去的我，對金融的認知只停留在『商科畢業的出路』。是 TEP 帶我深入了解各個金融賽道，短短半年內，從零基礎的金融新手，轉變為斬獲 5 個實習面試機會的求職者。」",
    date: "2026-05-20",
  },
  {
    title: "陳同學 — 專業資格全數掛牌",
    excerpt:
      "「在導師的高效指導與精準佈局下，我在短時間內考取 HKSI 專業資格，並由 TEP 協助順利完成掛牌，最終斬獲心儀金融機構的 Offer。」",
    date: "2026-03-14",
  },
  {
    title: "李同學 — 家族企業接班人",
    excerpt:
      "「進入 TEP 後，我逐漸建立起決策力與領導潛質；藉由平台加入家族聯盟，在全球視野下拓展關鍵商業人脈。如今，我已向父母證明自己是能承擔家族重任的接班人。」",
    date: "2025-12-08",
  },
  {
    title: "王同學 — 從零 Offer 到 3 份實習保障",
    excerpt:
      "「我的成績、專業基礎和實習經歷都不差，卻在一輪輪投遞後始終換不到 Offer。反覆修改履歷仍沒有方向，挫敗感令我一度懷疑自己的能力。加入 TEP 後，導師重新定位我的求職策略，逐項修正履歷與面試盲點，並按我的目標行業落實 3 份實習機會保障。終於，我不再靠海投碰運氣，而是以清晰路徑累積真正能轉化為 Offer 的經驗。」",
    date: "2025-10-02",
  },
  {
    title: "趙同學 — 建立獨立投資判斷",
    excerpt:
      "「身為超高淨值家族的下一代，我從不缺少接觸投資的機會，真正欠缺的是判斷複雜產品與挑戰專業顧問的底氣。TEP 安排擁有 20 年以上資歷的銀行家，以多資產配置、SAA／TAA、技術分析與信託架構帶我實戰拆解家族組合。現在，我能獨立完成投資備忘錄、評估風險回報，並在家族投資會議中提出有根據的配置建議，從被動旁聽者成為能為家族資產負責的決策參與者。」",
    date: "2025-07-18",
  },
  {
    title: "周同學 — 從海投失焦到精準終面",
    excerpt:
      "「我曾同時投遞投行、資管和顧問職位，履歷看似豐富，卻因定位分散而一次次石沉大海。Premier 尊享計畫透過系統智能內推，按我的優勢精準匹配職位，再由首席面試官針對目標公司安排線下模擬與深度復盤。獲得優先終面機會後，我終於把經歷說成清晰、有說服力的職涯故事，並成功拿下資產管理公司的 Offer。」",
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
      {/* Film hero — pinned in the top half; the success-cases panel below
          scrolls up and seamlessly covers it. */}
      <section
        aria-label="學生分享 · 影片"
        style={{
          height: "50vh",
          background: "#0A1F3D",
          position: "sticky",
          top: 0,
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/student-stories-film-poster.png"
          alt="金融業導師在高層會議室向四位大學生講解投資分析"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0A1F3D]/20 via-[#0A1F3D]/30 to-[#0A1F3D]/65"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <div className="mx-auto mb-[18px] flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border border-white/55 bg-[#0A1F3D]/20 backdrop-blur-sm transition-colors hover:bg-[#0A1F3D]/35">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: 3 }}>
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8C66A" }}>
            Student Stories Film
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 13, letterSpacing: "0.1em", color: "rgba(255,255,255,0.78)" }}>
            專業導師實戰教學
          </p>
        </div>
      </section>

      {/* Success cases — rise up over the pinned video and cover it on scroll */}
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
                  className="flex flex-col gap-3.5 border-t border-[#DDE6F0] pt-[22px] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5"
                >
                  <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, lineHeight: 1.5, color: "#14406B" }}>
                    {c.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "#5B6B82" }} className="text-pretty">
                    {c.excerpt}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: 6 }}>
                    <span style={{ fontSize: 13, letterSpacing: "0.06em", color: "#16233A" }}>{c.date}</span>
                  </div>
                </article>
              ))}
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
