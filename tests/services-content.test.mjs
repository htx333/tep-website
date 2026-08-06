import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.SERVICES_BASE_URL ?? "http://localhost:3000";

async function fetchHtml(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `${path} should return 200`);
  return response.text();
}

test("service overview and detail routes match the latest TEP Pitch", async () => {
  const [
    services,
    foundation,
    premier,
    privatePlan,
    sovereign,
    apex,
    comparison,
  ] = await Promise.all([
    fetchHtml("/services"),
    fetchHtml("/services/foundation"),
    fetchHtml("/services/premier"),
    fetchHtml("/services/private"),
    fetchHtml("/services/sovereign"),
    fetchHtml("/services/apex"),
    fetchHtml("/services/comparison"),
  ]);

  for (const price of [
    "HKD20,000",
    "HKD50,000",
    "HKD200,000",
    "HKD500,000",
    "HKD2,000,000",
  ]) {
    assert.doesNotMatch(
      comparison,
      new RegExp(price),
      "Comparison should not display plan prices",
    );
  }
  assert.doesNotMatch(comparison, /各計畫定價/);

  assert.match(services, /金融行業深度分析/);
  assert.match(services, /錄像面試準備/);
  assert.match(services, /data-service-view="overview"/);
  assert.doesNotMatch(services, /data-service-view="guidance"/);
  assert.doesNotMatch(services, /data-service-view="comparison"/);
  assert.match(comparison, /data-service-view="comparison"/);
  assert.match(
    comparison,
    /min-w-\[1400px\]/,
    "Comparison table should reserve enough width for single-line titles",
  );
  assert.match(
    comparison,
    /whitespace-nowrap/,
    "Comparison titles should not wrap onto a second line",
  );

  assert.match(foundation, /2日線下培訓：分析全球金融體系架構與前沿發展趨勢/);
  assert.match(foundation, /1-1導師解讀金融各細分賽道/);
  assert.match(foundation, /行業精英定製對口簡歷/);
  assert.match(foundation, /首席面試官親擬完整模擬面試/);

  assert.match(premier, /精準篩選高契合度職位/);
  assert.match(premier, /依託算法系統，精準匹配職位與個人優勢/);
  assert.match(premier, /提供專業錄影及後期剪輯/);

  assert.match(privatePlan, /由現職導師親自推薦，進入企業核心招聘渠道/);
  assert.match(privatePlan, /親選實習行業和實習時期/);
  assert.match(privatePlan, /≤3%/);
  assert.match(privatePlan, /香港零售銀行/);
  assert.doesNotMatch(privatePlan, /外資商業銀行/);
  assert.match(privatePlan, /≤5%/);
  assert.match(privatePlan, /四大會計事務所/);
  assert.match(privatePlan, /經 TEP/);
  assert.match(privatePlan, /100%/);
  assert.match(
    privatePlan,
    /border-gold bg-gold\/10/,
    "The TEP 100% admission-rate card should use the gold emphasis style",
  );
  assert.doesNotMatch(
    privatePlan,
    /背調｜預期問答/,
    "Private should inherit video interview preparation from Premier instead of repeating it as an add-on",
  );

  assert.match(sovereign, /HKSI \(LE 1\/7\/8\/12\)/);
  assert.doesNotMatch(sovereign, /HKSI \(Paper 1\/7\/8\/12\)/);
  assert.match(sovereign, /SFC Type 1, 4, 9/);
  assert.match(sovereign, /IIQE \(Paper 1-5\)/);
  assert.match(sovereign, /完成專業資格認證，邁向頂尖金融職涯/);

  assert.match(apex, /多資產類別、技術面分析/);
  assert.match(apex, /家族治理（家族憲章擬定）/);
  assert.match(apex, /資產保護與信託架構/);
  assert.match(apex, /建立家族聯盟，共享資源/);
  assert.match(apex, /閉環式 1-1 帶教，20年\+資歷銀行家獨家親授/);
  assert.match(apex, /20年\+資歷銀行家閉環式 1-1 帶教・全維度賦能/);
  assert.match(apex, /用 1 年時間深造，為承擔家族重任作完善準備/);
  assert.match(apex, /承擔家族重任/);
  assert.doesNotMatch(apex, /能用1年時間斬獲12年投行學習成果/);
});

test("guidance progression uses the same Pitch-aligned tier content", async () => {
  const system = await fetchHtml("/system");

  assert.match(system, /data-service-view="guidance"/);
  assert.doesNotMatch(system, /data-service-view="overview"/);
  assert.doesNotMatch(system, /data-service-view="comparison"/);
  assert.match(system, /金融行業深度分析/);
  assert.match(system, /錄像面試準備/);
  assert.match(system, /專業資格賦能/);
  assert.match(system, /閉環式1-1帶教・獨家親授/);
  assert.match(system, /用1年時間深造，為承擔家族重任作完善準備/);
});

test("each services toggle renders only its respective page", async () => {
  const [overview, guidance, comparison] = await Promise.all([
    fetchHtml("/services"),
    fetchHtml("/system"),
    fetchHtml("/services/comparison"),
  ]);

  assert.match(overview, /data-service-view="overview"/);
  assert.doesNotMatch(overview, /data-service-view="guidance"/);
  assert.doesNotMatch(overview, /data-service-view="comparison"/);

  assert.match(guidance, /data-service-view="guidance"/);
  assert.doesNotMatch(guidance, /data-service-view="overview"/);
  assert.doesNotMatch(guidance, /data-service-view="comparison"/);

  assert.match(comparison, /data-service-view="comparison"/);
  assert.doesNotMatch(comparison, /data-service-view="overview"/);
  assert.doesNotMatch(comparison, /data-service-view="guidance"/);
});
