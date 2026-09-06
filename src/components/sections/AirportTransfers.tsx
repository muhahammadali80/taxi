"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { IMAGES, getWhatsAppHref } from "@/lib/site";
import { useT } from "@/i18n/LanguageProvider";

export function AirportTransfers() {
  const { t } = useT();

  return (
    <section id="airport" className="py-14 md:py-28">
      <div className="container-site grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.airport.eyebrow}</p>
          <h2 className="heading-section mt-3 font-semibold">{t.airport.title}</h2>
          <p className="mt-4 max-w-lg leading-7 text-muted">{t.airport.text}</p>
          <ul className="mt-8 space-y-4">
            {t.airport.points.map((point) => (
              <li key={point.title} className="border-b border-line pb-4">
                <p className="font-semibold">{point.title}</p>
                <p className="text-sm text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
          <Button href={getWhatsAppHref(t.bookCta.whatsappMessage)} className="mt-8 min-h-14">
            {t.airport.cta}
          </Button>
        </Reveal>
        <Reveal delay={0.1} className="neu-raised relative aspect-[16/10] overflow-hidden rounded-[1.5rem] sm:aspect-[5/4] md:rounded-[2rem] lg:aspect-[4/5]">
          <Image
            src={IMAGES.airport}
            alt={t.airport.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition duration-700 ease-out [@media(hover:hover)]:hover:scale-[1.03]"
          />
        </Reveal>
      </div>
    </section>
  );
}
