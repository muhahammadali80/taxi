import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Ride",
  description: "Book a taxi in Barcelona in under a minute.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
