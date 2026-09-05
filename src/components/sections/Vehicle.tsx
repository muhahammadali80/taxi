"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Luggage, Plane, Sofa, Sparkles, Users } from "lucide-react";
import { IMAGES, SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { useMobileLayout } from "@/lib/use-mobile";
import { useT } from "@/i18n/LanguageProvider";

const icons = [Users, Sofa, Luggage, Plane, Sparkles];

export function Vehicle() {
  const { t } = useT();
  const reduce = useReducedMotion();
  const mobile = useMobileLayout();
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce || mobile ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <section id="vehicle" className="bg-ink py-14 text-white md:py-28">
      <div className="container-site">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.vehicle.eyebrow}</p>
          <h2 className="heading-section mt-3 max-w-2xl font-semibold">{t.vehicle.title}</h2>
          <p className="mt-4 max-w-xl text-white/65">{t.vehicle.text}</p>
        </Reveal>

        <Reveal className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 md:mt-10 md:rounded-[2rem]">
          <div className="grid lg:grid-cols-[1.45fr_0.85fr]">
            <div ref={frame} className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/3] lg:aspect-auto lg:min-h-[520px]">
              <motion.div className="absolute inset-[-6%]" style={{ y: imageY }}>
                <Image
                  src={IMAGES.priusHero}
                  alt={t.vehicle.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-[42%_62%]"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/20" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                <p className="inline-flex rounded-full bg-gold px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-ink uppercase">
                  {t.vehicles.featured}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-3xl">{SITE.vehicle.name}</h3>
                <p className="mt-1 text-sm text-white/75">{t.vehicles.prius}</p>
                <p className="mt-2 max-w-md text-sm text-white/70">{t.vehicles.priusDetail}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 p-4 sm:p-5 lg:border-t-0 lg:border-l">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] sm:aspect-[5/3] lg:min-h-[200px] lg:flex-1 lg:aspect-auto">
                <Image
                  src={IMAGES.priusStreet}
                  alt={t.vehicle.streetAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover object-[center_60%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              </div>
              <div className="grid gap-2.5">
                {t.vehicle.features.map((label, index) => {
                  const Icon = icons[index] ?? Sparkles;
                  return (
                    <div
                      key={label}
                      className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <Icon className="size-4 shrink-0 text-gold" aria-hidden />
                      <span className="text-sm">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal delay={0.06} className="overflow-hidden rounded-[1.4rem] border border-white/10">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={IMAGES.sedan}
                alt={t.vehicle.sedanAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[72%_52%]"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-lg font-semibold">{t.vehicles.sedan}</h3>
              <p className="mt-1 text-sm text-white/70">{t.vehicles.sedanDetail}</p>
              <p className="mt-2 text-sm text-white/60">{t.vehicles.sedanDesc}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-[1.4rem] border border-white/10">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={IMAGES.van}
                alt={t.vehicle.vanAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[68%_42%]"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-lg font-semibold">{t.vehicles.van}</h3>
              <p className="mt-1 text-sm text-white/70">{t.vehicles.vanDetail}</p>
              <p className="mt-2 text-sm text-white/60">{t.vehicles.vanDesc}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
