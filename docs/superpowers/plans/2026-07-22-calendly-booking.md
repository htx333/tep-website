# Calendly Booking Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder `/booking` scheduler with the supplied Calendly inline widget while preserving booking-type context and leaving `/contact` unchanged.

**Architecture:** Keep the existing App Router page and client-side `BookingFlow` boundary. Reduce `BookingFlow` to URL-driven booking-type navigation and the official Calendly container, and load Calendly's route-specific external script through `next/script` with `afterInteractive`.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript, Tailwind CSS 4, Node.js test runner

## Global Constraints

- Keep the contact information panel and all three booking cards on `/contact` unchanged.
- Preserve navigation to `/booking?type=consult`, `/booking?type=join`, and `/booking?type=partner`.
- Use `https://calendly.com/cs-tepcareers/30min?primary_color=1f4d96` exactly.
- Use `https://assets.calendly.com/assets/external/widget.js` as the Calendly loader.
- Render the widget at a minimum width of 320px and a height of 700px.
- Do not add a second scheduling or submission path.

---

### Task 1: Calendly booking route

**Files:**
- Create: `tests/booking-calendly.test.mjs`
- Modify: `package.json`
- Modify: `components/BookingFlow.tsx`

**Interfaces:**
- Consumes: `bookingTypes: BookingType[]` from `lib/content.ts` and the `type` query parameter from `useSearchParams()`.
- Produces: `/booking?type=<id>` HTML containing `.calendly-inline-widget`, the exact Calendly scheduling URL, and the Calendly external script.

- [x] **Step 1: Write the failing route test**

Create `tests/booking-calendly.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";

const bookingUrl =
  process.env.BOOKING_TEST_URL ?? "http://localhost:3000/booking?type=consult";

test("booking page renders the supplied Calendly inline widget", async () => {
  const response = await fetch(bookingUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /calendly-inline-widget/);
  assert.match(
    html,
    /https:\/\/calendly\.com\/cs-tepcareers\/30min\?primary_color=1f4d96/,
  );
  assert.match(
    html,
    /https:\/\/assets\.calendly\.com\/assets\/external\/widget\.js/,
  );
});
```

Add the package script:

```json
"test:booking": "node --test tests/booking-calendly.test.mjs"
```

- [x] **Step 2: Run the test and verify RED**

Run: `npm run test:booking`

Expected: FAIL because the current booking route does not include `calendly-inline-widget`.

- [x] **Step 3: Replace the placeholder flow with the Calendly widget**

In `components/BookingFlow.tsx`, keep the booking-type query handling and selector, remove the demo date/time/form state, and render:

```tsx
<div
  className="calendly-inline-widget mt-10 w-full overflow-hidden"
  data-url="https://calendly.com/cs-tepcareers/30min?primary_color=1f4d96"
  style={{ minWidth: "320px", height: "700px" }}
/>
<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  strategy="afterInteractive"
/>
```

Import `Script` from `next/script`; retain `Link`, `useSearchParams`, and `bookingTypes` only.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `npm run test:booking`

Expected: PASS with one passing test.

- [x] **Step 5: Verify code quality and production compilation**

Run: `npm run lint`

Expected: exit code 0 with no ESLint errors.

Run: `npm run build`

Expected: exit code 0 and successful static generation of `/booking` and `/contact`.

- [x] **Step 6: Verify the user flow in the browser**

Open `/contact`, confirm the contact panel and three booking cards remain present, select the service consultation card, and verify `/booking?type=consult` displays the selected type plus the loaded Calendly scheduler.

- [x] **Step 7: Commit the implementation**

```bash
git add package.json tests/booking-calendly.test.mjs components/BookingFlow.tsx docs/superpowers/plans/2026-07-22-calendly-booking.md
git commit -m "feat: embed Calendly booking widget"
```
