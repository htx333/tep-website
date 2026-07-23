# Student Stories Film Poster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Student Stories navy film placeholder with the generated 16:9 finance-mentoring poster.

**Architecture:** Copy the selected generated PNG into `public/`, then render it as a responsive full-bleed `next/image` inside the existing sticky hero. Preserve the current film overlay with a subtle navy gradient and remove only the redundant placeholder caption and skyline SVG.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript, `next/image`, Node.js test runner

## Global Constraints

- Use the generated 1672 × 941 image without altering its people, charts, or composition.
- Preserve the sticky 50vh hero and the white stories-panel cover transition.
- Use `next/image` with `fill`, `object-cover`, and responsive `sizes`.
- Keep the play mark and `Student Stories Film` label.
- Replace `宣傳影片預留位置（16:9）` with `專業導師實戰教學`.
- Remove the decorative skyline SVG.

---

### Task 1: Film poster integration

**Files:**
- Create: `public/student-stories-film-poster.png`
- Modify: `tests/student-stories.test.mjs`
- Modify: `components/StudentStories.tsx`

**Interfaces:**
- Consumes: The generated image at `/Users/xena/.codex/generated_images/019f8ce3-4dd2-78e0-b7b1-c8026d65545f/call_yBRW4OntyoNmqHs9JAxnOcL1.png`.
- Produces: `/stories` HTML containing the poster asset and final film caption.

- [x] **Step 1: Extend the route test**

Add these assertions to `tests/student-stories.test.mjs`:

```js
assert.match(html, /student-stories-film-poster\.png/);
assert.match(html, /專業導師實戰教學/);
assert.doesNotMatch(html, /宣傳影片預留位置/);
```

- [x] **Step 2: Verify RED**

Run: `npm run test:stories`

Expected: FAIL because the poster asset path is absent from the current route.

- [x] **Step 3: Copy and render the generated image**

Copy the selected PNG to `public/student-stories-film-poster.png`.

Import `Image`:

```tsx
import Image from "next/image";
```

Inside the sticky film section, render:

```tsx
<Image
  src="/student-stories-film-poster.png"
  alt="金融業導師在高層會議室向四位大學生講解投資分析"
  fill
  priority
  sizes="100vw"
  className="object-cover object-center"
/>
<div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3D]/20 via-[#0A1F3D]/30 to-[#0A1F3D]/65" />
```

Set the overlay content to `position: relative` and `z-index: 1`, replace the placeholder caption with `專業導師實戰教學`, remove the skyline SVG, and update the component comment to describe the poster.

- [x] **Step 4: Verify GREEN and regressions**

Run: `npm run test:stories`

Expected: one passing test.

Run: `npm run test:booking`

Expected: one passing test.

- [x] **Step 5: Verify build and browser**

Run: `npm run lint`

Expected: exit code 0 with only the two existing `HomeExperience.tsx` image warnings.

Run: `npm run build`

Expected: exit code 0 and `/stories` listed as a static route.

Open `http://localhost:3000/stories` and confirm the poster fills the sticky hero, the central overlay remains readable, the image is not distorted, and the stories panel still scrolls over it.

- [x] **Step 6: Commit**

```bash
git add public/student-stories-film-poster.png components/StudentStories.tsx tests/student-stories.test.mjs docs/superpowers/plans/2026-07-23-student-stories-film-poster.md
git commit -m "feat: add student stories film poster"
```
