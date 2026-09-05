import { DriverDashboard } from "@/components/driver/DriverDashboard";

export const metadata = {
  title: "Driver bookings",
  robots: { index: false, follow: false },
};

export default function DriverPage() {
  return <DriverDashboard />;
}
