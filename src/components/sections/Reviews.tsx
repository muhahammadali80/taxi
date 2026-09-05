"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";

export function Reviews() {
  const { t } = useT();

  return (
    <section className="py-14 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.reviews.eyebrow}</p>
          <h2 className="heading-section mt-3 font-semibold">{t.reviews.title}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.reviews.intro}</p>
        </Reveal>
        <div className="no-scrollbar mt-8 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:mt-10 sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible">
          {t.reviews.items.map((text, index) => (
            <Reveal key={text} delay={index * 0.06} className="w-[min(18.5rem,85vw)] shrink-0 snap-start md:w-auto md:min-w-0">
              <figure className="neu-raised h-full rounded-[1.4rem] p-5 sm:rounded-[1.6rem] sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <figcaption className="font-semibold">{t.reviews.sample}</figcaption>
                  <span className="neu-inset-sm rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                    {t.reviews.placeholder}
                  </span>
                </div>
                <div className="mt-3 flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-6 text-muted">{text}</blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
