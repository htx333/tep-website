# Student Stories Copy Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the three placeholder student-story cards with distinct service-grounded narratives and remove the non-functional load-more button.

**Architecture:** Keep the existing `StudentStories` component and responsive card grid. Change only the three placeholder entries in its local `STORIES` data and delete the `載入更多` button wrapper; verify the rendered `/stories` route with a focused Node route test.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript, Tailwind CSS 4, Node.js test runner

## Global Constraints

- Keep all six story cards, existing dates, first-person quotation style, film section, CTA band, navigation, and contact link.
- Story 1 must describe a capable student who received no offers before TEP and gains three guaranteed internship opportunities.
- Story 2 must describe an ultra-high-net-worth family successor through investment analysis and portfolio responsibility, without repeating the existing leadership, governance, or family-alliance story.
- Story 3 must map to the Premier plan through intelligent matching, priority final-round access, and in-person interview practice.
- Remove the `載入更多` button entirely.

---

### Task 1: Complete the student stories

**Files:**
- Create: `tests/student-stories.test.mjs`
- Modify: `package.json`
- Modify: `components/StudentStories.tsx`

**Interfaces:**
- Consumes: The rendered `/stories` route from `app/stories/page.tsx`.
- Produces: Six completed story cards with no placeholder copy or load-more control.

- [x] **Step 1: Write the failing route test**

Create `tests/student-stories.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";

const storiesUrl =
  process.env.STORIES_TEST_URL ?? "http://localhost:3000/stories";

test("student stories contain the three completed cases without placeholders", async () => {
  const response = await fetch(storiesUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /王同學 — 從零 Offer 到 3 份實習保障/);
  assert.match(html, /趙同學 — 建立獨立投資判斷/);
  assert.match(html, /周同學 — 從海投失焦到精準終面/);
  assert.match(html, /3 份實習機會保障/);
  assert.match(html, /系統智能內推/);
  assert.doesNotMatch(html, /案例標題預留|案例摘要預留/);
  assert.doesNotMatch(html, /載入更多/);
});
```

Add this package script:

```json
"test:stories": "node --test tests/student-stories.test.mjs"
```

- [x] **Step 2: Run the test and verify RED**

Run: `npm run test:stories`

Expected: FAIL because the first expected title is absent from the current page.

- [x] **Step 3: Replace the three placeholder stories**

Replace entries four through six in `STORIES` with:

```tsx
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
```

Delete the wrapper `<div>` and `<button>` whose visible text is `載入更多`.

- [x] **Step 4: Run focused and existing tests**

Run: `npm run test:stories`

Expected: one passing test.

Run: `npm run test:booking`

Expected: one passing test.

- [x] **Step 5: Verify compilation and presentation**

Run: `npm run lint`

Expected: exit code 0, with only the two existing `HomeExperience.tsx` image warnings.

Run: `npm run build`

Expected: exit code 0 and `/stories` listed as a static route.

Open `http://localhost:3000/stories` and confirm six completed cards render in the existing grid, all text is legible, and no `載入更多` control appears.

- [x] **Step 6: Commit**

```bash
git add package.json components/StudentStories.tsx tests/student-stories.test.mjs docs/superpowers/plans/2026-07-23-student-stories-copy.md
git commit -m "feat: complete student story cases"
```
