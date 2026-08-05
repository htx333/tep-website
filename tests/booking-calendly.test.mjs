import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.BOOKING_BASE_URL ?? "http://localhost:3000";

test("all three contact intents use the same required personal-information form", async () => {
  for (const type of ["consult", "join", "partner"]) {
    const response = await fetch(`${baseUrl}/booking?type=${type}`);
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, /<form\b[^>]*data-contact-form="true"/);
    const inputs = [...html.matchAll(/<input\b[^>]*>/g)].map(([tag]) => tag);
    const nameInput = inputs.find((tag) => /name="name"/.test(tag));
    const phoneInput = inputs.find((tag) => /name="phone"/.test(tag));
    const emailInput = inputs.find((tag) => /name="email"/.test(tag));

    assert.match(nameInput ?? "", /required/);
    assert.match(phoneInput ?? "", /type="tel"/);
    assert.match(phoneInput ?? "", /required/);
    assert.match(emailInput ?? "", /type="email"/);
    assert.match(emailInput ?? "", /required/);
    assert.match(html, new RegExp(`name="inquiryType"[^>]*value="${type}"`));
  }
});

test("booking no longer loads Calendly", async () => {
  const response = await fetch(`${baseUrl}/booking?type=consult`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.doesNotMatch(html, /calendly/i);
});

test("contact form submits to the website instead of opening the client's email", async () => {
  const response = await fetch(`${baseUrl}/booking?type=consult`);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.doesNotMatch(html, /mailto:/i);
  assert.doesNotMatch(html, /以電郵傳送資料/);
  assert.match(html, /提交聯絡資料/);
});
