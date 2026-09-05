"use client";

import { useEffect, useState } from "react";
import type { PublicBooking } from "@/lib/booking/types";

export function useBookingLive(reference?: string, viewToken?: string) {
  const [booking, setBooking] = useState<PublicBooking | null>(null);

  useEffect(() => {
    if (!reference || !viewToken) return;
    let active = true;
    let source: EventSource | null = null;
    const url = `/api/bookings/${reference}?t=${encodeURIComponent(viewToken)}`;
    const liveUrl = `/api/bookings/${reference}/live?t=${encodeURIComponent(viewToken)}`;

    async function pull() {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { booking: PublicBooking };
      if (active) setBooking(data.booking);
    }

    function connect() {
      source?.close();
      source = new EventSource(liveUrl);
      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as { booking: PublicBooking };
          if (active) setBooking(data.booking);
        } catch {
          /* ignore */
        }
      };
      source.onerror = () => {
        void pull();
      };
    }

    function resume() {
      if (document.visibilityState === "hidden") return;
      void pull();
      connect();
    }

    void pull();
    connect();
    const poll = window.setInterval(() => {
      void pull();
    }, 4000);

    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("orientationchange", resume);

    return () => {
      active = false;
      source?.close();
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("orientationchange", resume);
    };
  }, [reference, viewToken]);

  return booking;
}
