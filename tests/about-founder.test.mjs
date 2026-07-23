import assert from "node:assert/strict";
import test from "node:test";

const founderUrl =
  process.env.FOUNDER_TEST_URL ??
  "http://localhost:3000/about?section=founder";

test("founder section displays the updated profile copy", async () => {
  const response = await fetch(founderUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /從私人銀行起點到資產管理公司創始人/);
  assert.match(html, /累積逾 30 年資產管理及家族辦公室實戰經驗/);
  assert.match(html, /金融精英與稀缺內推圈層/);
  assert.doesNotMatch(html, /天恒資產管理有限公司董事長/);
  assert.doesNotMatch(html, /從頂尖投行起點到買方公司合伙人/);
  assert.doesNotMatch(html, /累積逾 10 年資產管理及家族辦公室實戰經驗/);
  assert.doesNotMatch(html, /買方合夥人與稀缺內推圈層/);
});
