"use client";

import { LOCALES, LOCALE_META } from "@/i18n/config";
import { useT } from "@/i18n/LanguageProvider";

type LanguageSwitcherProps = {
  tone?: "dark" | "light";
  compact?: boolean;
  showNames?: boolean;
};

export function LanguageSwitcher({ tone = "dark", compact = false, showNames = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useT();
  const active = tone === "dark" ? "bg-gold text-ink" : "bg-ink text-gold";
  const idle =
    tone === "dark"
      ? "text-gold/80 [@media(hover:hover)]:hover:bg-white/10"
      : "text-ink/70 [@media(hover:hover)]:hover:bg-black/5";

  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className={`flex items-center ${showNames ? "w-full gap-1.5" : compact ? "gap-0.5" : "w-full justify-between gap-1"}`}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`rounded-full font-semibold ${
            showNames
              ? "flex min-h-12 flex-1 flex-col items-center justify-center px-1.5 text-[11px] leading-tight tracking-wide"
              : compact
                ? "flex min-h-11 min-w-11 items-center justify-center px-1.5 text-[11px] tracking-normal"
                : "min-h-11 flex-1 px-2 text-xs tracking-wide"
          } ${locale === code ? active : idle}`}
        >
          <span>{LOCALE_META[code].code}</span>
          {showNames ? <span className="mt-0.5 font-medium opacity-80">{LOCALE_META[code].name}</span> : null}
        </button>
      ))}
    </div>
  );
}
