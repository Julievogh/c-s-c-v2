// app/api/purchase/route.js
import { nanoid } from "nanoid";

export async function POST(req) {
  const { slug, name, address } = await req.json();

  // Here you could log to a database, etc.
  console.log("📦 New order:", { slug, name, address });

  // Return a fake order confirmation ID
  return new Response(JSON.stringify({ success: true, orderId: nanoid(8) }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
