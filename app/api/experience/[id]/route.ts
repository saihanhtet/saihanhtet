import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { title, company, start, end, description, order } = await request.json();
    const id = parseInt(params.id, 10);
    await sql`UPDATE experience SET title=${title}, company=${company}, start_year=${start}, end_year=${end}, description=${description}, ord=${order} WHERE id=${id}`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const id = parseInt(params.id, 10);
    await sql`DELETE FROM experience WHERE id=${id}`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
