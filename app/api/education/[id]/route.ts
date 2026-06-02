import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");
    const { _id, ...update } = body;
    void _id;
    await db.collection("education").updateOne({ _id: new ObjectId(params.id) }, { $set: update });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("education").deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
