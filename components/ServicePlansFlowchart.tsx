"use client";

import { useLayoutEffect, useRef, useState } from "react";

// The diagram is authored at a fixed 1980px width; we scale it down to fit
// whatever width the page gives us, so the whole flowchart is visible without
// horizontal scrolling.
const DESIGN_WIDTH = 1980;

/**
 * ServicePlansFlowchart — 輔導遞升系統.
 * Imported from the "Service Plans Flowchart" design (claude.ai/design):
 * a five-station timeline (青銅→鑽石) with per-tier content, an 投入強度
 * meter, an 理想成果 box, and a hover interaction on each upper tier's
 * header that reveals the cumulative 已含前級服務 list.
 */

type Tier = {
  key: number;
  metal: string;
  color: string;
  en: string;
  cn: string;
  icon: "foundation" | "premier" | "private" | "sovereign" | "apex";
  items: string[];
  prev: string[] | null;
  outcome: string;
  gold?: boolean;
};

const FOUNDATION = ["金融行業簡介", "職涯諮詢", "簡歷精修", "錄像面試技巧打磨"];
const PREMIER_ADD = ["系統智能內推", "優先終面機會", "線下面試技巧打磨"];
const PRIVATE_ADD = ["在職導師內推", "實習機會保障"];

const TIERS: Tier[] = [
  {
    key: 1,
    metal: "青銅",
    color: "var(--tep-bronze)",
    en: "Foundation",
    cn: "啟航計畫",
    icon: "foundation",
    items: FOUNDATION,
    prev: null,
    outcome: "完成職涯定位，備妥專業簡歷與面試基本功。",
  },
  {
    key: 2,
    metal: "白銀",
    color: "var(--tep-silver)",
    en: "Premier",
    cn: "尊享計畫",
    icon: "premier",
    items: PREMIER_ADD,
    prev: FOUNDATION,
    outcome: "名企內推直達終面，取得首批實習面試與 Offer 機會。",
  },
  {
    key: 3,
    metal: "黃金",
    color: "var(--tep-gold-metal)",
    en: "Private",
    cn: "私享計畫",
    icon: "private",
    items: ["在職導師內推", "實習機會保障", "線下面試技巧打磨"],
    prev: [...FOUNDATION, ...PREMIER_ADD],
    outcome: "實習機會保障落地，在職導師人脈同步累積。",
  },
  {
    key: 4,
    metal: "鉑金",
    color: "var(--tep-platinum)",
    en: "Sovereign",
    cn: "卓越計畫",
    icon: "sovereign",
    items: ["專業資格賦能"],
    prev: [...FOUNDATION, ...PREMIER_ADD, ...PRIVATE_ADD],
    outcome: "專業資格加持，將實習表現轉化為 Return Offer 競爭力。",
  },
  {
    key: 5,
    metal: "鑽石",
    color: "var(--tep-gold)",
    en: "Apex",
    cn: "至尊計畫",
    icon: "apex",
    gold: true,
    items: ["20年+資歷銀行家親授"],
    prev: [...FOUNDATION, ...PREMIER_ADD, ...PRIVATE_ADD, "專業資格賦能"],
    outcome: "頂級銀行家全程督導，鎖定香港金融全職錄用。",
  },
];

function Icon({ id }: { id: Tier["icon"] }) {
  const c = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" {...c}>
      {id === "foundation" && (
        <>
          <path d="M21 4 3 11l7 3 2 6 3.5-5" />
          <path d="M21 4 10 14" />
        </>
      )}
      {id === "premier" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12 19 5" />
        </>
      )}
      {id === "private" && (
        <>
          <circle cx="10" cy="8" r="3.2" />
          <path d="M4.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" />
          <circle cx="18" cy="7" r="3" />
          <path d="M18 5.8V7l.9.7" />
        </>
      )}
      {id === "sovereign" && (
        <>
          <path d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-3Z" />
          <path d="m12 8 1.2 2.4 2.6.4-1.9 1.9.4 2.6L12 14l-2.3 1.3.4-2.6-1.9-1.9 2.6-.4L12 8Z" />
        </>
      )}
      {id === "apex" && (
        <>
          <path d="M7 4h10l4 5-9 11L3 9l4-5Z" />
          <path d="M3 9h18M9.5 9 12 20 14.5 9M7 4l2.5 5L12 4l2.5 5L17 4" />
        </>
      )}
    </svg>
  );
}

