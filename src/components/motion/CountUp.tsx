"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({ value, suffix = "", duration = 800, className = "" }: CountUpProps) {
  const { ref, visible } = useInViewOnce<HTMLSpanElement>();
  const current = useCountUp(value, { duration, enabled: visible });
  const shown = Number.isInteger(value) ? Math.round(current) : current.toFixed(0);

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
