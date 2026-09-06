"use client";

import { Footer } from "@/components/Footer";
import { MobileMenuProvider } from "@/components/MobileMenuContext";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Navigation } from "@/components/Navigation";
import { ToastProvider } from "@/components/motion/ToastProvider";
import { LanguageSuggest } from "@/components/LanguageSuggest";
import { LanguageProvider, useT } from "@/i18n/LanguageProvider";
import { usePathname } from "next/navigation";

function SkipLink() {
  const { t } = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
    >
      {t.skip}
    </a>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        <MobileMenuProvider>
          <SkipLink />
          <Navigation />
          <ShellFrame>{children}</ShellFrame>
        </MobileMenuProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

function ShellFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/driver");

  return (
    <>
      <div className={hideChrome ? "" : "pb-[calc(7.75rem+env(safe-area-inset-bottom))] md:pb-0"}>
        <main id="main">{children}</main>
        {hideChrome ? null : <Footer />}
      </div>
      {hideChrome ? null : (
        <>
          <LanguageSuggest />
          <MobileStickyBar />
        </>
      )}
    </>
  );
}
