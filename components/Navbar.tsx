"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/content";

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
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  active
                    ? "font-medium text-navy"
                    : "text-ink-soft hover:text-navy"
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-line px-2 py-3 text-sm ${
                pathname === link.href
                  ? "font-medium text-navy"
                  : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
