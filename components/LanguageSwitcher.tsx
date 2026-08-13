"use client";

import { useEffect, useRef, useState } from "react";

export type ChineseLanguage = "traditional" | "simplified";

const STORAGE_KEY = "tep-chinese-language";

type OpenCCNode = Node & {
  originalString?: string | null;
  originalContent?: string | null;
  originalAlt?: string | null;
  originalValue?: string | null;
  originalPlaceholder?: string | null;
  originalAriaLabel?: string | null;
  shouldChangeLang?: boolean;
};

function clearOpenCCState(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL);
  let current: Node | null = root;

  while (current) {
    const node = current as OpenCCNode;
    delete node.originalString;
    delete node.originalContent;
    delete node.originalAlt;
    delete node.originalValue;
    delete node.originalPlaceholder;
    delete node.originalAriaLabel;
    delete node.shouldChangeLang;
    current = walker.nextNode();
  }
}

export function useChineseLanguage() {
  const [language, setLanguage] = useState<ChineseLanguage>("traditional");
  const firstLanguageEffect = useRef(true);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage !== "simplified") return;

    const timer = window.setTimeout(() => setLanguage("simplified"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (firstLanguageEffect.current) {
      firstLanguageEffect.current = false;
      document.documentElement.dataset.chineseLanguage = "traditional";
      document.documentElement.lang = "zh-HK";
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.dataset.chineseLanguage = language;

    if (language === "traditional") {
      document.documentElement.lang = "zh-HK";
      return;
    }

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let restore: (() => void) | null = null;

    async function enableSimplifiedChinese() {
      const OpenCC = (await import("opencc-js/t2cn")).default;
      if (cancelled) return;

      const root = document.documentElement;
      const converter = OpenCC.Converter({ from: "hk", to: "cn" });
      const handler = OpenCC.HTMLConverter(converter, root, "zh-HK", "zh-CN");
      restore = handler.restore;

      const convertPage = () => {
        observer?.disconnect();
        root.lang = "zh-HK";
        handler.convert();
        observer?.observe(root, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ["placeholder", "aria-label", "alt", "content"],
        });
      };

      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          const node = mutation.target as OpenCCNode;

          // React may reuse an existing DOM node during client-side navigation.
          // Refresh OpenCC's stored source when that node receives new content.
          if (mutation.type === "characterData") {
            node.originalString = node.nodeValue;
          } else if (mutation.type === "attributes") {
            const element = mutation.target as HTMLElement & OpenCCNode;
            const value = mutation.attributeName
              ? element.getAttribute(mutation.attributeName)
              : null;

            if (mutation.attributeName === "placeholder") node.originalPlaceholder = value;
            if (mutation.attributeName === "aria-label") node.originalAriaLabel = value;
            if (mutation.attributeName === "alt") node.originalAlt = value;
            if (mutation.attributeName === "content") node.originalContent = value;
          }
        }

        convertPage();
      });

      convertPage();
    }

    void enableSimplifiedChinese();

    return () => {
      cancelled = true;
      observer?.disconnect();
      restore?.();
      clearOpenCCState(document.documentElement);
      document.documentElement.lang = "zh-HK";
    };
  }, [language]);

  return { language, setLanguage };
}

export default function LanguageSwitcher({
  placement,
  language,
  onChange,
}: {
  placement: "desktop" | "mobile";
  language: ChineseLanguage;
  onChange: (language: ChineseLanguage) => void;
}) {
  return (
    <div
      data-language-switcher={placement}
      role="group"
      aria-label="中文顯示"
      className="flex h-8 shrink-0 items-center rounded-md border border-line bg-white p-0.5 shadow-sm"
    >
      <button
        type="button"
        aria-label="使用繁體中文"
        aria-pressed={language === "traditional"}
        onClick={() => onChange("traditional")}
        className={`flex h-6 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium transition-colors ${
          language === "traditional"
            ? "bg-navy text-white"
            : "text-ink-soft hover:bg-mist hover:text-navy"
        }`}
      >
        繁
      </button>
      <button
        type="button"
        aria-label="使用簡體中文"
        aria-pressed={language === "simplified"}
        onClick={() => onChange("simplified")}
        className={`flex h-6 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium transition-colors ${
          language === "simplified"
            ? "bg-navy text-white"
            : "text-ink-soft hover:bg-mist hover:text-navy"
        }`}
      >
        簡
      </button>
    </div>
  );
}
