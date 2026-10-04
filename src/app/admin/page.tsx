import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Only allow real email-authenticated users (not anonymous sessions)
  const isAuthenticated =
    !error && user && user.email && user.is_anonymous !== true;

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  // Fetch all drivers server-side for the initial render
  const { data: drivers, error: driversError } = await supabase
    .from("drivers")
    .select("*")
    .order("created_at", { ascending: true });

  if (driversError) {
    console.error("Failed to load drivers:", driversError.message);
  }

  return <AdminDashboard initialDrivers={drivers ?? []} />;
}
