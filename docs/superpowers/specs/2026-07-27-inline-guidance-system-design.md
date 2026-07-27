# Inline Guidance System Design

## Goal

Display the existing 「輔導服務・遞升路徑」 directly on `/services`, between the five-plan overview and 「項目比對」, while preserving the Service dropdown and standalone `/system` route.

## Chosen Approach

Reuse `ServicePlansFlowchart` inside a new `#guidance` section in `app/services/page.tsx`. This keeps one source of truth for the interactive five-tier flowchart and avoids the maintenance, accessibility, and responsive-layout costs of an iframe or duplicated markup.

## Page Structure

The `/services` page order will be:

1. Five-plan heading and overview cards
2. `#guidance` section containing `ServicePlansFlowchart`
3. `#comparison` section containing `ComparisonTable`

The inline section will use the same pale-blue gradient and width constraints as `/system`. Its explanatory interaction note will remain visible below the flowchart.

## Navigation

No dropdown item will be removed or renamed. The existing Service dropdown continues to contain:

1. 五大服務計畫
2. 輔導遞升系統
3. 項目比對

`輔導遞升系統` continues to link to `/system`, so the focused standalone view remains available.

## Verification

A route test will assert that the rendered `/services` HTML contains `id="guidance"` after the overview content and before `id="comparison"`, and that the five flowchart tiers render inline. Existing navigation tests will continue to prove that the dropdown is retained.
