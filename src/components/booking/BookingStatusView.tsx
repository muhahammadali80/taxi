"use client";

import { Check, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConfettiBurst } from "@/components/motion/ConfettiBurst";
import { formatDateLabel, formatMoney } from "@/lib/pricing";
import { SITE, getWhatsAppHref } from "@/lib/site";
import type { BookingStatus, VehicleClass } from "@/lib/types";
import { useT } from "@/i18n/LanguageProvider";

export type StatusBooking = {
  reference: string;
  status: BookingStatus;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  returnJourney: boolean;
  returnDate: string;
  returnTime: string;
  vehicleClass: VehicleClass;
  passengers: number;
  luggage: number;
  name: string;
  phone?: string;
  quote: number;
};

export function BookingStatusView({
  booking,
  status,
  onClose,
}: {
  booking: StatusBooking;
  status: BookingStatus;
  onClose?: () => void;
}) {
  const { t, locale } = useT();
  const confirmed = status === "confirmed";
  const declined = status === "declined";
  const statusLabel = confirmed
    ? t.bookingStatus.confirmed
    : declined
      ? t.bookingStatus.declined
      : t.bookingStatus.awaiting_confirmation;
  const title = confirmed
    ? t.booking.confirmedLiveTitle
    : declined
      ? t.booking.declinedTitle
      : t.booking.receivedTitle;
  const note = confirmed
    ? t.booking.confirmedLiveNote
    : declined
      ? t.booking.declinedNote
      : t.booking.receivedNote;

  const rows: [string, string][] = [
    [t.booking.labels.pickup, booking.pickup],
    [t.booking.labels.destination, booking.destination],
    [t.booking.labels.date, formatDateLabel(booking.date, locale)],
    [t.booking.labels.time, booking.time],
    [t.booking.labels.passengers, String(booking.passengers)],
    [t.booking.labels.luggage, String(booking.luggage)],
    [t.booking.labels.vehicle, t.vehicles[booking.vehicleClass]],
    [t.booking.labels.name, booking.name],
  ];
  if (booking.phone) rows.push([t.booking.labels.phone, booking.phone]);
  rows.push([t.booking.labels.fare, formatMoney(booking.quote, locale)]);
  if (booking.returnJourney) {
    rows.splice(4, 0, [
      t.booking.labels.return,
      `${formatDateLabel(booking.returnDate, locale)} · ${booking.returnTime}`,
    ]);
  }

  return (
    <div className="pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div
        className={`rounded-[1.35rem] px-4 py-5 text-center sm:px-5 ${
          confirmed ? "bg-[#2ecc71] text-ink" : declined ? "bg-ink text-gold" : "bg-gold text-ink"
        }`}
      >
        <div className="relative mx-auto flex size-16 items-center justify-center sm:size-20">
          {confirmed ? <ConfettiBurst /> : null}
          <div
            className={`flex size-14 items-center justify-center rounded-full sm:size-16 ${
              declined ? "bg-gold text-ink" : "bg-ink/10"
            }`}
          >
            {declined ? (
              <X className="size-7" />
            ) : (
              <svg viewBox="0 0 48 48" className="size-10" aria-hidden>
                <path
                  d="M15 25.5 21.2 31.5 33.5 17.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="confirm-check"
                />
              </svg>
            )}
          </div>
        </div>
        <p className="mt-3 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">{statusLabel}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-6 opacity-80">{note}</p>
        <p className="mt-3 text-sm">
          {t.booking.reference} <span className="font-semibold">{booking.reference}</span>
        </p>
      </div>

      <dl className="neu-inset mt-5 overflow-hidden rounded-2xl">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4">
            <dt className="shrink-0 text-sm text-muted">{label}</dt>
            <dd className="min-w-0 break-words text-right text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm break-words text-muted">
        {t.booking.receivedContact.replace("{phone}", SITE.phoneDisplay)}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button href={SITE.phoneHref} variant="ghost" className="min-h-12 w-full">
          <Phone className="size-4" />
          {t.sticky.call}
        </Button>
        <Button href={getWhatsAppHref(t.contact.whatsappMessage)} variant="ghost" className="min-h-12 w-full">
          <MessageCircle className="size-4" />
          {t.sticky.whatsapp}
        </Button>
      </div>

      {onClose ? (
        <Button onClick={onClose} className="mt-3 min-h-14 w-full">
          <Check className="size-4" />
          {t.booking.done}
        </Button>
      ) : null}
    </div>
  );
}
