"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin, Navigation, Plane, TrainFront } from "lucide-react";
import { loadGoogleMaps } from "@/lib/google-maps";
import {
  createAutocompleteSession,
  fetchPlaceSuggestions,
  resolvePlace,
  reverseGeocode,
  type PlaceSuggestion,
  type ResolvedPlace,
} from "@/lib/places";
import { useT } from "@/i18n/LanguageProvider";

export type LocationResult = ResolvedPlace;

type AddressInputProps = {
  label: string;
  value: string;
  onChange: (result: LocationResult) => void;
  error?: string;
  placeholder?: string;
  allowGeolocation?: boolean;
};

type ListStatus = "idle" | "loading" | "ready" | "empty" | "error";

function suggestionIcon(types: string[]) {
  if (types.some((type) => type.includes("airport"))) return Plane;
  if (types.some((type) => type.includes("train") || type.includes("transit") || type.includes("subway") || type.includes("bus_station"))) {
    return TrainFront;
  }
  return MapPin;
}

export function AddressInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  allowGeolocation = false,
}: AddressInputProps) {
  const { locale, t } = useT();
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const [mapsReady, setMapsReady] = useState(false);
  const [mapsFailed, setMapsFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [status, setStatus] = useState<ListStatus>("idle");
  const [geoState, setGeoState] = useState<"idle" | "loading" | "denied" | "error">("idle");
  const [hasGeolocation, setHasGeolocation] = useState(false);

  useEffect(() => {
    if (allowGeolocation && typeof navigator !== "undefined" && "geolocation" in navigator) {
      setHasGeolocation(true);
    }
  }, [allowGeolocation]);

  const refreshSession = useCallback(async () => {
    sessionRef.current = await createAutocompleteSession();
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps().then(async (libs) => {
      if (cancelled) return;
      if (!libs) {
        setMapsFailed(true);
        return;
      }
      await refreshSession();
      if (!cancelled) setMapsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [refreshSession]);

  useEffect(() => {
    function onPointer(event: Event) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const runSearch = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) {
        setSuggestions([]);
        setStatus("idle");
        setOpen(false);
        return;
      }
      if (!mapsReady) {
        setStatus(mapsFailed ? "error" : "loading");
        setOpen(true);
        return;
      }
      if (!sessionRef.current) await refreshSession();
      const token = sessionRef.current;
      if (!token) {
        setStatus("error");
        setOpen(true);
        return;
      }

      const requestId = ++requestRef.current;
      setStatus("loading");
      setOpen(true);
      try {
        const next = await fetchPlaceSuggestions(trimmed, locale, token);
        if (requestId !== requestRef.current) return;
        setSuggestions(next);
        setActive(0);
        setStatus(next.length ? "ready" : "empty");
        setOpen(true);
      } catch {
        if (requestId !== requestRef.current) return;
        setSuggestions([]);
        setStatus("error");
        setOpen(true);
      }
    },
    [locale, mapsFailed, mapsReady, refreshSession],
  );

  function handleInputChange(inputValue: string) {
    onChange({ address: inputValue });
    setSuggestions([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!inputValue.trim()) {
      setOpen(false);
      setStatus("idle");
      return;
    }
    debounceRef.current = setTimeout(() => {
      void runSearch(inputValue);
    }, 160);
  }

  async function selectSuggestion(suggestion: PlaceSuggestion) {
    const fallback = suggestion.secondaryText
      ? `${suggestion.mainText}, ${suggestion.secondaryText}`
      : suggestion.mainText;
    onChange({ address: fallback, name: suggestion.mainText, placeId: suggestion.placeId });
    setOpen(false);
    setSuggestions([]);
    setStatus("idle");
    try {
      const place = await resolvePlace(suggestion);
      onChange(place);
    } catch {
      onChange({ address: fallback, name: suggestion.mainText, placeId: suggestion.placeId });
    }
    await refreshSession();
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const place = await reverseGeocode(latitude, longitude);
          onChange(place);
          setGeoState("idle");
        } catch {
          onChange({ address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, lat: latitude, lng: longitude });
          setGeoState("error");
        }
        await refreshSession();
      },
      (err) => {
        setGeoState(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open || suggestions.length === 0) {
      if (event.key === "ArrowDown" && value.trim()) {
        event.preventDefault();
        void runSearch(value);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => {
        const next = (index + 1) % suggestions.length;
        const placeId = suggestions[next]?.placeId;
        queueMicrotask(() => {
          const list = listRef.current;
          const item = placeId ? document.getElementById(`${id}-opt-${placeId}`) : null;
          if (!list || !item) return;
          const listBox = list.getBoundingClientRect();
          const itemBox = item.getBoundingClientRect();
          if (itemBox.bottom > listBox.bottom) list.scrollTop += itemBox.bottom - listBox.bottom;
          if (itemBox.top < listBox.top) list.scrollTop -= listBox.top - itemBox.top;
        });
        return next;
      });
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => {
        const next = (index - 1 + suggestions.length) % suggestions.length;
        const placeId = suggestions[next]?.placeId;
        queueMicrotask(() => {
          const list = listRef.current;
          const item = placeId ? document.getElementById(`${id}-opt-${placeId}`) : null;
          if (!list || !item) return;
          const listBox = list.getBoundingClientRect();
          const itemBox = item.getBoundingClientRect();
          if (itemBox.bottom > listBox.bottom) list.scrollTop += itemBox.bottom - listBox.bottom;
          if (itemBox.top < listBox.top) list.scrollTop -= listBox.top - itemBox.top;
        });
        return next;
      });
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const selected = suggestions[active];
      if (selected) void selectSuggestion(selected);
    }
  }

  const showList = open && status !== "idle";
  const activeId = suggestions[active] ? `${id}-opt-${suggestions[active].placeId}` : undefined;

  return (
    <div ref={rootRef} className="relative z-20">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>

      <div className="relative">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-gold"
          aria-hidden
        />
        <input
          ref={inputRef}
          id={id}
          value={value}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (value.trim()) void runSearch(value);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="search"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          role="combobox"
          className={`input-field ${hasGeolocation ? "pr-12" : ""}`}
        />
        {hasGeolocation ? (
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={geoState === "loading"}
            aria-label={t.errors.geoLocate}
            title={t.errors.geoLocate}
            className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-charcoal [@media(hover:hover)]:hover:text-gold disabled:opacity-50"
          >
            {geoState === "loading" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Navigation className="size-4" aria-hidden />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b42318]">
          {error}
        </p>
      ) : null}
      {geoState === "denied" ? <p className="mt-1.5 text-sm text-[#b42318]">{t.errors.geoDenied}</p> : null}
      {geoState === "error" ? <p className="mt-1.5 text-sm text-[#b42318]">{t.errors.geoError}</p> : null}

      {showList ? (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          className="neu-raised relative z-30 mt-2 max-h-[min(16rem,42dvh)] w-full overflow-y-auto overscroll-contain rounded-2xl py-1"
        >
          {status === "loading" ? (
            <div className="flex min-h-12 items-center gap-2 px-4 py-3 text-sm text-charcoal">
              <Loader2 className="size-4 shrink-0 animate-spin text-gold" aria-hidden />
              {t.errors.searching}
            </div>
          ) : null}
          {status === "empty" ? (
            <p className="px-4 py-3 text-sm text-charcoal">{t.errors.noPlaces}</p>
          ) : null}
          {status === "error" ? (
            <p className="px-4 py-3 text-sm text-charcoal">{t.errors.placesFailed}</p>
          ) : null}
          {status === "ready"
            ? suggestions.map((suggestion, index) => {
                const Icon = suggestionIcon(suggestion.types);
                const selected = index === active;
                return (
                  <div key={suggestion.placeId} role="option" id={`${id}-opt-${suggestion.placeId}`} aria-selected={selected}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(index)}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        void selectSuggestion(suggestion);
                      }}
                      className={`flex min-h-12 w-full items-start gap-3 px-3.5 py-3 text-left ${
                        selected ? "neu-inset-sm mx-1 w-[calc(100%-0.5rem)] rounded-xl" : ""
                      }`}
                    >
                      <Icon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium break-words text-ink">{suggestion.mainText}</span>
                        {suggestion.secondaryText ? (
                          <span className="mt-0.5 block text-xs leading-4 break-words text-muted">{suggestion.secondaryText}</span>
                        ) : null}
                      </span>
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
}
