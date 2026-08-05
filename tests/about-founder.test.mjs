import assert from "node:assert/strict";
import test from "node:test";

const founderUrl =
  process.env.FOUNDER_TEST_URL ??
  "http://localhost:3000/about?section=founder";

test("founder tab is removed and its legacy URL falls back to TEP background", async () => {
  const response = await fetch(founderUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /TEP 背景/);
  assert.doesNotMatch(html, /href="\/about\?section=founder"/);
  assert.doesNotMatch(html, /從私人銀行起點到資產管理公司創始人/);
});
