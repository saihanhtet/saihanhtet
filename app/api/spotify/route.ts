import { NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken(): Promise<string> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Missing Spotify env vars");
  }
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    // Try currently playing first
    const npRes = await fetch(NOW_PLAYING_URL, { headers });

    if (npRes.status === 200) {
      const data = await npRes.json();
      if (data?.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
          album: data.item.album.name,
          albumArt: data.item.album.images[2]?.url ?? data.item.album.images[0]?.url ?? null,
          url: data.item.external_urls.spotify,
        }, { headers: { "Cache-Control": "no-store" } });
      }
    }

    // Fallback: recently played
    const rpRes = await fetch(RECENT_URL, { headers });
    if (rpRes.ok) {
      const data = await rpRes.json();
      const item = data?.items?.[0]?.track;
      if (item) {
        return NextResponse.json({
          isPlaying: false,
          title: item.name,
          artist: item.artists.map((a: { name: string }) => a.name).join(", "),
          album: item.album.name,
          albumArt: item.album.images[2]?.url ?? item.album.images[0]?.url ?? null,
          url: item.external_urls.spotify,
        }, { headers: { "Cache-Control": "no-store" } });
      }
    }

    return NextResponse.json({ isPlaying: false, title: null }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ isPlaying: false, title: null });
  }
}
