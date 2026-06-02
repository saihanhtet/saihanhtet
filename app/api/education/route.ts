import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const items = await db.collection("education").find({}).sort({ order: -1 }).toArray();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = await db.collection("education").insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create education item" }, { status: 500 });
  }
}
