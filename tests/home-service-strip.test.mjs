import assert from "node:assert/strict";
import test from "node:test";

const homeUrl = process.env.HOME_TEST_URL ?? "http://localhost:3000/";

test("service photo strip exposes a mouse-and-keyboard operable progress scrollbar", async () => {
  const response = await fetch(homeUrl);
  assert.equal(response.status, 200);

  const html = await response.text();

  assert.match(html, /id="service-card-strip"/);
  assert.match(html, /data-service-strip-progress="true"/);
  assert.match(html, /role="scrollbar"/);
  assert.match(html, /aria-controls="service-card-strip"/);
  assert.match(html, /tabindex="0"/);
  assert.match(html, /aria-label="瀏覽五個服務計畫"/);
});
