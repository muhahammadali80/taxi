"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { NAV_HREFS, SITE, getWhatsAppHref, getWhatsAppBookingHref } from "@/lib/site";
import { useBooking } from "@/components/booking/BookingProvider";
import { useMobileMenu } from "@/components/MobileMenuContext";
import { useT } from "@/i18n/LanguageProvider";

export function Footer() {
  const { openBooking } = useBooking();
  const { t } = useT();

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-site grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-10 md:py-14">
        <div className="md:col-span-1">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Taxi</p>
          <p className="mt-1 text-xl font-semibold tracking-[0.06em] text-gold uppercase">{SITE.shortName}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{t.footer.blurb}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{t.footer.contact}</p>
          <ul className="mt-3 space-y-1 text-sm text-white/70">
            <li>
              <a href={SITE.phoneHref} className="flex min-h-11 items-center hover:text-gold">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex min-h-11 items-center break-all hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li className="py-2">{t.footer.hours}</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">{t.footer.explore}</p>
          <ul className="mt-3 space-y-1 text-sm text-white/70">
            {NAV_HREFS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => {
                    if (link.href.startsWith("/#") && window.location.pathname === "/") {
                      const target = document.getElementById(link.href.slice(2));
                      if (target) {
                        event.preventDefault();
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                  className="flex min-h-11 items-center hover:text-gold"
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => openBooking()} className="flex min-h-11 items-center hover:text-gold">
                {t.footer.bookTaxi}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">{t.footer.coverage}</p>
          <p className="mt-3 text-sm leading-6 text-white/70">{t.footer.coverageText}</p>
          <p className="mt-2 text-sm text-white/50">{t.footer.coverageNote}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-5 text-xs leading-5 text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex min-h-10 items-center">
            © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
          </p>
          <nav aria-label={t.footer.explore} className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1">
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-gold">
              {t.footer.privacy}
            </Link>
            <span aria-hidden className="hidden text-white/25 sm:inline">
              ·
            </span>
            <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-gold">
              {t.footer.terms}
            </Link>
            <span aria-hidden className="hidden text-white/25 sm:inline">
              ·
            </span>
            <span className="inline-flex min-h-11 items-center">{t.footer.bookingNote}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyBar() {
  const { open, openBooking, draft } = useBooking();
  const { open: menuOpen } = useMobileMenu();
  const { t } = useT();
  if (open || menuOpen) return null;

  // Use journey-aware WhatsApp link when pickup/destination are filled
  const hasJourney = Boolean(draft?.pickup?.trim() && draft?.destination?.trim());
  const whatsappHref = hasJourney
    ? getWhatsAppBookingHref({
        pickup: draft.pickup,
        destination: draft.destination,
        date: draft.date,
        time: draft.time,
        passengers: draft.passengers,
        vehicleClass: draft.vehicleClass,
      })
    : getWhatsAppHref(t.contact.whatsappMessage);

  return (
    <div className="fixed inset-x-2 bottom-0 z-40 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="neu-float grid grid-cols-3 gap-1 rounded-[1.35rem] p-1.5 sm:gap-1.5">
        <a
          href={SITE.phoneHref}
          className="neu-raised-sm flex min-h-[3.75rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-center text-[0.7rem] leading-tight font-semibold text-ink active:scale-95 sm:text-xs"
        >
          <Phone className="size-5 shrink-0" />
          <span className="max-w-full truncate">{t.sticky.call}</span>
        </a>
        <button
          type="button"
          onClick={() => openBooking()}
          className="flex min-h-[3.75rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl bg-gold px-1 text-center text-[0.7rem] leading-tight font-bold text-ink shadow-[0_8px_18px_-6px_rgba(26,26,26,0.4)] active:scale-95 sm:text-xs"
        >
          <span className="max-w-full truncate">{t.sticky.book}</span>
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="neu-raised-sm flex min-h-[3.75rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-center text-[0.7rem] leading-tight font-semibold text-ink active:scale-95 sm:text-xs"
        >
          <MessageCircle className="size-5 shrink-0" />
          <span className="max-w-full truncate">{t.sticky.whatsapp}</span>
        </a>
      </div>
    </div>
  );
}

