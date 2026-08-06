import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.HOME_BASE_URL ?? "http://localhost:3000";

test("site advertises the supplied TEP PNG as its browser icon", async () => {
  const homeResponse = await fetch(`${baseUrl}/`);
  assert.equal(homeResponse.status, 200);

  const html = await homeResponse.text();
  const iconMatch = html.match(/<link rel="icon" href="([^"]+)"/);
  assert.ok(iconMatch, "home page should advertise a browser icon");
  assert.match(iconMatch[1], /^\/icon\.png(?:\?|$)/);

  const iconResponse = await fetch(new URL(iconMatch[1], baseUrl));
  assert.equal(iconResponse.status, 200);
  assert.match(iconResponse.headers.get("content-type") ?? "", /^image\/png/);
});
