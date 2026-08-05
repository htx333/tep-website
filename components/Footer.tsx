import Link from "next/link";
import { motto, navLinks, slogan, socialLinks } from "@/lib/content";

function WhatsAppIcon() {
  return (
    <svg
      data-social-icon="whatsapp"
      viewBox="0 0 48 48"
      className="h-7 w-7"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 6.5a17 17 0 0 0-14.7 25.5L7 41l9.2-2.4A17 17 0 1 0 24 6.5Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 15.8c.4-.8.9-.8 1.4-.8h1c.3 0 .7.1.9.7l1.5 3.6c.2.5.1.9-.2 1.3l-1.2 1.5c-.3.3-.2.7 0 1.1 1.4 2.6 3.5 4.7 6.1 6.1.4.2.8.3 1.1 0l1.8-2.1c.3-.4.8-.5 1.2-.3l3.5 1.7c.5.2.7.6.7 1.1-.1 1.8-.9 3.4-2.4 4.5-1.3.9-3 1.2-4.5.8-3.5-.9-6.8-2.8-9.4-5.4-2.4-2.4-4.2-5.3-5.2-8.5-.6-1.8-.3-3.8.7-5.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg
      data-social-icon="wechat"
      viewBox="0 0 48 48"
      className="h-8 w-8"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 8C12.5 8 6 13.3 6 19.8c0 3.7 2.1 7 5.4 9.2l-1.3 4.2 4.9-2.4c1.7.5 3.6.8 5.5.8h.8a10.8 10.8 0 0 1-.3-2.5c0-6.6 6.3-12 14.3-12h.2C34 11.9 27.8 8 20.5 8Zm-5 7.2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
      <path d="M35.3 19.4C28.5 19.4 23 23.7 23 29s5.5 9.6 12.3 9.6c1.6 0 3.1-.2 4.5-.7l4.1 2-1.1-3.6A9 9 0 0 0 47.5 29c0-5.3-5.5-9.6-12.2-9.6Zm-4.1 7.2a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm8.3 0a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z" />
    </svg>
  );
}

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
        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} TEP Careers. 版權所有。
          </div>
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="透過 WhatsApp 加入 TEP Careers"
              title="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/75 transition-all hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={socialLinks.wechat}
              target="_blank"
              rel="noreferrer"
              aria-label="透過微信加入 TEP Careers"
              title="微信"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/75 transition-all hover:-translate-y-1 hover:border-[#07C160] hover:bg-[#07C160] hover:text-white"
            >
              <WeChatIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
