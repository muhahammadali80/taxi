"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type UseCountUpOptions = {
  duration?: number;
  enabled?: boolean;
};

export function useCountUp(target: number, { duration = 800, enabled = true }: UseCountUpOptions = {}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce || !enabled ? target : 0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    if (reduce) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(from + (target - from) * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration, enabled, reduce]);

  return value;
}
