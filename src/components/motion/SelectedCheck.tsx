"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { duration, easeOut } from "@/lib/motion";

export function SelectedCheck({ show }: { show: boolean }) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {show ? (
        <motion.span
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: duration.snappy, ease: easeOut }}
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink"
          aria-hidden
        >
          <svg viewBox="0 0 16 16" className="size-3.5">
            <path
              d="M3.2 8.2 6.4 11.2 12.8 4.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}
