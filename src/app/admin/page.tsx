import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const supabase = await createClient();

  // Run auth verification and drivers fetch concurrently for minimum latency
  const timeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), 4000),
  );

  const userQuery = supabase.auth.getUser();
  const driversQuery = supabase
    .from("drivers")
    .select("*")
    .order("created_at", { ascending: true });

  const [authResult, driversResult] = await Promise.all([
    Promise.race([userQuery, timeoutPromise]),
    Promise.race([driversQuery, timeoutPromise]),
  ]);

  const user =
    authResult && "data" in authResult ? authResult.data?.user : null;
  const authError =
    authResult && "error" in authResult ? authResult.error : null;

  // Only allow real email-authenticated users (not anonymous sessions)
  const isAuthenticated =
    !authError && user && user.email && user.is_anonymous !== true;

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const drivers =
    driversResult && "data" in driversResult ? driversResult.data : null;

  return <AdminDashboard initialDrivers={drivers ?? []} />;
}
