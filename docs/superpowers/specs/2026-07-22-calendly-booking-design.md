# Calendly Booking Integration Design

## Goal

Replace the placeholder booking calendar and contact form on `/booking` with the provided Calendly inline widget while preserving the existing contact-page layout and booking-card navigation.

## User Flow

1. A visitor opens `/contact` and sees the existing contact information panel and three booking cards.
2. Selecting a card continues to navigate to `/booking?type=consult`, `/booking?type=join`, or `/booking?type=partner`.
3. The booking page retains the selected booking type and its description above the scheduler.
4. The visitor completes the appointment through Calendly's embedded 30-minute booking flow.

## Architecture

- Leave `app/contact/page.tsx` unchanged.
- Keep `app/booking/page.tsx` as the route-level Server Component and retain its heading and Suspense boundary.
- Simplify `components/BookingFlow.tsx` to retain the booking-type selector and description, then render the official Calendly inline container.
- Load `https://assets.calendly.com/assets/external/widget.js` with Next.js `next/script` using the `afterInteractive` strategy. This follows the installed Next.js 16 guidance for route-specific third-party scripts.
- Use the exact scheduling URL `https://calendly.com/cs-tepcareers/30min?primary_color=1f4d96` and preserve the required minimum width and 700px height.

## Components and Data Flow

`BookingFlow` reads the existing `type` search parameter and resolves it against `bookingTypes`. Unknown values continue to fall back to the first booking type. The selected type controls only the explanatory copy and active selector styling; all three types use the same Calendly event URL supplied by the user.

The Calendly script discovers the rendered `.calendly-inline-widget` element through its `data-url` attribute and initializes the scheduler in the browser. Calendly owns date selection, time selection, form validation, submission, confirmation, and notification delivery.

## Failure Behavior

The page heading, booking-type controls, and description remain visible if the third-party script is delayed or blocked. The widget keeps a fixed-height area to avoid layout shift. No custom fallback scheduler or duplicate submission path will be retained.

## Testing and Verification

- Add a route-level Node test that requests `/booking?type=consult` from the running development server and asserts that the response contains the Calendly widget class, exact scheduling URL, and external script URL.
- Run the test before implementation and confirm it fails because the widget is absent.
- Implement the smallest page change needed and rerun the test until it passes.
- Run ESLint and a production build.
- Inspect `/contact` and `/booking?type=consult` in the browser to confirm the contact layout is unchanged, card navigation works, the correct booking type remains selected, and the Calendly scheduler renders.

## Out of Scope

- Different Calendly event types for the three booking categories.
- Calendly API integration, webhooks, or custom confirmation handling.
- Changes to contact information or the design of the three booking cards.
