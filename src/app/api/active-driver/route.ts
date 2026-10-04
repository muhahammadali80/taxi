import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();

    // Race the Supabase query against a 5-second timeout
    const timeout = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 5000),
    );

    const query = supabase
      .from("drivers")
      .select("name, phone")
      .eq("active", true)
      .maybeSingle();

    const result = await Promise.race([query, timeout]);

    // Timed out
    if (result === null) {
      console.error("[active-driver] Query timed out after 5s");
      return NextResponse.json(
        { name: null, phone: null },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }

    const { data, error } = result;

    if (error) {
      console.error("[active-driver] Supabase error:", error.message);
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
  } catch (err) {
    console.error("[active-driver] Unexpected error:", err);
    return NextResponse.json(
      { name: null, phone: null },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
