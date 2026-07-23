import assert from "node:assert/strict";
import test from "node:test";

const storiesUrl =
  process.env.STORIES_TEST_URL ?? "http://localhost:3000/stories";

test("student stories contain the three completed cases without placeholders", async () => {
  const response = await fetch(storiesUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /王同學 — 從零 Offer 到 3 份實習保障/);
  assert.match(html, /趙同學 — 建立獨立投資判斷/);
  assert.match(html, /周同學 — 從海投失焦到精準終面/);
  assert.match(html, /3 份實習機會保障/);
  assert.match(html, /系統智能內推/);
  assert.doesNotMatch(html, /案例標題預留|案例摘要預留/);
  assert.doesNotMatch(html, /載入更多/);
});
