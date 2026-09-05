import { NextResponse } from "next/server";
import { createBooking, getBooking, publicView, updateBooking } from "@/lib/booking/store";
import { validateBookingPayload } from "@/lib/booking/validate";
import { notifyDriver } from "@/lib/booking/whatsapp";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid booking details." }, { status: 400 });
  }

  const { errors, value } = validateBookingPayload(body as object);
  if (!value || Object.keys(errors).length) {
    return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  const idempotencyKey = request.headers.get("idempotency-key")?.trim() || undefined;
  const { booking, created } = await createBooking(value, idempotencyKey);

  if (created) {
    const notify = await notifyDriver(booking);
    await updateBooking(booking.reference, {
      driverWhatsApp: notify.ok ? "sent" : "failed",
      notifyError: notify.ok ? undefined : notify.error,
    });
  }

  const stored = (await getBooking(booking.reference)) ?? booking;

  return NextResponse.json(
    {
      booking: publicView(stored),
      viewToken: stored.viewToken,
      created,
    },
    { status: created ? 201 : 200 },
  );
}
