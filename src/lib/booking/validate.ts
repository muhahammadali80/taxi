import { getVehicle } from "@/lib/site";
import { parseCustomerPhone } from "@/lib/phone";
import { todayISO } from "@/lib/pricing";
import { PLUS_FOUR_PASSENGERS } from "@/lib/booking/passengers";
import { normalizeVehicleClass, type BookingData } from "@/lib/types";

export type BookingPayload = BookingData & {
  quote?: number;
  locale?: string;
};

export function validateBookingPayload(input: Partial<BookingPayload>) {
  const errors: Record<string, string> = {};
  const pickup = String(input.pickup ?? "").trim();
  const destination = String(input.destination ?? "").trim();
  const date = String(input.date ?? "");
  const time = String(input.time ?? "");
  const name = String(input.name ?? "").trim();
  const phone = parseCustomerPhone(String(input.phone ?? ""));
  const email = String(input.email ?? "").trim();
  let vehicleClass = normalizeVehicleClass(String(input.vehicleClass ?? "prius"));
  const passengers = Number(input.passengers ?? 0);
  if (passengers >= PLUS_FOUR_PASSENGERS) vehicleClass = "van";
  const vehicle = getVehicle(vehicleClass);
  const luggage = Number(input.luggage ?? 0);
  const today = todayISO();

  if (!pickup) errors.pickup = "Please enter your pickup location.";
  if (!destination) errors.destination = "Please enter your destination.";
  if (pickup && destination && pickup.toLowerCase() === destination.toLowerCase()) {
    errors.destination = "Pickup and destination must be different.";
  }
  if (!date) errors.date = "Please choose a pickup date.";
  else if (date < today) errors.date = "Please choose a date that is not in the past.";
  if (!time) errors.time = "Please choose a pickup time.";
  if (!name || name.length < 2) errors.name = "Please enter your full name.";
  if (!phone) errors.phone = "Please enter a valid phone number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > vehicle.passengers) {
    errors.passengers = `Please choose between 1 and ${vehicle.passengers} passengers.`;
  }
  if (!Number.isInteger(luggage) || luggage < 0 || luggage > vehicle.luggage) {
    errors.luggage = "Please choose a valid luggage amount.";
  }

  return {
    errors,
    value: phone
      ? {
          pickup,
          destination,
          pickupLat: typeof input.pickupLat === "number" ? input.pickupLat : undefined,
          pickupLng: typeof input.pickupLng === "number" ? input.pickupLng : undefined,
          pickupPlaceId: typeof input.pickupPlaceId === "string" ? input.pickupPlaceId : undefined,
          pickupName: typeof input.pickupName === "string" ? input.pickupName : undefined,
          destinationLat: typeof input.destinationLat === "number" ? input.destinationLat : undefined,
          destinationLng: typeof input.destinationLng === "number" ? input.destinationLng : undefined,
          destinationPlaceId: typeof input.destinationPlaceId === "string" ? input.destinationPlaceId : undefined,
          destinationName: typeof input.destinationName === "string" ? input.destinationName : undefined,
          date,
          time,
          rideNow: Boolean(input.rideNow),
          returnJourney: Boolean(input.returnJourney),
          returnDate: String(input.returnDate ?? ""),
          returnTime: String(input.returnTime ?? ""),
          vehicleClass,
          passengers,
          luggage,
          name,
          phone: phone.e164,
          email,
          notes: String(input.notes ?? "").trim(),
          quote: 0,
          locale: String(input.locale ?? "en"),
        }
      : null,
  };
}
