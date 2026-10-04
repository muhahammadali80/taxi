import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taxi Admin Dashboard",
  robots: { index: false, follow: false },
};

// NOTE: This layout is nested inside /app/layout.tsx which already renders
// <html> and <body>. Do NOT render them again here — just return children.
// The public site chrome (nav/footer) is hidden for /admin/* via SiteShell.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#f5f4f1",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
