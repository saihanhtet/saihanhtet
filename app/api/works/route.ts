import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const rows = await sql`SELECT id::text AS "_id", title, content, image, link FROM works ORDER BY id`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { title = "", content = "", image = "", link = "" } = await request.json();
    const rows = await sql`
      INSERT INTO works (title, content, image, link)
      VALUES (${title}, ${content}, ${image}, ${link})
      RETURNING id::text AS "_id", title, content, image, link
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create work" }, { status: 500 });
  }
}
