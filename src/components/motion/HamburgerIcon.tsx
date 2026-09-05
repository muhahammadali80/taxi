"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easeOut } from "@/lib/motion";

export function HamburgerIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  const t = { duration: reduce ? 0 : duration.snappy, ease: easeOut };

  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <motion.rect
        width="16"
        height="1.8"
        x="4"
        y="6.4"
        rx="0.9"
        fill="currentColor"
        animate={open ? { y: 11.1, rotate: 45 } : { y: 6.4, rotate: 0 }}
        transition={t}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <motion.rect
        width="16"
        height="1.8"
        x="4"
        y="11.1"
        rx="0.9"
        fill="currentColor"
        animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
        transition={t}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <motion.rect
        width="16"
        height="1.8"
        x="4"
        y="15.8"
        rx="0.9"
        fill="currentColor"
        animate={open ? { y: 11.1, rotate: -45 } : { y: 15.8, rotate: 0 }}
        transition={t}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}
