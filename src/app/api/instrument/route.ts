import { NextRequest, NextResponse } from "next/server";

const API_BASE = "http://127.0.0.1:8000";

export async function GET(request: NextRequest) {
  const instrumentName = request.nextUrl.searchParams.get("instrumentName");
  try {
    const response = await fetch(
      `${API_BASE}/instrument/${instrumentName}/specification`,
      {
        method: "GET",
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
