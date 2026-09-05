"use client";

import { motion, useReducedMotion } from "motion/react";

const PIECES = [
  { x: -42, y: -36, r: 18, c: "#FFC72C", s: 6 },
  { x: 38, y: -40, r: -22, c: "#1A1A1A", s: 5 },
  { x: -8, y: -52, r: 8, c: "#F5A623", s: 4 },
  { x: 22, y: -28, r: 30, c: "#FFC72C", s: 5 },
  { x: -28, y: -18, r: -14, c: "#1A1A1A", s: 4 },
  { x: 48, y: -16, r: 12, c: "#FFC72C", s: 3 },
  { x: -50, y: -8, r: -8, c: "#F5A623", s: 4 },
  { x: 10, y: -46, r: 4, c: "#1A1A1A", s: 3 },
];

export function ConfettiBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {PIECES.map((piece, index) => (
        <motion.span
          key={index}
          className="absolute top-1/2 left-1/2 rounded-[1px]"
          style={{ width: piece.s, height: piece.s * 1.6, background: piece.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: piece.x, y: piece.y, opacity: 0, rotate: piece.r, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
        />
      ))}
    </div>
  );
}
