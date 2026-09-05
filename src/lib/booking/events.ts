import type { BookingStatus } from "./types";

export type BookingEvent = {
  type: "booking.created" | "booking.updated";
  reference: string;
  status: BookingStatus;
  at: string;
};

type Listener = (event: BookingEvent) => void;

const listeners = new Set<Listener>();

export function emitBookingEvent(event: BookingEvent) {
  for (const listener of listeners) listener(event);
}

export function subscribeBookingEvents(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
