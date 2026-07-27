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
  ] = await Promise.all([
    fetchHtml("/services"),
    fetchHtml("/services/foundation"),
    fetchHtml("/services/premier"),
    fetchHtml("/services/private"),
    fetchHtml("/services/sovereign"),
    fetchHtml("/services/apex"),
  ]);

  for (const price of [
    "HKD20,000",
    "HKD50,000",
    "HKD200,000",
    "HKD500,000",
    "HKD2,000,000",
  ]) {
    assert.match(services, new RegExp(price));
  }

  assert.match(services, /金融行業深度分析/);
  assert.match(services, /錄像面試準備/);
  assert.match(services, /id="comparison"/);

  const overviewIndex = services.indexOf("五大服務計畫");
  const guidanceIndex = services.indexOf('id="guidance"');
  const comparisonIndex = services.indexOf('id="comparison"');

  assert.ok(
    guidanceIndex > overviewIndex,
    "Guidance progression should follow the five-plan overview",
  );
  assert.ok(
    comparisonIndex > guidanceIndex,
    "Comparison should follow the guidance progression",
  );
  assert.match(services, /輔導服務・遞升路徑/);
  assert.match(services, /Foundation/);
  assert.match(services, /Apex/);
  assert.match(
    services,
    /min-w-\[1400px\]/,
    "Comparison table should reserve enough width for single-line titles",
  );
  assert.match(
    services,
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
  assert.match(privatePlan, /100%/);
  assert.match(privatePlan, /背調｜預期問答/);

  assert.match(sovereign, /HKSI \(Paper 1\/7\/8\/12\)/);
  assert.match(sovereign, /SFC Type 1, 4, 9/);
  assert.match(sovereign, /IIQE \(Paper 1-5\)/);

  assert.match(apex, /多資產類別、技術面分析/);
  assert.match(apex, /家族治理（家族憲章擬定）/);
  assert.match(apex, /資產保護與信託架構/);
  assert.match(apex, /建立家族聯盟，共享資源/);
});

test("guidance progression uses the same Pitch-aligned tier content", async () => {
  const system = await fetchHtml("/system");

  assert.match(system, /金融行業深度分析/);
  assert.match(system, /錄像面試準備/);
  assert.match(system, /專業資格賦能/);
  assert.match(system, /20年\+資歷銀行家親授/);
  assert.match(system, /交易、家族治理、信託及家族聯盟全維度賦能/);
});
