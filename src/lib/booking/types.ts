import type { BookingData, VehicleClass } from "@/lib/types";

export const BOOKING_STATUSES = [
  "awaiting_confirmation",
  "confirmed",
  "in_progress",
  "completed",
  "declined",
  "cancelled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type NotificationState = "pending" | "sent" | "failed";

export type StoredBooking = BookingData & {
  reference: string;
  viewToken: string;
  quote: number;
  status: BookingStatus;
  locale: string;
  createdAt: string;
  updatedAt: string;
  idempotencyKey?: string;
  driverWhatsApp: NotificationState;
  customerWhatsApp: NotificationState;
  notifyError?: string;
};

export type PublicBooking = {
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
  quote: number;
  createdAt: string;
  updatedAt: string;
};

export type DriverBooking = PublicBooking & {
  phone: string;
  email: string;
  notes: string;
  driverWhatsApp: NotificationState;
  customerWhatsApp: NotificationState;
  notifyError?: string;
};

export function toPublicBooking(booking: StoredBooking): PublicBooking {
  return {
    reference: booking.reference,
    status: booking.status,
    pickup: booking.pickup,
    destination: booking.destination,
    date: booking.date,
    time: booking.time,
    returnJourney: booking.returnJourney,
    returnDate: booking.returnDate,
    returnTime: booking.returnTime,
    vehicleClass: booking.vehicleClass,
    passengers: booking.passengers,
    luggage: booking.luggage,
    name: booking.name,
    quote: booking.quote,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  };
}

export function toDriverBooking(booking: StoredBooking): DriverBooking {
  return {
    ...toPublicBooking(booking),
    phone: booking.phone,
    email: booking.email,
    notes: booking.notes,
    driverWhatsApp: booking.driverWhatsApp,
    customerWhatsApp: booking.customerWhatsApp,
    notifyError: booking.notifyError,
  };
}
