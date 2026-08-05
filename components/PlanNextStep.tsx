import Link from "next/link";

/**
 * PlanNextStep — the two closing boxes on each service-plan detail page,
 * placed under the plan's service table: a "計畫成果 / Outcomes" checklist
 * card and a navy "下一步 / Next Step" card that leads to the next tier
 * (or, for Apex, to booking an interview).
 */
type Next = { title: string; desc: string; label: string; href: string };

const DATA: Record<string, { outcomes: string[]; next: Next }> = {
  foundation: {
    outcomes: [
      "建立金融體系全景認知，看懂賽道格局",
      "明確細分賽道與個人優勢定位",
      "一份對口精修、可持續迭代的簡歷",
      "鏡頭前從容自信的表達與應答",
    ],
    next: {
      title: "下一步：白銀 Premier",
      desc: "在啟航整備之上，疊加優先終面機會、系統智能內推與線下面試實戰，精準敲開名企大門。",
      label: "瞭解尊享計畫",
      href: "/services/premier",
    },
  },
  premier: {
    outcomes: [
      "直達四大、資管、投行等機構的終面席位",
      "演算法精準匹配的對口內推通道",
      "導師親擬實戰打磨後的臨場表現",
    ],
    next: {
      title: "下一步：黃金 Private",
      desc: "由現職導師親自背書內推，疊加親選行業與時段的實習保障，把履歷上的空白變成實戰經歷。",
      label: "瞭解私享計畫",
      href: "/services/private",
    },
  },
  private: {
    outcomes: [
      "履歷由導師親遞，直入核心招聘渠道",
      "一段親選行業的保障實習經歷",
      "背調到行為面試的全流程實戰功力",
    ],
    next: {
      title: "下一步：鉑金 Sovereign",
      desc: "疊加專業資格賦能，系統攻克 HKSI、SFC、IIQE 與 IQE，完成合規掛牌，奠定持牌身位。",
      label: "瞭解卓越計畫",
      href: "/services/sovereign",
    },
  },
  sovereign: {
    outcomes: [
      "前台入場資格齊備，跨過持牌門檻",
      "完成合規掛牌，即戰力上崗",
      "資管與顧問業務的進階認證加持",
    ],
    next: {
      title: "下一步：鑽石 Apex",
      desc: "閉環式 1-1 帶教，由20年+資歷銀行家獨家親授，從交易到家族治理，全維度賦能。",
      label: "瞭解至尊計畫",
      href: "/services/apex",
    },
  },
  apex: {
    outcomes: [
      "交易、家族治理、信託、家族聯盟四大模組全維度賦能",
      "20年+資歷銀行家閉環式 1-1 帶教",
      "用 1 年時間深造，為承擔家族重任作完善準備",
      "頂層政商與家族人脈的稀缺連結",
    ],
    next: {
      title: "預約 Apex 面談",
      desc: "Apex 至尊計畫採邀約審核制。預約面談，由創始團隊親自評估您與頂層帶教體系的契合度。",
      label: "預約 Apex 面談",
      href: "/contact",
    },
  },
};

export default function PlanNextStep({ tierId }: { tierId: string }) {
  const data = DATA[tierId];
  if (!data) return null;
  const { outcomes, next } = data;

  return (
    <section className="bg-mist px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Outcomes */}
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

        {/* Next step */}
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
    </section>
  );
}
