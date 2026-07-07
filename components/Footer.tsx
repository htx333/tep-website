import Link from "next/link";
import { motto, navLinks, slogan } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="font-display text-3xl font-bold tracking-[0.35em]">
              TEP
            </div>
            <p className="mt-3 font-display text-lg tracking-[0.14em] text-blue-soft">
              {motto.join(" ")}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
              {slogan}
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} TEP Careers. 版權所有。
        </div>
      </div>
    </footer>
  );
}
