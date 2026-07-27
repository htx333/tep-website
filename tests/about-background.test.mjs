import assert from "node:assert/strict";
import test from "node:test";

const backgroundUrl =
  process.env.BACKGROUND_TEST_URL ??
  "http://localhost:3000/about?section=background";

test("TEP background displays the revised youth unemployment paragraph", async () => {
  const response = await fetch(backgroundUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /2026年，內地青年失業率高達約19%；全球青年失業率仍高達12\.4%，求職人數攀升，職位供給收縮，就業競爭持續升溫，此乃結構性斷層之徵兆。/,
  );
  assert.doesNotMatch(html, /失業率恐滯留 4% 水平/);
});

test("TEP background labels the closing note as a founder message", async () => {
  const response = await fetch(backgroundUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const visibleHtml = html.replaceAll("<!-- -->", "");
  assert.match(visibleHtml, /—— 創始人寄語/);
  assert.doesNotMatch(visibleHtml, /—— Bruce Cheung/);
});
