export async function POST(req) {
  const body = await req.json();
  const { name, email, eventId, message } = body;

  if (!name || !email || !eventId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  console.log("New event signup:", name, email, eventId, message);

  return new Response(
    JSON.stringify({ success: true, message: "Signup received" }),
    { status: 200 }
  );
}
