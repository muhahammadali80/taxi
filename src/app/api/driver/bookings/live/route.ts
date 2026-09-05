import { isDriverAuthenticated } from "@/lib/booking/auth";
import { subscribeBookingEvents } from "@/lib/booking/events";
import { listBookings } from "@/lib/booking/store";

export async function GET() {
  if (!(await isDriverAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  let unsubscribe = () => {};

  const stream = new ReadableStream({
    start(controller) {
      const send = async () => {
        const bookings = await listBookings();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ bookings })}\n\n`));
      };
      void send();
      unsubscribe = subscribeBookingEvents(() => {
        void send();
      });
    },
    cancel() {
      unsubscribe();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
