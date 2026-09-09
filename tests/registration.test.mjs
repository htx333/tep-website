import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.REGISTRATION_BASE_URL ?? "http://localhost:3000";

test("registration page is available from the primary navigation", async () => {
  const response = await fetch(`${baseUrl}/registration`);
  assert.equal(response.status, 200);

  const html = await response.text();
  const registrationIndex = html.indexOf('href="/registration">報名');
  const contactIndex = html.indexOf('href="/contact">聯繫我們');

  assert.ok(registrationIndex >= 0, "Registration should be a primary navigation item");
  assert.ok(contactIndex > registrationIndex, "Registration should appear before contact");
  assert.match(html, /data-registration-form="true"/);
  assert.match(html, /name="nameEn"/);
  assert.match(html, /name="university"/);
  assert.match(html, /name="primaryGoal"/);
  assert.match(html, /name="privacyConsent"/);
});

test("registration API rejects incomplete submissions before storage", async () => {
  const response = await fetch(`${baseUrl}/api/registration`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nameEn: "Test User",
      email: "invalid-email",
      whatsapp: "",
    }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "請完整填寫所有必填欄位。",
  });
});
