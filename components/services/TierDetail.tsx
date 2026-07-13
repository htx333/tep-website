import Link from "next/link";
import ImageSlot from "@/components/services/ImageSlot";
import Reveal from "@/components/services/Reveal";
import {
  TierBadge,
  SectionHead,
  ProcessSteps,
  OutcomesNext,
  InlineQuote,
} from "@/components/services/parts";

/* ── shared bits ─────────────────────────────────────────── */

function Breadcrumb({ label }: { label: string }) {
  return (
    <div className="border-b border-line bg-white/95 px-6 py-3.5">
      <div className="mx-auto flex max-w-[1152px] items-center gap-2.5 text-[13px] text-ink-faint">
        <Link href="/services" className="transition-colors hover:text-navy">
          服務
        </Link>
        <span>›</span>
        <span className="font-medium text-navy">{label}</span>
      </div>
    </div>
  );
}

const overlapPill =
  "rounded-full border border-blue/30 bg-white px-3.5 py-[5px] text-[11px] tracking-[0.15em] text-blue";
const audiencePill =
  "rounded-full bg-blue-tint px-4 py-1.5 text-xs tracking-[0.1em] text-navy";

/** A split hero (text + 16:10 image) used by Premier / Private / Sovereign. */
function SplitHero({
  metal,
  en,
  cn,
  tagline,
  desc,
  audience,
  imgSpec,
}: {
  metal: string;
  en: string;
  cn: string;
  tagline: string;
  desc: string;
  audience: string;
  imgSpec: string;
}) {
  return (
    <section className="bg-gradient-to-b from-mist to-white px-6 pb-20 pt-[88px]">
      <div className="mx-auto grid max-w-[1152px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <TierBadge metal={metal} />
            <span className={overlapPill}>疊加服務・含前級全部內容</span>
          </div>
          <h1 className="mt-[22px] font-display text-[46px] font-bold leading-[1.2] text-navy">
            {en} <span className="mt-1.5 block text-[26px]">{cn}</span>
          </h1>
          <div className="mt-[26px] h-px w-12 bg-gold" />
          <p className="mt-6 font-display text-[19px] font-semibold tracking-[0.06em] text-blue">
            {tagline}
          </p>
          <p className="mt-[18px] text-[15px] leading-[1.85] text-ink-soft">{desc}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <span className={audiencePill}>適合對象</span>
            <span className="text-sm text-ink">{audience}</span>
          </div>
        </div>
        <div>
          <div className="aspect-[16/10] overflow-hidden rounded-[20px] border border-line shadow-[0_4px_20px_rgba(10,31,61,0.06)]">
            <ImageSlot label={imgSpec} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AddedCard({
  title,
  desc,
  iconColor,
  children,
}: {
  title: string;
  desc: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-7 shadow-[0_4px_20px_rgba(10,31,61,0.06)]">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-mist"
        style={{ color: iconColor }}
      >
        {children}
      </div>
      <h3 className="mt-[18px] text-base font-bold text-navy">{title}</h3>
      <p className="mt-2.5 text-[13px] leading-[1.8] text-ink-soft">{desc}</p>
    </div>
  );
}

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...svgProps}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 12 19 5" />
  </svg>
);
const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...svgProps}>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="18" cy="6" r="2.6" />
    <circle cx="12" cy="18" r="2.6" />
    <path d="M8.2 7.5 10.5 16M15.8 7.5 13.5 16M8.6 6h6.8" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...svgProps}>
    <path d="M8 12h8M8 8h8M6 4h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-5 4v-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
  </svg>
);
const MentorIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...svgProps}>
    <circle cx="10" cy="8" r="3.2" />
    <path d="M4.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" />
    <circle cx="18" cy="7" r="3" />
    <path d="M18 5.8V7l.9.7" />
  </svg>
);
const InternIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...svgProps}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
  </svg>
);

/* ══ Foundation ═════════════════════════════════════════════ */

