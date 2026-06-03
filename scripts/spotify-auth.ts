/**
 * One-time script to get your Spotify refresh token.
 * Run: tsx scripts/spotify-auth.ts
 *
 * Steps:
 *  1. Go to https://developer.spotify.com/dashboard → Create app
 *     - Redirect URI: http://localhost:3000/callback
 *     - Scopes needed: user-read-currently-playing user-read-recently-played
 *  2. Copy Client ID + Client Secret → paste below or set in .env.local
 *  3. Run this script → open the printed URL in your browser
 *  4. After authorizing, copy the full redirect URL from browser address bar
 *  5. Paste it when prompted → script prints your SPOTIFY_REFRESH_TOKEN
 */

import { createInterface } from "readline";
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

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const REDIRECT_URI = "http://127.0.0.1:3000/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first");
  process.exit(1);
}

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

console.log("\n1. Open this URL in your browser:\n");
console.log(authUrl);
console.log("\n2. Authorize → you'll be redirected to localhost (it will fail to load — that's fine)");
console.log("3. Copy the FULL URL from the address bar and paste it below.\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question("Paste redirect URL: ", async (redirectUrl) => {
  rl.close();
  const code = new URL(redirectUrl).searchParams.get("code");
  if (!code) { console.error("No code found in URL"); process.exit(1); }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await res.json();
  if (!data.refresh_token) {
    console.error("Failed:", JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log("\n✓ Add these to your .env.local:\n");
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
});
