import { NextResponse } from "next/server";
import { isDriverAuthenticated } from "@/lib/booking/auth";
import { listBookings } from "@/lib/booking/store";

export async function GET() {
  if (!(await isDriverAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ bookings: await listBookings() });
}
