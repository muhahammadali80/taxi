"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { duration, easeOut } from "@/lib/motion";

type ToastItem = { id: number; message: string };

type ToastContextValue = {
  pushToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used within ToastProvider");
  return value;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mobile, setMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const pushToast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-2), { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-3 z-[80] flex flex-col items-center gap-2 top-[calc(4.75rem+env(safe-area-inset-top))] max-md:top-auto max-md:bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:top-6">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.p
              key={toast.id}
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: mobile ? 14 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: mobile ? 10 : -8 }}
              transition={{ duration: duration.base, ease: easeOut }}
              className="pointer-events-auto w-full max-w-sm rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-gold shadow-[0_12px_28px_-16px_rgba(26,26,26,0.55)]"
            >
              {toast.message}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
