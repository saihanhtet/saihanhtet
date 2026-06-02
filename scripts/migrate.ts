import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

for (const envFile of [".env.local", ".env"]) {
  try {
    const lines = readFileSync(envFile, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) process.env[match[1].trim()] ??= match[2].trim();
    }
  } catch {}
}

if (!process.env.NEON_URL) {
  console.error("Missing NEON_URL in .env.local");
  process.exit(1);
}

const sql = neon(process.env.NEON_URL);

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS works (
      id        SERIAL PRIMARY KEY,
      title     TEXT NOT NULL DEFAULT '',
      content   TEXT DEFAULT '',
      image     TEXT DEFAULT '',
      link      TEXT DEFAULT ''
    )
  `;
  console.log("✓ works table");

  await sql`
    CREATE TABLE IF NOT EXISTS education (
      id         SERIAL PRIMARY KEY,
      title      TEXT NOT NULL DEFAULT '',
      subtitle   TEXT DEFAULT '',
      start_year TEXT DEFAULT '',
      end_year   TEXT DEFAULT '',
      ord        INTEGER DEFAULT 0
    )
  `;
  console.log("✓ education table");

  await sql`
    CREATE TABLE IF NOT EXISTS experience (
      id          SERIAL PRIMARY KEY,
      title       TEXT NOT NULL DEFAULT '',
      company     TEXT DEFAULT '',
      start_year  TEXT DEFAULT '',
      end_year    TEXT DEFAULT '',
      description TEXT DEFAULT '',
      ord         INTEGER DEFAULT 0
    )
  `;
  console.log("✓ experience table");

  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id      SERIAL PRIMARY KEY,
      name    TEXT NOT NULL DEFAULT '',
      percent INTEGER DEFAULT 80,
      icon    TEXT DEFAULT 'Code',
      ord     INTEGER DEFAULT 0
    )
  `;
  console.log("✓ skills table");

  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id          TEXT PRIMARY KEY DEFAULT 'main',
      name        TEXT DEFAULT '',
      role        TEXT DEFAULT '',
      bio         TEXT DEFAULT '',
      profile_pic TEXT DEFAULT '',
      email       TEXT DEFAULT '',
      phone       TEXT DEFAULT '',
      github      TEXT DEFAULT '',
      instagram   TEXT DEFAULT '',
      facebook    TEXT DEFAULT '',
      discord     TEXT DEFAULT '',
      tools       JSONB DEFAULT '[]'
    )
  `;
  console.log("✓ settings table");

  console.log("\nAll tables ready. Run: npm run seed");
}

migrate().catch((e) => { console.error(e); process.exit(1); });
