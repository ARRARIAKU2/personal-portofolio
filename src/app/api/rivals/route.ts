import { NextResponse } from "next/server";
import { RIVALS_FALLBACK, type RivalsStats } from "@/lib/rivals";

// Live Marvel Rivals stats from Discord's application-identities endpoint.
// The token is a personal Discord user token — it MUST stay server-side. Put it
// in .env.local as DISCORD_USER_TOKEN (never commit it). Without a token, or on
// any failure, we serve the static fallback so the card always renders.
const DISCORD_USER_ID = "340111153210327040";
const ENDPOINT = `https://discord.com/api/v9/users/${DISCORD_USER_ID}/application-identities?with_profiles=true`;

export const revalidate = 3600; // re-fetch at most hourly

export async function GET() {
  const token = process.env.DISCORD_USER_TOKEN;
  if (!token) return NextResponse.json(RIVALS_FALLBACK);

  try {
    const res = await fetch(ENDPOINT, {
      headers: { authorization: token, accept: "*/*" },
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`discord ${res.status}`);

    const json = await res.json();
    const profile = json?.identities?.[0]?.profile;
    const p = profile?.data?.primary;
    if (!p) throw new Error("no primary profile");

    const stats: RivalsStats = {
      username: profile.username ?? RIVALS_FALLBACK.username,
      season: p.season,
      rank_name: p.rank_name,
      highest_rank: p.highest_rank,
      featured_played_character: p.featured_played_character,
      playtime_hours: p.playtime_hours,
      total_wins: p.total_wins,
      total_games: p.total_games,
      total_kills: p.total_kills,
      total_assists: p.total_assists,
      total_deaths: p.total_deaths,
    };
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(RIVALS_FALLBACK);
  }
}
