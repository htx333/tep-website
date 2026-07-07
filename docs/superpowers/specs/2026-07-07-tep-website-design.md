# TEP Official Website — Design Spec (2026-07-07)

## Purpose
Marketing website for TEP, a Hong Kong finance career-coaching startup. Five pages, Traditional Chinese content (English kept for plan names and the motto). Deployed via the user's GitHub account (repo created manually on github.com; hosting on GitHub Pages or Vercel later).

## Decisions (user-approved)
- **Stack:** Next.js (App Router) + Tailwind CSS, static-export compatible (`output: 'export'`).
- **Location:** `/Users/xena/Documents/Infinity AM/TEP/tep-website` (nothing lives in the SFC excel folder).
- **Palette:** Light corporate blue — white/light-grey backgrounds, deep corporate blue (#0B3B6F–#1E6BB8 range) accents, matching the pitch deck and DBC reference. Tier badges 青銅/白銀/黃金/鉑金/鑽石 get subtle metallic accent colors.
- **Language:** Traditional Chinese only.
- **Mentor bios:** elegant placeholders (avatar initials, 「賽道」導師 title, sample bullets) — user swaps in real content later.
- **Partner logos:** grayscale text/SVG treatment of major finance firms (Goldman Sachs, BlackRock, J.P. Morgan, UBS, Citi, Morgan Stanley, HSBC 匯豐, CICC 中金, Barclays, Bank of China 中國銀行, UOB 大華, Daiwa) as design placeholders; list easily editable.

## Site map & content
Shared: sticky Navbar (logo + 5 links, active state), Footer (motto "Talent. Elite. Professional.", nav links, © TEP).

### 1. 主頁 `/`
- Hero: slogan 「於時代轉折處，重塑金融精英的職涯路徑」+ motto **"Talent. Elite. Professional."** with T/E/P letters accented, staged fade-in. This is the "catchy" motto placement.
- DBC-style 服務體系 flow diagram: five connected columns (青銅 Foundation啟航 → 白銀 Premier尊享 → 黃金 Private私享 → 鉑金 Sovereign卓越 → 鑽石 Apex至尊). Each column: arrow badge on top, icon in circle, tier + plan name, service items stacked with small chevrons between (base items for 青銅; 疊加內容 for the rest, labelled 疊加). Dashed connector line across the top with the two ribbon labels (1v1導師全程跟進-style optional).
- CTA section linking to /services.

### 2. 關於我們 `/about`
- TEP背景: user's text verbatim (slogan, market stats paragraph, T→E→P naming vision, Aristotle quote, mission paragraphs).
- 團隊: founder card 張兆愷 Bruce Cheung (天恒資產管理有限公司董事長, his quote, three career chapters as bullets from pitch p.3); three mentor cards (Alex Chow / Xena Chow / Oscar Cheung — placeholder avatars, 「賽道」導師, placeholder experience bullets).
- 合作夥伴 logo wall (grayscale grid).

### 3. 服務 `/services`
- Five in-depth sections (content from pitch pp.6–10):
  - 青銅 Foundation啟航計畫: 金融行業簡介 / 職涯諮詢 (1-1顧問解讀各賽道) / 簡歷精修 / 錄像面試技巧準備 — definition-list style rows.
  - 白銀 Premier尊享 (疊加): 優先終面機會 (四大、資管、顧問、家辦、券商、投行、私行) / 系統智能內推 (算法匹配) / 線下面試技巧打磨 (在職導師1-1模擬).
  - 黃金 Private私享 (疊加): 在職導師內推 (現職導師親自推薦) / 實習機會保障 (親選行業與時期; 一般錄取率 ≤1% 投行·頂級資管, ≤5% 外資商行, 15% 四大) / 線下面試技巧打磨.
  - 鉑金 Sovereign卓越 (疊加): 專業資格賦能 ladder — HKSI 1/7/8/12, SFC Type 4/9, IIQE Paper 1-5, IQE with 適用職位 descriptions; 「完成資格認證，實現合規掛牌」.
  - 鑽石 Apex至尊 (疊加): 20年+資歷銀行家親授 — four modules (交易 / 家族治理 / 信託 / 家族聯盟) + career arrow 分析師→經理→助理副總裁→副總裁, 「能用1年時間斬獲12年投行學習成果」.
- 項目比對表: 5 plans × 10 features dot-matrix (pitch p.11), site palette, Apex column highlighted with crown.

### 4. FAQ `/faq`
WST-style static numbered list (01–04): bold question, indented answer, generous spacing. User's four Q&As verbatim.

### 5. 聯繫我們 `/contact`
Heading with "Tailored. Expert. Prestigious." echo, contact info block (email/phone/WhatsApp/地址 placeholders), simple front-end-only message form.

## Architecture
- `app/layout.tsx` (fonts: Noto Sans TC + an elegant Latin display face; metadata), `app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/faq/page.tsx`, `app/contact/page.tsx`.
- `components/`: Navbar, Footer, ServiceFlowChart, PlanSection, ComparisonTable, TeamCard, PartnerLogos, FaqList, SectionHeading.
- `lib/content.ts`: all copy/data (tiers, plans, FAQ, team, partners) in one typed file so non-dev edits are trivial.
- No backend; contact form is presentational.

## Error handling / quality
- `npm run build` (static export) must pass; visual verification via local dev server.
- Responsive: columns stack on mobile; comparison table horizontally scrollable on small screens.

## Out of scope (later)
Real mentor bios/photos, final partner list, real contact details, pricing figures, EN version, form backend, custom domain.
