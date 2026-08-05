import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.CONTACT_BASE_URL ?? "http://localhost:3000";

test("contact API rejects incomplete personal information before any database write", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      inquiryType: "consult",
      name: "Test User",
      phone: "",
      email: "invalid-email",
    }),
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "請填寫有效的姓名、電話號碼及聯絡電郵。",
  });
});
