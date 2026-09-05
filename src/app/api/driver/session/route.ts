import { NextResponse } from "next/server";
import { isDriverAuthenticated } from "@/lib/booking/auth";
import { whatsappConfigured } from "@/lib/booking/whatsapp";

export async function GET() {
  const authenticated = await isDriverAuthenticated();
  return NextResponse.json({ authenticated, whatsappConfigured: whatsappConfigured() });
}
