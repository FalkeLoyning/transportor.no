import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const id = crypto.randomUUID();
  console.log("RFQ received:", id, body);
  return NextResponse.json({ id, status: "submitted", message: "Forespørsel mottatt. Vi tar kontakt innen 24 timer." });
}
