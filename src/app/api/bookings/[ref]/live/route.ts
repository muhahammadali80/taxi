import { getBooking, publicView } from "@/lib/booking/store";
import { subscribeBookingEvents } from "@/lib/booking/events";

export async function GET(request: Request, context: { params: Promise<{ ref: string }> }) {
  const { ref } = await context.params;
  const token = new URL(request.url).searchParams.get("t") ?? "";
  const booking = await getBooking(ref.toUpperCase());
  if (!booking || token !== booking.viewToken) {
    return new Response("Not found", { status: 404 });
  }

  const encoder = new TextEncoder();
  let unsubscribe = () => {};

  const stream = new ReadableStream({
    start(controller) {
      const send = async () => {
        const latest = await getBooking(ref.toUpperCase());
        if (!latest) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ booking: publicView(latest) })}\n\n`));
      };
      void send();
      unsubscribe = subscribeBookingEvents((event) => {
        if (event.reference === ref.toUpperCase()) void send();
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