function Foundation() {
  return (
    <>
      <section className="relative bg-navy px-6 pb-[330px] pt-[104px]">
        <div className="mx-auto max-w-[1152px]">
          <div className="max-w-[560px]">
            <div className="flex items-center gap-2.5 text-[13px] text-white/65">
              <Link href="/services" className="text-white/75 hover:text-white">
                服務
              </Link>
              <span>›</span>
              <span className="font-medium text-white">青銅 Foundation</span>
            </div>
            <div className="mt-11">
              <TierBadge metal="bronze" />
            </div>
            <h1 className="mt-[22px] font-display text-[clamp(40px,4.5vw,58px)] font-bold leading-[1.18] text-white">
              Foundation
              <span className="mt-2.5 block text-[0.5em] font-semibold">啟航計畫</span>
            </h1>
            <div className="mt-[30px] h-px w-12 bg-gold" />
            <p className="mt-6 font-display text-[19px] font-semibold tracking-[0.1em] text-white/90">
              打穩根基・明確方向・穩健啟航
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-[110px]">
        <div className="mx-auto max-w-[1152px]">
          <div className="relative z-[2] ml-auto -mt-[240px] w-[min(620px,100%)]">
            <div className="aspect-[16/9] overflow-hidden bg-mist shadow-[0_24px_64px_rgba(10,31,61,0.28)]">
              <ImageSlot label="動態影像 Placeholder・比例 16:9" />
            </div>
            <p className="mx-1 mt-3.5 text-right text-xs leading-[1.7] text-ink-faint">
              動態影像規格：16:9（建議 1920×1080）・Loop 8–12 秒・意象：羅盤指針緩轉、航道晨光流動、鏡頭緩緩推進
            </p>
          </div>
          <Reveal className="mx-auto mt-24 max-w-[820px]">
            <p className="text-pretty text-right font-display text-[clamp(22px,2.4vw,28px)] font-semibold leading-[1.9] text-navy">
              「從理解全球金融體系開始，釐清細分賽道差異、定位個人優勢，並以精修簡歷與鏡頭前實戰，完成求職前的全面整備。」
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-end gap-3.5">
              <span className={audiencePill}>適合對象</span>
              <span className="text-[15px] text-ink">在校學生 / 應屆畢業生 / 職涯初探者</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's Included — alternating numbered items */}
      <section className="bg-white px-6 pb-[140px] pt-6">
        <div className="mx-auto max-w-[1152px]">
          <Reveal>
            <SectionHead eyebrow="What's Included" title="服務內容" />
          </Reveal>

          <Reveal className="mt-24 grid grid-cols-1 items-start gap-[88px] lg:grid-cols-[1.05fr_1fr]">
            <div className="relative ml-8">
              <div className="absolute -left-8 -top-8 h-[72%] w-[72%] bg-mist" />
              <div className="relative aspect-[4/3] overflow-hidden shadow-[0_16px_44px_rgba(10,31,61,0.14)]">
                <ImageSlot label="圖片・比例 4:3" />
              </div>
            </div>
            <div className="lg:pt-24">
              <div className="flex items-center gap-4">
                <span className="font-display text-[44px] font-bold text-gold">01</span>
                <span className="h-px w-10 bg-line" />
              </div>
              <h3 className="mt-5 font-display text-[28px] font-bold text-navy">金融行業簡介</h3>
              <p className="mt-[18px] text-[15px] leading-[1.9] text-ink-soft">
                解析全球金融體系架構與前沿發展趨勢，建立行業全景認知。
              </p>
              <p className="mt-7 text-xs leading-[1.7] text-ink-faint">
                圖片規格：4:3（建議 1600×1200）・意象：全球金融城市天際線，冷色調
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-[72px] grid grid-cols-1 items-start gap-[88px] lg:grid-cols-[1fr_1.05fr]">
            <div className="lg:pt-8">
              <div className="flex items-center gap-4">
                <span className="font-display text-[44px] font-bold text-gold">02</span>
                <span className="h-px w-10 bg-line" />
              </div>
              <h3 className="mt-5 font-display text-[28px] font-bold text-navy">職涯諮詢</h3>
              <p className="mt-[18px] text-[15px] leading-[1.9] text-ink-soft">
                1對1顧問解讀投行、資管、私募股權、管理諮詢等賽道的路徑差異。
              </p>
              <p className="mt-7 text-xs leading-[1.7] text-ink-faint">
                圖片規格：4:3（建議 1600×1200）・意象：顧問與學員一對一對談，會議室景深
              </p>
            </div>
            <div className="relative ml-auto w-[86%] lg:translate-y-16">
              <div className="absolute -bottom-8 -right-8 h-[72%] w-[72%] bg-blue-tint" />
              <div className="relative aspect-[4/3] overflow-hidden bg-white shadow-[0_16px_44px_rgba(10,31,61,0.14)]">
                <ImageSlot label="圖片・比例 4:3" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* dark band — items 03 & 04 */}
      <section className="bg-navy-deep px-6 pb-[130px]">
        <div className="mx-auto max-w-[1152px]">
          <Reveal className="grid grid-cols-1 items-start gap-[88px] lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-[2] lg:-mt-[110px]">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist shadow-[0_24px_60px_rgba(10,31,61,0.4)]">
                <ImageSlot dark label="圖片・比例 4:3" />
              </div>
            </div>
            <div className="lg:pt-[120px]">
              <div className="flex items-center gap-4">
                <span className="font-display text-[44px] font-bold text-gold">03</span>
                <span className="h-px w-10 bg-white/25" />
              </div>
              <h3 className="mt-5 font-display text-[28px] font-bold text-white">簡歷精修</h3>
              <p className="mt-[18px] text-[15px] leading-[1.9] text-white/70">
                深度梳理個人經歷，定製對口簡歷，無限次數微調。
              </p>
              <p className="mt-7 text-xs leading-[1.7] text-white/40">
                圖片規格：4:3（建議 1600×1200）・意象：簡歷文件與鋼筆的俯拍特寫，簡潔桌面
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-[120px] grid grid-cols-1 items-center gap-[88px] lg:grid-cols-[1fr_1.05fr]">
            <div>
              <div className="flex items-center gap-4">
                <span className="font-display text-[44px] font-bold text-gold">04</span>
                <span className="h-px w-10 bg-white/25" />
              </div>
              <h3 className="mt-5 font-display text-[28px] font-bold text-white">錄像面試技巧打磨</h3>
              <p className="mt-[18px] text-[15px] leading-[1.9] text-white/70">
                實戰錄像指導，反覆迭代表達與應答能力。
              </p>
              <p className="mt-7 text-xs leading-[1.7] text-white/40">
                圖片規格：4:3（建議 1600×1200）・意象：鏡頭前模擬面試練習，柔和攝影棚光
              </p>
            </div>
            <div className="relative w-[86%]">
              <div className="absolute -left-8 top-8 h-full w-full border border-gold/50" />
              <div className="relative aspect-[4/3] overflow-hidden bg-mist shadow-[0_24px_60px_rgba(10,31,61,0.4)]">
                <ImageSlot dark label="圖片・比例 4:3" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead eyebrow="Process" title="服務流程" />
          <ProcessSteps
            border="#B08355"
            text="#B08355"
            steps={[
              { n: "01", title: "初步諮詢", desc: "了解背景與需求，確立合作起點。" },
              { n: "02", title: "賽道解讀", desc: "1對1顧問拆解細分賽道，錨定個人定位。" },
              { n: "03", title: "簡歷精修", desc: "深度梳理經歷，定製對口簡歷。" },
              { n: "04", title: "面試打磨", desc: "錄像實戰指導，持續跟進迭代。" },
            ]}
          />
        </div>
      </section>

      <section className="bg-mist px-6 py-24">
        <Reveal>
          <OutcomesNext
            outcomes={[
              "建立金融體系全景認知，看懂賽道格局",
              "明確細分賽道與個人優勢定位",
              "一份對口精修、可持續迭代的簡歷",
              "鏡頭前從容自信的表達與應答",
            ]}
            next={{
              title: "下一步：白銀 Premier",
              desc: "在啟航整備之上，疊加優先終面機會、系統智能內推與線下面試實戰，精準敲開名企大門。",
              label: "瞭解尊享計畫",
              href: "/services/premier",
            }}
          />
        </Reveal>
      </section>

      <section className="bg-navy-deep px-6 py-32">
        <Reveal className="mx-auto max-w-[880px] text-center">
          <div className="mx-auto h-px w-12 bg-gold" />
          <p className="mt-9 font-display text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.6] text-white">
            「方向清晰，是一切躍升的起點。」
          </p>
          <p className="mt-[26px] text-xs tracking-[0.3em] text-white/50">TEP · FOUNDATION</p>
        </Reveal>
      </section>
    </>
  );
}

