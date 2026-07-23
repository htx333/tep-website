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
