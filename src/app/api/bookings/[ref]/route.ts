import { NextResponse } from "next/server";
import { getBooking, publicView } from "@/lib/booking/store";

export async function GET(request: Request, context: { params: Promise<{ ref: string }> }) {
  const { ref } = await context.params;
  const token = new URL(request.url).searchParams.get("t") ?? "";
  const booking = await getBooking(ref.toUpperCase());
  if (!booking || !token || token !== booking.viewToken) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  return NextResponse.json({ booking: publicView(booking) });
}
