import { NextResponse } from "next/server";
import { createDriverSession, driverPassword, passwordMatches } from "@/lib/booking/auth";

export async function POST(request: Request) {
  if (!driverPassword()) {
    return NextResponse.json({ error: "Driver dashboard is not configured." }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !passwordMatches(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  await createDriverSession();
  return NextResponse.json({ ok: true });
}
