import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 10;

export async function GET() {
  try {
    const supabase = await createClient();

    // Use AbortController to timeout after 5 seconds
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const { data, error } = await supabase
      .from("drivers")
      .select("name, phone")
      .eq("active", true)
      .maybeSingle()
      .abortSignal(controller.signal);

    clearTimeout(timeout);

    if (error) {
      console.error("[active-driver] Supabase error:", error.message);
      // If the table doesn't exist yet, return null gracefully
      return NextResponse.json(
        { name: null, phone: null },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (!data) {
      return NextResponse.json(
        { name: null, phone: null },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { name: data.name, phone: data.phone },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=10, stale-while-revalidate=30",
        },
      },
    );
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[active-driver] Request timed out after 5s");
    } else {
      console.error("[active-driver] Unexpected error:", err);
    }
    // Always return a valid response so the public site never breaks
    return NextResponse.json(
      { name: null, phone: null },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
