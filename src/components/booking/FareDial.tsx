"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easeOut } from "@/lib/motion";

type FareDialProps = {
  label: string;
  display: string;
  note: string;
};

export function FareDial({ label, display, note }: FareDialProps) {
  const reduce = useReducedMotion();
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * 0.42;

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
              {label}
            </p>
            <p className="mt-0.5 max-w-[6.4rem] text-[0.82rem] font-semibold leading-tight tracking-tight text-ink sm:max-w-[7.4rem] sm:text-base">
              {display}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 max-w-[16rem] px-2 text-center text-sm leading-5 text-charcoal">{note}</p>
    </div>
  );
}
