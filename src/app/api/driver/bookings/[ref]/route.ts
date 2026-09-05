import { NextResponse } from "next/server";
import { isDriverAuthenticated } from "@/lib/booking/auth";
import { getBooking, setBookingStatus, updateBooking } from "@/lib/booking/store";
import { toDriverBooking } from "@/lib/booking/types";
import { notifyCustomer, notifyDriver } from "@/lib/booking/whatsapp";

export async function POST(request: Request, context: { params: Promise<{ ref: string }> }) {
  if (!(await isDriverAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ref } = await context.params;
  const body = (await request.json().catch(() => null)) as { action?: string } | null;
  const booking = await getBooking(ref.toUpperCase());
  if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });

  if (body?.action === "resend-driver") {
    const notify = await notifyDriver(booking);
    const updated = await updateBooking(booking.reference, {
      driverWhatsApp: notify.ok ? "sent" : "failed",
      notifyError: notify.ok ? undefined : notify.error,
    });
    return NextResponse.json({ booking: updated ? toDriverBooking(updated) : toDriverBooking(booking) });
  }

  if (body?.action === "resend-customer") {
    if (booking.status !== "confirmed" && booking.status !== "declined") {
      return NextResponse.json({ error: "Customer message is only sent after confirm or decline." }, { status: 400 });
    }
    const notify = await notifyCustomer(booking, booking.status === "confirmed" ? "confirmed" : "declined");
    const updated = await updateBooking(booking.reference, {
      customerWhatsApp: notify.ok ? "sent" : "failed",
      notifyError: notify.ok ? undefined : notify.error,
    });
    return NextResponse.json({ booking: updated ? toDriverBooking(updated) : toDriverBooking(booking) });
  }

  if (body?.action !== "confirm" && body?.action !== "decline") {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  if (booking.status !== "awaiting_confirmation") {
    return NextResponse.json({ booking: toDriverBooking(booking) });
  }

  const status = body.action === "confirm" ? "confirmed" : "declined";
  const updated = await setBookingStatus(booking.reference, status);
  if (!updated) return NextResponse.json({ error: "Could not update booking." }, { status: 500 });

  const notify = await notifyCustomer(updated, status === "confirmed" ? "confirmed" : "declined");
  const finalBooking = await updateBooking(updated.reference, {
    customerWhatsApp: notify.ok ? "sent" : "failed",
    notifyError: notify.ok ? undefined : notify.error,
  });

  return NextResponse.json({ booking: toDriverBooking(finalBooking ?? updated) });
}
