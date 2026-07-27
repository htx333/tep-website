# Service Content and Navigation Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the guidance progression page into the Service menu and align all service and background copy with the 2026-07-27 TEP Pitch.

**Architecture:** Keep the current Next.js routes and presentation components. Update the central content model in `lib/content.ts`, make the Navbar own a Service dropdown, add an anchor to the existing comparison section, and synchronize the standalone flowchart constants with the same Pitch vocabulary.

**Tech Stack:** Next.js 16.2.10 App Router, React 19, TypeScript, Node.js test runner, Tailwind CSS

## Global Constraints

- Use pages 5-11 of `/Users/xena/Documents/Infinity AM/TEP Pitch.pdf` as the only service-copy source.
- Keep all five existing service URLs and `/system`.
- Order the Service dropdown as `五大服務計畫`, `輔導遞升系統`, `項目比對`.
- Keep FAQ as a direct link with no `/system` ownership.
- Use the user-supplied TEP background sentence verbatim.
- Preserve the current visual language and cumulative-plan behavior.

---

### Task 1: Navigation ownership and TEP background

**Files:**
- Create: `tests/navigation-services.test.mjs`
- Create: `tests/about-background.test.mjs`
- Modify: `components/Navbar.tsx`
- Modify: `lib/content.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `navLinks` and the existing `/services`, `/system`, `/faq`, and `/about?section=background` routes.
- Produces: A Service dropdown with `/system` above `/services#comparison`, plus the exact new background paragraph.

- [x] **Step 1: Write failing route tests**

```js
assert.match(
  servicesHtml,
  /href="\/services">五大服務計畫[\s\S]*href="\/system">輔導遞升系統[\s\S]*href="\/services#comparison">項目比對/,
);
assert.match(
  backgroundHtml,
  /2026年，內地青年失業率高達約19%；全球青年失業率仍高達12\.4%/,
);
```

- [x] **Step 2: Run RED**

Run:

```bash
node --test tests/navigation-services.test.mjs tests/about-background.test.mjs
```

Expected: both tests fail because the old FAQ dropdown and old background paragraph remain.

- [x] **Step 3: Implement navigation and copy**

In `components/Navbar.tsx`, define:

```ts
const serviceItems = [
  { href: "/services", label: "五大服務計畫" },
  { href: "/system", label: "輔導遞升系統" },
  { href: "/services#comparison", label: "項目比對" },
];
```

Render the dropdown from the `/services` navigation item on desktop and mobile, mark it active for `/services`, `/services/*`, and `/system`, and render FAQ as a normal link.

Replace `background.sections[0].body` with the exact supplied sentence.

- [x] **Step 4: Run GREEN**

Run the two tests from Step 2 and expect two passes.

---

### Task 2: Pitch-aligned service plans and comparison

**Files:**
- Create: `tests/services-content.test.mjs`
- Modify: `lib/content.ts`
- Modify: `components/ComparisonTable.tsx`
- Modify: `components/PlanSection.tsx`
- Modify: `app/services/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: `tiers`, `planDetails`, and `comparison` from `lib/content.ts`.
- Produces: Five summary cards, five detail routes, and a price-bearing comparison matrix matching the Pitch.

- [x] **Step 1: Write a failing service-content test**

Fetch `/services` and each `/services/[tier]` route. Assert the rendered HTML includes:

```js
"HKD20,000"
"HKD2,000,000"
"金融行業深度分析"
"2日線下培訓"
"精準篩選高契合度職位"
"提供專業錄影及後期剪輯"
"SFC Type 1, 4, 9"
"家族治理（家族憲章擬定）"
```

Assert the old summary labels `金融行業簡介` and `線下面試技巧打磨` are not used for the Premier or Private added service.

- [x] **Step 2: Run RED**

Run:

```bash
node --test tests/services-content.test.mjs
```

Expected: failure on Pitch-only labels, descriptions, and pricing.

- [x] **Step 3: Update `lib/content.ts`**

Synchronize `tiers` and `planDetails` with the five Pitch plans. Extend `ComparisonPlan` with:

```ts
metal: string;
price: string;
```

Assign `HKD20,000`, `HKD50,000`, `HKD200,000`, `HKD500,000`, and `HKD2,000,000` in order.

- [x] **Step 4: Update presentation components**

Show each plan's price and metal in `ComparisonTable.tsx`. Change the statistics grid in `PlanSection.tsx` to support four Private statistics. Add `id="comparison"` and `scroll-mt-24` to the comparison section in `app/services/page.tsx`.

- [x] **Step 5: Run GREEN**

Run `node --test tests/services-content.test.mjs` and expect one pass.

---

### Task 3: Pitch-aligned guidance progression

**Files:**
- Modify: `tests/services-content.test.mjs`
- Modify: `components/ServicePlansFlowchart.tsx`

**Interfaces:**
- Consumes: The five cumulative service tiers.
- Produces: `/system` with the same service labels and Pitch-derived outcomes as `/services`.

- [x] **Step 1: Extend the test and verify RED**

Assert `/system` includes:

```js
"金融行業深度分析"
"錄像面試準備"
"專業資格賦能"
"20年+資歷銀行家親授"
"交易、家族治理、信託及家族聯盟全維度賦能"
```

Run the service-content test and expect failure on the old flowchart labels.

- [x] **Step 2: Update flowchart constants**

Set:

```ts
const FOUNDATION = ["金融行業深度分析", "職涯諮詢", "簡歷精修", "線下面試技巧打磨"];
const PREMIER_ADD = ["優先終面機會", "系統智能內推", "錄像面試準備"];
const PRIVATE_ADD = ["在職導師內推", "實習機會保障", "錄像面試準備"];
```

Use Pitch-derived outcome summaries for all five stations.

- [x] **Step 3: Run GREEN**

Run the service-content test and expect all assertions to pass.

---

### Task 4: Final verification and commit

**Files:**
- Modify: `docs/superpowers/plans/2026-07-27-service-content-navigation-refresh.md`

**Interfaces:**
- Consumes: All updated routes and tests.
- Produces: A verified commit on local `main`.

- [x] **Step 1: Run the full route suite**

```bash
node --test tests/*.test.mjs
```

Expected: all tests pass.

- [x] **Step 2: Run lint and build**

```bash
npm run lint
npm run build
```

Expected: lint exits 0 with only the two pre-existing `HomeExperience.tsx` warnings; build exits 0.

- [x] **Step 3: Browser verification**

Verify desktop and mobile navigation plus:

- `/about?section=background`
- `/services`
- `/services/foundation`
- `/services/premier`
- `/services/private`
- `/services/sovereign`
- `/services/apex`
- `/system`

- [x] **Step 4: Commit**

```bash
git add components/Navbar.tsx components/ComparisonTable.tsx components/PlanSection.tsx components/ServicePlansFlowchart.tsx app/services/page.tsx lib/content.ts package.json tests docs/superpowers/plans/2026-07-27-service-content-navigation-refresh.md
git commit -m "feat: align services with latest pitch"
```
