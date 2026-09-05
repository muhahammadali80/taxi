"use client";

import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/lib/site";
import type { DriverBooking } from "@/lib/booking/types";
import { useT } from "@/i18n/LanguageProvider";

const STATUS_LABEL: Record<DriverBooking["status"], string> = {
  awaiting_confirmation: "Awaiting Confirmation",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  declined: "Declined",
  cancelled: "Cancelled",
};

export function DriverDashboard() {
  const { t } = useT();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [whatsappConfigured, setWhatsappConfigured] = useState(false);
  const [bookings, setBookings] = useState<DriverBooking[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  async function loadSession() {
    const res = await fetch("/api/driver/session", { cache: "no-store" });
    const data = (await res.json()) as { authenticated: boolean; whatsappConfigured: boolean };
    setAuthenticated(data.authenticated);
    setWhatsappConfigured(data.whatsappConfigured);
    if (data.authenticated) await loadBookings();
  }

  async function loadBookings() {
    const res = await fetch("/api/driver/bookings", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as { bookings: DriverBooking[] };
    setBookings(data.bookings);
  }

  useEffect(() => {
    void loadSession();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    let source: EventSource | null = null;

    function connect() {
      source?.close();
      source = new EventSource("/api/driver/bookings/live");
      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as { bookings: DriverBooking[] };
          setBookings(data.bookings);
        } catch {
          /* ignore */
        }
      };
      source.onerror = () => {
        void loadBookings();
      };
    }

    function resume() {
      if (document.visibilityState === "hidden") return;
      void loadBookings();
      connect();
    }

    connect();
    const poll = window.setInterval(() => {
      void loadBookings();
    }, 5000);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("orientationchange", resume);
    return () => {
      source?.close();
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("orientationchange", resume);
    };
  }, [authenticated]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/driver/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Incorrect password.");
      return;
    }
    setPassword("");
    setAuthenticated(true);
    await loadBookings();
  }

  async function logout() {
    await fetch("/api/driver/logout", { method: "POST" });
    setAuthenticated(false);
    setBookings([]);
  }

  async function act(reference: string, action: "confirm" | "decline" | "resend-driver" | "resend-customer") {
    setBusy(`${reference}:${action}`);
    const res = await fetch(`/api/driver/bookings/${reference}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const data = (await res.json()) as { booking: DriverBooking };
      setBookings((current) => current.map((item) => (item.reference === data.booking.reference ? data.booking : item)));
    }
    setBusy(null);
  }

  const waiting = useMemo(
    () => bookings.filter((booking) => booking.status === "awaiting_confirmation").length,
    [bookings],
  );

  if (authenticated === null) {
    return <div className="container-site pt-28 pb-16 text-sm text-muted">Loading driver dashboard…</div>;
  }

  if (!authenticated) {
    return (
      <section className="container-site max-w-md pt-[calc(6.5rem+env(safe-area-inset-top))] pb-20">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Driver</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Booking dashboard</h1>
        <p className="mt-3 text-sm text-muted">Private access for {SITE.name}. New bookings appear here in real time.</p>
        <form onSubmit={login} className="neu-raised mt-8 rounded-[1.5rem] p-5">
          <label htmlFor="driver-password" className="mb-1.5 block text-sm font-medium">
            Password
          </label>
          <input
            id="driver-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-field input-plain"
            autoComplete="current-password"
          />
          {error ? <p className="mt-2 text-sm text-[#b42318]">{error}</p> : null}
          <button type="submit" className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-semibold text-ink">
            Sign in
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="container-site pt-[calc(6.5rem+env(safe-area-inset-top))] pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Driver</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Bookings</h1>
          <p className="mt-2 text-sm text-muted">
            {waiting} awaiting confirmation
            {whatsappConfigured ? "" : " · WhatsApp API is not configured yet. Bookings still appear here."}
          </p>
        </div>
        <button type="button" onClick={logout} className="neu-raised-sm min-h-11 rounded-full px-4 text-sm font-semibold">
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {bookings.length === 0 ? (
          <p className="neu-raised rounded-[1.5rem] p-6 text-sm text-muted">No bookings yet.</p>
        ) : null}
        {bookings.map((booking) => (
          <article key={booking.reference} className="neu-raised rounded-[1.5rem] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-charcoal uppercase">{booking.reference}</p>
                <h2 className="mt-1 text-lg font-semibold">{booking.name}</h2>
                <p className="text-sm text-muted">{STATUS_LABEL[booking.status]}</p>
              </div>
              <p className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-gold">
                {t.vehicles[booking.vehicleClass]}
              </p>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Pickup</dt>
                <dd className="min-w-0 break-words font-medium">{booking.pickup}</dd>
              </div>
              <div>
                <dt className="text-muted">Destination</dt>
                <dd className="min-w-0 break-words font-medium">{booking.destination}</dd>
              </div>
              <div>
                <dt className="text-muted">When</dt>
                <dd className="font-medium">
                  {booking.date} · {booking.time}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Passengers / luggage</dt>
                <dd className="font-medium">
                  {booking.passengers} · {booking.luggage}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Customer phone</dt>
                <dd className="font-medium">
                  <a href={`tel:${booking.phone}`} className="inline-flex min-h-11 items-center hover:text-gold">
                    {booking.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">WhatsApp</dt>
                <dd className="font-medium">
                  Driver {booking.driverWhatsApp} · Customer {booking.customerWhatsApp}
                </dd>
              </div>
            </dl>
            {booking.notes ? <p className="mt-3 text-sm text-muted">Notes: {booking.notes}</p> : null}
            {booking.notifyError ? <p className="mt-2 text-xs text-[#b42318]">{booking.notifyError}</p> : null}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {booking.status === "awaiting_confirmation" ? (
                <>
                  <button
                    type="button"
                    disabled={busy === `${booking.reference}:confirm`}
                    onClick={() => act(booking.reference, "confirm")}
                    className="min-h-12 w-full flex-1 rounded-full bg-gold font-semibold text-ink disabled:opacity-50"
                  >
                    {busy === `${booking.reference}:confirm` ? "Confirming…" : "Confirm Booking"}
                  </button>
                  <button
                    type="button"
                    disabled={busy === `${booking.reference}:decline`}
                    onClick={() => act(booking.reference, "decline")}
                    className="neu-raised-sm min-h-12 w-full flex-1 rounded-full font-semibold disabled:opacity-50"
                  >
                    {busy === `${booking.reference}:decline` ? "Updating…" : "Decline Booking"}
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => act(booking.reference, "resend-driver")}
                className="min-h-12 w-full rounded-full px-4 text-sm font-semibold text-muted sm:w-auto"
              >
                Resend driver WhatsApp
              </button>
              {booking.status === "confirmed" || booking.status === "declined" ? (
                <button
                  type="button"
                  onClick={() => act(booking.reference, "resend-customer")}
                  className="min-h-12 w-full rounded-full px-4 text-sm font-semibold text-muted sm:w-auto"
                >
                  Resend customer WhatsApp
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
