import assert from "node:assert/strict";
import test from "node:test";

const pageUrl = process.env.FOOTER_TEST_URL ?? "http://localhost:3000/contact";

test("footer provides recognizable external add-friend links", async () => {
  const response = await fetch(pageUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /href="https:\/\/wa\.me\/qr\/AOCRB3QQBPQVC1"[^>]*aria-label="透過 WhatsApp 加入 TEP Careers"/,
  );
  assert.match(
    html,
    /href="https:\/\/u\.wechat\.com\/ICPoniK88f6lVWOX610AqMc\?s=2"[^>]*aria-label="透過微信加入 TEP Careers"/,
  );
  assert.match(html, /target="_blank"/);
  assert.match(html, /data-social-icon="whatsapp"/);
  assert.match(html, /data-social-icon="wechat"/);
});
