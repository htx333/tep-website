"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { bookingTypes } from "@/lib/content";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const typeId = searchParams.get("type") ?? "consult";
  const bookingType =
    bookingTypes.find((type) => type.id === typeId) ?? bookingTypes[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          inquiryType: bookingType.id,
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "提交失敗，請稍後再試。");
      }

      form.reset();
      setSubmitState({
        status: "success",
        message: result.message || "資料已成功提交，TEP 團隊將盡快與你聯絡。",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "提交失敗，請稍後再試。",
      });
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap justify-center gap-3">
        {bookingTypes.map((type) => (
          <Link
            key={type.id}
            href={`/booking?type=${type.id}`}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              type.id === bookingType.id
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-ink-soft hover:border-navy hover:text-navy"
            }`}
          >
            {type.title}
          </Link>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
        {bookingType.desc}
      </p>

      <form
        data-contact-form="true"
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-mist/45 p-6 shadow-sm sm:p-10"
      >
        <input type="hidden" name="inquiryType" value={bookingType.id} />
        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            公司網站
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold text-navy">姓名</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="請輸入你的姓名"
              className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-navy">電話號碼</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              placeholder="例如：+852 9123 4567"
              className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-navy">聯絡電郵</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-blue"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-white transition-colors hover:bg-blue disabled:cursor-wait disabled:opacity-65"
        >
          {submitState.status === "submitting" ? "正在提交…" : "提交聯絡資料"}
          <span aria-hidden="true">→</span>
        </button>
        {submitState.status === "success" || submitState.status === "error" ? (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-lg px-4 py-3 text-center text-sm ${
              submitState.status === "success"
                ? "bg-[#e9f7ef] text-[#187a43]"
                : "bg-[#fff0f0] text-[#a52a2a]"
            }`}
          >
            {submitState.message}
          </p>
        ) : (
          <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft">
            你的資料只會用於本次聯絡及跟進，不會透過電郵程式傳送。
          </p>
        )}
      </form>
    </div>
  );
}
