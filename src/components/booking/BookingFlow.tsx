"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Luggage,
  Mail,
  Phone,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { AddressInput } from "./AddressInput";
import { PickupCallHelp } from "./PickupCallHelp";
import { FareDial } from "./FareDial";
import { useBooking } from "./BookingProvider";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { FindingDriver, RouteMap } from "@/components/motion/RouteMap";
import { SelectedCheck } from "@/components/motion/SelectedCheck";
import { useToast } from "@/components/motion/ToastProvider";
import { NeuToggle } from "@/components/ui/NeuToggle";
import { formatDateLabel, todayISO, currentTimePlus } from "@/lib/pricing";
import { VEHICLES, getVehicle } from "@/lib/site";
import { parseCustomerPhone } from "@/lib/phone";
import { PLUS_FOUR_PASSENGERS, formatPassengerChoice } from "@/lib/booking/passengers";
import { emptyBooking, type BookingData, type BookingRecord, type VehicleClass } from "@/lib/types";
import { useBookingLive } from "./useBookingLive";
import { BookingStatusView } from "./BookingStatusView";
import type { PublicBooking } from "@/lib/booking/types";
import { useT } from "@/i18n/LanguageProvider";
import type { Messages } from "@/i18n/messages";
import { createId } from "@/lib/id";

type Errors = Partial<Record<keyof BookingData, string>>;

