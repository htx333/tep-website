import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegistrationPayload = Record<string, unknown>;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanList(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, maxItems);
}

export async function POST(request: Request) {
  let body: RegistrationPayload;

  try {
    body = (await request.json()) as RegistrationPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "提交內容格式不正確。" },
      { status: 400 },
    );
  }

  // Honeypot: accept bots without storing their submission.
  if (cleanText(body.website, 200)) return NextResponse.json({ ok: true });

  const nameEn = cleanText(body.nameEn, 100);
  const nameCn = cleanText(body.nameCn, 100);
  const dateOfBirth = cleanText(body.dateOfBirth, 10);
  const nationality = cleanText(body.nationality, 80);
  const email = cleanText(body.email, 254).toLowerCase();
  const whatsapp = cleanText(body.whatsapp, 40);
  const wechat = cleanText(body.wechat, 100);
  const city = cleanText(body.city, 100);
  const university = cleanText(body.university, 160);
  const programme = cleanText(body.programme, 160);
  const yearOfStudy = cleanText(body.yearOfStudy, 80);
  const expectedGraduation = cleanText(body.expectedGraduation, 80);
  const gpa = cleanText(body.gpa, 80);
  const internshipExperience = cleanText(body.internshipExperience, 40);
  const internshipDescription = cleanText(body.internshipDescription, 2000);
  const licences = cleanList(body.licences, 10);
  const englishProficiency = cleanText(body.englishProficiency, 80);
  const sectors = cleanList(body.sectors, 10);
  const targetLocation = cleanText(body.targetLocation, 80);
  const internshipTimeline = cleanText(body.internshipTimeline, 80);
  const primaryGoal = cleanText(body.primaryGoal, 2000);
  const programmeInterest = cleanText(body.programmeInterest, 40);
  const referralSource = cleanText(body.referralSource, 100);
  const contactPreference = cleanText(body.contactPreference, 40);
  const applicantType = cleanText(body.applicantType, 20);
  const parentName = cleanText(body.parentName, 100);
  const parentRelationship = cleanText(body.parentRelationship, 80);
  const parentPhone = cleanText(body.parentPhone, 40);
  const parentEmail = cleanText(body.parentEmail, 254).toLowerCase();
  const studentAwareness = cleanText(body.studentAwareness, 40);
  const privacyConsent = body.privacyConsent === true;
  const marketingConsent = body.marketingConsent === true;
  const accuracyConsent = body.accuracyConsent === true;

  if (
    !nameEn ||
    !dateOfBirth ||
    !nationality ||
    !emailPattern.test(email) ||
    whatsapp.length < 5 ||
    !city ||
    !university ||
    !programme ||
    !yearOfStudy ||
    !expectedGraduation ||
    !internshipExperience ||
    !englishProficiency ||
    sectors.length === 0 ||
    !targetLocation ||
    !internshipTimeline ||
    !primaryGoal ||
    !programmeInterest ||
    !referralSource ||
    !contactPreference ||
    !["student", "parent"].includes(applicantType) ||
    !privacyConsent ||
    !accuracyConsent
  ) {
    return NextResponse.json(
      { ok: false, message: "請完整填寫所有必填欄位。" },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return NextResponse.json(
      { ok: false, message: "系統暫時未能接收資料，請稍後再試。" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/registration_submissions`, {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        "content-type": "application/json",
        prefer: "return=minimal",
      },
      body: JSON.stringify({
        name_en: nameEn,
        name_cn: nameCn || null,
        date_of_birth: dateOfBirth,
        nationality,
        email,
        whatsapp,
        wechat: wechat || null,
        city,
        university,
        programme,
        year_of_study: yearOfStudy,
        expected_graduation: expectedGraduation,
        gpa: gpa || null,
        internship_experience: internshipExperience,
        internship_description: internshipDescription || null,
        licences,
        english_proficiency: englishProficiency,
        sectors,
        target_location: targetLocation,
        internship_timeline: internshipTimeline,
        primary_goal: primaryGoal,
        programme_interest: programmeInterest,
        referral_source: referralSource,
        contact_preference: contactPreference,
        applicant_type: applicantType,
        parent_name: parentName || null,
        parent_relationship: parentRelationship || null,
        parent_phone: parentPhone || null,
        parent_email: parentEmail || null,
        student_awareness: studentAwareness || null,
        privacy_consent: privacyConsent,
        marketing_consent: marketingConsent,
        accuracy_consent: accuracyConsent,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supabase registration insert failed", response.status);
      return NextResponse.json(
        { ok: false, message: "系統暫時未能接收資料，請稍後再試。" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(
      "Supabase registration request failed",
      error instanceof Error ? error.name : "UnknownError",
    );
    return NextResponse.json(
      { ok: false, message: "系統暫時未能接收資料，請稍後再試。" },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, message: "報名資料已成功提交，TEP 團隊將於 48 小時內與你聯絡。" },
    { status: 201 },
  );
}
