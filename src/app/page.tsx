import { Hero } from "@/components/sections/Hero";
import { BookingPanel } from "@/components/booking/BookingFlow";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { AirportTransfers } from "@/components/sections/AirportTransfers";
import { Vehicle } from "@/components/sections/Vehicle";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Areas } from "@/components/sections/Areas";
import { Reviews } from "@/components/sections/Reviews";
import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: SITE.name,
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    areaServed: "Barcelona",
    description: "Reliable taxi service across Barcelona and surrounding areas.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <BookingPanel />
      <WhyChooseUs />
      <Services />
      <AirportTransfers />
      <Vehicle />
      <HowItWorks />
      <Areas />
      <Reviews />
      <About />
      <ContactCTA />
    </>
  );
}
