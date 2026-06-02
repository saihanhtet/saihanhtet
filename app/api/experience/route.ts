import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const rows = await sql`
      SELECT id::text AS "_id", title, company, start_year AS start, end_year AS end, description, ord AS "order"
      FROM experience ORDER BY ord DESC
    `;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { title = "", company = "", start = "", end = "", description = "", order = 0 } = await request.json();
    const rows = await sql`
      INSERT INTO experience (title, company, start_year, end_year, description, ord)
      VALUES (${title}, ${company}, ${start}, ${end}, ${description}, ${order})
      RETURNING id::text AS "_id", title, company, start_year AS start, end_year AS end, description, ord AS "order"
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create experience item" }, { status: 500 });
  }
}
