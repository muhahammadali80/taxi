"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, MapPin, Navigation, RouteOff } from "lucide-react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { duration, easeOut, springBounce } from "@/lib/motion";
import { useT } from "@/i18n/LanguageProvider";

// ── Branding colours ─────────────────────────────────────────────────────────
const GOLD = "#FFC72C";
const INK = "#1A1A1A";
const CREAM = "#F0EBE0";

// ── Google Maps init ──────────────────────────────────────────────────────────
let mapsInitialised = false;
function initMaps() {
  if (mapsInitialised) return;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  setOptions({ key, v: "weekly" });
  mapsInitialised = true;
}

// ── Minimal map style – desaturated & clean to match cream theme ──────────────
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#e8e2d6" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f0ebe0" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#f5f0e8" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#ffdfa0" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e8c84a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b8d4e8" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d4e8c8", visibility: "on" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

type RouteInfo = {
  distanceText: string;
  durationText: string;
  distanceValue: number; // metres
  durationValue: number; // seconds
};

type RouteMapProps = {
  pickup: string;
  destination: string;
  pickupLat?: number;
  pickupLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  finding?: boolean;
  className?: string;
  /** When provided, shows a fare chip in the journey info panel */
  fareDisplay?: string;
};

export function RouteMap({
  pickup,
  destination,
  pickupLat,
  pickupLng,
  destinationLat,
  destinationLng,
  finding = false,
  className = "",
  fareDisplay,
}: RouteMapProps) {
  const { t } = useT();
  const reduce = useReducedMotion();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const pickupMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const destMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error" | "no-api">("idle");
  const [mapReady, setMapReady] = useState(false);
  const prevRouteKey = useRef("");

  const hasCoords =
    pickupLat !== undefined &&
    pickupLng !== undefined &&
    destinationLat !== undefined &&
    destinationLng !== undefined;

  const ready = pickup.trim().length > 1 && destination.trim().length > 1;

  // ── Initialise the map once ────────────────────────────────────────────────
  const initMap = useCallback(async () => {
    if (!mapRef.current || mapInstanceRef.current) return;
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setStatus("no-api");
      return;
    }
    try {
      initMaps();
      const [{ Map }, { DirectionsRenderer }, { AdvancedMarkerElement }] = await Promise.all([
        importLibrary("maps") as Promise<google.maps.MapsLibrary>,
        importLibrary("routes") as Promise<google.maps.RoutesLibrary>,
        importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
      ]);

      const map = new Map(mapRef.current, {
        center: { lat: 41.3874, lng: 2.1686 },
        zoom: 12,
        styles: MAP_STYLE,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        gestureHandling: "cooperative",
        clickableIcons: false,
        mapId: "DEMO_MAP_ID",
      });

      const renderer = new DirectionsRenderer({
        map,
        suppressMarkers: true, // we draw our own branded markers
        polylineOptions: {
          strokeColor: GOLD,
          strokeOpacity: 0.95,
          strokeWeight: 5,
          zIndex: 10,
        },
      });

      mapInstanceRef.current = map;
      directionsRendererRef.current = renderer;
      setMapReady(true);
    } catch {
      setStatus("error");
    }
  }, []);

  // ── Draw branded pickup / destination markers ──────────────────────────────
  function makeMarkerEl(label: string, color: string, textColor: string) {
    const el = document.createElement("div");
    el.style.cssText = `
      display:flex;align-items:center;gap:5px;
      background:${color};color:${textColor};
      font-family:inherit;font-size:11px;font-weight:700;
      padding:4px 8px 4px 6px;border-radius:20px;
      box-shadow:0 2px 8px rgba(0,0,0,0.28);
      white-space:nowrap;cursor:default;
      border:2px solid ${textColor === INK ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.3)"};
    `;
    el.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="${textColor}" style="flex-shrink:0"><circle cx="5" cy="5" r="4.5"/></svg>${label}`;
    return el;
  }

  // ── Calculate route and render ─────────────────────────────────────────────
  const renderRoute = useCallback(async () => {
    const map = mapInstanceRef.current;
    const renderer = directionsRendererRef.current;
    if (!map || !renderer) return;

    setStatus("loading");
    setRouteInfo(null);

    try {
      const { DirectionsService } = await (importLibrary("routes") as Promise<google.maps.RoutesLibrary>);
      const service = new DirectionsService();

      const origin = hasCoords
        ? new google.maps.LatLng(pickupLat!, pickupLng!)
        : pickup;
      const dest = hasCoords
        ? new google.maps.LatLng(destinationLat!, destinationLng!)
        : destination;

      const result = await service.route({
        origin,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING,
        region: "es",
      });

      renderer.setDirections(result);

      const leg = result.routes[0]?.legs[0];
      if (leg) {
        setRouteInfo({
          distanceText: leg.distance?.text ?? "",
          durationText: leg.duration?.text ?? "",
          distanceValue: leg.distance?.value ?? 0,
          durationValue: leg.duration?.value ?? 0,
        });
      }

      // Place branded markers (AdvancedMarker falls back to classic Marker on mobile/restricted keys)
      pickupMarkerRef.current?.remove();
      destMarkerRef.current?.remove();

      const startPos = result.routes[0]?.legs[0]?.start_location;
      const endPos = result.routes[0]?.legs[0]?.end_location;

      try {
        const { AdvancedMarkerElement } = await (importLibrary("marker") as Promise<google.maps.MarkerLibrary>);
        if (startPos) {
          pickupMarkerRef.current = new AdvancedMarkerElement({
            map,
            position: startPos,
            content: makeMarkerEl(t.booking.labels.pickup, GOLD, INK),
            zIndex: 20,
          });
        }
        if (endPos) {
          destMarkerRef.current = new AdvancedMarkerElement({
            map,
            position: endPos,
            content: makeMarkerEl(t.booking.labels.destination, INK, "#ffffff"),
            zIndex: 20,
          });
        }
      } catch {
        if (startPos) {
          new google.maps.Marker({ map, position: startPos, title: t.booking.labels.pickup, label: "A" });
        }
        if (endPos) {
          new google.maps.Marker({ map, position: endPos, title: t.booking.labels.destination, label: "B" });
        }
      }

      setStatus("ready");
      window.setTimeout(() => {
        google.maps.event.trigger(map, "resize");
        if (result.routes[0]?.bounds) map.fitBounds(result.routes[0].bounds, 48);
      }, 80);
    } catch {
      setStatus("error");
    }
  }, [pickup, destination, pickupLat, pickupLng, destinationLat, destinationLng, hasCoords, t.booking.labels.pickup, t.booking.labels.destination]);

  // ── Effect: init map on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (ready) void initMap();
  }, [ready, initMap]);

  // ── Effect: re-route when addresses change (waits until the map exists) ────
  useEffect(() => {
    if (!ready || !mapReady) return;
    const key = `${pickup}|${destination}|${pickupLat}|${pickupLng}|${destinationLat}|${destinationLng}`;
    if (prevRouteKey.current === key) return;
    prevRouteKey.current = key;
    void renderRoute();
  }, [ready, mapReady, pickup, destination, pickupLat, pickupLng, destinationLat, destinationLng, renderRoute]);

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const onResize = () => google.maps.event.trigger(map, "resize");
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    const frame = window.requestAnimationFrame(onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [mapReady]);

  // ── Fallback SVG when no API key ───────────────────────────────────────────
  if (!ready) return null;

  if (status === "no-api") {
    return <FallbackSVGMap pickup={pickup} destination={destination} className={className} />;
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: easeOut }}
      className={`overflow-hidden rounded-2xl ${className}`}
    >
      {/* Map canvas */}
      <div className="neu-inset relative overflow-hidden rounded-2xl">
        <div
          ref={mapRef}
          className="h-48 w-full min-h-[12rem] sm:h-52 md:h-60"
          aria-label={`${pickup} → ${destination}`}
        />

        {/* Loading overlay */}
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/70 backdrop-blur-[1px]">
            <div className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 shadow-sm text-sm font-medium text-charcoal">
              <motion.span
                className="size-2.5 rounded-full bg-gold"
                animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
              {t.booking.calculatingRoute}
            </div>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cream/90 text-sm text-charcoal">
            <RouteOff className="size-5 text-muted" />
            <span>{t.booking.routeUnavailable}</span>
          </div>
        )}

        {/* Finding driver animation dot */}
        {finding && status === "ready" && (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <motion.span
              className="absolute bottom-4 right-4 size-3 rounded-full bg-gold"
              animate={reduce ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>

      {/* Journey info panel */}
      {(routeInfo || fareDisplay) && status === "ready" && (
        <JourneyInfo
          pickup={pickup}
          destination={destination}
          routeInfo={routeInfo}
          fareDisplay={fareDisplay}
          reduce={reduce}
          distanceLabel={t.booking.distance}
          driveTimeLabel={t.booking.driveTime}
          fareLabel={t.booking.labels.fare}
        />
      )}
    </motion.div>
  );
}

// ── Journey info strip below the map ─────────────────────────────────────────
function JourneyInfo({
  pickup,
  destination,
  routeInfo,
  fareDisplay,
  reduce,
  distanceLabel,
  driveTimeLabel,
  fareLabel,
}: {
  pickup: string;
  destination: string;
  routeInfo: RouteInfo | null;
  fareDisplay?: string;
  reduce: boolean | null;
  distanceLabel: string;
  driveTimeLabel: string;
  fareLabel: string;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1, ease: easeOut }}
      className="mt-3 grid gap-2"
    >
      {/* Addresses */}
      <div className="neu-raised-sm grid grid-cols-[auto_1fr] gap-x-3 gap-y-2.5 rounded-2xl px-4 py-3.5 text-sm">
        <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
        <span className="min-w-0 break-words font-medium text-ink" title={pickup}>{pickup}</span>
        <div className="flex flex-col items-center gap-0.5 self-stretch" aria-hidden>
          <div className="w-0.5 flex-1 rounded-full bg-line" />
          <div className="size-1 rounded-full bg-line" />
        </div>
        <span className="min-w-0 break-words text-charcoal" title={destination}>{destination}</span>
      </div>

      {/* Stats row */}
      {routeInfo && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <StatChip
            icon={<Navigation className="size-3.5 text-gold" />}
            label={distanceLabel}
            value={routeInfo.distanceText}
          />
          <StatChip
            icon={<Clock className="size-3.5 text-gold" />}
            label={driveTimeLabel}
            value={routeInfo.durationText}
          />
          {fareDisplay ? (
            <StatChip
              icon={<span className="text-[10px] font-bold text-gold">€</span>}
              label={fareLabel}
              value={fareDisplay}
              highlight
            />
          ) : null}
        </div>
      )}
    </motion.div>
  );
}

function StatChip({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`neu-raised-sm flex items-center gap-2 rounded-xl px-3 py-2.5 ${
        highlight ? "col-span-2 sm:col-span-1" : ""
      }`}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
        <p className={`truncate text-sm font-semibold ${highlight ? "text-gold" : "text-ink"}`}>{value}</p>
      </div>
    </div>
  );
}

// ── SVG fallback (no API key) — keeps existing visual for dev/no-key ──────────
function FallbackSVGMap({
  pickup,
  destination,
  className,
}: {
  pickup: string;
  destination: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  function offsetFrom(text: string, min: number, max: number) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) % 1000;
    return min + ((hash % 100) / 100) * (max - min);
  }

  const start = { x: offsetFrom(pickup, 18, 32), y: offsetFrom(`${pickup}y`, 58, 74) };
  const end = { x: offsetFrom(destination, 68, 84), y: offsetFrom(`${destination}y`, 22, 38) };
  const mid = { x: (start.x + end.x) / 2 + 6, y: Math.min(start.y, end.y) - 12 };
  const d = `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;

  return (
    <div className={`neu-inset overflow-hidden rounded-2xl ${className ?? ""}`}>
      <svg viewBox="0 0 100 90" className="h-40 w-full sm:h-48" aria-hidden>
        <rect width="100" height="90" fill="#e8e2d6" />
        <path d="M0 28 H100 M0 52 H100 M22 0 V90 M48 0 V90 M74 0 V90" stroke="#d5cfc2" strokeWidth="0.6" />
        <path d="M8 70 C 24 64, 30 48, 46 46 S 70 40, 92 18" stroke="#cfc6b6" strokeWidth="3.2" fill="none" />
        <motion.path
          d={d}
          fill="none"
          stroke={GOLD}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="2 2"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.28, ease: easeOut }}
        />
        <FallbackPin cx={start.x} cy={start.y} delay={0} reduce={reduce} />
        <FallbackPin cx={end.x} cy={end.y} delay={0.12} reduce={reduce} />
      </svg>
    </div>
  );
}

