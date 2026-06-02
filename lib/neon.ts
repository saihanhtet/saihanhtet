import { neon } from "@neondatabase/serverless";

if (!process.env.NEON_URL) {
  throw new Error('Missing environment variable: "NEON_URL"');
}

export const sql = neon(process.env.NEON_URL);
