import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const rows = await sql`
      SELECT id::text AS "_id", name, percent, icon, ord AS "order"
      FROM skills ORDER BY ord DESC
    `;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { name = "", percent = 80, icon = "Code", order = 0 } = await request.json();
    const rows = await sql`
      INSERT INTO skills (name, percent, icon, ord)
      VALUES (${name}, ${percent}, ${icon}, ${order})
      RETURNING id::text AS "_id", name, percent, icon, ord AS "order"
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
