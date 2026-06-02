import { NextResponse } from "next/server";
import { sql } from "@/lib/neon";

const defaults = {
  name: "S. Han Htet San",
  role: "Junior Software Developer",
  bio: "Building cool things with code — from desktop apps to web platforms. Passionate about learning and creating software that makes a difference.",
  profilePic: "/assets/MyProfile.jpg",
  email: "sai.hanhtetsan@gmail.com",
  phone: "+66 84 205 4515",
  github: "https://github.com/saihanhtet",
  instagram: "https://www.instagram.com/hanhtet.ivan/",
  facebook: "https://www.facebook.com/hanhtet.ivan",
  discord: "https://discordapp.com/users/1019565322681974806",
  tools: [] as string[],
};

function rowToSettings(row: Record<string, unknown>) {
  return {
    name:       row.name        ?? defaults.name,
    role:       row.role        ?? defaults.role,
    bio:        row.bio         ?? defaults.bio,
    profilePic: row.profile_pic ?? defaults.profilePic,
    email:      row.email       ?? defaults.email,
    phone:      row.phone       ?? defaults.phone,
    github:     row.github      ?? defaults.github,
    instagram:  row.instagram   ?? defaults.instagram,
    facebook:   row.facebook    ?? defaults.facebook,
    discord:    row.discord     ?? defaults.discord,
    tools:      Array.isArray(row.tools) ? row.tools : (typeof row.tools === "string" ? JSON.parse(row.tools) : []),
  };
}

function isAuthorized(req: Request) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM settings WHERE id = 'main'`;
    if (rows.length === 0) return NextResponse.json(defaults);
    return NextResponse.json(rowToSettings(rows[0] as Record<string, unknown>));
  } catch {
    return NextResponse.json(defaults);
  }
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const {
      name = "", role = "", bio = "", profilePic = "",
      email = "", phone = "", github = "", instagram = "", facebook = "", discord = "",
      tools = [],
    } = body;
    const toolsJson = JSON.stringify(Array.isArray(tools) ? tools : []);

    await sql`
      INSERT INTO settings (id, name, role, bio, profile_pic, email, phone, github, instagram, facebook, discord, tools)
      VALUES ('main', ${name}, ${role}, ${bio}, ${profilePic}, ${email}, ${phone},
              ${github}, ${instagram}, ${facebook}, ${discord}, ${toolsJson}::jsonb)
      ON CONFLICT (id) DO UPDATE SET
        name        = EXCLUDED.name,
        role        = EXCLUDED.role,
        bio         = EXCLUDED.bio,
        profile_pic = EXCLUDED.profile_pic,
        email       = EXCLUDED.email,
        phone       = EXCLUDED.phone,
        github      = EXCLUDED.github,
        instagram   = EXCLUDED.instagram,
        facebook    = EXCLUDED.facebook,
        discord     = EXCLUDED.discord,
        tools       = EXCLUDED.tools
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
