import assert from "node:assert/strict";
import test from "node:test";

const contactUrl =
  process.env.CONTACT_TEST_URL ?? "http://localhost:3000/contact";

test("contact panel shows current phone, LinkedIn, and WeChat details", async () => {
  const response = await fetch(contactUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    />電話<\/dt><dd[^>]*>\+852 60990937<\/dd>/,
  );
  assert.match(
    html,
    /href="https:\/\/www\.linkedin\.com\/in\/tep-careers-085a70425"[^>]*>https:\/\/www\.linkedin\.com\/in\/tep-careers-085a70425<\/a>/,
  );
  assert.match(html, />微信<\/dt><dd[^>]*>TEP_Careers<\/dd>/);
  assert.doesNotMatch(html, /流動電話/);
  assert.doesNotMatch(html, /blablabla/);
});

test("all contact cards open the shared information form and offer direct social contact", async () => {
  const response = await fetch(contactUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /href="\/booking\?type=consult"/);
  assert.match(html, /href="\/booking\?type=join"/);
  assert.match(html, /href="\/booking\?type=partner"/);
  assert.match(html, /href="https:\/\/wa\.me\/qr\/AOCRB3QQBPQVC1"[^>]*data-contact-social="whatsapp"/);
  assert.match(html, /href="https:\/\/u\.wechat\.com\/ICPoniK88f6lVWOX610AqMc\?s=2"[^>]*data-contact-social="wechat"/);
  assert.match(html, /不使用電郵？你也可以直接聯絡我們/);
});
