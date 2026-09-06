"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { duration, easeOut } from "@/lib/motion";
import { useT } from "@/i18n/LanguageProvider";

export function Faq() {
  const { t } = useT();
  const reduce = useReducedMotion();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(-1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.faq.eyebrow}</p>
          <h2 id="faq-heading" className="heading-section mt-3 max-w-xl font-semibold">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-line sm:mt-10">
          {t.faq.items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-3.5 text-left sm:min-h-16 sm:py-4"
                  >
                    <span className="text-[0.95rem] font-semibold leading-snug text-ink sm:text-base">
                      {item.q}
                    </span>
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink"
                      aria-hidden
                    >
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!open}
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : duration.base, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-4 text-sm leading-6 text-muted sm:pb-5 sm:text-[0.95rem] sm:leading-7">
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