/* ══ Premier ════════════════════════════════════════════════ */

function Premier() {
  return (
    <>
      <Breadcrumb label="白銀 Premier" />
      <SplitHero
        metal="silver"
        en="Premier"
        cn="尊享計畫"
        tagline="精準內推・優先終面・直達名企"
        desc="在啟航整備之上，疊加更稀缺的機會資源：演算法系統精準匹配崗位、優先終面席位，以及在職導師親擬的線下模擬面試，讓努力精準抵達。"
        audience="已完成定位、鎖定名企目標的求職者"
        imgSpec="圖片規格：16:10（建議 1920×1200）・意象：中環寫字樓玻璃幕牆與晨光，俐落冷色調"
      />

      <section className="bg-mist px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead
            eyebrow="What's Added"
            title="疊加內容"
            sub="以下內容疊加於啟航計畫全部服務之上。"
          />
          <Reveal className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <AddedCard
              iconColor="#97A2B0"
              title="優先終面機會"
              desc="覆蓋四大、資產管理、顧問公司、家族辦公室、券商、投行、私人銀行等行業的終面席位。"
            >
              <TargetIcon />
            </AddedCard>
            <AddedCard
              iconColor="#97A2B0"
              title="系統智能內推"
              desc="依託演算法系統精準匹配崗位資源，內推直入企業面試流程。"
            >
              <NetworkIcon />
            </AddedCard>
            <AddedCard
              iconColor="#97A2B0"
              title="線下面試技巧打磨"
              desc="行業在職導師親擬模擬面試，1對1線下實戰教學。"
            >
              <ChatIcon />
            </AddedCard>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead eyebrow="Process" title="服務流程" />
          <ProcessSteps
            border="#97A2B0"
            text="#6C7A8A"
            steps={[
              { n: "01", title: "背景評估", desc: "顧問深度評估背景，鎖定目標賽道。" },
              { n: "02", title: "崗位匹配", desc: "系統智能篩選對口崗位與機會。" },
              { n: "03", title: "內推遞交", desc: "內推直入企業面試流程，掌握進度。" },
              { n: "04", title: "終面衝刺", desc: "線下1對1模擬實戰，決勝終面桌。" },
            ]}
          />
        </div>
      </section>

      <section className="bg-mist px-6 py-[88px]">
        <Reveal>
          <OutcomesNext
            outcomes={[
              "直達四大、資管、投行等機構的終面席位",
              "演算法精準匹配的對口內推通道",
              "導師親擬實戰打磨後的臨場表現",
            ]}
            next={{
              title: "下一步：黃金 Private",
              desc: "由現職導師親自背書內推，疊加親選行業與時段的實習保障，把履歷上的空白變成實戰經歷。",
              label: "瞭解私享計畫",
              href: "/services/private",
            }}
          />
        </Reveal>
        <InlineQuote text="機會不靠等待，而靠精準抵達。" />
      </section>
    </>
  );
}

