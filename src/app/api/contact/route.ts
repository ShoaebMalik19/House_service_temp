import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;

    if (endpoint && accessKey) {
      // Forward to third-party form service
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...body,
        }),
      });

      if (!res.ok) {
        throw new Error("Form submission failed");
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 2 hours.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please call us directly.",
      },
      { status: 500 }
    );
  }
}
