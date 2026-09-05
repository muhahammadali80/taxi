"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { formatMoney } from "@/lib/pricing";
import { useCountUp } from "@/hooks/useCountUp";
import { duration, easeOut } from "@/lib/motion";
import type { Locale } from "@/i18n/config";

type FareDialProps = {
  value: number;
  locale: Locale;
  label: string;
  note: string;
  calculatingLabel: string;
};

export function FareDial({ value, locale, label, note, calculatingLabel }: FareDialProps) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(Boolean(reduce));
  const counted = useCountUp(value, { duration: 700, enabled: ready });
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = ready ? Math.min(1, Math.max(0.08, value / 80)) : 0.12;
  const dash = circumference * progress;

  useEffect(() => {
    setReady(Boolean(reduce));
    const timer = window.setTimeout(() => setReady(true), reduce ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [value, reduce]);

  return (
    <div className="flex flex-col items-center">
      <div className="neu-raised flex size-36 items-center justify-center rounded-full sm:size-44">
        <div className="neu-inset relative flex size-[6.75rem] items-center justify-center rounded-full sm:size-[8.5rem]">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128" aria-hidden>
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#e0dbd0" strokeWidth="8" />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="#F5A623"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: reduce ? 0 : duration.moment, ease: easeOut }}
            />
          </svg>
          <div className="relative px-2 text-center">
            <p className="text-[0.62rem] font-semibold leading-tight tracking-[0.08em] text-charcoal uppercase">
              {ready ? label : calculatingLabel}
            </p>
            <p className="text-lg font-semibold tracking-tight text-ink sm:text-2xl">
              {formatMoney(ready ? counted : 0, locale)}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 max-w-[16rem] px-2 text-center text-sm leading-5 text-charcoal">{note}</p>
    </div>
  );
}
