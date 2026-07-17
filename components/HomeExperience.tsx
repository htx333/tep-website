"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motto } from "@/lib/content";
import PartnerLogos from "@/components/PartnerLogos";

/**
 * 主頁 — cinematic scroll experience imported from the TEP Home design
 * (claude.ai/design · "TEP Home.dc.html").
 *
 * Three choreographed acts driven by one requestAnimationFrame loop:
 *   1. a fixed video-backed motto hero that scrolls up in lockstep
 *   2. a pinned card that grows to full-bleed while three gallery images
 *      crossfade in place, tracked by a segmented "liquid" indicator
 *   3. a 服務體系 panel that slides up over the gallery, holding a
 *      horizontally-scrolling strip of the five service tiers
 *
 * Real gallery / service imagery are placeholders until supplied.
 */

const SERVICE_CARDS = [
  {
    metal: "青銅",
    en: "Foundation",
    cn: "啟航",
    href: "/services#foundation",
    tagline: "「打穩求職基石，從職涯定位到面試實戰的一站式求職起跑點。」",
    img: "/service/service-foundation.jpg",
    placeholder: "Foundation 計畫圖片",
    apex: false,
  },
  {
    metal: "白銀",
    en: "Premier",
    cn: "尊享",
    href: "/services#premier",
    tagline: "「鎖定優質名企，以智能內推與終面優先權精準敲開職場大門。」",
    img: "/service/service-premier.jpg",
    placeholder: "Premier 計畫圖片",
    apex: false,
  },
  {
    metal: "黃金",
    en: "Private",
    cn: "私享",
    href: "/services#private",
    tagline: "「導師強勢內推，以實習實戰保障助你踏出關鍵的第一步。」",
    img: "/service/service-private.jpg",
    placeholder: "Private 計畫圖片",
    apex: false,
  },
  {
    metal: "鉑金",
    en: "Sovereign",
    cn: "卓越",
    href: "/services#sovereign",
    tagline: "「解鎖專業資格認證，突破職涯瓶頸，奠定不可替代的競爭力。」",
    img: "/service/service-sovereign.jpg",
    placeholder: "Sovereign 計畫圖片",
    apex: false,
  },
  {
    metal: "鑽石",
    en: "Apex",
    cn: "至尊",
    href: "/services#apex",
    tagline: "「20年+頂尖資深銀行家親授，站在巨人肩上掌握頂級職涯藍圖。」",
    img: "/service/service-apex.jpg",
    placeholder: "Apex 計畫圖片",
    apex: true,
  },
];

/** Empty drag-drop image slot — mirrors the design's <image-slot> placeholder. */
function Slot({ src, label }: { src?: string; label: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--tep-mist)",
        color: "var(--tep-ink-faint)",
        fontSize: 13,
        letterSpacing: "0.1em",
        textAlign: "center",
        padding: 16,
      }}
    >
      {label}
    </div>
  );
}

