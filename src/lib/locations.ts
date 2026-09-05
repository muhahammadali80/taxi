export type Place = {
  name: string;
  region: string;
  lat: number;
  lng: number;
};

const GENERIC_HINTS: Place[] = [
  { name: "Barcelona", region: "Catalunya", lat: 41.3874, lng: 2.1686 },
  { name: "Aeroport / Airport / Aeropuerto", region: "Barcelona", lat: 41.2974, lng: 2.0833 },
];

export function searchPlaces(query: string, limit = 5): Place[] {
  const q = query.trim();
  if (q.length < 2) return [];
  return GENERIC_HINTS.filter((place) => place.name.toLowerCase().includes(q.toLowerCase())).slice(0, limit);
}

export function findPlace(name: string): Place | undefined {
  const q = name.trim().toLowerCase();
  if (!q) return undefined;
  if (/airport|aeroport|aeropuerto|aéroport/i.test(q)) {
    return GENERIC_HINTS[1];
  }
  if (/barcelona|catalunya|catalonia|catalogne/i.test(q)) {
    return GENERIC_HINTS[0];
  }
  return undefined;
}

export function mentionsAirport(value: string) {
  return /airport|aeroport|aeropuerto|aéroport/i.test(value);
}
