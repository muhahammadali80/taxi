import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteShell } from "@/components/SiteShell";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · Taxi in Barcelona`,
    template: `%s · ${SITE.shortName}`,
  },
  description:
    "Modern taxi service in Barcelona for local journeys, airport transfers and longer-distance travel. Book in Spanish, Catalan, English or French.",
  keywords: ["taxi Barcelona", "taxi Catalonia", "airport transfer Barcelona", "TapTaxiBcn"],
  openGraph: {
    title: SITE.name,
    description: "Reliable taxi service across Barcelona and surrounding areas.",
    type: "website",
    locale: "es_ES",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <body
        className="min-h-full bg-cream font-sans text-ink"
        suppressHydrationWarning
        {...{ "x-apple-data-detectors": "false" }}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
