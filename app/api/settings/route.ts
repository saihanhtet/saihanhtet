import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB = "portfolio";
const COL = "settings";

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
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB);
    const doc = await db.collection(COL).findOne({ _id: "main" as never });
    return NextResponse.json(doc ?? defaults);
  } catch {
    return NextResponse.json(defaults);
  }
}

function isAuthorized(req: Request) {
  const auth = req.headers.get("Authorization");
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB);
    await db.collection(COL).replaceOne(
      { _id: "main" as never },
      { _id: "main", ...body },
      { upsert: true }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
