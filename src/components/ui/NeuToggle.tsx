"use client";

import { motion, useReducedMotion } from "motion/react";
import { springBounce } from "@/lib/motion";

type NeuToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  offLabel: string;
  onLabel: string;
};

export function NeuToggle({ checked, onChange, offLabel, onLabel }: NeuToggleProps) {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="mb-2 flex justify-between gap-3 text-xs font-semibold sm:text-sm">
        <span className={`truncate ${checked ? "text-charcoal/70" : "text-ink"}`}>{offLabel}</span>
        <span className={`truncate text-right ${checked ? "text-ink" : "text-charcoal/70"}`}>{onLabel}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${offLabel} or ${onLabel}`}
        onClick={() => onChange(!checked)}
        className="neu-inset relative min-h-12 w-full overflow-hidden rounded-full"
      >
        <motion.span
          className="absolute top-1 left-1 flex h-10 w-[calc(50%-6px)] items-center justify-center truncate rounded-full bg-gold px-2 text-xs font-semibold text-ink shadow-[0_6px_14px_-6px_rgba(26,26,26,0.45)] sm:text-sm"
          animate={{ x: checked ? "calc(100% + 4px)" : 0 }}
          transition={reduce ? { duration: 0 } : springBounce}
        >
          {checked ? onLabel : offLabel}
        </motion.span>
      </button>
    </div>
  );
}
