import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.HOME_BASE_URL ?? "http://localhost:3000";

async function fetchHtml(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `${path} should return 200`);
  return response.text();
}

test("guidance chart can grow to its authored width on large monitors", async () => {
  const html = await fetchHtml("/system");

  assert.match(html, /data-guidance-responsive-frame="true"/);
  assert.match(html, /max-w-\[1980px\]/);
});

test("navbar exposes Traditional and Simplified Chinese controls", async () => {
  const html = await fetchHtml("/");

  assert.match(html, /data-language-switcher="desktop"/);
  assert.match(html, /data-language-switcher="mobile"/);
  assert.match(html, /aria-label="使用繁體中文"/);
  assert.match(html, /aria-label="使用簡體中文"/);
});
