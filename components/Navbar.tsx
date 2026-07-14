"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/content";

// 關於我們 的四個分區 — 由導覽列的懸停下拉選單進入
const aboutSections = [
  { id: "background", label: "TEP背景" },
  { id: "founder", label: "創始人" },
  { id: "mentors", label: "導師團隊" },
  { id: "targets", label: "目標公司" },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-bold tracking-[0.35em] text-navy">
            TEP
          </span>
          <span className="hidden text-[11px] tracking-[0.18em] text-ink-soft sm:inline">
            Talent. Elite. Professional.
          </span>
        </Link>

        {/* 桌面選單 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            // 關於我們 — 懸停顯示四個分區的下拉選單
            if (link.href === "/about") {
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href="/about"
                    className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm transition-colors ${
                      active ? "font-medium text-navy" : "text-ink-soft group-hover:text-navy"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                    {active && (
                      <span className="absolute inset-x-4 bottom-0 h-0.5 rounded bg-blue" />
                    )}
                  </Link>
                  {/* 下拉選單（pt-2 作為懸停橋接，避免游標移動時關閉） */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[168px] overflow-hidden rounded-xl border border-line bg-white py-2 shadow-[0_12px_40px_rgba(10,31,61,0.1)]">
                      {aboutSections.map((s) => (
                        <Link
                          key={s.id}
                          href={`/about?section=${s.id}`}
                          className="block px-5 py-2.5 text-sm text-ink-soft transition-colors hover:bg-mist hover:text-navy"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  active ? "font-medium text-navy" : "text-ink-soft hover:text-navy"
                }`}
              >
                {link.label}
                {active && (
                  <span className="mx-auto mt-1 block h-0.5 w-5 rounded bg-blue" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-3 rounded-md bg-navy px-4 py-2 text-sm text-white transition-colors hover:bg-blue"
          >
            預約諮詢
          </Link>
        </nav>

        {/* 手機選單按鈕 */}
        <button
          aria-label="開啟選單"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-0.5 w-6 bg-navy transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-6 bg-navy ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-navy transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* 手機下拉選單 */}
      {open && (
        <nav className="border-t border-line bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) =>
            link.href === "/about" ? (
              <div key={link.href} className="border-b border-line">
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-3 text-sm ${
                    pathname === link.href ? "font-medium text-navy" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
                <div className="pb-2">
                  {aboutSections.map((s) => (
                    <Link
                      key={s.id}
                      href={`/about?section=${s.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-2 pl-6 pr-2 text-sm text-ink-soft hover:text-navy"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-line px-2 py-3 text-sm ${
                  pathname === link.href ? "font-medium text-navy" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
