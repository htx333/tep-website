# TEP Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build TEP's five-page Traditional-Chinese marketing website (Next.js + Tailwind, light corporate blue), connected to the user's GitHub.

**Architecture:** Static-export Next.js App Router site. All copy lives in one typed content module (`lib/content.ts`); pages are thin compositions of presentational components. No backend.

**Tech Stack:** Next.js 15 (App Router, `output: 'export'`), Tailwind CSS v4, TypeScript, Noto Sans TC + Cormorant Garamond via `next/font`.

## Global Constraints

- Project root: `/Users/xena/Documents/Infinity AM/TEP/tep-website` — never write outside the TEP folder.
- All copy verbatim from spec `docs/superpowers/specs/2026-07-07-tep-website-design.md` (Traditional Chinese; English only for plan names, motto, "Tailored. Expert. Prestigious.").
- Palette: white/`#F5F8FC` backgrounds; primary blues `#0B3B6F` (deep) / `#1E6BB8` (bright); tier metallics — 青銅 `#8C6A4A`, 白銀 `#8E9AAB`, 黃金 `#B8912F`, 鉑金 `#7C8B99`, 鑽石 `#3B82C4`.
- Motto "Talent. Elite. Professional." appears in the homepage hero (staged fade-in, T/E/P accented) and the footer of every page.
- Verification gate per task: `npm run build` succeeds; visual check via dev server at the end.
- Commit after every task (`git add -A && git commit`).

---

### Task 1: Scaffold project

**Files:**
- Create: entire Next.js scaffold via `create-next-app` (App Router, TS, Tailwind, no src dir alias default `@/*`)
- Modify: `next.config.ts` (add `output: 'export'`, `images: { unoptimized: true }`), `app/layout.tsx` (fonts + zh-Hant metadata), `app/globals.css` (palette CSS vars)

**Interfaces:**
- Produces: `@/lib/…`, `@/components/…` path alias; CSS variables `--color-navy`, `--color-blue`, `--color-mist`; font variables `--font-sans` (Noto Sans TC), `--font-display` (Cormorant Garamond).

- [ ] Step 1: `npx create-next-app@latest . --ts --tailwind --app --no-src-dir --import-alias "@/*" --use-npm --yes` inside project root (git already initialized; scaffold into it)
- [ ] Step 2: Set `output: 'export'` + unoptimized images in `next.config.ts`
- [ ] Step 3: Wire Noto Sans TC + Cormorant Garamond in `app/layout.tsx`; `<html lang="zh-Hant">`; metadata title 「TEP | Talent. Elite. Professional.」
- [ ] Step 4: Define palette tokens in `globals.css` `@theme`
- [ ] Step 5: `npm run build` → expect success; commit `chore: scaffold Next.js + Tailwind`

### Task 2: Content module

**Files:**
- Create: `lib/content.ts`

**Interfaces:**
- Produces (consumed by all page tasks):
  - `tiers: Tier[]` where `Tier = { id: string; metal: string; metalColor: string; planName: string; planEn: string; tagline: string; baseLabel: '內容' | '疊加內容'; items: string[] }` — five entries 青銅→鑽石 with flow-chart items from spec.
  - `planDetails: PlanDetail[]` where `PlanDetail = { tierId: string; heading: string; intro?: string; rows: { title: string; body: string }[]; extras?: { stats?: {value: string; label: string}[]; quals?: {code: string; desc: string}[]; modules?: {no: string; title: string; body: string}[]; careerArrow?: string[]; arrowQuote?: string; referralNote?: string } }` — in-depth 服務 page content (pitch pp.6–10).
  - `comparison: { features: string[]; plans: { name: string; en: string; dots: boolean[] }[] }` — 10 features × 5 plans (pitch p.11), Apex flagged `crowned: true`.
  - `faq: { q: string; a: string }[]` — four Q&As verbatim.
  - `founder`, `mentors: { name: string; role: string; bullets: string[] }[]`, `partners: string[]`, `background: { slogan: string; paragraphs: string[] }`, `contact` placeholders.
- [ ] Step 1: Write full content file with all copy from spec (verbatim Chinese text)
- [ ] Step 2: `npm run build`; commit `feat: content module with all site copy`

### Task 3: Shared shell (Navbar, Footer, SectionHeading)