function Connector({ gold }: { gold?: boolean }) {
  const stroke = gold ? "var(--tep-gold)" : "var(--tep-blue-soft)";
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2px 0" }}>
      <svg viewBox="0 0 12 34" width="12" height="34">
        <line x1="6" y1="0" x2="6" y2="26" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M1.5 26 6 32l4.5-6" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const anim = (delay: number) => ({
  animation: `tepRise 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s backwards`,
});

export default function ServicePlansFlowchart() {
  const [openPrev, setOpenPrev] = useState(0);

  // Fit the fixed-width diagram to the available page width.
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [box, setBox] = useState<{ h: number; left: number }>({ h: 0, left: 0 });

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const recompute = () => {
      const ow = outer.clientWidth;
      const s = Math.min(1, ow / DESIGN_WIDTH);
      setScale(s);
      setBox({ h: inner.offsetHeight * s, left: Math.max(0, (ow - DESIGN_WIDTH * s) / 2) });
    };
    recompute();
    const roOuter = new ResizeObserver(recompute);
    const roInner = new ResizeObserver(recompute);
    roOuter.observe(outer);
    roInner.observe(inner);
    return () => {
      roOuter.disconnect();
      roInner.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Page headline — kept at page scale (matches other pages), never shrunk */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--tep-blue)" }}>
          Our Service System
        </div>
        <h1 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--tep-navy)" }}>
          輔導服務・遞升路徑
        </h1>
        <div style={{ width: 48, height: 1, background: "var(--tep-gold)", margin: "20px auto 0" }} />
        <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.75, color: "var(--tep-ink-soft)" }}>
          將方向轉化為路徑，將努力轉化為成果 — 五級計畫，逐站抵達
        </p>
      </div>

      {/* Fixed-width diagram, scaled to fit the page width (no horizontal scroll) */}
      <div ref={outerRef} style={{ position: "relative", width: "100%", overflow: "hidden", height: box.h }}>
        <div
          ref={innerRef}
          style={{
            position: "absolute",
            top: 0,
            left: box.left,
            width: DESIGN_WIDTH,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          {/* watermark */}
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none", userSelect: "none" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 560, fontWeight: 700, letterSpacing: "0.35em", color: "var(--tep-navy)", opacity: 0.045, textIndent: "0.35em", lineHeight: 1 }}>
              TEP
            </span>
          </div>

        {/* titles row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,340px)", gap: 44, justifyContent: "center", alignItems: "end" }}>
          {TIERS.map((t, i) => (
            <div key={t.key} data-tep-anim style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...anim(0.15 + i * 0.12) }}>
              <span style={{ color: "var(--tep-navy)", marginBottom: 4 }}>
                <Icon id={t.icon} />
              </span>
              <div style={{ fontSize: 12, letterSpacing: "0.3em", color: t.color, fontWeight: 600 }}>{t.metal}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--tep-navy)", textAlign: "center", lineHeight: 1.2 }}>
                {t.en}
                <span style={{ display: "block", fontSize: 18, marginTop: 2, whiteSpace: "nowrap" }}>{t.cn}</span>
              </div>
            </div>
          ))}
        </div>

        {/* stops line */}
        <div style={{ position: "relative", height: 20, margin: "22px 0 18px" }}>
          <span data-tep-anim style={{ position: "absolute", left: 220, right: 220, top: 9, height: 2, background: "var(--tep-line-strong)", transformOrigin: "left", animation: "tepDraw 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s backwards" }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,340px)", gap: 44, justifyContent: "center" }}>
            {TIERS.map((t, i) => (
              <div key={t.key} style={{ display: "flex", justifyContent: "center" }}>
                <span data-tep-anim style={{ width: 16, height: 16, borderRadius: "50%", background: t.gold ? "var(--tep-gold)" : "var(--tep-navy)", border: "3px solid var(--tep-white)", boxShadow: `0 0 0 1px ${t.gold ? "var(--tep-gold)" : "var(--tep-line-strong)"}`, animation: `tepPop 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s backwards` }} />
              </div>
            ))}
          </div>
        </div>

        {/* meters row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,340px)", gap: 44, justifyContent: "center", marginBottom: 24 }}>
          {TIERS.map((t, i) => (
            <div key={t.key} data-tep-anim style={{ display: "flex", justifyContent: "center", ...anim(0.45 + i * 0.12) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "var(--tep-ink-soft)" }}>投入強度</span>
                <span style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ width: 18, height: 6, borderRadius: 3, background: s < t.key ? t.color : "var(--tep-line)" }} />
                  ))}
                </span>
                <span style={{ fontSize: 12, color: "var(--tep-ink-soft)" }}>{t.key}/5</span>
              </div>
            </div>
          ))}
        </div>

        {/* cards row with dotted through-line */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 220, right: 220, top: 21, borderTop: "2px dashed var(--tep-blue-soft)" }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,340px)", gap: 44, justifyContent: "center", alignItems: "start" }}>
            {TIERS.map((t, i) => {
              const open = openPrev === t.key;
              return (
                <div key={t.key} data-tep-anim style={{ display: "flex", flexDirection: "column", ...anim(0.55 + i * 0.12) }}>
                  <div
                    onMouseLeave={t.prev ? () => setOpenPrev(0) : undefined}
                    style={{ background: "var(--tep-white)", border: `1px solid ${t.gold ? "var(--tep-gold)" : "var(--tep-line)"}`, boxShadow: "var(--shadow-card)", overflow: "hidden" }}
                  >
                    <div
                      onMouseEnter={t.prev ? () => setOpenPrev(t.key) : undefined}
                      style={{ background: "var(--tep-navy-deep)", color: t.gold ? "var(--tep-gold)" : "var(--tep-white)", padding: "11px 16px", fontSize: 13, letterSpacing: "0.12em", display: "flex", alignItems: "center", justifyContent: t.prev ? "space-between" : "flex-start", gap: 8, cursor: t.prev ? "pointer" : "default" }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flex: "none" }} />
                        計畫內容
                      </span>
                      {t.prev && (
                        <span style={{ display: "flex", transition: "transform 0.3s ease-out", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                      )}
                    </div>

                    {t.prev && (
                      <div style={{ padding: "14px 18px 0", fontSize: 11, letterSpacing: "0.2em", color: t.color, fontWeight: 600 }}>疊加內容</div>
                    )}

                    <ul style={{ margin: 0, padding: t.prev ? "10px 18px 16px" : "16px 18px", listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {t.items.map((item) => (
                        <li key={item} style={{ display: "flex", gap: 9, fontSize: 14, lineHeight: 1.6 }}>
                          <span style={{ width: 6, height: 6, background: t.gold ? "var(--tep-gold)" : "var(--tep-blue-soft)", marginTop: 8, flex: "none" }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {t.prev && (
                      <div style={{ maxHeight: open ? 560 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease-out" }}>
                        <div style={{ borderTop: "1px dashed var(--tep-line)", margin: "0 18px", padding: "12px 0 4px", fontSize: 11, letterSpacing: "0.2em", color: "var(--tep-ink-soft)", fontWeight: 600 }}>已含前級服務</div>
                        <ul style={{ margin: 0, padding: "6px 18px 16px", listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                          {t.prev.map((p, pi) => (
                            <li key={`${p}-${pi}`} style={{ fontSize: 13, color: "var(--tep-ink-soft)", lineHeight: 1.6 }}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Connector gold={t.gold} />

                  <div style={{ padding: "12px 16px", background: t.gold ? "var(--tep-navy-deep)" : "var(--tep-navy)", border: `1px solid ${t.gold ? "var(--tep-gold)" : "var(--tep-navy)"}` }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.2em", color: t.gold ? "var(--tep-gold)" : "rgba(255,255,255,0.75)", fontWeight: 600 }}>理想成果</div>
                    <div style={{ marginTop: 4, fontSize: 13.5, color: "var(--tep-white)", lineHeight: 1.7 }}>{t.outcome}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* footer ladder */}
        <div data-tep-anim style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 48, ...anim(1.2) }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: "0.25em", color: "var(--tep-ink-soft)" }}>TALENT</span>
          <span style={{ width: 64, borderTop: "1px dashed var(--tep-blue-soft)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: "0.25em", color: "var(--tep-blue)" }}>ELITE</span>
          <span style={{ width: 64, borderTop: "1px dashed var(--tep-blue-soft)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 15, letterSpacing: "0.25em", color: "var(--tep-gold)" }}>PROFESSIONAL</span>
        </div>
        </div>
      </div>
    </div>
  );
}
