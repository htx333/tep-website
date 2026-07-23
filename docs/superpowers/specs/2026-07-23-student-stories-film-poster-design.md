# Student Stories Film Poster Design

## Goal

Replace the navy film placeholder on `/stories` with a generated 16:9 finance-mentoring image while preserving the pinned hero transition and readable film treatment.

## Image

- Photorealistic high-rise finance meeting room with floor-to-ceiling city views.
- One middle-aged Asian finance professional teaches investment analysis beside a candlestick-chart screen.
- Exactly four Asian university students of mixed genders sit around a boardroom table with laptops and notebooks.
- Natural eye contact, realistic posture, soft daylight, restrained navy and steel-blue palette.
- No logos, watermarks, legible chart labels, or extra people.
- Generated output: 1672 × 941 PNG.
- Project asset: `public/student-stories-film-poster.png`.

## Presentation

- Render the image with `next/image` using `fill`, `object-cover`, and responsive `sizes`.
- Keep the current sticky 50vh hero and film overlay.
- Add a subtle navy gradient over the image to protect text contrast.
- Retain the play mark and `Student Stories Film` label as the future-film poster treatment.
- Replace `宣傳影片預留位置（16:9）` with `專業導師實戰教學`.
- Remove the decorative skyline SVG because the generated image already provides the skyline.

## Verification

- Add a route test asserting the generated poster path and replacement caption render on `/stories`.
- Assert the old placeholder caption is absent.
- Verify image dimensions and aspect ratio locally.
- Run the stories and booking route tests, ESLint, production build, and browser visual inspection.
