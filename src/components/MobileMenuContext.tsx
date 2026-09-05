"use client";

import { createContext, useContext, useMemo, useState } from "react";

type MobileMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>;
}

export function useMobileMenu() {
  const value = useContext(MobileMenuContext);
  if (!value) throw new Error("useMobileMenu must be used within MobileMenuProvider");
  return value;
}