/* ══ Private ════════════════════════════════════════════════ */

function StatCard({ note, value, label }: { note: string; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6 text-center shadow-[0_1px_2px_rgba(10,31,61,0.05)]">
      <div className="text-xs tracking-[0.2em] text-ink-soft">{note}</div>
      <div className="mt-2 font-display text-[40px] font-bold leading-none text-navy">{value}</div>
      <div className="mt-2.5 text-sm text-ink">{label}</div>
    </div>
  );
}

function Private() {
  return (
    <>
      <Breadcrumb label="黃金 Private" />
      <SplitHero
        metal="gold"
        en="Private"
        cn="私享計畫"
        tagline="導師親推・實習保障・直入核心渠道"
        desc="由現職導師親自背書，將您的履歷直接送進企業核心招聘渠道；並以親選行業與時期的實習保障，把履歷上的空白變成真實的實戰經歷。"
        audience="志在投行、資管等核心崗位的衝刺者"
        imgSpec="圖片規格：16:10（建議 1920×1200）・意象：會議室中導師與學員一對一對談，景深柔和、冷色調"
      />

      <section className="bg-mist px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead
            eyebrow="What's Added"
            title="疊加內容"
            sub="以下內容疊加於尊享計畫全部服務之上。"
          />
          <Reveal className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <AddedCard
              iconColor="#C9A659"
              title="在職導師內推"
              desc="由現職導師親自推薦，履歷直達 Hiring Manager，進入企業核心招聘渠道。"
            >
              <MentorIcon />
            </AddedCard>
            <AddedCard
              iconColor="#C9A659"
              title="實習機會保障"
              desc="親選實習行業與時期，覆蓋四大、資產管理、家族辦公室、券商。"
            >
              <InternIcon />
            </AddedCard>
            <AddedCard
              iconColor="#C9A659"
              title="線下面試技巧打磨"
              desc="導師親擬模擬面試1對1實戰：背調｜預期問答、自我介紹｜邏輯框架、企業文化｜行為面試。"
            >
              <ChatIcon />
            </AddedCard>
          </Reveal>
          <p className="mt-6 rounded-xl border border-line bg-white px-[26px] py-5 text-[13px] leading-[1.8] text-ink-soft">
            <span className="font-semibold text-navy">導師網絡</span>　覆蓋 Goldman Sachs、BlackRock、J.P.
            Morgan、UBS、Citi、中金公司 CICC、Barclays、中國銀行、Morgan Stanley、大華銀行 UOB、Daiwa 等機構。
          </p>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead
            light
            eyebrow="Why Referral Matters"
            title="窄門之前，引薦為徑"
            sub="頂級機構的一般錄取率，說明了核心渠道的價值。"
          />
          <Reveal className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard note="一般錄取率" value="≤1%" label="投行・頂級資產管理" />
            <StatCard note="一般錄取率" value="≤5%" label="外資商業銀行" />
            <StatCard note="一般錄取率" value="15%" label="四大會計師事務所" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead eyebrow="Process" title="服務流程" />
          <ProcessSteps
            border="#C9A659"
            text="#C9A659"
            steps={[
              { n: "01", title: "導師配對", desc: "按目標賽道配對現職導師，確立帶教關係。" },
              { n: "02", title: "親自內推", desc: "導師親遞履歷至項目負責人或內部 MD 引薦。" },
              { n: "03", title: "實習落地", desc: "親選行業與時期，保障實習機會落地。" },
              { n: "04", title: "面試衝刺", desc: "全流程模擬實戰，直至斬獲 Offer。" },
            ]}
          />
        </div>
      </section>

      <section className="bg-mist px-6 py-[88px]">
        <Reveal>
          <OutcomesNext
            outcomes={[
              "履歷由導師親遞，直入核心招聘渠道",
              "一段親選行業的保障實習經歷",
              "背調到行為面試的全流程實戰功力",
            ]}
            next={{
              title: "下一步：鉑金 Sovereign",
              desc: "疊加專業資格賦能，系統攻克 HKSI、SFC、IIQE 與 IQE，完成合規掛牌，奠定持牌身位。",
              label: "瞭解卓越計畫",
              href: "/services/sovereign",
            }}
          />
        </Reveal>
        <InlineQuote text="最短的距離，是被信任的人引薦。" />
      </section>
    </>
  );
}

