import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

let initialised = false;
let promise: Promise<void> | null = null;

function init() {
  if (initialised) return;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  setOptions({ key, v: "weekly" });
  initialised = true;
}

export async function loadGoogleMapsPlaces(): Promise<google.maps.PlacesLibrary | null> {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return null;
  try {
    init();
    const lib = await importLibrary("places");
    return lib as google.maps.PlacesLibrary;
  } catch {
    return null;
  }
}

export async function loadGoogleMapsGeocoding(): Promise<google.maps.GeocodingLibrary | null> {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return null;
  try {
    init();
    const lib = await importLibrary("geocoding");
    return lib as google.maps.GeocodingLibrary;
  } catch {
    return null;
  }
}

/**
 * Load both places and geocoding libraries at once.
 * Returns null if no API key is configured or we're server-side.
 */
export async function loadGoogleMaps(): Promise<{
  places: google.maps.PlacesLibrary;
  geocoding: google.maps.GeocodingLibrary;
} | null> {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return null;
  if (!promise) {
    init();
    promise = Promise.all([importLibrary("places"), importLibrary("geocoding")]).then(() => undefined);
  }
  try {
    await promise;
    const [places, geocoding] = await Promise.all([
      importLibrary("places"),
      importLibrary("geocoding"),
    ]);
    return {
      places: places as google.maps.PlacesLibrary,
      geocoding: geocoding as google.maps.GeocodingLibrary,
    };
  } catch {
    promise = null;
    return null;
  }
}
