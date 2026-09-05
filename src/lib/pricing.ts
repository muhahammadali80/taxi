import { findPlace, mentionsAirport } from "./locations";
import type { BookingData } from "./types";
import type { Locale } from "@/i18n/config";

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

const VEHICLE_RATE = {
  sedan: 1,
  prius: 1,
  van: 1.25,
} as const;

export function estimateQuote(
  booking: Pick<BookingData, "pickup" | "destination" | "time" | "returnJourney" | "luggage" | "vehicleClass">,
) {
  const from = findPlace(booking.pickup);
  const to = findPlace(booking.destination);
  const km = from && to ? haversineKm(from, to) * 1.2 : 10;
  let total = Math.max(12, 3.2 + km * 1.35);

  if (mentionsAirport(booking.pickup) || mentionsAirport(booking.destination)) total += 7;

  const hour = Number(booking.time.split(":")[0] || 12);
  if (hour >= 22 || hour < 6) total *= 1.15;

  if (booking.luggage >= 3) total += 4;
  if (booking.returnJourney) total *= 1.9;
  total *= VEHICLE_RATE[booking.vehicleClass] ?? 1;

  return Math.round(total);
}

const LOCALE_TAG: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en-GB",
  fr: "fr-FR",
};

export function formatMoney(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateLabel(date: string, locale: Locale = "en") {
  if (!date) return "";
  return new Date(`${date}T12:00:00`).toLocaleDateString(LOCALE_TAG[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function generateReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";
  for (let i = 0; i < 6; i += 1) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `HTX-${token}`;
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

export function currentTimePlus(minutes: number) {
  const date = new Date(Date.now() + minutes * 60_000);
  const rounded = Math.ceil(date.getMinutes() / 5) * 5;
  if (rounded >= 60) {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
  } else {
    date.setMinutes(rounded);
  }
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
