import { isPlusFourPassengers } from "@/lib/booking/passengers";

export const SITE = {
  name: "TapTaxiBcn",
  shortName: "TapTaxiBcn",
  phoneDisplay: "+34 631 55 51 71",
  phoneHref: "tel:+34631555171",
  whatsappNumber: "34631555171",
  email: "reservas@hammad.taxi",
  vehicle: {
    name: "Toyota Prius+",
  },
} as const;

export function getWhatsAppHref(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const IMAGES = {
  hero: "/hero/barcelona-taxi-prius.jpg",
  airport: "/hero/airport.jpg",
  priusHero: "/vehicles/prius-flickr.jpg",
  priusAngle: "/vehicles/prius-plus-angle.jpg",
  priusStreet: "/vehicles/prius-barcelona.jpg",
  barcelonaTaxi: "/vehicles/prius-barcelona.jpg",
  sedan: "/vehicles/sedan-barcelona.jpg",
  van: "/vehicles/van-barcelona.jpg",
} as const;

/** Pre-populate a WhatsApp message with journey details from a booking draft */
export function getWhatsAppBookingHref(draft: {
  pickup?: string;
  destination?: string;
  date?: string;
  time?: string;
  passengers?: number;
  vehicleClass?: string;
  quote?: number;
}) {
  const lines: string[] = ["Hi, I'd like to book a taxi:"];
  if (draft.pickup) lines.push(`From: ${draft.pickup}`);
  if (draft.destination) lines.push(`To: ${draft.destination}`);
  if (draft.date) lines.push(`Date: ${draft.date}`);
  if (draft.time) lines.push(`Time: ${draft.time}`);
  if (draft.passengers) {
    lines.push(`Passengers: ${isPlusFourPassengers(draft.passengers) ? "+4" : draft.passengers}`);
  }
  if (draft.vehicleClass) lines.push(`Vehicle: ${draft.vehicleClass}`);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const VEHICLES = [
  {
    id: "prius" as const,
    passengers: 4,
    luggage: 7,
    multiplier: 1,
    featured: true,
    image: IMAGES.priusHero,
    imageFocus: "object-[42%_62%]",
  },
  {
    id: "sedan" as const,
    passengers: 4,
    luggage: 3,
    multiplier: 1,
    featured: false,
    image: IMAGES.sedan,
    imageFocus: "object-[70%_55%]",
  },
  {
    id: "van" as const,
    passengers: 7,
    luggage: 8,
    multiplier: 1.25,
    featured: false,
    image: IMAGES.van,
    imageFocus: "object-[70%_45%]",
  },
] as const;

export type VehicleId = (typeof VEHICLES)[number]["id"];

export function getVehicle(id: string) {
  return VEHICLES.find((vehicle) => vehicle.id === id) ?? VEHICLES[0];
}

export const NAV_HREFS = [
  { href: "/", key: "home" as const },
  { href: "/#book", key: "book" as const },
  { href: "/#services", key: "services" as const },
  { href: "/#areas", key: "areas" as const },
  { href: "/#about", key: "about" as const },
  { href: "/#contact", key: "contact" as const },
];
