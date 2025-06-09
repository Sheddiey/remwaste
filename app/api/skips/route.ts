import { SkipItem } from "@/app/lib/types";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const upstream = await fetch(
      "https://clicks.aweber.com/y/ct/?l=N0O4Kn&m=8kKiA5Xs4lyuOBlr&b=LN4zdPOCY2wffjE5vH.B0w"
    );

    if (!upstream.ok) {
      console.error(
        "[/api/skips] upstream status:",
        upstream.status,
        await upstream.text()
      );
      return NextResponse.json(
        { error: "Bad response from upstream" },
        { status: 502 }
      );
    }

    const data = (await upstream.json()) as SkipItem[];
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/skips] fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
