"use client";

import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { useMobileMenu } from "@/components/MobileMenuContext";
import { detectBrowserLocale, getStoredLocale, LOCALE_META } from "@/i18n/config";
import { useT } from "@/i18n/LanguageProvider";

export function LanguageSuggest() {
  const { locale, setLocale, t } = useT();
  const { open } = useBooking();
  const { open: menuOpen } = useMobileMenu();
  const [suggested, setSuggested] = useState<typeof locale | null>(null);

  useEffect(() => {
    if (getStoredLocale()) return;
    const browser = detectBrowserLocale();
    if (browser !== locale) setSuggested(browser);
  }, [locale]);

  if (!suggested || open || menuOpen) return null;
  const name = LOCALE_META[suggested].name;

  return (
    <div className="fixed inset-x-3 top-[calc(4.75rem+env(safe-area-inset-top))] z-[45] max-w-full md:inset-x-auto md:top-auto md:right-4 md:bottom-4 md:w-[22rem]">
      <div className="neu-float rounded-[1.2rem] px-3 py-3 text-ink">
        <p className="text-sm font-semibold leading-5 break-words">{t.langSuggest.title.replace("{lang}", name)}</p>
        <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setLocale(suggested);
              setSuggested(null);
            }}
            className="min-h-11 w-full rounded-full bg-gold px-2 py-2 text-center text-sm font-semibold leading-snug text-ink break-words sm:flex-1 sm:px-3"
          >
            {t.langSuggest.accept.replace("{lang}", name)}
          </button>
          <button
            type="button"
            onClick={() => {
              setLocale(locale);
              setSuggested(null);
            }}
            className="neu-raised-sm min-h-11 w-full rounded-full px-2 py-2 text-center text-sm font-semibold leading-snug break-words sm:flex-1 sm:px-3"
          >
            {t.langSuggest.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
