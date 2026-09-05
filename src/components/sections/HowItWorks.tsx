"use client";

import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";

export function HowItWorks() {
  const { t } = useT();

  return (
    <section className="py-14 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.how.eyebrow}</p>
          <h2 className="heading-section mt-3 font-semibold">{t.how.title}</h2>
        </Reveal>
        <div className="relative mt-8 sm:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 right-[16%] left-[16%] hidden h-px bg-line md:block"
          />
          <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
            {t.how.steps.map((step, index) => (
              <li key={step.title} className="relative">
                <Reveal delay={index * 0.09} className="flex gap-4 md:block">
                  <span className="neu-raised relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-ink">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold md:mt-5 md:text-xl">{step.title}</h3>
                    <p className="mt-1.5 max-w-xs text-sm leading-6 text-muted md:mt-2 md:text-base">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
