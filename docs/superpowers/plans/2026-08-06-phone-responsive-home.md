# Phone-Responsive Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make homepage image text fully readable and logo-wall rows even on phones while preserving the existing tablet and desktop design.

**Architecture:** Add narrowly scoped responsive class names to `HomeExperience` and define their desktop values plus phone-only overrides in `app/globals.css` at `max-width: 639px`. Use one logo set: its category wrappers become `display: contents` on phones so all 20 logos flow through one two-column grid, then return to the existing four grouped rows from the `sm` breakpoint upward.

**Tech Stack:** Next.js 16 App Router, React, Tailwind CSS, global CSS media queries, Node test runner.

## Global Constraints

- Phone-only changes apply below `640px`.
- Existing laptop and PC layout remains unchanged at `640px` and above.
- Homepage hero and gallery captions must wrap without horizontal clipping.
- Mobile logo wall must have exactly two visible logos per row with no singleton row.
- No new runtime dependencies.

---

### Task 1: Lock mobile layout requirements with regression tests

**Files:**
- Create: `tests/home-phone-responsive.test.mjs`
- Read: `components/HomeExperience.tsx`
- Read: `components/PartnerLogos.tsx`
- Read: `app/globals.css`

**Interfaces:**
- Consumes: current homepage components and global stylesheet.
- Produces: server-rendered regression coverage for phone-only hero, caption, and logo-wall output.

- [ ] **Step 1: Write the failing test**

Create tests that fetch the real homepage, require its responsive hero/caption hooks, and verify that the rendered responsive logo wall contains 20 company items and uses a two-column phone grid with grouped desktop rows restored at `sm`.

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `node --test tests/home-phone-responsive.test.mjs`

Expected: FAIL because the responsive classes and flattened phone logo wall do not yet exist.

---

### Task 2: Implement phone-only homepage and logo-wall layout

**Files:**
- Modify: `components/HomeExperience.tsx`
- Modify: `components/PartnerLogos.tsx`
- Modify: `app/globals.css`
- Test: `tests/home-phone-responsive.test.mjs`

**Interfaces:**
- Consumes: `partnerRows` and the existing homepage content.
- Produces: responsive class hooks and one logo wall that changes from a phone-wide grid to grouped desktop rows.

- [ ] **Step 1: Add responsive class hooks to the homepage**

Move fixed title, caption, and viewport-height values from inline styles into named classes while preserving their existing desktop values. Add phone overrides for wrapping, `clamp()` font sizing, reduced padding, safe caption width, and `100svh` viewport sizing.

- [ ] **Step 2: Add the flattened mobile logo grid**

Render one two-column grid and set its category wrappers to `contents` on phones, allowing all 20 logos to form ten complete pairs. Restore the wrappers and existing grouped grids at `sm` so tablet and desktop rendering is unchanged without duplicating logo images.

- [ ] **Step 3: Run the targeted test and verify it passes**

Run: `node --test tests/home-phone-responsive.test.mjs`

Expected: PASS.

- [ ] **Step 4: Run full automated verification**

Run: `npm run lint`

Run: `npx tsc --noEmit`

Run: `node --test tests/*.test.mjs`

Expected: all commands exit successfully with zero test failures.

- [ ] **Step 5: Verify representative viewports visually**

Check `/` at `375x667`, `390x844`, and `430x932`: hero/caption text is fully visible, no horizontal overflow, and every logo row contains two logos. Check `1440x900`: desktop layout and grouped four-row logo wall remain unchanged.

- [ ] **Step 6: Commit and deploy**

Commit the responsive changes to `main`, push to GitHub, wait for the Vercel production deployment, and verify `https://www.tepcareers.com/` at phone and desktop widths.
