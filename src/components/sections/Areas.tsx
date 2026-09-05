"use client";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/LanguageProvider";

export function Areas() {
  const { t } = useT();

  return (
    <section id="areas" className="py-14 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.areas.eyebrow}</p>
          <h2 className="heading-section mt-3 max-w-2xl font-semibold">{t.areas.title}</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="neu-raised rounded-[1.5rem] p-5 md:rounded-[1.8rem] md:p-8">
              <p className="leading-7 text-muted">{t.areas.text}</p>
              <p className="mt-4 text-sm text-charcoal">{t.areas.extra}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-ink p-5 text-white md:rounded-[1.8rem] md:p-8">
              <p className="text-lg font-semibold leading-7">{t.areas.contact}</p>
              <Button href="/#contact" variant="primary" className="mt-8 min-h-14 w-full">
                {t.nav.contact}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
