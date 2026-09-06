import { Hero } from "@/components/sections/Hero";
import { BookCTA } from "@/components/sections/BookCTA";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { AirportTransfers } from "@/components/sections/AirportTransfers";
import { Vehicle } from "@/components/sections/Vehicle";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Areas } from "@/components/sections/Areas";
import { Reviews } from "@/components/sections/Reviews";
import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Faq } from "@/components/sections/Faq";
import { SITE } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: SITE.name,
    telephone: SITE.phoneHref.replace("tel:", ""),
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
      <BookCTA />
      <WhyChooseUs />
      <Services />
      <AirportTransfers />
      <Vehicle />
      <HowItWorks />
      <Areas />
      <Reviews />
      <About />
      <ContactCTA />
      <Faq />
    </>
  );
}
