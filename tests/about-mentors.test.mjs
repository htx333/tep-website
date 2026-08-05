import assert from "node:assert/strict";
import test from "node:test";

const mentorsUrl =
  process.env.MENTORS_TEST_URL ??
  "http://localhost:3000/about?section=mentors";

test("mentor team displays Szey Wong", async () => {
  const response = await fetch(mentorsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Szey Wong/);
  assert.match(html, /20 餘年亞太金融行業資深資歷/);
  assert.match(html, /豐富金融獵頭及人才顧問經驗/);
  assert.match(html, /廣博的 HR 及金融業界招聘網絡/);
  assert.match(html, /熟悉各類金融職位的面試要求與核心技能組合/);
  assert.match(html, /精準配對人才能力與機構用人需求/);
  assert.doesNotMatch(html, /Szzy Wong/);
  assert.doesNotMatch(html, /為跨國公司構建並執行商業、信貸與合規風控框架/);
  assert.doesNotMatch(html, /管理東南亞機構及超高淨值/);
  assert.doesNotMatch(html, /私募基金及離岸載體設計/);
});
