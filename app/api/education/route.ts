import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const rows = await sql`
      SELECT id::text AS "_id", title, subtitle, start_year AS start, end_year AS end, ord AS "order"
      FROM education ORDER BY ord DESC
    `;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { title = "", subtitle = "", start = "", end = "", order = 0 } = await request.json();
    const rows = await sql`
      INSERT INTO education (title, subtitle, start_year, end_year, ord)
      VALUES (${title}, ${subtitle}, ${start}, ${end}, ${order})
      RETURNING id::text AS "_id", title, subtitle, start_year AS start, end_year AS end, ord AS "order"
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create education item" }, { status: 500 });
  }
}
