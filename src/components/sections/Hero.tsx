"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroJourney } from "@/components/motion/HeroCar";
import { useBooking } from "@/components/booking/BookingProvider";
import { IMAGES, SITE, getWhatsAppHref } from "@/lib/site";
import { useMobileLayout } from "@/lib/use-mobile";
import { useT } from "@/i18n/LanguageProvider";
import { duration, easeOut } from "@/lib/motion";

export function Hero() {
  const { openBooking } = useBooking();
  const { t } = useT();
  const reduce = useReducedMotion();
  const mobile = useMobileLayout();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || mobile ? ["0%", "0%"] : ["0%", "16%"],
  );

  return (
    <section
      ref={sectionRef}
      className="hero-screen relative isolate min-h-[58svh] overflow-hidden bg-ink text-white md:min-h-[88vh]"
    >
      {/* Parallax image */}
      <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y: imageY }}>
        <Image
          src={IMAGES.hero}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover object-[55%_55%] sm:object-[center_50%]"
        />
      </motion.div>

      {/* ── All-sides soft fade vignette ── */}
      {/* Top fade — blends into nav/dark top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[38%]"
        style={{ background: "linear-gradient(to bottom, #1a1a1a 0%, #1a1a1a 8%, transparent 100%)" }}
        aria-hidden
      />
      {/* Bottom fade — blends into booking panel / cream section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{ background: "linear-gradient(to top, #1a1a1a 0%, #1a1a1a 5%, rgba(26,26,26,0.65) 40%, transparent 100%)" }}
        aria-hidden
      />
      {/* Left fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[12%] md:w-[30%]"
        style={{ background: "linear-gradient(to right, #1a1a1a 0%, rgba(26,26,26,0.55) 40%, transparent 100%)" }}
        aria-hidden
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[10%] md:w-[28%]"
        style={{ background: "linear-gradient(to left, #1a1a1a 0%, rgba(26,26,26,0.4) 35%, transparent 100%)" }}
        aria-hidden
      />

      {/* Hero content */}
      <div className="hero-screen container-site relative z-[2] flex min-h-[58svh] min-w-0 flex-col justify-end pt-[calc(5.25rem+env(safe-area-inset-top))] pb-10 md:min-h-[88vh] md:justify-center md:pt-28 md:pb-36">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, delay: 0.08, ease: easeOut }}
          className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold uppercase sm:text-xs"
        >
          {t.hero.eyebrow}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, delay: 0.14, ease: easeOut }}
          className="heading-display mt-2 min-w-0 max-w-full font-semibold break-words sm:mt-4 sm:max-w-3xl"
        >
          {t.hero.title}
        </motion.h1>
        <HeroJourney />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, delay: 0.22, ease: easeOut }}
          className="mt-3 min-w-0 max-w-xl text-[0.95rem] leading-6 text-white/80 break-words sm:mt-5 sm:text-base sm:leading-7 md:text-lg"
        >
          {t.hero.text}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, delay: 0.3, ease: easeOut }}
          className="mt-5 flex w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
        >
          <Button onClick={() => openBooking()} className="min-h-14 px-8 text-base">
            {t.hero.book}
          </Button>
          <Button href={SITE.phoneHref} variant="secondary" className="min-h-14 px-6 text-base">
            <Phone className="size-4" />
            {t.hero.call}
            <span className="hidden sm:inline"> {SITE.phoneDisplay}</span>
          </Button>
          <Button href={getWhatsAppHref(t.contact.whatsappMessage)} variant="secondary" className="min-h-14 px-8 text-base">
            <MessageCircle className="size-4" />
            {t.hero.whatsapp}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
