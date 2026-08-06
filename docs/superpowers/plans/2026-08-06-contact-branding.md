# Contact Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the contact-panel copy and replace the browser-tab icon with the supplied TEP Careers logo while preserving the existing phone-responsive interface.

**Architecture:** Keep contact data centralized in `lib/content.ts`, remove the obsolete note from the contact page, and use Next.js App Router's file-based `app/icon.png` metadata convention. Remove the legacy `app/favicon.ico` so only the new TEP icon is advertised to browsers.

**Tech Stack:** Next.js 16 App Router, React, Node test runner, Vercel Git deployment.

## Global Constraints

- Display the website as `tepcareers.com`.
- Remove `以上資訊將於正式營運前更新。` from the contact widget.
- Use `/Users/xena/Documents/Infinity AM/TEP/TEP logo/TEP logo.png` unchanged as the browser-tab icon.
- Preserve all phone-only responsive rules introduced in commit `b232092`.
- Commit to `main` and verify the resulting Vercel production deployment.

---

### Task 1: Protect the requested contact and favicon behavior

**Files:**
- Modify: `tests/contact-info.test.mjs`
- Create: `tests/site-icon.test.mjs`

**Interfaces:**
- Consumes: rendered `/contact` and `/` responses from the local Next.js server.
- Produces: regression coverage for the public contact copy and favicon metadata.

- [x] **Step 1: Add the failing contact assertions**

Assert that `/contact` renders `tepcareers.com` and does not render `以上資訊將於正式營運前更新。`.

- [x] **Step 2: Add the failing favicon test**

Fetch `/`, extract the `rel="icon"` URL, require it to start with `/icon.png`, then fetch that URL and require an `image/png` response.

- [x] **Step 3: Verify the tests fail for the intended reasons**

Run: `node --test tests/contact-info.test.mjs tests/site-icon.test.mjs`

Expected: FAIL because the old website copy and `favicon.ico` are still rendered.

---

### Task 2: Implement contact and icon changes

**Files:**
- Modify: `lib/content.ts`
- Modify: `app/contact/page.tsx`
- Delete: `app/favicon.ico`
- Create: `app/icon.png`

**Interfaces:**
- Consumes: the existing `contact` object and the supplied PNG artwork.
- Produces: updated contact markup and Next.js favicon metadata at `/icon.png`.

- [x] **Step 1: Update contact copy**

Set `contact.website` to `tepcareers.com` and remove the temporary-information paragraph from `app/contact/page.tsx`.

- [x] **Step 2: Replace the favicon**

Copy the supplied PNG to `app/icon.png` without modifying its pixels, then remove `app/favicon.ico`.

- [x] **Step 3: Verify targeted tests pass**

Run: `node --test tests/contact-info.test.mjs tests/site-icon.test.mjs`

Expected: PASS.

---

### Task 3: Verify and deploy

**Files:**
- Verify: all changed files

**Interfaces:**
- Consumes: the completed working tree.
- Produces: a verified GitHub `main` commit and Ready Vercel production deployment.

- [x] **Step 1: Run complete verification**

Run: `node --test tests/*.test.mjs`

Run: `npm run lint`

Run: `npx tsc --noEmit`

Run: `npm run build`

- [x] **Step 2: Verify desktop and phone views**

Check `/contact` and `/` at `390x844` and `1440x900`. Confirm the updated copy, TEP icon metadata, no mobile overflow, two-logo phone rows, and four five-logo desktop rows.

- [ ] **Step 3: Commit and deploy**

Commit all changes to `main`, push `origin main`, wait for Vercel Production status `Ready`, and verify `https://www.tepcareers.com/contact` plus the live icon asset.
