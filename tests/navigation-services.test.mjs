import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const servicesUrl =
  process.env.SERVICES_TEST_URL ?? "http://localhost:3000/services";

test("service navigation owns the guidance system above comparison", async () => {
  const response = await fetch(servicesUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const plansIndex = html.indexOf('href="/services">五大服務計畫');
  const systemIndex = html.indexOf('href="/system">輔導遞升系統');
  const comparisonIndex = html.indexOf(
    'href="/services/comparison">項目比對',
  );
  const storiesIndex = html.indexOf('href="/stories">學生分享');
  const faqIndex = html.indexOf('href="/faq">FAQ');

  assert.ok(plansIndex >= 0, "Service menu should list 五大服務計畫");
  assert.ok(systemIndex > plansIndex, "System should follow service plans");
  assert.ok(
    comparisonIndex > systemIndex,
    "System should be listed above comparison",
  );
  assert.ok(storiesIndex > comparisonIndex, "Service menu should close before stories");
  assert.ok(faqIndex > storiesIndex, "FAQ should remain a direct top-level item");
});

test("tablet widths keep the complete mobile navigation", async () => {
  const response = await fetch(servicesUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const navbarSource = await readFile(
    new URL("../components/Navbar.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    html,
    /hidden items-center gap-1 lg:flex/,
    "Desktop navigation should start at the large breakpoint",
  );
  assert.match(
    html,
    /gap-1\.5 lg:hidden/,
    "Menu button should remain available below the large breakpoint",
  );
  assert.match(
    navbarSource,
    /border-t border-line bg-white px-4 pb-4 lg:hidden/,
    "Mobile menu should remain available below the large breakpoint",
  );
});

test("desktop navigation promotes registration and removes the consultation button", async () => {
  const response = await fetch(servicesUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<a href="https:\/\/docs\.google\.com\/forms\/d\/e\/1FAIpQLSc9TlBeBVz_qVUOfyyHDbzPweqX64jtzuwXJ2GKsNuMHm945A\/viewform" class="rounded-md bg-navy px-4 py-2 text-sm text-white transition-colors hover:bg-blue">報名<\/a>/,
  );
  assert.doesNotMatch(
    html,
    /<a class="rounded-md bg-navy px-4 py-2 text-sm text-white transition-colors hover:bg-blue" href="\/contact">預約諮詢<\/a>/,
  );
});

test("registration links send Chinese visitors to the Chinese form and English visitors to the English form", async () => {
  const navbarSource = await readFile(
    new URL("../components/Navbar.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    navbarSource,
    /const registrationFormHref =\s*language === "english"\s*\? ENGLISH_REGISTRATION_FORM_URL\s*:\s*CHINESE_REGISTRATION_FORM_URL/,
  );
  assert.match(
    navbarSource,
    /1FAIpQLSc9TlBeBVz_qVUOfyyHDbzPweqX64jtzuwXJ2GKsNuMHm945A\/viewform/,
  );
  assert.match(
    navbarSource,
    /1FAIpQLSc6AKGscsqWL6pjJvhY0PKgtuXtF-OKmeLpFlUB3kZjQPFm1Q\/viewform/,
  );
  assert.match(navbarSource, /href=\{registrationFormHref\}/);
});
