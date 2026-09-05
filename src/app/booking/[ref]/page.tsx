"use client";

import { Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import { BookingStatusView } from "@/components/booking/BookingStatusView";
import { useBookingLive } from "@/components/booking/useBookingLive";
import { useT } from "@/i18n/LanguageProvider";

export default function BookingStatusPage({ params }: { params: Promise<{ ref: string }> }) {
  return (
    <Suspense fallback={<div className="container-site pt-28 pb-20 text-sm text-muted">…</div>}>
      <BookingStatus params={params} />
    </Suspense>
  );
}

function BookingStatus({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = use(params);
  const token = useSearchParams().get("t") ?? "";
  const { t } = useT();
  const booking = useBookingLive(ref.toUpperCase(), token);

  if (!token) {
    return (
      <article className="container-site max-w-xl pt-[calc(6.5rem+env(safe-area-inset-top))] pb-20">
        <h1 className="text-2xl font-semibold">{t.booking.receivedTitle}</h1>
        <p className="mt-3 text-muted">{t.booking.submitError}</p>
      </article>
    );
  }

  if (!booking) {
    return (
      <article className="container-site max-w-xl pt-[calc(6.5rem+env(safe-area-inset-top))] pb-20">
        <p className="text-sm text-muted">{t.booking.calculating}…</p>
      </article>
    );
  }

  return (
    <article className="container-site max-w-xl pt-[calc(6.5rem+env(safe-area-inset-top))] pb-8">
      <BookingStatusView booking={booking} status={booking.status} />
    </article>
  );
}
