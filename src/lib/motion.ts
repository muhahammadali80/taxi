export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;
export const easeOvershoot = [0.34, 1.4, 0.64, 1] as const;

export const duration = {
  instant: 0.16,
  snappy: 0.2,
  base: 0.28,
  moment: 0.8,
} as const;

export const springSnap = { type: "spring" as const, stiffness: 480, damping: 28, mass: 0.7 };
export const springBounce = { type: "spring" as const, stiffness: 420, damping: 16, mass: 0.65 };

export const buttonMotion = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
  transition: { duration: duration.snappy, ease: easeOut },
};

export const revealItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const revealList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

export function motionOrNone<T>(reduce: boolean | null, value: T): T | false {
  return reduce ? false : value;
}
