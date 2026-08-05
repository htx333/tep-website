import assert from "node:assert/strict";
import test from "node:test";

const targetsUrl =
  process.env.TARGET_LOGOS_TEST_URL ??
  "http://localhost:3000/about?section=targets";

const expectedRows = [
  ["Goldman Sachs", "Morgan Stanley", "J.P. Morgan", "UBS", "Citibank"],
  ["滙豐", "渣打", "中信 CITIC", "中國銀行", "恆生"],
  ["富途", "中金公司 CICC", "華泰證券", "國泰君安", "UOB"],
  ["Deloitte", "EY", "KPMG", "PwC", "Fung Yu"],
];

function extractRows(html) {
  return [...html.matchAll(/<section\b[^>]*data-logo-row="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)]
    .map(([, row, content]) => ({
      row,
      companies: [...content.matchAll(/data-company-name="([^"]+)"/g)].map(([, name]) => name),
    }));
}

test("target companies render as four unlabelled rows in the requested ordering", async () => {
  const response = await fetch(targetsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const rows = extractRows(html);

  assert.deepEqual(rows.map(({ companies }) => companies), expectedRows);
  assert.doesNotMatch(html, /data-target-category=/);
  assert.doesNotMatch(html, /<h3\b[^>]*>\s*(?:投行|零售銀行|券商|四大)/);
});

test("every target company renders a supplied logo without placeholders", async () => {
  const response = await fetch(targetsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const logoImages = [...html.matchAll(/<img\b[^>]*\bsrc="\/logos\/[^\"]+"[^>]*>/g)]
    .map(([tag]) => tag);

  assert.equal(logoImages.length, 20);
  assert.doesNotMatch(html, /data-logo-placeholder=/);
  assert.doesNotMatch(html, /Logo 待上傳/);

  for (const image of logoImages) {
    assert.match(image, /\bmix-blend-multiply\b/, `logo must blend into the page: ${image}`);
  }
});

test("logo wall has no framed company cards", async () => {
  const response = await fetch(targetsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const companyItems = [...html.matchAll(/<div\b[^>]*data-company-name="[^"]+"[^>]*>/g)]
    .map(([tag]) => tag);

  assert.equal(companyItems.length, 20);
  for (const item of companyItems) {
    const classes = item.match(/\bclass="([^"]*)"/)?.[1]?.split(/\s+/) ?? [];
    assert.equal(
      classes.some((className) => /^(?:border|bg-|shadow|rounded)/.test(className)),
      false,
      `logo item must not have a visible frame: ${item}`,
    );
  }
});

test("target-company logo images stay subtly obscured without a hover reveal", async () => {
  const response = await fetch(targetsUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const logoImages = [...html.matchAll(/<img\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter((tag) => /\bsrc="\/logos\//.test(tag));

  assert.ok(logoImages.length > 0, "expected target-company logo images");

  for (const image of logoImages) {
    const classes = image.match(/\bclass="([^"]*)"/)?.[1]?.split(/\s+/) ?? [];

    assert.ok(classes.includes("blur-[2px]"), `missing 2px blur: ${image}`);
    assert.ok(classes.includes("opacity-80"), `missing reduced opacity: ${image}`);
    assert.equal(
      classes.some((className) => className.startsWith("hover:blur-")),
      false,
      `logo blur must remain on hover: ${image}`,
    );
  }
});