**Files:**
- Create: `components/Navbar.tsx` (client component — usePathname active state, mobile menu), `components/Footer.tsx`, `components/SectionHeading.tsx`
- Modify: `app/layout.tsx` (render Navbar/Footer around children)

**Interfaces:**
- Produces: `<SectionHeading eyebrow?, title, sub? />`; nav links `[{href:'/',label:'主頁'},{href:'/about',label:'關於我們'},{href:'/services',label:'服務'},{href:'/faq',label:'FAQ'},{href:'/contact',label:'聯繫我們'}]`.
- [ ] Step 1: Build Navbar (sticky, white/blur, TEP wordmark + Talent. Elite. Professional. microcopy)
- [ ] Step 2: Build Footer (navy background, motto, links, ©)
- [ ] Step 3: `npm run build`; commit `feat: shared navbar and footer`

### Task 4: 主頁

**Files:**
- Create: `components/ServiceFlowChart.tsx`, `app/page.tsx` (replace scaffold home)

**Interfaces:**
- Consumes: `tiers` from `@/lib/content`.
- [ ] Step 1: Hero — light gradient + skyline-style decoration, slogan headline, motto with accented T/E/P and CSS staged fade-in, CTA buttons (瞭解服務 → /services, 聯繫我們 → /contact)
- [ ] Step 2: ServiceFlowChart — DBC grammar: dashed connector + ribbon labels (「1v1導師全程跟進」「頂級在職導師內推」), five columns each with arrow badge, icon circle, tier/plan name, chevron-stacked items, 疊加 label for tiers 2–5
- [ ] Step 3: CTA band; `npm run build`; commit `feat: homepage with hero and service flow chart`

### Task 5: 關於我們

**Files:**
- Create: `components/TeamCard.tsx`, `components/PartnerLogos.tsx`, `app/about/page.tsx`

**Interfaces:**
- Consumes: `background`, `founder`, `mentors`, `partners`.
- [ ] Step 1: TEP背景 section — slogan + verbatim paragraphs, Aristotle quote as pull-quote
- [ ] Step 2: 創始人 feature card (photo placeholder, quote, three career-chapter bullet groups) + three mentor TeamCards (initial-avatar, 「賽道」導師, placeholder bullets)
- [ ] Step 3: 合作夥伴 grayscale wordmark grid; `npm run build`; commit `feat: about page`

### Task 6: 服務

**Files:**
- Create: `components/PlanSection.tsx`, `components/ComparisonTable.tsx`, `app/services/page.tsx`

**Interfaces:**
- Consumes: `planDetails`, `comparison`, `tiers` (for tier badge colors).
- [ ] Step 1: PlanSection — alternating layout; definition rows; special blocks: Private stats (≤1%/≤5%/15%), Sovereign qualification ladder (HKSI/SFC/IIQE/IQE), Apex four modules + career arrow 分析師→經理→助理副總裁→副總裁 with quote
- [ ] Step 2: ComparisonTable — dot matrix, sticky first column, horizontal scroll on mobile, crowned Apex column
- [ ] Step 3: `npm run build`; commit `feat: services page with plan details and comparison table`

### Task 7: FAQ + 聯繫我們

**Files:**
- Create: `app/faq/page.tsx`, `app/contact/page.tsx`

**Interfaces:**
- Consumes: `faq`, `contact`.
- [ ] Step 1: FAQ — WST-style numbered 01–04 static list, bold question, indented answer
- [ ] Step 2: Contact — "Tailored. Expert. Prestigious." echo, info block (email/電話/WhatsApp/地址 placeholders), presentational form (name/email/message, no submit backend)
- [ ] Step 3: `npm run build`; commit `feat: FAQ and contact pages`

### Task 8: Visual verification & polish

- [ ] Step 1: Run dev server, screenshot all 5 pages (desktop + mobile viewport), fix layout issues
- [ ] Step 2: Final `npm run build`; commit `fix: responsive polish`

### Task 9: GitHub connection (guided, user in the loop)

- [ ] Step 1: User creates empty repo on github.com (no README) — provide exact click-path
- [ ] Step 2: `git remote add origin <url>` + `git push -u origin main`
- [ ] Step 3: Explain optional free hosting (GitHub Pages via static export or Vercel) as follow-up
