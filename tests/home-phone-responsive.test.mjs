import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.HOME_BASE_URL ?? "http://localhost:3000";

async function fetchHome() {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  return response.text();
}

test("homepage exposes responsive hooks for phone-safe hero and gallery text", async () => {
  const html = await fetchHome();

  assert.match(html, /home-motto-copy/);
  assert.match(html, /home-motto-title/);
  assert.match(html, /home-gallery-sticky/);
  assert.match(html, /home-gallery-caption/);
});

test("phone logo wall renders twenty companies as complete two-logo rows", async () => {
  const html = await fetchHome();
  const wallStart = html.indexOf('data-logo-wall-responsive="true"');

  assert.notEqual(wallStart, -1, "responsive logo wall should be rendered");

  const wallMarkup = html.slice(wallStart, html.indexOf("And more", wallStart));
  assert.match(wallMarkup, /grid-cols-2/);
  assert.match(wallMarkup, /sm:block/);
  assert.equal(
    [...wallMarkup.matchAll(/data-mobile-company-name=/g)].length,
    20,
    "twenty logos should form ten complete rows on phones",
  );
});
