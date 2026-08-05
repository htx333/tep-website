import { NextResponse } from "next/server";

const inquiryTypes = new Set(["consult", "join", "partner"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  inquiryType?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  website?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "提交內容格式不正確。" },
      { status: 400 },
    );
  }

  // Honeypot: silently accept automated submissions without storing them.
  if (cleanText(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const inquiryType = cleanText(body.inquiryType, 20);
  const name = cleanText(body.name, 100);
  const phone = cleanText(body.phone, 40);
  const email = cleanText(body.email, 254).toLowerCase();

  if (
    !inquiryTypes.has(inquiryType) ||
    !name ||
    phone.length < 5 ||
    !emailPattern.test(email)
  ) {
    return NextResponse.json(
      { ok: false, message: "請填寫有效的姓名、電話號碼及聯絡電郵。" },
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
    const response = await fetch(
      `${supabaseUrl}/rest/v1/contact_submissions`,
      {
        method: "POST",
        headers: {
          apikey: supabaseSecretKey,
          "content-type": "application/json",
          prefer: "return=minimal",
        },
        body: JSON.stringify({ inquiry_type: inquiryType, name, phone, email }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Supabase contact insert failed", response.status);
      return NextResponse.json(
        { ok: false, message: "系統暫時未能接收資料，請稍後再試。" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(
      "Supabase contact request failed",
      error instanceof Error ? error.name : "UnknownError",
    );
    return NextResponse.json(
      { ok: false, message: "系統暫時未能接收資料，請稍後再試。" },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, message: "資料已成功提交，TEP 團隊將盡快與你聯絡。" },
    { status: 201 },
  );
}
