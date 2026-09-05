"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingOverlay } from "./BookingFlow";
import { currentTimePlus, todayISO } from "@/lib/pricing";
import { emptyBooking, type BookingData } from "@/lib/types";

type BookingContextValue = {
  open: boolean;
  draft: BookingData;
  openBooking: (draft?: Partial<BookingData>, step?: number) => void;
  closeBooking: () => void;
  setDraft: (draft: BookingData) => void;
  startStep: number;
  session: number;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) throw new Error("useBooking must be used within BookingProvider");
  return value;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<BookingData>(emptyBooking);
  const [startStep, setStartStep] = useState(1);
  const [session, setSession] = useState(0);

  const openBooking = useCallback((next?: Partial<BookingData>, step = 1) => {
    setDraft((current) => {
      const merged = { ...current, ...next };
      if (!merged.date) merged.date = todayISO();
      if (!merged.time) merged.time = currentTimePlus(30);
      return merged;
    });
    setStartStep(step);
    setSession((value) => value + 1);
    setOpen(true);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  const value = useMemo(
    () => ({
      open,
      draft,
      startStep,
      session,
      setDraft,
      openBooking,
      closeBooking,
    }),
    [open, draft, startStep, session, openBooking, closeBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingOverlay />
    </BookingContext.Provider>
  );
}
