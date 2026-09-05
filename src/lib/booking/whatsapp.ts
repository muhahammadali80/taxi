import { SITE } from "@/lib/site";
import { isPlusFourPassengers } from "./passengers";
import type { StoredBooking } from "./types";

const DRIVER_NUMBER = process.env.WHATSAPP_DRIVER_NUMBER || SITE.whatsappNumber;

function configured() {
  return Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

export function whatsappConfigured() {
  return configured();
}

function vehicleLabel(booking: StoredBooking) {
  if (booking.vehicleClass === "sedan") return "Sedan";
  if (booking.vehicleClass === "van") return "Caddy / Mercedes V-Class";
  return "Prius Plus / Dacia";
}

function mapsLink(label: string, lat: number | undefined, lng: number | undefined, address: string) {
  if (lat !== undefined && lng !== undefined) {
    return `${label}: https://maps.google.com/?q=${lat},${lng}`;
  }
  return `${label}: https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function driverBookingMessage(booking: StoredBooking) {
  const lines = [
    "🚕 New Taxi Booking",
    "",
    `📋 Booking: ${booking.reference}`,
    `👤 Customer: ${booking.name}`,
    `📞 Phone: ${booking.phone}`,
    booking.email ? `✉️ Email: ${booking.email}` : "",
    "",
    `📍 Pickup: ${booking.pickup}`,
    `🏁 Destination: ${booking.destination}`,
    "",
    `📅 Date: ${booking.date}`,
    `🕐 Time: ${booking.time}`,
    `👥 Passengers: ${isPlusFourPassengers(booking.passengers) ? "+4" : booking.passengers}`,
    `🧳 Luggage: ${booking.luggage}`,
    `🚗 Vehicle: ${vehicleLabel(booking)}`,
    booking.notes ? `📝 Notes: ${booking.notes}` : "",
    "",
    "🗺️ Navigation Links:",
    mapsLink("📍 Pickup Map", booking.pickupLat, booking.pickupLng, booking.pickup),
    mapsLink("🏁 Destination Map", booking.destinationLat, booking.destinationLng, booking.destination),
  ];

  if (booking.returnJourney && booking.returnDate) {
    lines.push("", `🔄 Return Journey: ${booking.returnDate} at ${booking.returnTime}`);
  }

  lines.push("", "⏳ Status: Awaiting Confirmation");

  return lines.filter((line) => line !== "").join("\n");
}

export function customerConfirmedMessage(booking: StoredBooking) {
  return [
    "Your Taxi Booking Is Confirmed",
    "",
    `Booking: ${booking.reference}`,
    "",
    "Your driver has confirmed your booking.",
    "",
    `Pickup: ${booking.pickup}`,
    `Destination: ${booking.destination}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Vehicle: ${vehicleLabel(booking)}`,
    "",
    `For any questions, contact the driver on ${SITE.phoneDisplay}.`,
  ].join("\n");
}

export function customerDeclinedMessage(booking: StoredBooking) {
  return [
    "Booking Update",
    "",
    `Booking: ${booking.reference}`,
    "",
    "Unfortunately, the driver is unable to confirm this journey.",
    "",
    `If you still need a ride, contact the driver on ${SITE.phoneDisplay}.`,
  ].join("\n");
}

async function sendOnce(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version = process.env.WHATSAPP_API_VERSION || "v21.0";
  if (!token || !phoneId) {
    return { ok: false as const, error: "WhatsApp is not configured" };
  }

  const res = await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to.replace(/\D/g, ""),
      type: "text",
      text: { preview_url: false, body },
    }),
  });

  if (res.ok) return { ok: true as const };
  const detail = await res.text();
  return { ok: false as const, error: detail.slice(0, 400) || `WhatsApp HTTP ${res.status}` };
}

export async function sendWhatsApp(to: string, body: string) {
  const first = await sendOnce(to, body);
  if (first.ok) return first;
  if (first.error === "WhatsApp is not configured") return first;
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return sendOnce(to, body);
}

export async function notifyDriver(booking: StoredBooking) {
  return sendWhatsApp(DRIVER_NUMBER, driverBookingMessage(booking));
}

export async function notifyCustomer(booking: StoredBooking, kind: "confirmed" | "declined") {
  const body = kind === "confirmed" ? customerConfirmedMessage(booking) : customerDeclinedMessage(booking);
  return sendWhatsApp(booking.phone, body);
}
