"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easeOut } from "@/lib/motion";

const line = "absolute left-[3px] block h-[2px] w-[18px] rounded-full bg-current";

export function HamburgerIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  const t = { duration: reduce ? 0 : duration.snappy, ease: easeOut };

  return (
    <span className="relative block size-6" aria-hidden>
      <motion.span
        className={`${line} top-[5px]`}
        initial={false}
        animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={t}
      />
      <motion.span
        className={`${line} top-[11px]`}
        initial={false}
        animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
        transition={t}
      />
      <motion.span
        className={`${line} top-[17px]`}
        initial={false}
        animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={t}
      />
    </span>
  );
}
