# Student Stories Copy Completion Design

## Goal

Replace the three placeholder student-story cards with credible Traditional Chinese narratives grounded in the service details from `TEP Pitch.pdf`, and remove the non-functional `載入更多` button.

## Content Direction

Keep the existing first-person quotation format, card layout, dates, and anonymized surname convention. Each new story must present a distinct starting problem, TEP intervention, and measurable outcome.

### Story 1: Capable student without offers

- Title: `王同學 — 從零 Offer 到 3 份實習保障`
- Starting point: Strong academic and professional foundation, but repeated applications produce no offer and growing frustration.
- TEP intervention: Reposition the search strategy, correct CV and interview blind spots, and provide three guaranteed internship opportunities.
- Outcome: A clear route toward experience that can convert into a full-time offer.

### Story 2: UHNW next-generation investor

- Title: `趙同學 — 建立獨立投資判斷`
- Starting point: Access to family investments but insufficient confidence to assess complex products or challenge advisers.
- TEP intervention: A banker with more than 20 years of experience teaches multi-asset allocation, SAA/TAA, technical analysis, and trust structures through practical work.
- Outcome: The student can prepare investment memoranda, evaluate risk and return, and contribute evidence-based recommendations in family investment meetings.
- Distinction from the existing family successor story: Focus on investment analysis and portfolio responsibility, not leadership, family governance, or networking.

### Story 3: Premier plan

- Title: `周同學 — 從海投失焦到精準終面`
- Starting point: Broad but unfocused applications across investment banking, asset management, and consulting cause the CV to be screened out.
- TEP intervention: Premier intelligent matching, priority final-round access, and role-specific in-person mock interviews with detailed feedback.
- Outcome: A coherent career narrative and an asset-management offer.

## Interface Changes

- Preserve all six cards and the current three-column responsive grid.
- Remove only the wrapper and button labeled `載入更多`.
- Do not change the film placeholder, CTA band, navigation, or contact link.

## Verification

- Add a route test that confirms the three new titles and representative outcome phrases render on `/stories`.
- Assert that placeholder copy and `載入更多` are absent.
- Run the focused route test red then green, the existing booking test, ESLint, a production build, and browser verification on `/stories`.
