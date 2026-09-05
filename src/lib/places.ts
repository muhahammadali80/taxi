import { loadGoogleMaps } from "@/lib/google-maps";

export const BARCELONA = { lat: 41.3874, lng: 2.1686 };
/** Soft bias across Catalonia and nearby airports — does not block intercity results. */
const BIAS_RADIUS_METERS = 150_000;

export type PlaceSuggestion = {
  placeId: string;
  mainText: string;
  secondaryText: string;
  types: string[];
  prediction?: google.maps.places.PlacePrediction;
};

export type ResolvedPlace = {
  address: string;
  name?: string;
  placeId?: string;
  lat?: number;
  lng?: number;
};

function locationBias(): google.maps.places.LocationBias {
  return { center: BARCELONA, radius: BIAS_RADIUS_METERS };
}

function textOf(value: google.maps.places.FormattableText | string | null | undefined) {
  if (!value) return "";
  return typeof value === "string" ? value : value.text;
}

export async function createAutocompleteSession() {
  const libs = await loadGoogleMaps();
  if (!libs) return null;
  return new libs.places.AutocompleteSessionToken();
}

export async function fetchPlaceSuggestions(
  input: string,
  language: string,
  sessionToken: google.maps.places.AutocompleteSessionToken,
): Promise<PlaceSuggestion[]> {
  const libs = await loadGoogleMaps();
  if (!libs) return [];

  const query = input.trim();
  if (!query) return [];

  const request = {
    input: query,
    language,
    region: "es",
    locationBias: locationBias(),
    origin: BARCELONA,
    sessionToken,
  } satisfies google.maps.places.AutocompleteRequest;

  try {
    if (typeof libs.places.AutocompleteSuggestion?.fetchAutocompleteSuggestions === "function") {
      const { suggestions } = await libs.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
      const mapped = suggestions
        .map((item) => item.placePrediction)
        .filter((prediction): prediction is google.maps.places.PlacePrediction => Boolean(prediction))
        .map((prediction) => ({
          placeId: prediction.placeId,
          mainText: textOf(prediction.mainText) || textOf(prediction.text),
          secondaryText: textOf(prediction.secondaryText),
          types: [...prediction.types],
          prediction,
        }));
      if (mapped.length) return mapped;
    }
  } catch {
    /* Places API (New) may be unavailable — fall back to AutocompleteService */
  }

  const service = new libs.places.AutocompleteService();
  const response = await service.getPlacePredictions({
    input: query,
    language,
    region: "es",
    locationBias: locationBias(),
    origin: BARCELONA,
    sessionToken,
  });

  return (response.predictions ?? []).map((prediction) => ({
    placeId: prediction.place_id,
    mainText: prediction.structured_formatting.main_text,
    secondaryText: prediction.structured_formatting.secondary_text ?? "",
    types: prediction.types ?? [],
  }));
}

export async function resolvePlace(suggestion: PlaceSuggestion): Promise<ResolvedPlace> {
  const fallback = suggestion.secondaryText
    ? `${suggestion.mainText}, ${suggestion.secondaryText}`
    : suggestion.mainText;

  try {
    if (suggestion.prediction) {
      const place = suggestion.prediction.toPlace();
      await place.fetchFields({
        fields: ["id", "displayName", "formattedAddress", "location"],
      });
      const location = place.location;
      const name = textOf(place.displayName as google.maps.places.FormattableText | string | null | undefined);
      return {
        address: place.formattedAddress || fallback,
        name: name || suggestion.mainText,
        placeId: place.id || suggestion.placeId,
        lat: location?.lat(),
        lng: location?.lng(),
      };
    }
  } catch {
    /* use geocoder fallback */
  }

  const libs = await loadGoogleMaps();
  if (!libs) {
    return { address: fallback, name: suggestion.mainText, placeId: suggestion.placeId };
  }

  const response = await new libs.geocoding.Geocoder().geocode({ placeId: suggestion.placeId });
  const first = response.results[0];
  const location = first?.geometry.location;
  return {
    address: first?.formatted_address || fallback,
    name: suggestion.mainText,
    placeId: first?.place_id || suggestion.placeId,
    lat: location?.lat(),
    lng: location?.lng(),
  };
}

export async function reverseGeocode(lat: number, lng: number): Promise<ResolvedPlace> {
  const libs = await loadGoogleMaps();
  if (!libs) {
    return { address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`, lat, lng };
  }
  const response = await new libs.geocoding.Geocoder().geocode({
    location: { lat, lng },
  });
  const first = response.results[0];
  return {
    address: first?.formatted_address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    name: first?.address_components?.[0]?.long_name,
    placeId: first?.place_id,
    lat,
    lng,
  };
}
