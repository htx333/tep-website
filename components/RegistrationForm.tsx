"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "@/components/SectionHeading";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const yearOptions = [
  "大學一年級",
  "大學二年級",
  "大學三年級",
  "大學四年級",
  "碩士一年級",
  "碩士二年級",
  "近 12 個月畢業",
];

const licenceOptions = ["HKSI（任何 LE）", "SFC 第 1、4 或 9 類", "IIQE（任何卷）", "CFA Level I", "CFA Level II 或以上", "暫未持有"];

const sectorOptions = [
  "投資銀行：顧問（併購、ECM、DCM）",
  "投資銀行：銷售、交易及市場",
  "財富管理／私人銀行",
  "資產管理（長倉／基金／ETF）",
  "對沖基金",
  "私募股權",
  "家族辦公室",
  "尚未確定，需要職涯建議",
];

function Field({
  label,
  hint,
  required = false,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-red-700"> *</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue";

export default function RegistrationForm() {
  const [isParent, setIsParent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const sectors = formData.getAll("sectors").filter((item): item is string => typeof item === "string");

    if (sectors.length === 0) {
      setSubmitState({ status: "error", message: "請至少選擇一個目標金融領域。" });
      return;
    }

    setSubmitState({ status: "submitting" });
    const text = (name: string) => String(formData.get(name) ?? "");

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nameEn: text("nameEn"),
          nameCn: text("nameCn"),
          dateOfBirth: text("dateOfBirth"),
          nationality: text("nationality"),
          email: text("email"),
          whatsapp: text("whatsapp"),
          wechat: text("wechat"),
          city: text("city"),
          university: text("university"),
          programme: text("programme"),
          yearOfStudy: text("yearOfStudy"),
          expectedGraduation: text("expectedGraduation"),
          gpa: text("gpa"),
          internshipExperience: text("internshipExperience"),
          internshipDescription: text("internshipDescription"),
          licences: formData.getAll("licences"),
          englishProficiency: text("englishProficiency"),
          sectors,
          targetLocation: text("targetLocation"),
          internshipTimeline: text("internshipTimeline"),
          primaryGoal: text("primaryGoal"),
          programmeInterest: text("programmeInterest"),
          referralSource: text("referralSource"),
          contactPreference: text("contactPreference"),
          applicantType: text("applicantType"),
          parentName: text("parentName"),
          parentRelationship: text("parentRelationship"),
          parentPhone: text("parentPhone"),
          parentEmail: text("parentEmail"),
          studentAwareness: text("studentAwareness"),
          privacyConsent: formData.get("privacyConsent") === "on",
          marketingConsent: formData.get("marketingConsent") === "on",
          accuracyConsent: formData.get("accuracyConsent") === "on",
          website: text("website"),
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "提交失敗，請稍後再試。");

      form.reset();
      setIsParent(false);
      setSubmitState({
        status: "success",
        message: result.message || "報名資料已成功提交，TEP 團隊將於 48 小時內與你聯絡。",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "提交失敗，請稍後再試。",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <section className="bg-gradient-to-b from-mist to-white py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f7ef] text-3xl text-[#187a43]">✓</div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-navy">已收到你的報名</h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{submitState.message}</p>
            <p className="mt-8 font-display text-lg italic text-gold">「開始永遠不會太早，等待卻可能太遲。」</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-mist to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Registration"
            title="TEP 計畫報名"
            sub="填寫以下資料，TEP 團隊將於 48 小時內按你偏好的聯絡方式跟進。"
          />
          <div className="mt-10 border-l-4 border-gold bg-white p-5 text-sm leading-relaxed text-ink-soft shadow-sm sm:p-6">
            報名資料只會用於評估你的申請及提供職涯發展服務；標示 <span className="font-semibold text-red-700">*</span> 的欄位必須填寫。
          </div>
        </div>
      </section>

      <section className="bg-white pb-28">
        <form data-registration-form="true" onSubmit={handleSubmit} className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label>公司網站<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <FormSection title="第一部分：個人資料">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="英文全名" required><input className={inputClass} name="nameEn" autoComplete="name" placeholder="例如：Jason Chen" required /></Field>
              <Field label="中文姓名"><input className={inputClass} name="nameCn" placeholder="例如：陳大明" /></Field>
              <Field label="出生日期" required><input className={inputClass} type="date" name="dateOfBirth" required /></Field>
              <Field label="國籍" required><input className={inputClass} name="nationality" placeholder="例如：中國" required /></Field>
              <Field label="電郵地址" required><input className={inputClass} type="email" name="email" autoComplete="email" placeholder="name@example.com" required /></Field>
              <Field label="WhatsApp 號碼" hint="請包括國家／地區號碼" required><input className={inputClass} type="tel" name="whatsapp" autoComplete="tel" placeholder="例如：+852 9123 4567" required /></Field>
              <Field label="微信 ID"><input className={inputClass} name="wechat" placeholder="你的微信 ID" /></Field>
              <Field label="目前所在城市" required><input className={inputClass} name="city" placeholder="例如：香港" required /></Field>
            </div>
          </FormSection>

          <FormSection title="第二部分：學術背景">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="目前／最近就讀院校" required><input className={inputClass} name="university" placeholder="例如：HKU、CUHK、LSE" required /></Field>
              <Field label="課程／學位" required><input className={inputClass} name="programme" placeholder="例如：BBA Finance、MSc WM" required /></Field>
              <Field label="就讀年級" required><Select name="yearOfStudy" options={yearOptions} required /></Field>
              <Field label="預計畢業時間" required><input className={inputClass} name="expectedGraduation" placeholder="例如：2027 年 5 月" required /></Field>
              <Field label="目前 GPA"><Select name="gpa" options={["3.7–4.0（First Class／Dean's List）", "3.3–3.6（Upper Second）", "3.0–3.2（Second Class）", "低於 3.0", "不願透露"]} /></Field>
            </div>
          </FormSection>

          <FormSection title="第三部分：專業經驗">
            <RadioGroup label="金融實習經驗" name="internshipExperience" required options={["曾於香港實習", "曾於內地實習", "曾於海外（大中華區以外）實習", "暫未有金融實習經驗"]} />
            <div className="mt-6"><Field label="如有實習經驗，請簡述" hint="公司名稱、職位、期間及所屬領域"><textarea className={`${inputClass} min-h-28 resize-y`} name="internshipDescription" placeholder="例如：2025 年暑期，私人銀行營運實習生，兩個月" /></Field></div>
            <CheckboxGroup label="專業牌照／資格" name="licences" options={licenceOptions} />
            <div className="mt-6"><Field label="英文能力" required><Select name="englishProficiency" options={["母語／雙語", "IELTS 7.0+／TOEFL 100+", "IELTS 6.0–6.9／TOEFL 80–99", "IELTS 6.0 以下／未有正式測試"]} required /></Field></div>
          </FormSection>

          <FormSection title="第四部分：職涯目標">
            <CheckboxGroup label="目標金融領域（可多選）" name="sectors" options={sectorOptions} required />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="目標地點" required><Select name="targetLocation" options={["香港（首選）", "新加坡", "香港及新加坡", "中國內地", "開放／彈性"]} required /></Field>
              <Field label="實習時間表" required><Select name="internshipTimeline" options={["即時（3 個月內）", "2026 年暑季", "2027 年冬季／春季", "2027 年暑季", "2028 年或以後"]} required /></Field>
            </div>
            <div className="mt-6"><Field label="加入 TEP 的首要目標是什麼？" hint="請以 2–3 句具體說明" required><textarea className={`${inputClass} min-h-28 resize-y`} name="primaryGoal" placeholder="例如：我是大學二年級學生，目標進入私人銀行，希望在畢業前累積相關香港實習經驗。" required /></Field></div>
          </FormSection>

          <FormSection title="第五部分：計畫興趣">
            <RadioGroup label="你對哪一個 TEP 計畫感興趣？" name="programmeInterest" required card options={["青銅：Foundation 啟航計畫", "白銀：Premier 尊享計畫", "黃金：Private 私享計畫", "鉑金：Sovereign 卓越計畫", "鑽石：Apex 至尊計畫", "尚未確定，希望由 TEP 提供建議"]} />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="你從何得知 TEP？" required><Select name="referralSource" options={["微信／微信朋友圈", "小紅書", "Instagram", "大學職涯中心", "朋友／同學介紹", "LinkedIn", "職業博覽會／研討會", "其他"]} required /></Field>
              <Field label="偏好聯絡方式" required><Select name="contactPreference" options={["WhatsApp", "微信", "電郵", "沒有偏好"]} required /></Field>
            </div>
            <div className="mt-6"><RadioGroup label="誰正在填寫此表格？" name="applicantType" required options={["我是學生本人", "我是家長／監護人"]} onChange={(value) => setIsParent(value === "我是家長／監護人")} /></div>
          </FormSection>

          {isParent && <FormSection title="第六部分：家長／監護人資料">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="家長／監護人姓名"><input className={inputClass} name="parentName" placeholder="全名" /></Field>
              <Field label="與學生關係"><input className={inputClass} name="parentRelationship" placeholder="例如：父親、母親" /></Field>
              <Field label="家長聯絡電話"><input className={inputClass} name="parentPhone" type="tel" placeholder="例如：+852 9123 4567" /></Field>
              <Field label="家長電郵"><input className={inputClass} name="parentEmail" type="email" placeholder="name@example.com" /></Field>
            </div>
            <div className="mt-6"><RadioGroup label="學生是否知悉此申請？" name="studentAwareness" options={["是，已共同討論", "是，學生完全知悉", "尚未討論"]} /></div>
          </FormSection>}

          <FormSection title="第七部分：同意及確認">
            <Consent name="privacyConsent" required><strong>資料私隱：</strong>我同意 TEP Careers 收集及儲存上述資料，用於評估申請及提供職涯發展服務；未經同意，資料不會與第三方分享。</Consent>
            <Consent name="marketingConsent"><strong>通訊（可選）：</strong>我同意透過偏好方式接收 TEP Careers 的計畫更新、職涯資源及活動邀請。</Consent>
            <Consent name="accuracyConsent" required><strong>資料準確性：</strong>我確認所提供資料真實準確，並明白 TEP Careers 不保證任何特定職涯結果、實習安排或聘用結果。</Consent>
          </FormSection>

          <div className="mt-10 text-center">
            <button type="submit" disabled={submitState.status === "submitting"} className="rounded-lg bg-navy px-10 py-4 text-sm font-semibold tracking-[0.12em] text-white shadow-lg transition-colors hover:bg-blue disabled:cursor-wait disabled:opacity-60">
              {submitState.status === "submitting" ? "正在提交…" : "提交報名"} <span aria-hidden="true">→</span>
            </button>
            <p className="mt-3 text-xs text-ink-faint">TEP 團隊會於 48 小時內按你偏好的方式聯絡。</p>
            {submitState.status === "error" && <p role="status" className="mx-auto mt-5 max-w-xl rounded-lg bg-[#fff0f0] px-4 py-3 text-sm text-[#a52a2a]">{submitState.message}</p>}
          </div>
        </form>
      </section>
    </>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-sm"><h2 className="bg-navy px-6 py-4 text-sm font-bold tracking-[0.08em] text-white">{title}</h2><div className="p-6 sm:p-8">{children}</div></section>;
}

function Select({ name, options, required = false }: { name: string; options: string[]; required?: boolean }) {
  return <select className={inputClass} name={name} required={required} defaultValue=""><option value="" disabled>請選擇…</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
}

function RadioGroup({ label, name, options, required = false, card = false, onChange }: { label: string; name: string; options: string[]; required?: boolean; card?: boolean; onChange?: (value: string) => void }) {
  return <fieldset><legend className="text-sm font-semibold text-navy">{label}{required && <span className="text-red-700"> *</span>}</legend><div className={`mt-3 grid gap-3 ${card ? "sm:grid-cols-2" : ""}`}>{options.map((option, index) => <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm text-ink transition-colors hover:border-blue hover:bg-mist ${card ? "border-line" : "border-transparent"}`}><input className="mt-0.5 h-4 w-4 accent-[var(--blue)]" type="radio" name={name} value={option} required={required && index === 0} onChange={() => onChange?.(option)} /><span>{option}</span></label>)}</div></fieldset>;
}

function CheckboxGroup({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return <fieldset className="mt-6"><legend className="text-sm font-semibold text-navy">{label}{required && <span className="text-red-700"> *</span>}</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{options.map((option) => <label key={option} className="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent p-2 text-sm text-ink transition-colors hover:bg-mist"><input className="mt-0.5 h-4 w-4 accent-[var(--blue)]" type="checkbox" name={name} value={option} /><span>{option}</span></label>)}</div></fieldset>;
}

function Consent({ name, required = false, children }: { name: string; required?: boolean; children: React.ReactNode }) {
  return <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-mist/50 p-4 text-sm leading-relaxed text-ink-soft last:mb-0"><input className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--blue)]" type="checkbox" name={name} required={required} /><span>{children}{required && <span className="ml-1 text-red-700">*</span>}</span></label>;
}
