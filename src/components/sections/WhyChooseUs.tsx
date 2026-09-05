"use client";

import { Clock3, MapPinned, Plane, Sofa } from "lucide-react";
import { Reveal, RevealItem, RevealList } from "@/components/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { useT } from "@/i18n/LanguageProvider";

const icons = [Clock3, Sofa, Plane, MapPinned];

export function WhyChooseUs() {
  const { t } = useT();

  return (
    <section className="py-14 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.why.eyebrow}</p>
          <h2 className="heading-section mt-3 max-w-xl font-semibold">{t.why.title}</h2>
        </Reveal>

        <RevealList className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {t.stats.items.map((stat) => (
            <RevealItem key={stat.label} className="neu-raised min-w-0 rounded-2xl px-1.5 py-3 text-center sm:px-4 sm:py-5">
              <p className="text-xl font-semibold tracking-tight sm:text-3xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[10px] leading-4 text-charcoal sm:text-sm">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealList>

        <RevealList className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {t.why.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <RevealItem key={item.title}>
                <article className="neu-raised h-full min-w-0 rounded-3xl p-5 sm:p-6">
                  <Icon className="size-5 text-ink" aria-hidden />
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealList>
      </div>
    </section>
  );
}
