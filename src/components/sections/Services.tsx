"use client";

import { Briefcase, CalendarCheck, MapPinned, Plane, Route, TrainFront } from "lucide-react";
import { Reveal, RevealItem, RevealList } from "@/components/Reveal";
import { getWhatsAppHref } from "@/lib/site";
import { useT } from "@/i18n/LanguageProvider";

const icons = [MapPinned, Plane, Route, Briefcase, TrainFront, CalendarCheck];

export function Services() {
  const { t } = useT();

  return (
    <section id="services" className="py-14 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.services.eyebrow}</p>
          <h2 className="heading-section mt-3 max-w-xl font-semibold">{t.services.title}</h2>
        </Reveal>
        <RevealList className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {t.services.items.map((service, index) => {
            const Icon = icons[index] ?? MapPinned;
            return (
              <RevealItem key={service.title}>
                <a
                  href={getWhatsAppHref(t.bookCta.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-raised flex min-h-36 w-full flex-col items-start rounded-[1.4rem] p-5 text-left sm:min-h-40 sm:rounded-[1.6rem] sm:p-6"
                >
                  <Icon className="size-5 text-ink" aria-hidden />
                  <span className="mt-5 text-lg font-semibold leading-snug">{service.title}</span>
                </a>
              </RevealItem>
            );
          })}
        </RevealList>
      </div>
    </section>
  );
}
