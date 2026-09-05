"use client";

import Link from "next/link";
import { useT } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useT();

  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.notFound.title}</h1>
      <p className="mt-3 max-w-md text-muted">{t.notFound.text}</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-14 items-center rounded-full bg-gold px-6 font-semibold text-ink"
      >
        {t.notFound.back}
      </Link>
    </div>
  );
}
