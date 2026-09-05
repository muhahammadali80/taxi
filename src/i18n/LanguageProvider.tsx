"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { detectLocale, LOCALE_META, STORAGE_KEY, type Locale } from "./config";
import { messages, type Messages } from "./messages";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANG_EVENT = "hammad-lang";

export function useT() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useT must be used within LanguageProvider");
  return value;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(LANG_EVENT, onStoreChange);
  return () => window.removeEventListener(LANG_EVENT, onStoreChange);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, detectLocale, () => "es" as Locale);

  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].html;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = LOCALE_META[next].html;
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