function Field({
  id,
  label,
  error,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-gold" aria-hidden />
        {children}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function vehicleCopy(t: Messages, id: VehicleClass) {
  if (id === "prius") {
    return { name: t.vehicles.prius, detail: t.vehicles.priusDetail, desc: t.vehicles.priusDesc };
  }
  if (id === "van") {
    return { name: t.vehicles.van, detail: t.vehicles.vanDetail, desc: t.vehicles.vanDesc };
  }
  return { name: t.vehicles.sedan, detail: t.vehicles.sedanDetail, desc: t.vehicles.sedanDesc };
}

function validateStep(step: number, data: BookingData, copy: Messages["errors"]): Errors {
  const errors: Errors = {};
  const today = todayISO();

  if (step === 1) {
    if (!data.pickup.trim()) errors.pickup = copy.pickup;
    if (!data.destination.trim()) errors.destination = copy.destination;
    if (data.pickup && data.destination && data.pickup.trim().toLowerCase() === data.destination.trim().toLowerCase()) {
      errors.destination = copy.samePlace;
    }
    if (!data.rideNow) {
      if (!data.date) errors.date = copy.date;
      else if (data.date < today) errors.date = copy.datePast;
      if (!data.time) errors.time = copy.time;
      else if (data.date === today) {
        const [h, m] = data.time.split(":").map(Number);
        const selected = h * 60 + m;
        const now = new Date();
        const current = now.getHours() * 60 + now.getMinutes() + 20;
        if (selected < current) errors.time = copy.timeSoon;
      }
    }
    if (data.returnJourney) {
      if (!data.returnDate) errors.returnDate = copy.returnDate;
      else if (data.returnDate < data.date) errors.returnDate = copy.returnDateBefore;
      if (!data.returnTime) errors.returnTime = copy.returnTime;
    }
  }

  if (step === 2) {
    const selected = getVehicle(data.vehicleClass);
    if (data.passengers >= PLUS_FOUR_PASSENGERS) {
      if (data.vehicleClass !== "van") {
        errors.passengers = copy.passengers.replace("{n}", String(selected.passengers));
      }
    } else if (data.passengers < 1 || data.passengers > selected.passengers) {
      errors.passengers = copy.passengers.replace("{n}", String(selected.passengers));
    }
    if (data.luggage < 0 || data.luggage > selected.luggage) errors.luggage = copy.luggage;
  }

  if (step === 3) {
    if (data.name.trim().length < 2) errors.name = copy.name;
    if (!parseCustomerPhone(data.phone)) errors.phone = copy.phone;
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = copy.email;
  }

  return errors;
}

function StepPanel({ children, reduce }: { children: React.ReactNode; reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BookingPanel() {
  const { openBooking, draft, setDraft } = useBooking();
  const { t } = useT();
  const { pushToast } = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const routeToast = useRef("");

  useEffect(() => {
    const key = `${draft.pickup.trim()}|${draft.destination.trim()}`;
    if (draft.pickup.trim().length < 2 || draft.destination.trim().length < 2) return;
    if (routeToast.current === key) return;
    routeToast.current = key;
    pushToast(t.toasts.routeReady);
  }, [draft.pickup, draft.destination, pushToast, t.toasts.routeReady]);

  function update<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setDraft({ ...draft, [key]: value });
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function continueBooking() {
    const next = draft.rideNow
      ? { ...draft, date: todayISO(), time: currentTimePlus(30) }
      : draft;
    const nextErrors = validateStep(1, next, t.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    openBooking(next, 2);
  }

  return (
    <section
      id="book"
      aria-labelledby="booking-heading"
      className="relative z-10 pb-24 md:-mt-20 md:pb-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-16 bottom-0 bg-cream" aria-hidden />
      <div className="container-site relative">
        <div className="neu-float rounded-[1.35rem] p-4 sm:rounded-[1.75rem] sm:p-5 md:p-7">
          <div className="mb-4 flex flex-col gap-1 md:mb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-charcoal uppercase">{t.booking.eyebrow}</p>
              <h2 id="booking-heading" className="heading-section mt-1 font-semibold">
                {t.booking.title}
              </h2>
            </div>
            <p className="text-sm leading-6 text-charcoal">{t.booking.subtitle}</p>
          </div>

          <NeuToggle
            checked={!draft.rideNow}
            onChange={(later) => {
              setDraft({
                ...draft,
                rideNow: !later,
                date: later ? draft.date : todayISO(),
                time: later ? draft.time : currentTimePlus(30),
              });
            }}
            offLabel={t.booking.rideNow}
            onLabel={t.booking.scheduleLater}
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2 md:items-start">
            <div className="min-w-0">
              <AddressInput
                label={t.booking.pickup}
                value={draft.pickup}
                onChange={(result) => {
                  setDraft({
                    ...draft,
                    pickup: result.address,
                    pickupLat: result.lat,
                    pickupLng: result.lng,
                    pickupPlaceId: result.placeId,
                    pickupName: result.name,
                  });
                  setErrors((current) => ({ ...current, pickup: undefined }));
                }}
                error={errors.pickup}
                placeholder={t.booking.pickupPlaceholder}
                allowGeolocation
              />
              <PickupCallHelp />
            </div>
            <AddressInput
              label={t.booking.destination}
              value={draft.destination}
              onChange={(result) => {
                setDraft({
                  ...draft,
                  destination: result.address,
                  destinationLat: result.lat,
                  destinationLng: result.lng,
                  destinationPlaceId: result.placeId,
                  destinationName: result.name,
                });
                setErrors((current) => ({ ...current, destination: undefined }));
              }}
              error={errors.destination}
              placeholder={t.booking.destinationPlaceholder}
            />
          </div>

          <RouteMap
            pickup={draft.pickup}
            destination={draft.destination}
            pickupLat={draft.pickupLat}
            pickupLng={draft.pickupLng}
            destinationLat={draft.destinationLat}
            destinationLng={draft.destinationLng}
            className="mt-4"
          />

          {!draft.rideNow ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="panel-date" label={t.booking.date} error={errors.date} icon={Calendar}>
                <input
                  id="panel-date"
                  type="date"
                  min={todayISO()}
                  value={draft.date}
                  onChange={(event) => update("date", event.target.value)}
                  autoComplete="off"
                  aria-invalid={Boolean(errors.date)}
                  className="input-field"
                />
              </Field>
              <Field id="panel-time" label={t.booking.time} error={errors.time} icon={Clock}>
                <input
                  id="panel-time"
                  type="time"
                  value={draft.time}
                  onChange={(event) => update("time", event.target.value)}
                  autoComplete="off"
                  aria-invalid={Boolean(errors.time)}
                  className="input-field"
                />
              </Field>
            </div>
          ) : null}

          <label className="mt-4 flex min-h-12 cursor-pointer items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={draft.returnJourney}
              onChange={(event) => update("returnJourney", event.target.checked)}
              className="size-5 rounded accent-gold"
            />
            {t.booking.returnJourney}
          </label>

          <Button onClick={continueBooking} className="mt-5 w-full min-h-14 text-base">
            {t.booking.getQuote}
          </Button>
        </div>
      </div>
    </section>
  );
}

export function BookingOverlay() {
  const { open, closeBooking, draft, setDraft, startStep, session } = useBooking();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <BookingDialog
          key={session}
          startStep={startStep}
          draft={draft}
          setDraft={setDraft}
          closeBooking={closeBooking}
          reduce={reduce}
        />
      ) : null}
    </AnimatePresence>
  );
}

function BookingDialog({
  startStep,
  draft,
  setDraft,
  closeBooking,
  reduce,
}: {
  startStep: number;
  draft: BookingData;
  setDraft: (draft: BookingData) => void;
  closeBooking: () => void;
  reduce: boolean | null;
}) {
  const { t, locale } = useT();
  const { pushToast } = useToast();
  const [step, setStep] = useState(startStep);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [record, setRecord] = useState<BookingRecord | null>(null);
  const idempotencyKey = useRef("");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeBooking();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeBooking]);

  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;
    if (!viewport) return;
    const sync = () => {
      const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      root.style.setProperty("--keyboard-inset", `${inset}px`);
      root.style.setProperty("--vv-height", `${Math.round(viewport.height)}px`);
    };
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    sync();
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
      root.style.removeProperty("--keyboard-inset");
      root.style.removeProperty("--vv-height");
    };
  }, []);

  useEffect(() => {
    if (draft.passengers < PLUS_FOUR_PASSENGERS || draft.vehicleClass === "van") return;
    const van = getVehicle("van");
    setDraft({
      ...draft,
      vehicleClass: "van",
      luggage: Math.min(draft.luggage, van.luggage),
    });
  }, [draft, setDraft]);

  function update<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setDraft({ ...draft, [key]: value });
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function selectVehicle(vehicleId: VehicleClass) {
    const plusFour = draft.passengers >= PLUS_FOUR_PASSENGERS;
    // +4 passengers always requires the larger van; keep that selection.
    if (plusFour && vehicleId !== "van") {
      const van = getVehicle("van");
      setDraft({
        ...draft,
        vehicleClass: "van",
        luggage: Math.min(draft.luggage, van.luggage),
      });
      return;
    }
    const vehicle = getVehicle(vehicleId);
    setDraft({
      ...draft,
      vehicleClass: vehicleId,
      passengers: Math.min(draft.passengers, vehicle.passengers),
      luggage: Math.min(draft.luggage, vehicle.luggage),
    });
  }

  function goNext() {
    const data =
      step === 1 && draft.rideNow
        ? { ...draft, date: todayISO(), time: currentTimePlus(30) }
        : draft;
    if (data !== draft) setDraft(data);
    const nextErrors = validateStep(step, data, t.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((current) => Math.min(4, current + 1));
  }

  async function confirm() {
    if (submitting) return;
    const nextErrors = validateStep(3, draft, t.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStep(3);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    if (!idempotencyKey.current) idempotencyKey.current = createId();
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey.current,
        },
        body: JSON.stringify({ ...draft, quote: 0, locale }),
      });
      const data = (await res.json()) as {
        booking?: PublicBooking & { viewToken?: string };
        viewToken?: string;
        error?: string;
        errors?: Record<string, string>;
      };
      if (!res.ok || !data.booking) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || t.booking.submitError);
      }
      setRecord({
        ...draft,
        ...data.booking,
        viewToken: data.viewToken,
        status: data.booking.status,
      });
      pushToast(t.toasts.received);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t.booking.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  function resetAndClose() {
    setDraft({
      ...emptyBooking(),
      date: todayISO(),
      time: currentTimePlus(30),
    });
    setRecord(null);
    setSubmitError("");
    idempotencyKey.current = createId();
    closeBooking();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-stretch justify-center md:items-center md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
          <button
            type="button"
            aria-label="Close booking"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={record ? resetAndClose : closeBooking}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-dialog-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="neu-float relative z-10 flex h-[var(--vv-height,100dvh)] max-h-[var(--vv-height,100dvh)] w-full max-w-2xl flex-col overflow-hidden rounded-none bg-cream pt-[env(safe-area-inset-top)] md:h-auto md:max-h-[90dvh] md:rounded-[1.75rem] md:pt-0"
          >
            <div className="flex shrink-0 flex-col gap-2 px-3 py-3 sm:px-5 sm:py-4 md:px-7">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.18em] text-charcoal uppercase">{t.nav.book}</p>
                  <h2 id="booking-dialog-title" className="truncate text-base font-semibold tracking-tight sm:text-xl">
                    {record
                      ? record.status === "confirmed"
                        ? t.booking.confirmedLiveTitle
                        : record.status === "declined"
                          ? t.booking.declinedTitle
                          : t.booking.receivedTitle
                      : [t.booking.steps.journey, t.booking.steps.ride, t.booking.steps.details, t.booking.steps.confirm][step - 1]}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={record ? resetAndClose : closeBooking}
                  className="neu-raised-sm flex size-11 shrink-0 items-center justify-center rounded-full text-ink"
                  aria-label={t.booking.close}
                >
                  <X className="size-5" />
                </button>
              </div>
              <LanguageSwitcher tone="light" />
            </div>

            {!record ? (
              <ol className="grid shrink-0 grid-cols-4 gap-1 px-3 pt-2 sm:gap-2 sm:px-5 sm:pt-5 md:px-7" aria-label={t.nav.book}>
                {[t.booking.steps.journey, t.booking.steps.ride, t.booking.steps.details, t.booking.steps.confirm].map((label, index) => {
                  const n = index + 1;
                  const active = n === step;
                  const done = n < step;
                  return (
                    <li key={label} className="min-w-0">
                      <div className={`h-1 rounded-full ${done || active ? "bg-gold" : "neu-inset-sm"}`} />
                      <p className={`mt-1 truncate text-[10px] sm:mt-2 sm:text-xs ${active ? "font-semibold text-ink" : "text-charcoal"}`}>
                        <span className="sm:hidden">{label}</span>
                        <span className="hidden sm:inline">
                          {n}. {label}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ol>
            ) : null}

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5 sm:py-6 md:px-7"
              onFocusCapture={(event) => {
                const target = event.target;
                if (
                  target instanceof HTMLElement &&
                  (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")
                ) {
                  window.requestAnimationFrame(() => {
                    target.scrollIntoView({ block: "center", behavior: "smooth" });
                  });
                }
              }}
            >
              {record ? (
                <LiveConfirmation record={record} onClose={resetAndClose} />
              ) : (
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <StepPanel key="1" reduce={reduce}>
                      <div className="grid gap-4">
                        <NeuToggle
                          checked={!draft.rideNow}
                          onChange={(later) => {
                            setDraft({
                              ...draft,
                              rideNow: !later,
                              date: later ? draft.date : todayISO(),
                              time: later ? draft.time : currentTimePlus(30),
                            });
                          }}
                          offLabel={t.booking.rideNow}
                          onLabel={t.booking.scheduleLater}
                        />
                        <div className="min-w-0">
                          <AddressInput
                            label={t.booking.pickup}
                            value={draft.pickup}
                            onChange={(result) => {
                              setDraft({
                                ...draft,
                                pickup: result.address,
                                pickupLat: result.lat,
                                pickupLng: result.lng,
                                pickupPlaceId: result.placeId,
                                pickupName: result.name,
                              });
                              setErrors((current) => ({ ...current, pickup: undefined }));
                            }}
                            error={errors.pickup}
                            allowGeolocation
                            placeholder={t.booking.pickupPlaceholder}
                          />
                          <PickupCallHelp />
                        </div>
                        <AddressInput
                          label={t.booking.destination}
                          value={draft.destination}
                          onChange={(result) => {
                            setDraft({
                              ...draft,
                              destination: result.address,
                              destinationLat: result.lat,
                              destinationLng: result.lng,
                              destinationPlaceId: result.placeId,
                              destinationName: result.name,
                            });
                            setErrors((current) => ({ ...current, destination: undefined }));
                          }}
                          error={errors.destination}
                          placeholder={t.booking.destinationPlaceholder}
                        />
                        {!draft.rideNow ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field id="date" label={t.booking.date} error={errors.date} icon={Calendar}>
                            <input
                              id="date"
                              type="date"
                              min={todayISO()}
                              value={draft.date}
                              onChange={(event) => update("date", event.target.value)}
                              autoComplete="off"
                              aria-invalid={Boolean(errors.date)}
                              className="input-field"
                            />
                          </Field>
                          <Field id="time" label={t.booking.time} error={errors.time} icon={Clock}>
                            <input
                              id="time"
                              type="time"
                              value={draft.time}
                              onChange={(event) => update("time", event.target.value)}
                              autoComplete="off"
                              aria-invalid={Boolean(errors.time)}
                              className="input-field"
                            />
                          </Field>
                        </div>
                        ) : null}
                        <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={draft.returnJourney}
                            onChange={(event) => update("returnJourney", event.target.checked)}
                            className="size-5 rounded accent-gold"
                          />
                          {t.booking.returnJourney}
                        </label>
                        {draft.returnJourney ? (
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field id="returnDate" label={t.booking.returnDate} error={errors.returnDate} icon={Calendar}>
                              <input
                                id="returnDate"
                                type="date"
                                min={draft.date || todayISO()}
                                value={draft.returnDate}
                                onChange={(event) => update("returnDate", event.target.value)}
                                className="input-field"
                              />
                            </Field>
                            <Field id="returnTime" label={t.booking.returnTime} error={errors.returnTime} icon={Clock}>
                              <input
                                id="returnTime"
                                type="time"
                                value={draft.returnTime}
                                onChange={(event) => update("returnTime", event.target.value)}
                                className="input-field"
                              />
                            </Field>
                          </div>
                        ) : null}
                        <RouteMap
                          pickup={draft.pickup}
                          destination={draft.destination}
                          pickupLat={draft.pickupLat}
                          pickupLng={draft.pickupLng}
                          destinationLat={draft.destinationLat}
                          destinationLng={draft.destinationLng}
                          fareDisplay={t.booking.requestPrice}
                        />
                      </div>
                    </StepPanel>
                  ) : null}

                  {step === 2 ? (
                    <StepPanel key="2" reduce={reduce}>
                      <p className="mb-3 text-sm font-medium">{t.booking.chooseRide}</p>
                      <div className="grid gap-3">
                        {VEHICLES.filter((vehicle) => vehicle.featured).map((vehicle) => {
                          const selected = draft.vehicleClass === vehicle.id;
                          const copy = vehicleCopy(t, vehicle.id);
                          return (
                            <button
                              key={vehicle.id}
                              type="button"
                              onClick={() => selectVehicle(vehicle.id)}
                              className={`car-card overflow-hidden rounded-[1.35rem] text-left ${
                                selected ? "car-card-selected neu-inset outline outline-2 outline-gold" : "neu-raised-sm"
                              }`}
                            >
                              <span className="relative block aspect-[16/9] overflow-hidden sm:aspect-[16/7]">
                                <Image
                                  src={vehicle.image}
                                  alt=""
                                  fill
                                  sizes="(max-width: 768px) 100vw, 40rem"
                                  className={`object-cover ${vehicle.imageFocus}`}
                                />
                                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                                <span className="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-ink uppercase">
                                  {t.vehicles.featured}
                                </span>
                                <span className="absolute top-3 right-3">
                                  <SelectedCheck show={selected} />
                                </span>
                              </span>
                              <span className="block px-3.5 py-3.5 sm:px-4">
                                <p className="text-base font-semibold sm:text-lg">{copy.name}</p>
                                <p className="mt-0.5 text-xs leading-4 text-charcoal">{copy.detail}</p>
                                <p className="mt-1.5 text-xs leading-5 text-muted">{copy.desc}</p>
                              </span>
                            </button>
                          );
                        })}
                        <div className="grid gap-3 md:grid-cols-2">
                          {VEHICLES.filter((vehicle) => !vehicle.featured).map((vehicle) => {
                            const selected = draft.vehicleClass === vehicle.id;
                            const copy = vehicleCopy(t, vehicle.id);
                            return (
                              <button
                                key={vehicle.id}
                                type="button"
                                onClick={() => selectVehicle(vehicle.id)}
                                className={`car-card overflow-hidden rounded-[1.35rem] text-left ${
                                  selected ? "car-card-selected neu-inset outline outline-2 outline-gold" : "neu-raised-sm"
                                }`}
                              >
                                <span className="relative block aspect-[16/9] overflow-hidden">
                                  <Image
                                    src={vehicle.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, 20rem"
                                    className={`object-cover ${vehicle.imageFocus}`}
                                  />
                                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
                                  <span className="absolute top-3 right-3">
                                    <SelectedCheck show={selected} />
                                  </span>
                                </span>
                                <span className="block px-3.5 py-3">
                                  <p className="text-sm font-semibold sm:text-base">{copy.name}</p>
                                  <p className="mt-0.5 text-xs leading-4 text-charcoal">{copy.detail}</p>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <Field id="passengers" label={t.booking.passengers} error={errors.passengers} icon={Users}>
                            <select
                              id="passengers"
                              value={draft.passengers >= PLUS_FOUR_PASSENGERS ? PLUS_FOUR_PASSENGERS : draft.passengers}
                              onChange={(event) => {
                                const passengers = Number(event.target.value);
                                if (passengers >= PLUS_FOUR_PASSENGERS) {
                                  const van = getVehicle("van");
                                  setDraft({
                                    ...draft,
                                    passengers,
                                    vehicleClass: "van",
                                    luggage: Math.min(draft.luggage, van.luggage),
                                  });
                                  setErrors((current) => ({ ...current, passengers: undefined }));
                                  return;
                                }
                                update("passengers", passengers);
                              }}
                              className="input-field appearance-none"
                            >
                              {[1, 2, 3, 4].map((n) => (
                                <option key={n} value={n}>
                                  {n} {n === 1 ? t.booking.passengerOne : t.booking.passengerMany}
                                </option>
                              ))}
                              <option value={PLUS_FOUR_PASSENGERS}>{t.booking.plusFourPassengers}</option>
                            </select>
                          </Field>
                          <Field id="luggage" label={t.booking.luggage} error={errors.luggage} icon={Luggage}>
                            <select
                              id="luggage"
                              value={draft.luggage}
                              onChange={(event) => update("luggage", Number(event.target.value))}
                              className="input-field appearance-none"
                            >
                              {Array.from(
                                { length: getVehicle(draft.vehicleClass).luggage + 1 },
                                (_, i) => i,
                              ).map((n) => (
                                <option key={n} value={n}>
                                  {n} {n === 1 ? t.booking.suitcaseOne : t.booking.suitcaseMany}
                                </option>
                              ))}
                            </select>
                          </Field>
                      </div>
                      <div className="mt-8">
                        <FareDial
                          label={t.booking.labels.fare}
                          display={t.booking.requestPrice}
                          note={t.booking.fareNote}
                        />
                      </div>
                    </StepPanel>
                  ) : null}

                  {step === 3 ? (
                    <StepPanel key="3" reduce={reduce}>
                      <div className="grid gap-4">
                        <Field id="name" label={t.booking.fullName} error={errors.name} icon={User}>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            autoCapitalize="words"
                            enterKeyHint="next"
                            value={draft.name}
                            onChange={(event) => update("name", event.target.value)}
                            className="input-field"
                            aria-invalid={Boolean(errors.name)}
                          />
                        </Field>
                        <Field id="phone" label={t.booking.phone} error={errors.phone} icon={Phone}>
                          <input
                            id="phone"
                            name="tel"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            enterKeyHint="next"
                            placeholder="+34 …"
                            value={draft.phone}
                            onChange={(event) => update("phone", event.target.value)}
                            className="input-field"
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                          />
                        </Field>
                        <Field id="email" label={t.booking.email} error={errors.email} icon={Mail}>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            enterKeyHint="next"
                            value={draft.email}
                            onChange={(event) => update("email", event.target.value)}
                            className="input-field"
                            aria-invalid={Boolean(errors.email)}
                          />
                        </Field>
                        <div>
                          <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
                            {t.booking.notes} <span className="font-normal text-muted">{t.booking.notesOptional}</span>
                          </label>
                          <textarea
                            id="notes"
                            rows={3}
                            value={draft.notes}
                            onChange={(event) => update("notes", event.target.value)}
                            placeholder={t.booking.notesPlaceholder}
                            className="input-field min-h-[5.5rem] resize-none px-4 py-3"
                          />
                        </div>
                      </div>
                    </StepPanel>
                  ) : null}

                  {step === 4 ? (
                    <StepPanel key="4" reduce={reduce}>
                      {submitting ? (
                        <FindingDriver
                          label={t.booking.findingDriver}
                          pickup={draft.pickup}
                          destination={draft.destination}
                          pickupLat={draft.pickupLat}
                          pickupLng={draft.pickupLng}
                          destinationLat={draft.destinationLat}
                          destinationLng={draft.destinationLng}
                        />
                      ) : (
                        <Summary draft={draft} />
                      )}
                    </StepPanel>
                  ) : null}
                </AnimatePresence>
              )}
            </div>

            {!record ? (
              <div className="flex shrink-0 gap-2 border-t border-line/60 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-3 sm:px-5 sm:py-4 md:px-7">
                {step > 1 ? (
                  <Button variant="ghost" onClick={() => setStep((s) => s - 1)} className="min-h-14 min-w-0 flex-1 sm:flex-none sm:min-w-28">
                    <ArrowLeft className="size-4" />
                    {t.booking.back}
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={closeBooking} className="min-h-14 min-w-0 flex-1 sm:flex-none sm:min-w-28">
                    {t.booking.cancel}
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={goNext} className="min-h-14 min-w-0 flex-1">
                    {t.booking.continue}
                  </Button>
                ) : (
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {submitError ? <p className="text-sm text-[#b42318]">{submitError}</p> : null}
                    <Button onClick={confirm} disabled={submitting} className="min-h-14 w-full" ariaLabel={t.booking.bookNow}>
                      {submitting ? t.booking.bookingInProgress : t.booking.bookNow}
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
  );
}

function Summary({ draft }: { draft: BookingData }) {
  const { t, locale } = useT();
  const rows = [
    [t.booking.labels.pickup, draft.pickup],
    [t.booking.labels.destination, draft.destination],
    [t.booking.labels.date, formatDateLabel(draft.date, locale)],
    [t.booking.labels.time, draft.time],
    [t.booking.labels.passengers, formatPassengerChoice(draft.passengers, t.booking)],
    [t.booking.labels.luggage, String(draft.luggage)],
    [t.booking.labels.vehicle, t.vehicles[draft.vehicleClass]],
    [t.booking.labels.name, draft.name],
    [t.booking.labels.phone, draft.phone],
    [t.booking.labels.fare, t.booking.requestPrice],
  ];
  if (draft.returnJourney) rows.splice(4, 0, [t.booking.labels.return, `${formatDateLabel(draft.returnDate, locale)} · ${draft.returnTime}`]);

  return (
    <div>
      <p className="mb-4 text-sm text-muted">{t.booking.summaryIntro}</p>
      <dl className="neu-inset overflow-hidden rounded-2xl">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-4">
            <dt className="shrink-0 text-sm text-muted">{label}</dt>
            <dd className="min-w-0 break-words text-right text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function LiveConfirmation({ record, onClose }: { record: BookingRecord; onClose: () => void }) {
  const live = useBookingLive(record.reference, record.viewToken);
  const status = live?.status ?? record.status;

  return (
    <BookingStatusView
      booking={{ ...record, phone: record.phone }}
      status={status}
      onClose={onClose}
    />
  );
}

