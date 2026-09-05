export const LOCALES = ["es", "ca", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<Locale, { code: string; html: string; name: string }> = {
  es: { code: "ES", html: "es", name: "Español" },
  ca: { code: "CA", html: "ca", name: "Català" },
  en: { code: "EN", html: "en", name: "English" },
  fr: { code: "FR", html: "fr", name: "Français" },
};

export const STORAGE_KEY = "hammad-lang";

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LOCALES.includes(stored as Locale)) return stored as Locale;
  } catch {
    /* ignore */
  }
  return null;
}

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const base = language.toLowerCase();
    if (base.startsWith("ca")) return "ca";
    if (base.startsWith("es")) return "es";
    if (base.startsWith("fr")) return "fr";
    if (base.startsWith("en")) return "en";
  }
  return "es";
}

export function detectLocale(): Locale {
  return getStoredLocale() ?? "es";
}