function FallbackPin({ cx, cy, delay, reduce }: { cx: number; cy: number; delay: number; reduce: boolean | null }) {
  return (
    <motion.g
      initial={reduce ? false : { y: -14, opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={reduce ? { duration: 0 } : { ...springBounce, delay }}
      style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
    >
      <path
        d={`M ${cx} ${cy} m -3.2 -9.2 a 3.2 3.2 0 1 1 6.4 0 c 0 2.4 -3.2 9.2 -3.2 9.2 s -3.2 -6.8 -3.2 -9.2 z`}
        fill={INK}
      />
      <circle cx={cx} cy={cy - 9.2} r="1.15" fill={GOLD} />
    </motion.g>
  );
}

// ── FindingDriver (unchanged API, uses new map) ───────────────────────────────
export function FindingDriver({
  label,
  pickup,
  destination,
  pickupLat,
  pickupLng,
  destinationLat,
  destinationLng,
}: {
  label: string;
  pickup: string;
  destination: string;
  pickupLat?: number;
  pickupLng?: number;
  destinationLat?: number;
  destinationLng?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-4">
      <RouteMap
        pickup={pickup}
        destination={destination}
        pickupLat={pickupLat}
        pickupLng={pickupLng}
        destinationLat={destinationLat}
        destinationLng={destinationLng}
        finding
      />
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-ink">
        <motion.span
          className="size-2.5 rounded-full bg-gold"
          animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
        {label}
      </div>
    </div>
  );
}
