# Service Content and Navigation Refresh Design

## Source of truth

The service copy and comparison matrix come from pages 5-11 of `/Users/xena/Documents/Infinity AM/TEP Pitch.pdf`, created on 2026-07-27. The first TEP background paragraph uses the exact sentence supplied by the user.

## Navigation

The desktop and mobile navigation will move `輔導遞升系統` out of the FAQ group and into a new Service group. The Service menu order will be:

1. `五大服務計畫` → `/services`
2. `輔導遞升系統` → `/system`
3. `項目比對` → `/services#comparison`

FAQ will return to a direct `/faq` link. `/system` will activate the Service navigation state.

## TEP background

Replace the first `失業風險浮現，畢業生首當其衝` paragraph with:

> 2026年，內地青年失業率高達約19%；全球青年失業率仍高達12.4%，求職人數攀升，職位供給收縮，就業競爭持續升溫，此乃結構性斷層之徵兆。

## Service plan content

All five plans remain cumulative.

- Foundation: `金融行業深度分析`, `職涯諮詢`, `簡歷精修`, `線下面試技巧打磨`.
- Premier adds: `優先終面機會`, `系統智能內推`, `錄像面試準備`.
- Private adds: `在職導師內推`, `實習機會保障`, `錄像面試準備`.
- Sovereign adds: `專業資格賦能`, covering `HKSI (Paper 1/7/8/12)`, `SFC Type 1, 4, 9`, `IIQE (Paper 1-5)`, and `IQE`.
- Apex adds: `20年+資歷銀行家親授`, with modules for `交易`, `家族治理`, `信託`, and `家族聯盟`.

The five detail pages will use the Pitch descriptions, including the two-day Foundation training, the Premier role-matching and video-production details, the Private referral and internship guarantees, the Sovereign qualification mapping, and the Apex four-module curriculum.

## Comparison table

Add Pitch pricing to each plan:

- 青銅 / Foundation: `HKD20,000`
- 白銀 / Premier: `HKD50,000`
- 黃金 / Private: `HKD200,000`
- 鉑金 / Sovereign: `HKD500,000`
- 鑽石 / Apex: `HKD2,000,000`

The feature columns and cumulative coverage will match the Pitch comparison matrix. The section will expose `id="comparison"` for direct navigation.

## Guidance progression page

Retain the existing five-station flowchart design and interaction, but replace every service list and outcome statement with Pitch-derived content. No new service claims will be introduced.

## Verification

Route tests will verify:

- Service navigation owns `/system` and lists `輔導遞升系統` before `項目比對`.
- FAQ no longer owns `/system`.
- The exact TEP background paragraph is rendered.
- Service routes contain the revised plan names, descriptions, qualifications, modules, and prices.
- The progression page contains the same updated five-tier content.

The final implementation must pass the full route suite, lint, production build, and browser inspection on desktop and mobile widths.
