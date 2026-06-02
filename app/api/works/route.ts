import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const works = await db.collection("works").find({}).toArray();
    return NextResponse.json(works);
  } catch {
    return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");
    const result = await db.collection("works").insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create work" }, { status: 500 });
  }
}
