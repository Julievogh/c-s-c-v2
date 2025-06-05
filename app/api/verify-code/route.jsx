// app/api/verify-code/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { code } = await request.json();

  if (code === process.env.EVENT_TEMPLATE_CODE) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('event_code', code, { path: '/' });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
