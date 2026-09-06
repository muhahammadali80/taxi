"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE, getWhatsAppHref } from "@/lib/site";
import { useT } from "@/i18n/LanguageProvider";

export function BookCTA({ overlap = true }: { overlap?: boolean }) {
  const { t } = useT();

  return (
    <section
      id="book"
      aria-labelledby="booking-heading"
      className={overlap ? "relative z-10 pb-24 md:-mt-20 md:pb-8" : "relative z-10 py-14 md:py-20"}
    >
      {overlap ? (
        <div className="pointer-events-none absolute inset-x-0 top-16 bottom-0 bg-cream" aria-hidden />
      ) : null}
      <div className="container-site relative">
        <div className="neu-float rounded-[1.35rem] px-5 py-8 text-center sm:rounded-[1.75rem] sm:px-8 sm:py-10 md:px-12 md:py-12">
          <h2 id="booking-heading" className="heading-section mx-auto max-w-xl font-semibold">
            {t.bookCta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-charcoal sm:text-base sm:leading-7">
            {t.bookCta.text}
          </p>

          <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8">
            <Button
              href={getWhatsAppHref(t.bookCta.whatsappMessage)}
              className="min-h-14 w-full text-base"
            >
              <MessageCircle className="size-[18px] shrink-0" aria-hidden />
              {t.bookCta.whatsapp}
            </Button>
            <Button href={SITE.phoneHref} variant="ghost" className="min-h-14 w-full text-base">
              <Phone className="size-[18px] shrink-0" aria-hidden />
              {t.bookCta.call}
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted">
            <a href={SITE.phoneHref} className="font-semibold text-ink select-all hover:text-charcoal">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
