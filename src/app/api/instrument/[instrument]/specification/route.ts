import { NextRequest, NextResponse } from "next/server";

const API_BASE = "http://127.0.0.1:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: { instrument: string } }
) {
  try {
    const response = await fetch(
      `${API_BASE}/instrument/${params.instrument}/specification`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: NextRequest) {
  const json_body = await request.json();
  const instrument = json_body["instrument"];
  const specification = json_body["specification"];

  try {
    const response = await fetch(
      `${API_BASE}/instrument/${instrument}/specification`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specification),
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
