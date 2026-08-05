import assert from "node:assert/strict";
import test from "node:test";

const apexUrl =
  process.env.APEX_TEST_URL ?? "http://localhost:3000/services/apex";

test("Apex compares the TEP development path with the traditional banking path before its four modules", async () => {
  const response = await fetch(apexUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const pathIndex = html.indexOf('data-testid="apex-development-path"');
  const moduleIndexes = ["交易", "家族治理", "信託", "家族聯盟"].map(
    (title) => html.indexOf(`>${title}</h3>`),
  );

  assert.ok(pathIndex >= 0, "Apex should render a dedicated development path");
  assert.ok(
    moduleIndexes.every((index) => index > pathIndex),
    "The development path should render before all four module cards",
  );

  const pathHtml = html.slice(pathIndex, Math.min(...moduleIndexes));
  assert.match(pathHtml, /TEP 深造路徑/);
  assert.match(pathHtml, /現況盤點/);
  assert.doesNotMatch(pathHtml, /專屬診斷/);
  assert.match(pathHtml, /border-gold/);
  assert.match(pathHtml, /bg-gold\/10/);
  assert.match(pathHtml, /（深造起點）/);
  assert.match(pathHtml, /（1年完成）/);
  assert.match(pathHtml, /對比/);
  assert.match(pathHtml, /傳統投行職涯路徑/);
  assert.match(pathHtml, /分析師/);
  assert.match(pathHtml, /經理/);
  assert.match(pathHtml, /助理副總裁/);
  assert.match(pathHtml, /副總裁/);
  assert.match(pathHtml, /（入職）/);
  assert.match(pathHtml, /（約12年）/);

  const tepPathIndex = pathHtml.indexOf("TEP 深造路徑");
  const comparisonIndex = pathHtml.indexOf("對比");
  const traditionalPathIndex = pathHtml.indexOf("傳統投行職涯路徑");
  assert.ok(
    tepPathIndex < comparisonIndex && comparisonIndex < traditionalPathIndex,
    "The TEP path, comparison marker, and traditional path should appear in visual order",
  );
});
