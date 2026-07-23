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
  assert.doesNotMatch(html, /Szzy Wong/);
});
