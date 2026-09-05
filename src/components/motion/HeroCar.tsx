"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/lib/motion";

const ROAD = "M 26 30 C 92 16, 168 38, 294 24";
const DURATION_MS = 14000;

export function HeroJourney({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const taxiRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const taxi = taxiRef.current;
    if (!path || !taxi || reduce) return;

    let frame = 0;
    let start: number | null = null;

    const place = (progress: number) => {
      const length = path.getTotalLength();
      if (!length) return;
      const distance = progress * length;
      const point = path.getPointAtLength(distance);
      const ahead = path.getPointAtLength(Math.min(length, distance + 1.5));
      const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
      taxi.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
    };

    const tick = (now: number) => {
      if (document.visibilityState === "hidden") {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (start === null) start = now;
      const cycle = ((now - start) % DURATION_MS) / DURATION_MS;
      const pingpong = cycle < 0.5 ? cycle * 2 : 2 - cycle * 2;
      const eased = pingpong * pingpong * (3 - 2 * pingpong);
      place(eased);
      frame = requestAnimationFrame(tick);
    };

    place(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <motion.div
      className={`mt-2 w-full max-w-xl ${className}`}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.28, ease: easeOut }}
      aria-hidden
    >
      <svg viewBox="0 0 320 48" className="hero-journey w-full overflow-visible">
        <motion.path
          ref={pathRef}
          d={ROAD}
          fill="none"
          stroke="#FFC72C"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.32, ease: easeOut }}
        />
        <g ref={taxiRef} transform={reduce ? "translate(72 26)" : "translate(26 30)"}>
          <BarcelonaTaxi />
        </g>
      </svg>
    </motion.div>
  );
}

function BarcelonaTaxi() {
  return (
    <g transform="translate(-15,-11)">
      <ellipse cx="15" cy="13.1" rx="10.5" ry="1.25" fill="#000" opacity="0.3" />
      <rect x="12.2" y="1.1" width="5.4" height="2.15" rx="0.35" fill="#F0EBE0" stroke="#FFC72C" strokeWidth="0.7" />
      <rect x="12.45" y="1.3" width="4.9" height="1.15" rx="0.2" fill="#1A1A1A" />
      <path d="M12.55 1.55h4.7" stroke="#FFC72C" strokeWidth="0.35" />
      <path
        d="M3.1 8.15c.35-2.05 2.15-3.55 5.7-3.85 1.55-.12 3.35.05 4.85.55.55.18 1.15.28 1.75.28h4.2c1.15 0 2.35.35 2.95 1.15.45.6.7 1.2.7 1.85v2.05H3.1z"
        fill="#1A1A1A"
        stroke="#FFC72C"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
      <path d="M8.05 5.05h8.15c.2 1.15.25 2.15.2 3.15H7.85c.05-1.1.1-2.1.2-3.15z" fill="#FFC72C" />
      <path d="M8.45 5.25h3.15c.08.85.12 1.65.12 2.55H8.38c.02-.9.05-1.7.07-2.55z" fill="#F0EBE0" opacity="0.82" />
      <path d="M12.05 5.25h3.7c.08.85.1 1.65.08 2.55h-3.82c.02-.9.03-1.7.04-2.55z" fill="#F0EBE0" opacity="0.68" />
      <path d="M4.15 8.05h2.35v1.15H3.85c.08-.4.18-.8.3-1.15z" fill="#F5A623" opacity="0.85" />
      <circle cx="8.15" cy="11.15" r="1.7" fill="#1A1A1A" stroke="#FFC72C" strokeWidth="0.55" />
      <circle cx="8.15" cy="11.15" r="0.72" fill="#C8C2B6" />
      <circle cx="8.15" cy="11.15" r="0.28" fill="#1A1A1A" />
      <circle cx="20.35" cy="11.15" r="1.7" fill="#1A1A1A" stroke="#FFC72C" strokeWidth="0.55" />
      <circle cx="20.35" cy="11.15" r="0.72" fill="#C8C2B6" />
      <circle cx="20.35" cy="11.15" r="0.28" fill="#1A1A1A" />
    </g>
  );
}

/** @deprecated use HeroJourney */
export function DrawUnderline(props: { className?: string }) {
  return <HeroJourney {...props} />;
}

/** @deprecated use HeroJourney */
export function HeroCar() {
  return null;
}
