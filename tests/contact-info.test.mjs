import assert from "node:assert/strict";
import test from "node:test";

const contactUrl =
  process.env.CONTACT_TEST_URL ?? "http://localhost:3000/contact";

test("contact panel shows the current phone and a blank LinkedIn row", async () => {
  const response = await fetch(contactUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, />電話<\/dt><dd class="text-sm text-ink">60990937<\/dd>/);
  assert.match(
    html,
    />LinkedIn<\/dt><dd class="text-sm text-ink"><\/dd>/,
  );
  assert.doesNotMatch(html, /流動電話/);
});
