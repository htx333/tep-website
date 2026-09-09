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

test("mentor team displays Leanna Chan as the second mentor", async () => {
  const response = await fetch(mentorsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Leanna Chan/);
  assert.match(html, /首席面試官/);
  assert.match(html, /美國南加州大學金融學士/);
  assert.match(html, /特許金融分析師（CFA）持證人/);
  assert.match(html, /瑞士盈豐銀行、德意志銀行、瑞信私人銀行、瑞信寶盛銀行/);
  assert.match(html, /20年以上私人銀行業務及資產管理經驗/);
  assert.match(html, /高增值客戶提供資產管理服務/);
  assert.match(html, /\/team\/leanna\.jpeg/);
});

test("mentor team displays Richard Lim as the third mentor", async () => {
  const response = await fetch(mentorsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Richard Lim/);
  assert.match(html, /首席職涯導師/);
  assert.match(html, /逾 15 年金融市場及投資銀行經驗/);
  assert.match(html, /Sun Hung Kai &amp; Co\. 交易副總裁/);
  assert.match(html, /瑞信（Credit Suisse）及瑞銀（UBS）/);
  assert.match(html, /特許金融分析師（CFA）及金融風險管理師（FRM）/);
  assert.match(html, /英國埃克塞特大學金融分析及基金管理碩士學位/);
  assert.match(html, /管理逾 2 億美元的全球長短倉股票投資組合/);
  assert.match(html, /有志投身交易、投資銀行及資產管理的學生/);
  assert.match(html, /\/team\/richard-lim\.jpeg/);
});

test("Richard Lim's portrait is available to mentor-page visitors", async () => {
  const response = await fetch("http://localhost:3000/team/richard-lim.jpeg");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^image\/jpeg/);
});