export default function HomeExperience() {
  const mottoRef = useRef<HTMLElement>(null);
  const galWrapRef = useRef<HTMLDivElement>(null);
  const growCardRef = useRef<HTMLDivElement>(null);
  const g1Ref = useRef<HTMLDivElement>(null);
  const g2Ref = useRef<HTMLDivElement>(null);
  const g3Ref = useRef<HTMLDivElement>(null);
  const gz1Ref = useRef<HTMLDivElement>(null);
  const gz2Ref = useRef<HTMLDivElement>(null);
  const gz3Ref = useRef<HTMLDivElement>(null);
  const indColRef = useRef<HTMLDivElement>(null);
  const seg1Ref = useRef<HTMLDivElement>(null);
  const seg2Ref = useRef<HTMLDivElement>(null);
  const seg3Ref = useRef<HTMLDivElement>(null);
  const segf1Ref = useRef<HTMLDivElement>(null);
  const segf2Ref = useRef<HTMLDivElement>(null);
  const segf3Ref = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripFillRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panDir = useRef(0);

  const updateStripBar = () => {
    const strip = stripRef.current;
    const bar = stripFillRef.current;
    if (!strip || !bar) return;
    const max = strip.scrollWidth - strip.clientWidth;
    const frac = strip.clientWidth / strip.scrollWidth;
    const ratio = max > 0 ? strip.scrollLeft / max : 0;
    bar.style.width = frac * 100 + "%";
    bar.style.left = ratio * (1 - frac) * 100 + "%";
  };

  useEffect(() => {
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const ss = (v: number, a: number, b: number) => {
      const t = clamp((v - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };
    const tailLag = 0.055;
    const galleryDrift = 0.06;
    const panSpeed = 8;

    let sq = 0; // smoothed stage progress
    let lag = 0; // liquid-lagged progress for indicator fills
    let gq = 0; // smoothed grow progress
    let raf = 0;

    const segs = [seg1Ref, seg2Ref, seg3Ref];
    const segfs = [segf1Ref, segf2Ref, segf3Ref];

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const vh = window.innerHeight;

      const gal = galWrapRef.current;
      const card = growCardRef.current;
      if (gal) {
        const rect = gal.getBoundingClientRect();
        const range = gal.offsetHeight - vh * 2; // last 100vh = service overlap
        const p = clamp(-rect.top / Math.max(range, 1), 0, 1);
        // grow begins as the stage enters the viewport (still over the motto)
        const pg = clamp((vh - rect.top) / (vh * 1.15), 0, 1);

        // motto scrolls up in lockstep so the stage's top edge always sits
        // exactly at the bottom of the motto background
        if (mottoRef.current) {
          const cover = clamp(vh - rect.top, 0, vh * 2);
          mottoRef.current.style.transform = "translateY(" + -cover + "px)";
        }

        // lerp-smooth everything so wheel steps never look choppy
        sq += (p - sq) * 0.1;
        gq += (pg - gq) * 0.2;
        lag += (p - lag) * tailLag;
        if (Math.abs(p - sq) < 0.0004) sq = p;
        if (Math.abs(pg - gq) < 0.0004) gq = pg;
        if (Math.abs(p - lag) < 0.0004) lag = p;
        const s = sq;

        // 1) card grows from a centred rectangle to full bleed
        if (card) {
          const g = ss(gq, 0.02, 0.98);
          const gY = ss(gq, 0.02, 0.62); // vertical edges close faster
          const edgeX = 8 * (1 - g);
          const edgeY = 5 * (1 - gY);
          card.style.left = edgeX + "%";
          card.style.right = edgeX + "%";
          card.style.top = edgeY + "%";
          card.style.bottom = edgeY + "%";
          card.style.borderRadius = 20 * (1 - g) + "px";
          card.style.boxShadow = "0 30px 80px rgba(10,31,61," + 0.18 * (1 - g) + ")";
        }

        // 2) crossfades inside the card
        const t1 = ss(s, 0.36, 0.48); // image 1 -> 2
        const t2 = ss(s, 0.62, 0.74); // image 2 -> 3
        const drift = galleryDrift;
        if (g1Ref.current) g1Ref.current.style.opacity = String(1 - t1);
        if (g2Ref.current) g2Ref.current.style.opacity = String(t1 * (1 - t2));
        if (g3Ref.current) g3Ref.current.style.opacity = String(t2);
        if (gz1Ref.current) gz1Ref.current.style.transform = "scale(" + (1 + drift * t1) + ")";
        if (gz2Ref.current)
          gz2Ref.current.style.transform = "scale(" + (1 + drift * (1 - t1) + drift * t2) + ")";
        if (gz3Ref.current) gz3Ref.current.style.transform = "scale(" + (1 + drift * (1 - t2)) + ")";
        const dom = t2 > 0.5 ? 3 : t1 > 0.5 ? 2 : 1;
        if (g1Ref.current) g1Ref.current.style.pointerEvents = dom === 1 ? "auto" : "none";
        if (g2Ref.current) g2Ref.current.style.pointerEvents = dom === 2 ? "auto" : "none";
        if (g3Ref.current) g3Ref.current.style.pointerEvents = dom === 3 ? "auto" : "none";

        // 3) segmented indicator: active = liquid-filled capsule,
        //    seen = solid white dot, unseen = translucent grey dot
        if (indColRef.current) indColRef.current.style.opacity = String(ss(s, 0.18, 0.26));
        const B0 = 0.24,
          B1 = 0.42,
          B2 = 0.68,
          B3 = 0.88;
        const active = s < B1 ? 1 : s < B2 ? 2 : 3;
        const locals = [
          clamp((lag - B0) / (B1 - B0), 0, 1),
          clamp((lag - B1) / (B2 - B1), 0, 1),
          clamp((lag - B2) / (B3 - B2), 0, 1),
        ];
        for (let i = 1; i <= 3; i++) {
          const seg = segs[i - 1].current;
          const segf = segfs[i - 1].current;
          if (!seg || !segf) continue;
          if (i === active) {
            seg.style.width = "4px";
            seg.style.height = "9vh";
            seg.style.backgroundColor = "rgba(128,140,160,0.35)";
            segf.style.height = locals[i - 1] * 100 + "%";
          } else {
            seg.style.width = "6px";
            seg.style.height = "6px";
            seg.style.backgroundColor =
              i < active ? "rgba(255,255,255,0.95)" : "rgba(128,140,160,0.4)";
            segf.style.height = "0";
          }
        }
      }

      // service strip edge-hover panning
      const strip = stripRef.current;
      if (strip && panDir.current) {
        strip.scrollLeft += panDir.current * panSpeed;
        updateStripBar();
      }
    };

    raf = requestAnimationFrame(loop);
    updateStripBar();

    // best-effort autoplay (muted); retry on first pointer interaction
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      const tryPlay = () => vid.play().catch(() => {});
      tryPlay();
      document.addEventListener("pointerdown", tryPlay, { once: true });
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  const caption = (title: string, desc: string) => (
    <div style={{ position: "absolute", left: 48, bottom: 48, pointerEvents: "none", maxWidth: 420 }}>
      <div style={{ width: 28, height: 1, background: "var(--tep-gold)", marginBottom: 10 }} />
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "#fff",
          textShadow: "0 1px 14px rgba(10,31,61,0.55)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "8px 0 0",
          fontSize: 14,
          lineHeight: 1.8,
          maxWidth: 400,
          color: "rgba(255,255,255,0.9)",
          textShadow: "0 1px 12px rgba(10,31,61,0.55)",
        }}
      >
        {desc}
      </p>
    </div>
  );

  return (
    <div>
      {/* spacer so the fixed motto shows first */}
      <div style={{ height: "100vh" }} />

      {/* 1 · Motto hero — fixed underlay; the stage slides up over it */}
      <section
        ref={mottoRef}
        aria-label="主頁 · 品牌主張"
        style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", willChange: "transform" }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/hk-skyline.png"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src="/tep-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.05) 55%, rgba(224,237,237,0) 82%, #e0eded 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ maxWidth: 1152, padding: "48px 64px", textAlign: "center" }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.35em",
                color: "var(--tep-blue)",
                margin: 0,
              }}
            >
              香港金融行業職業規劃・求職領導品牌
            </p>
            <h1
              style={{
                margin: "20px auto 0",
                fontFamily: "var(--font-display)",
                fontSize: 34,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--tep-navy)",
                whiteSpace: "nowrap",
              }}
            >
              於時代轉折處，重塑金融精英的職涯路徑
            </h1>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "center",
                columnGap: 16,
                rowGap: 8,
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--tep-ink-soft)",
              }}
            >
              {motto.map((word) => (
                <span key={word} className="tep-word">
                  <span style={{ color: "var(--tep-blue)" }}>{word.charAt(0)}</span>
                  {word.slice(1)}
                </span>
              ))}
            </div>
            <p
              style={{
                marginTop: 14,
                fontSize: 13,
                letterSpacing: "0.25em",
                color: "var(--tep-ink-soft)",
              }}
            >
              人才 → 菁英 → 專業人士
            </p>
          </div>
        </div>
      </section>

      {/* 2 · Pinned stage — card grows to full bleed, 3 images crossfade */}
      <div
        ref={galWrapRef}
        aria-label="主頁 · 全版圖片組"
        style={{ position: "relative", height: "560vh", background: "transparent", zIndex: 3 }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#e0eded" }}>
          <div
            ref={growCardRef}
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              top: "5%",
              bottom: "5%",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(10,31,61,0.18)",
              background: "var(--tep-navy-deep)",
            }}
          >
            <div ref={g1Ref} style={{ position: "absolute", inset: 0 }}>
              <div ref={gz1Ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
                <Slot src="/gallery/talent.jpg" label="Talent · 人才" />
              </div>
              {caption("Talent　人才", "從迷惘到方向，為原石般的你錨定專屬的金融職涯定位。")}
            </div>
            <div ref={g2Ref} style={{ position: "absolute", inset: 0, opacity: 0 }}>
              <div ref={gz2Ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
                <Slot src="/gallery/elite.jpg" label="Elite · 菁英" />
              </div>
              {caption("Elite　菁英", "將潛力淬鍊為實力，帶你踏入頂尖機構的核心舞台。")}
            </div>
            <div ref={g3Ref} style={{ position: "absolute", inset: 0, opacity: 0 }}>
              <div ref={gz3Ref} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
                <Slot src="/gallery/professional.jpg" label="Professional · 專業人士" />
              </div>
              {caption("Professional　專業人士", "從站穩腳步到引領全局，陪你走向金融菁英的頂層。")}
            </div>
          </div>

          {/* segmented liquid scroll indicator */}
          <div
            ref={indColRef}
            style={{
              position: "absolute",
              left: 44,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              pointerEvents: "none",
              opacity: 0,
            }}
          >
            {[
              { seg: seg1Ref, segf: segf1Ref, h: "9vh", w: 4 },
              { seg: seg2Ref, segf: segf2Ref, h: "6px", w: 6 },
              { seg: seg3Ref, segf: segf3Ref, h: "6px", w: 6 },
            ].map((s, i) => (
              <div
                key={i}
                ref={s.seg}
                style={{
                  width: s.w,
                  height: s.h,
                  borderRadius: 999,
                  background: i === 0 ? "rgba(128,140,160,0.35)" : "rgba(128,140,160,0.4)",
                  overflow: "hidden",
                  transition:
                    "height 0.5s cubic-bezier(0.16,1,0.3,1), width 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease-out",
                }}
              >
                <div
                  ref={s.segf}
                  style={{
                    width: "100%",
                    height: 0,
                    borderRadius: 999,
                    background: "#fff",
                    boxShadow: "0 0 12px rgba(255,255,255,0.45)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 · TEP 服務體系 — slides up to cover the gallery */}
      <div style={{ position: "relative", zIndex: 5, marginTop: "-100vh" }}>
        <section
          aria-label="TEP 服務體系"
          style={{
            background: "#fff",
            minHeight: "100vh",
            padding: "96px 0 88px",
            boxShadow: "0 -24px 60px rgba(10,31,61,0.18)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", width: "100%", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 768, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "var(--tep-blue)",
                }}
              >
                Our Service System
              </div>
              <h2
                style={{
                  margin: "12px 0 0",
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: "var(--tep-navy)",
                }}
              >
                TEP 服務體系
              </h2>
              <p
                style={{
                  margin: "16px 0 0",
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "var(--tep-ink-soft)",
                }}
              >
                五級服務計畫，由啟航到至尊，層層疊加、步步進階。
              </p>
            </div>
          </div>

          <div style={{ position: "relative", marginTop: 56 }}>
            <div
              ref={stripRef}
              className="tep-strip"
              onScroll={updateStripBar}
              style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 48px" }}
            >
              {SERVICE_CARDS.map((c) => (
                <div key={c.en} style={{ flex: "0 0 37vw", minWidth: 340 }}>
                  <p
                    style={{
                      margin: "0 0 14px",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      color: "var(--tep-navy)",
                    }}
                  >
                    {c.metal}
                    <span style={{ color: "var(--tep-ink-soft)", margin: "0 7px" }}>｜</span>
                    {c.en}{" "}
                    <span
                      style={{
                        color: c.apex ? "var(--tep-gold)" : "var(--tep-ink-soft)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {c.cn}
                    </span>
                  </p>
                  <div
                    style={{
                      position: "relative",
                      height: "56vh",
                      minHeight: 380,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: c.apex ? "1px solid var(--tep-gold)" : "1px solid var(--tep-line)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  >
                    <Slot src={c.img} label={c.placeholder} />
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: "56px 26px 24px",
                        background:
                          "linear-gradient(to top, rgba(10,31,61,0.78), rgba(10,31,61,0.35) 45%, rgba(10,31,61,0))",
                        pointerEvents: "none",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          lineHeight: 1.75,
                          color: "rgba(255,255,255,0.94)",
                          maxWidth: "92%",
                          textShadow: "0 1px 12px rgba(10,31,61,0.5)",
                        }}
                      >
                        {c.tagline}
                      </p>
                      <Link href={c.href} className="tep-more">
                        瞭解更多 <span style={{ fontSize: 14 }}>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* edge hover pan zones */}
            <div
              onMouseEnter={() => (panDir.current = -1)}
              onMouseLeave={() => (panDir.current = 0)}
              style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 72, cursor: "w-resize" }}
            />
            <div
              onMouseEnter={() => (panDir.current = 1)}
              onMouseLeave={() => (panDir.current = 0)}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 72,
                cursor: "e-resize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--tep-navy)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.5 }}
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          {/* thin scroll progress line */}
          <div
            style={{
              margin: "36px 48px 0",
              height: 2,
              borderRadius: 999,
              background: "var(--tep-line)",
              position: "relative",
            }}
          >
            <div
              ref={stripFillRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: 2,
                width: "40%",
                borderRadius: 999,
                background: "var(--tep-navy)",
              }}
            />
          </div>
        </section>

        {/* 4 · 目標公司 logo wall */}
        <section style={{ background: "#ffffff", padding: "96px 24px" }}>
          <div style={{ maxWidth: 1152, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--tep-blue)" }}>
                Target Companies
              </div>
              <h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--tep-navy)" }}>
                目標公司
              </h2>
              <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.75, color: "var(--tep-ink-soft)" }}>
                導師與內推網絡覆蓋全球頂級金融機構。
              </p>
            </div>
            <PartnerLogos />
          </div>
        </section>
      </div>
    </div>
  );
}
