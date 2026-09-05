"use client";

import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { useT } from "@/i18n/LanguageProvider";

export function PickupCallHelp() {
  const { t } = useT();

  return (
    <div className="mt-3 rounded-2xl border border-line/80 bg-cream/80 px-3.5 py-3">
      <p className="text-sm font-semibold leading-5 text-ink">{t.booking.cantFindTitle}</p>
      <p className="mt-1 text-xs leading-5 text-charcoal sm:text-sm">{t.booking.cantFindText}</p>
      <a
        href={SITE.phoneHref}
        className="mt-2.5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-gold sm:w-auto sm:justify-start"
        suppressHydrationWarning
      >
        <Phone className="size-4 shrink-0" aria-hidden />
        <span>
          {t.booking.cantFindCta}
          <span className="font-medium text-gold/80"> · {SITE.phoneDisplay}</span>
        </span>
      </a>
    </div>
  );
}
