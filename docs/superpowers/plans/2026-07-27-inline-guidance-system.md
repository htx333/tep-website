# Inline Guidance System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the existing guidance progression on `/services` between the plan overview and comparison while retaining the Service dropdown and `/system`.

**Architecture:** Import and reuse `ServicePlansFlowchart` in the existing App Router service page. Wrap it in a uniquely identified section that matches the standalone route's presentation; do not duplicate flowchart data or behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Node.js test runner

## Global Constraints

- Preserve the existing Service dropdown and its three items.
- Preserve the standalone `/system` route.
- Render the same `ServicePlansFlowchart` component in both locations.
- Place `#guidance` after the overview and before `#comparison`.

---

### Task 1: Inline guidance progression

**Files:**
- Modify: `tests/services-content.test.mjs`
- Modify: `app/services/page.tsx`

**Interfaces:**
- Consumes: `ServicePlansFlowchart` from `@/components/ServicePlansFlowchart`.
- Produces: A `/services#guidance` section ordered before `/services#comparison`.

- [ ] **Step 1: Write the failing route test**

Extend the `/services` route assertions:

```js
const overviewIndex = services.indexOf("五大服務計畫");
const guidanceIndex = services.indexOf('id="guidance"');
const comparisonIndex = services.indexOf('id="comparison"');

assert.ok(guidanceIndex > overviewIndex);
assert.ok(comparisonIndex > guidanceIndex);
assert.match(services, /輔導服務・遞升路徑/);
assert.match(services, /Foundation/);
assert.match(services, /Apex/);
```

- [ ] **Step 2: Run RED**

Run:

```bash
node --test tests/services-content.test.mjs
```

Expected: failure because `/services` does not yet contain `id="guidance"`.

- [ ] **Step 3: Add the inline section**

Import `ServicePlansFlowchart` in `app/services/page.tsx`, then render:

```tsx
<section
  id="guidance"
  className="scroll-mt-24 px-4 py-16 sm:px-6"
  style={{
    background:
      "linear-gradient(180deg, #dde7f2 0%, #e7eef5 45%, #ffffff 100%)",
  }}
>
  <div className="mx-auto max-w-[1280px]">
    <ServicePlansFlowchart />
    <p className="mt-4 text-center text-xs text-ink-faint">
      將游標移至各進階計畫的「計畫內容」標題，即可展開該級已含的前級服務。
    </p>
  </div>
</section>
```

- [ ] **Step 4: Run GREEN**

Run:

```bash
node --test tests/services-content.test.mjs tests/navigation-services.test.mjs
```

Expected: all tests pass.

- [ ] **Step 5: Verify and commit**

Run:

```bash
node --test tests/*.test.mjs
npm run lint
npm run build
```

Verify `/services` in the browser at desktop and mobile widths, then commit:

```bash
git add app/services/page.tsx tests/services-content.test.mjs docs/superpowers
git commit -m "feat: show guidance system on services"
```
