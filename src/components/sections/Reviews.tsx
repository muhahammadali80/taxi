"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";

/**
 * Temporary demo quotes for layout only — not verified customer reviews.
 * Replace `t.reviews.items` in `src/i18n/messages.ts` with genuine testimonials.
 */
export function Reviews() {
  const { t } = useT();

  return (
    <section className="py-14 md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.reviews.eyebrow}</p>
          <h2 className="heading-section mt-3 font-semibold">{t.reviews.title}</h2>
        </Reveal>
        <div className="no-scrollbar mt-8 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:mt-10 sm:gap-4 md:grid md:grid-cols-3 md:overflow-visible">
          {t.reviews.items.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.06} className="w-[min(18.5rem,85vw)] shrink-0 snap-start md:w-auto md:min-w-0">
              <figure className="neu-raised h-full rounded-[1.4rem] p-5 sm:rounded-[1.6rem] sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <figcaption className="font-semibold">{review.name}</figcaption>
                </div>
                <div className="mt-3 flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-6 text-muted">{review.quote}</blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
