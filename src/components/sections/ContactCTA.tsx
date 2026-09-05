"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { IMAGES, SITE, getWhatsAppHref } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingProvider";
import { useT } from "@/i18n/LanguageProvider";

export function ContactCTA() {
  const { openBooking } = useBooking();
  const { t } = useT();
  const [linksReady, setLinksReady] = useState(false);

  useEffect(() => {
    setLinksReady(true);
  }, []);

  return (
    <section id="contact" className="py-14 md:py-28">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[1.5rem] px-5 py-10 text-center text-white sm:rounded-[2rem] sm:px-6 sm:py-14 md:px-16 md:py-20">
          <Image
            src={IMAGES.priusHero}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[42%_62%]"
          />
          <div className="absolute inset-0 bg-ink/78" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55" />
          <div className="relative">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.contact.eyebrow}</p>
            <h2 className="heading-section mx-auto mt-3 max-w-2xl font-semibold sm:mt-4 md:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/65 sm:text-base">{t.contact.text}</p>
            <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-8 sm:items-center sm:flex-row">
              <Button onClick={() => openBooking()} className="min-h-14 w-full px-8 sm:w-auto">
                {t.contact.book}
              </Button>
              <Button href={SITE.phoneHref} variant="secondary" className="min-h-14 w-full px-8 sm:w-auto">
                <Phone className="size-4" />
                {t.contact.call}
                <span className="hidden sm:inline"> {SITE.phoneDisplay}</span>
              </Button>
              <Button href={getWhatsAppHref(t.contact.whatsappMessage)} variant="secondary" className="min-h-14 w-full px-8 sm:w-auto">
                <MessageCircle className="size-4" />
                {t.contact.whatsapp}
              </Button>
            </div>
            <p className="mt-6 min-h-5 text-sm break-words text-white/45">
              {linksReady ? (
                <>
                  <a href={SITE.phoneHref} className="hover:text-gold">
                    {SITE.phoneDisplay}
                  </a>
                </>
              ) : null}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
