"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/site";
import { useT } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useT();

  return (
    <section id="about" className="py-14 md:py-28">
      <div className="container-site grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
        <Reveal className="neu-raised relative aspect-[16/10] overflow-hidden rounded-[1.5rem] sm:aspect-[5/4] md:rounded-[2rem]">
          <Image
            src={IMAGES.priusAngle}
            alt={t.about.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[45%_55%] transition duration-700 ease-out [@media(hover:hover)]:hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.about.eyebrow}</p>
          <h2 className="heading-section mt-3 font-semibold">{t.about.title}</h2>
          <p className="mt-4 leading-7 text-muted">{t.about.p1}</p>
          <p className="mt-4 leading-7 text-muted">{t.about.p2}</p>
        </Reveal>
      </div>
    </section>
  );
}
