export type VehicleClass = "sedan" | "prius" | "van";

export type BookingData = {
  pickup: string;
  destination: string;
  /** Latitude of pickup, populated when user selects a Google Places suggestion */
  pickupLat?: number;
  pickupLng?: number;
  pickupPlaceId?: string;
  pickupName?: string;
  destinationLat?: number;
  destinationLng?: number;
  destinationPlaceId?: string;
  destinationName?: string;
  date: string;
  time: string;
  rideNow: boolean;
  returnJourney: boolean;
  returnDate: string;
  returnTime: string;
  vehicleClass: VehicleClass;
  passengers: number;
  luggage: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type BookingStatus =
  | "awaiting_confirmation"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "declined"
  | "cancelled";

export type BookingRecord = BookingData & {
  reference: string;
  quote: number;
  createdAt: string;
  status: BookingStatus;
  viewToken?: string;
  updatedAt?: string;
};

const LEGACY_VEHICLE: Record<string, VehicleClass> = {
  standard: "sedan",
  premium: "prius",
  xl: "van",
};

export function normalizeVehicleClass(value: string | undefined): VehicleClass {
  if (value === "sedan" || value === "prius" || value === "van") return value;
  return LEGACY_VEHICLE[value ?? ""] ?? "prius";
}

export const emptyBooking = (): BookingData => ({
  pickup: "",
  destination: "",
  pickupLat: undefined,
  pickupLng: undefined,
  pickupPlaceId: undefined,
  pickupName: undefined,
  destinationLat: undefined,
  destinationLng: undefined,
  destinationPlaceId: undefined,
  destinationName: undefined,
  date: "",
  time: "",
  rideNow: true,
  returnJourney: false,
  vehicleClass: "prius",
  returnDate: "",
  returnTime: "",
  passengers: 1,
  luggage: 1,
  name: "",
  phone: "",
  email: "",
  notes: "",
});
