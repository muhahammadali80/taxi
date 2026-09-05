"use client";

import { useEffect, useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { useT } from "@/i18n/LanguageProvider";

export default function BookPage() {
  const { openBooking } = useBooking();
  const { t } = useT();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    openBooking(undefined, 1);
  }, [openBooking]);

  return (
    <div className="flex min-h-[80svh] items-center justify-center px-4 pt-28 pb-28 sm:pt-32">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.nav.book}</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t.bookPage.title}</h1>
        <p className="mt-3 text-muted">{t.bookPage.text}</p>
      </div>
    </div>
  );
}
