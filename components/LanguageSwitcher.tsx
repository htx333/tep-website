"use client";

import { useEffect, useRef, useState } from "react";

export type ChineseLanguage = "traditional" | "simplified" | "english";

const STORAGE_KEY = "tep-site-language";
const LEGACY_STORAGE_KEY = "tep-chinese-language";
const GOOGLE_TRANSLATE_COOKIE = "googtrans";

type GoogleTranslateWindow = Window & {
  google?: {
    translate?: {
      TranslateElement: new (
        options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
        elementId: string,
      ) => unknown;
    };
  };
  googleTranslateElementInit?: () => void;
};

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
    const savedLanguage =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (
      savedLanguage !== "simplified" &&
      savedLanguage !== "english"
    ) {
      return;
    }

    const timer = window.setTimeout(
      () => setLanguage(savedLanguage),
      0,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (firstLanguageEffect.current) {
      firstLanguageEffect.current = false;
      document.documentElement.dataset.chineseLanguage = "traditional";
      document.documentElement.dataset.siteLanguage = "traditional";
      document.documentElement.lang = "zh-HK";
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.dataset.chineseLanguage = language;
    document.documentElement.dataset.siteLanguage = language;

    if (language === "english") {
      document.documentElement.lang = "en";
      return;
    }

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

function EnglishTranslator({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;

    const browserWindow = window as GoogleTranslateWindow;
    document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=/zh-TW/en; path=/`;

    const applyEnglish = () => {
      const selector = document.querySelector<HTMLSelectElement>(
        ".goog-te-combo",
      );
      if (!selector) return;

      selector.value = "en";
      selector.dispatchEvent(new Event("change"));
    };

    browserWindow.googleTranslateElementInit = () => {
      const GoogleTranslate = browserWindow.google?.translate?.TranslateElement;
      if (!GoogleTranslate) return;

      new GoogleTranslate(
        {
          pageLanguage: "zh-TW",
          includedLanguages: "en",
          autoDisplay: false,
        },
        "google_translate_element",
      );
      window.setTimeout(applyEnglish, 0);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-google-translate="true"]',
    );

    if (existingScript) {
      browserWindow.googleTranslateElementInit?.();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.dataset.googleTranslate = "true";
    document.head.appendChild(script);
  }, [active]);

  if (!active) return null;

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
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
  const changeLanguage = (nextLanguage: ChineseLanguage) => {
    if (language === "english" && nextLanguage !== "english") {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
      document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=; path=/; max-age=0`;
      window.location.reload();
      return;
    }

    onChange(nextLanguage);
  };

  return (
    <>
      {placement === "desktop" && <EnglishTranslator active={language === "english"} />}
      <div
        data-language-switcher={placement}
        role="group"
        aria-label="網站語言"
        translate="no"
        className="flex h-8 shrink-0 items-center rounded-md border border-line bg-white p-0.5 shadow-sm"
      >
        <button
          type="button"
          aria-label="使用繁體中文"
          aria-pressed={language === "traditional"}
          onClick={() => changeLanguage("traditional")}
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
          onClick={() => changeLanguage("simplified")}
          className={`flex h-6 min-w-6 items-center justify-center rounded px-1.5 text-xs font-medium transition-colors ${
            language === "simplified"
              ? "bg-navy text-white"
              : "text-ink-soft hover:bg-mist hover:text-navy"
          }`}
        >
          簡
        </button>
        <button
          type="button"
          aria-label="Use English"
          aria-pressed={language === "english"}
          onClick={() => changeLanguage("english")}
          className={`flex h-6 min-w-8 items-center justify-center rounded px-1.5 text-xs font-medium transition-colors ${
            language === "english"
              ? "bg-navy text-white"
              : "text-ink-soft hover:bg-mist hover:text-navy"
          }`}
        >
          Eng
        </button>
      </div>
    </>
  );
}