/* ══ Sovereign ══════════════════════════════════════════════ */

function Sovereign() {
  const ladder = [
    ["HKSI 1/7/8/12", "銀行及財富管理前台入門資格"],
    ["SFC Type 4, 9", "資產管理與顧問業務進階認證"],
    ["IIQE (Paper 1-5)", "理財策劃與保險領域合規要求"],
    ["IQE", "退休金及強積金業務必備"],
  ];
  return (
    <>
      <Breadcrumb label="鉑金 Sovereign" />
      <SplitHero
        metal="platinum"
        en="Sovereign"
        cn="卓越計畫"
        tagline="資格賦能・合規掛牌・持牌上崗"
        desc="金融前台的入場券是資格。卓越計畫聚焦香港持牌體系，系統攻克 HKSI、SFC、IIQE 與 IQE 等關鍵認證，完成合規掛牌，奠定不可替代的專業身位。"
        audience="志在銀行、財富管理前台的持牌後備軍"
        imgSpec="圖片規格：16:10（建議 1920×1200）・意象：證書與鋼筆的特寫、或殿堂式石柱，莊重冷色調"
      />

      <section className="bg-mist px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead
            eyebrow="Qualifications"
            title="資格認證階梯"
            sub="覆蓋香港金融前台核心持牌要求，逐級攻克。"
          />
          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_4px_20px_rgba(10,31,61,0.06)]">
            {ladder.map(([name, desc], i) => (
              <div
                key={name}
                className={`grid grid-cols-1 items-center gap-6 px-8 py-[22px] sm:grid-cols-[260px_1fr] ${
                  i % 2 === 1 ? "bg-mist/60" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-platinum text-white">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                    </svg>
                  </span>
                  <span className="font-display text-base font-bold text-navy">{name}</span>
                </div>
                <div className="text-[13px] leading-[1.7] text-ink-soft">{desc}</div>
              </div>
            ))}
          </Reveal>
          <p className="mt-9 text-center font-display text-xl font-semibold text-blue">
            「完成資格認證，實現合規掛牌」
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead eyebrow="Process" title="服務流程" />
          <ProcessSteps
            border="#6C7A8A"
            text="#6C7A8A"
            steps={[
              { n: "01", title: "資格規劃", desc: "按目標崗位鎖定必考資格與先後次序。" },
              { n: "02", title: "系統備考", desc: "結構化學習路徑，配套重點與題型拆解。" },
              { n: "03", title: "應試衝刺", desc: "考前密集衝刺，逐份攻克各卷認證。" },
              { n: "04", title: "合規掛牌", desc: "完成認證與掛牌流程，持牌上崗。" },
            ]}
          />
        </div>
      </section>

      <section className="bg-mist px-6 py-[88px]">
        <Reveal>
          <OutcomesNext
            outcomes={[
              "前台入場資格齊備，跨過持牌門檻",
              "完成合規掛牌，即戰力上崗",
              "資管與顧問業務的進階認證加持",
            ]}
            next={{
              title: "下一步：鑽石 Apex",
              desc: "20年+資歷銀行家親傳的師徒制頂層輔導，從交易到家族治理，全維度賦能。",
              label: "瞭解至尊計畫",
              href: "/services/apex",
            }}
          />
        </Reveal>
        <InlineQuote text="資格是門檻，更是護城河。" />
      </section>
    </>
  );
}

/* ══ Apex ═══════════════════════════════════════════════════ */

function Apex() {
  const modules = [
    ["01", "交易", "多資產類別、技術分析（RSI、MACD、VCP、K線、趨勢分析、量價分析）、戰略資產配置（SAA）、戰術資產配置（TAA）、客戶投資組合管理。"],
    ["02", "家族治理", "家族治理與頂層傳承：家族憲章擬定、跨代傳承、頂層政商脈絡。"],
    ["03", "信託", "資產保護與信託架構：家族信託、婚前財產規劃。"],
    ["04", "家族聯盟", "與其他家族學生共同成長，並拓展業界商業精英人脈。"],
  ];
  const trajectory = [
    ["01", "分析師", "（入職）"],
    ["02", "經理", ""],
    ["03", "助理副總裁", ""],
    ["04", "副總裁", "（約12年）"],
  ];
  return (
    <>
      <Breadcrumb label="鑽石 Apex" />
      <section className="relative overflow-hidden bg-navy-deep px-6 pb-[88px] pt-24">
        <div className="mx-auto grid max-w-[1152px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <TierBadge metal="diamond" />
              <span className="rounded-full border border-gold/50 px-3.5 py-[5px] text-[11px] tracking-[0.15em] text-gold">
                疊加服務・含前級全部內容
              </span>
            </div>
            <h1 className="mt-[22px] font-display text-[46px] font-bold leading-[1.2] text-white">
              Apex <span className="mt-1.5 block text-[26px]">至尊計畫</span>
            </h1>
            <div className="mt-[26px] h-px w-12 bg-gold" />
            <p className="mt-6 font-display text-[19px] font-semibold tracking-[0.06em] text-gold">
              站上巨人肩膀・掌握頂層藍圖
            </p>
            <p className="mt-[18px] text-[15px] leading-[1.85] text-white/75">
              20年+資歷銀行家親傳的師徒制頂層輔導。從多資產交易到家族治理與信託架構，全維度賦能，一年之內完成從入行到菁英的跨越式蛻變。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-[0.1em] text-blue-soft">
                適合對象
              </span>
              <span className="text-sm text-white/85">
                志在私人銀行、家族辦公室頂層賽道的少數人
              </span>
            </div>
          </div>
          <div>
            <div className="aspect-[16/10] overflow-hidden rounded-[20px] border border-gold/40 bg-mist">
              <ImageSlot label="計畫主視覺・比例 16:10" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead
            eyebrow="Four Modules"
            title="四大親授模組"
            sub="20年+資歷銀行家親傳，全維度賦能。"
          />
          <Reveal className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {modules.map(([n, title, desc]) => (
              <div
                key={n}
                className="rounded-xl border border-line bg-white p-8 shadow-[0_4px_20px_rgba(10,31,61,0.06)]"
              >
                <div className="flex items-baseline gap-3.5 border-b border-line pb-4">
                  <span className="font-display text-4xl font-bold text-gold">{n}</span>
                  <h3 className="text-lg font-bold text-navy">{title}</h3>
                </div>
                <p className="mt-4 text-[13px] leading-[1.85] text-ink-soft">{desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-6 py-[88px]">
        <div className="mx-auto max-w-[1152px]">
          <SectionHead
            align="center"
            eyebrow="Career Trajectory"
            title="職涯進程"
            sub="TEP透過實戰累積、高強度學習。"
          />
          <p className="mt-11 text-center font-display text-[22px] font-semibold text-navy">
            「能用<span className="text-gold">1年</span>時間，斬獲
            <span className="text-gold">12年</span>投行學習成果」
          </p>
          <Reveal className="relative mx-auto mt-12 max-w-[880px]">
            <div className="absolute left-6 right-6 top-[22px] hidden border-t border-dashed border-blue-soft/70 sm:block" />
            <div className="relative grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {trajectory.map(([n, title, note], i) => (
                <div key={n}>
                  <div
                    className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-bold ${
                      i === trajectory.length - 1
                        ? "border border-gold bg-navy-deep text-gold"
                        : "border border-line bg-white text-blue"
                    }`}
                  >
                    {n}
                  </div>
                  <div className="mt-3 text-[15px] font-bold text-navy">{title}</div>
                  {note && <div className="mt-1 text-xs text-ink-faint">{note}</div>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-24">
        <Reveal className="mx-auto max-w-[768px] text-center">
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            className="mx-auto block"
            fill="none"
            stroke="#C9A659"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 4h10l4 5-9 11L3 9l4-5Z" />
            <path d="M3 9h18M9.5 9 12 20 14.5 9M7 4l2.5 5L12 4l2.5 5L17 4" />
          </svg>
          <h2 className="mt-7 font-display text-[32px] font-bold leading-[1.4] text-white">
            頂層師承，僅向少數人開放
          </h2>
          <p className="mt-[18px] text-[15px] leading-[1.8] text-white/70">
            Apex 至尊計畫採邀約審核制。預約面談，由創始團隊親自評估您與頂層帶教體系的契合度。
          </p>
          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-white px-8 py-3.5 text-[15px] font-medium text-navy transition-colors hover:bg-blue-soft hover:text-white"
            >
              預約 Apex 面談
            </Link>
          </div>
          <p className="mt-16 font-display text-lg font-semibold tracking-[0.08em] text-white/85">
            <span className="text-gold">──</span>　傳承，是最稀缺的加速度。　<span className="text-gold">──</span>
          </p>
        </Reveal>
      </section>
    </>
  );
}

/* ── dispatcher ──────────────────────────────────────────── */

const TIERS: Record<string, () => React.ReactElement> = {
  foundation: Foundation,
  premier: Premier,
  private: Private,
  sovereign: Sovereign,
  apex: Apex,
};

export default function TierDetail({ tierId }: { tierId: string }) {
  const Body = TIERS[tierId];
  if (!Body) return null;
  return <Body />;
}
