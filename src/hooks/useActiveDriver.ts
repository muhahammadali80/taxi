"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export type ActiveDriver = {
  name: string | null;
  phone: string | null;
};

/**
 * Returns the currently active driver's phone number fetched from Supabase
 * via our /api/active-driver endpoint.
 *
 * Falls back to SITE defaults while loading or on error so the public site
 * never shows empty links.
 */
export function useActiveDriver(): {
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  loading: boolean;
} {
  const [driver, setDriver] = useState<ActiveDriver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDriver() {
      try {
        const res = await fetch("/api/active-driver", {
          // Respect the short cache headers from the API
          next: { revalidate: 10 },
        });
        if (!res.ok) throw new Error("Non-ok response");
        const data: ActiveDriver = await res.json();
        if (!cancelled) setDriver(data);
      } catch {
        // Silently fall back to SITE defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDriver();
    return () => {
      cancelled = true;
    };
  }, []);

  // If no active driver fetched, fall back to the hardcoded SITE defaults
  const rawPhone = driver?.phone ?? SITE.phoneHref.replace("tel:", "");
  // Strip whitespace/dashes for href
  const e164 = rawPhone.replace(/[\s\-()]/g, "");
  const phoneHref = e164.startsWith("+") ? `tel:${e164}` : `tel:+${e164}`;
  // Format for display: add spaces in a readable way if not already formatted
  const phoneDisplay =
    driver?.phone ?? SITE.phoneDisplay;
  // WhatsApp uses digits only, no +
  const whatsappNumber = e164.startsWith("+") ? e164.slice(1) : e164;

  return { phone: phoneHref, phoneDisplay, whatsappNumber, loading };
}
