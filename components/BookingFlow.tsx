"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { bookingSlots, bookingTypes } from "@/lib/content";

const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];
const MONTH_LABELS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];

function isAvailable(date: Date, today: Date) {
  const day = date.getDay();
  if (day === 0 || day === 6) return false; // 週末不開放（示意）
  const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return date > d0; // 只開放今天之後
}

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type") ?? "consult";
  const bookingType =
    bookingTypes.find((bt) => bt.id === typeId) ?? bookingTypes[0];

  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 本月月曆格（含月初前的空格）
  const cells = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const out: (Date | null)[] = Array(firstWeekday).fill(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(year, month, d));
    return out;
  }, [today]);

  const dateLabel = selectedDate
    ? `${today.getFullYear()}年${MONTH_LABELS[today.getMonth()]}${selectedDate.getDate()}日`
    : "";

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-mist p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-navy">預約已送出（示意）</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          {bookingType.title}・{dateLabel} {selectedSlot}
          <br />
          確認通知將發送至 {email}。
          <br />
          （正式營運後將接入實際預約系統）
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-navy px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue"
        >
          返回主頁
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* 預約類別切換 */}
      <div className="flex flex-wrap justify-center gap-3">
        {bookingTypes.map((bt) => (
          <Link
            key={bt.id}
            href={`/booking?type=${bt.id}`}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              bt.id === bookingType.id
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-ink-soft hover:border-navy hover:text-navy"
            }`}
          >
            {bt.title}
          </Link>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
        {bookingType.desc}
      </p>

      {/* 第一步：選擇日期 */}
      <div className="mt-12 rounded-2xl border border-line bg-white p-8 shadow-sm">
        <h2 className="text-lg font-bold text-navy">
          1. 選擇日期
          <span className="ml-3 text-sm font-normal text-ink-soft">
            {today.getFullYear()}年 {MONTH_LABELS[today.getMonth()]}
          </span>
        </h2>
        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm">
          {WEEKDAY_LABELS.map((w) => (
            <div key={w} className="py-2 text-xs font-semibold text-ink-soft">
              {w}
            </div>
          ))}
          {cells.map((date, i) =>
            date ? (
              (() => {
                const open = isAvailable(date, today);
                const selected =
                  selectedDate?.getDate() === date.getDate();
                return (
                  <button
                    key={i}
                    disabled={!open}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`aspect-square rounded-md text-sm transition-colors ${
                      selected
                        ? "bg-navy font-semibold text-white"
                        : open
                          ? "bg-mist text-navy hover:bg-blue hover:text-white"
                          : "cursor-not-allowed text-ink-soft/40"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })()
            ) : (
              <div key={i} />
            ),
          )}
        </div>
      </div>

      {/* 第二步：選擇時段 */}
      {selectedDate && (
        <div className="mt-8 rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-navy">
            2. 選擇時段
            <span className="ml-3 text-sm font-normal text-ink-soft">
              {dateLabel}
            </span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {bookingSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-md border px-6 py-2.5 text-sm transition-colors ${
                  selectedSlot === slot
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-ink hover:border-blue hover:text-blue"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 第三步：填寫資料 */}
      {selectedDate && selectedSlot && (
        <form
          className="mt-8 rounded-2xl border border-line bg-white p-8 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (name && email) setSubmitted(true);
          }}
        >
          <h2 className="text-lg font-bold text-navy">3. 填寫聯絡資料</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">姓名 *</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的姓名"
                className="mt-2 w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">電郵 *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-md border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue"
              />
            </label>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            已選：{bookingType.title}・{dateLabel} {selectedSlot}
          </p>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-navy px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue"
          >
            確認預約
          </button>
        </form>
      )}
    </div>
  );
}
