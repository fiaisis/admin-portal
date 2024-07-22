import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;
const FIA_API_API_KEY = process.env.FIA_API_API_KEY;

export async function GET(request: NextRequest, { params }: { params: { instrument: string } }) {
  try {
    const response = await fetch(`${API_BASE_URL}/instrument/${params.instrument}/specification`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${FIA_API_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { instrument: string } }) {
  const json_body = await request.json();
  const instrument = params.instrument;
  const specification = json_body['specification'];

  try {
    const response = await fetch(` ${API_BASE_URL}/instrument/${instrument}/specification`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${FIA_API_API_KEY}`,
      },
      body: JSON.stringify(specification),
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
