// Marvel Rivals stats — types, rank-icon mapping, formatters, and static fallback.
// The fallback mirrors the Discord application-identities payload so the card
// renders without a live token. See src/app/api/rivals/route.ts for live fetch.

export interface RivalsStats {
  username: string;
  season: string;
  rank_name: string;
  highest_rank: string;
  featured_played_character: string;
  playtime_hours: number;
  total_wins: number;
  total_games: number;
  total_kills: number;
  total_assists: number;
  total_deaths: number;
}

// rank_name -> DanIcon number (rivalsmeta.com CDN).
const RANK_DAN: Record<string, string> = {
  Bronze: "01",
  Silver: "02",
  Gold: "03",
  Platinum: "04",
  Diamond: "05",
  GrandMaster: "06",
  Celestial: "07",
  Eternity: "08",
};

/** Rank badge image URL for a given rank_name (falls back to Bronze). */
export function rankIcon(rankName: string): string {
  // GrandMaster ships as a local asset; the rest come from the rivalsmeta CDN.
  if (rankName === "GrandMaster") return "/img_rank_dan_06.png";
  const dan = RANK_DAN[rankName] ?? "01";
  return `https://rivalsmeta.com/_ipx/q_70&s_150x150/images/DanIcon/img_rank_dan_${dan}.png`;
}

/** Compact count: <10K keeps one decimal (2.9K), >=10K rounds (40K). */
export function compact(n: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: Math.abs(n) >= 10_000 ? 0 : 1,
  }).format(n);
}

/** 467.7 -> "467h 42m". */
export function playtime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

// Empty fallback — shown only if the live Discord fetch is unavailable.
export const RIVALS_FALLBACK: RivalsStats = {
  username: "-",
  season: "-",
  rank_name: "-",
  highest_rank: "-",
  featured_played_character: "-",
  playtime_hours: 0,
  total_wins: 0,
  total_games: 0,
  total_kills: 0,
  total_assists: 0,
  total_deaths: 0,
};
