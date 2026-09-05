"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { HamburgerIcon } from "@/components/motion/HamburgerIcon";
import { NAV_HREFS, SITE, getWhatsAppHref } from "@/lib/site";
import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useMobileMenu } from "@/components/MobileMenuContext";
import { useT } from "@/i18n/LanguageProvider";

export function Navigation() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const { t } = useT();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const { open, setOpen } = useMobileMenu();
  const onHome = pathname === "/";
  const compact = scrolled || open || !onHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
    };
  }, [open]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-5 md:pt-3">
      <nav
        aria-label="Primary"
        className={`relative z-50 mx-auto flex max-w-[1120px] items-center justify-between rounded-full border border-white/10 bg-ink px-2 text-gold shadow-[0_12px_40px_-20px_rgba(26,26,26,0.55)] transition-all duration-300 sm:px-3 ${
          compact ? "h-12 md:h-[3.6rem]" : "h-14 md:h-[4.25rem]"
        }`}
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 rounded-full px-1 py-1 sm:gap-2.5 sm:px-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
            T
          </span>
          <span className="hidden min-w-0 leading-tight md:block">
            <span className="hidden text-[0.65rem] tracking-[0.22em] text-gold/70 uppercase lg:block">Taxi</span>
            <span className="block truncate text-sm font-semibold tracking-[0.08em] text-gold uppercase">
              {SITE.shortName}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_HREFS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link rounded-full px-2.5 py-2 text-sm whitespace-nowrap text-gold hover:text-gold-soft"
              >
                {t.nav[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher compact />
          </div>
          <Button
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            variant="urgent"
            className="w-auto shrink-0 px-2.5 text-[0.8rem] whitespace-nowrap sm:px-4 sm:text-sm"
          >
            <span className="lg:hidden">{t.sticky.book}</span>
            <span className="hidden lg:inline">{t.nav.bookNow}</span>
          </Button>
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-gold xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen(!open)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.openMenu}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: reduce ? 0.16 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-4 pt-[calc(4.75rem+env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] xl:hidden"
          >
            <div className="mb-4 rounded-2xl border border-white/10 p-2">
              <LanguageSwitcher showNames />
            </div>
            <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
              {NAV_HREFS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => {
                      setOpen(false);
                      if (pathname === "/" && link.href.startsWith("/#")) {
                        const id = link.href.slice(2);
                        const target = document.getElementById(id);
                        if (target) {
                          event.preventDefault();
                          target.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    }}
                    className="flex min-h-14 items-center border-b border-white/8 px-1 text-lg font-medium text-gold"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2">
              <Button
                variant="urgent"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className="min-h-14 w-full"
              >
                {t.nav.bookNow}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button href={SITE.phoneHref} variant="secondary" className="min-h-12 w-full">
                  <Phone className="size-4" />
                  {t.sticky.call}
                </Button>
                <Button href={getWhatsAppHref(t.contact.whatsappMessage)} variant="secondary" className="min-h-12 w-full">
                  <MessageCircle className="size-4" />
                  {t.sticky.whatsapp}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
