"use client";

import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";

export default function PrivacyPage() {
  const { t } = useT();

  return (
    <article className="container-site max-w-3xl pt-[calc(6.5rem+env(safe-area-inset-top))] pb-20 sm:pt-32 sm:pb-24">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{t.footer.privacy}</p>
      <h1 className="heading-section mt-3 font-semibold md:text-4xl">{t.legal.privacyTitle}</h1>
      <p className="mt-4 text-sm text-muted">
        {t.legal.updated} {new Date().getFullYear()}
      </p>
      <div className="mt-10 space-y-6 text-[0.95rem] leading-7 text-muted">
        {t.legal.privacy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link href="/" className="mt-10 inline-flex min-h-12 items-center text-sm font-semibold text-ink">
        {t.legal.back}
      </Link>
    </article>
  );
}
