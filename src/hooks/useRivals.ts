"use client";
import { useEffect, useState } from "react";
import { RIVALS_FALLBACK, type RivalsStats } from "@/lib/rivals";

// Shared client fetch for the Rivals card and the navbar rank icon.
// Starts from the static fallback so there is never an empty state.
export function useRivals(): RivalsStats {
  const [stats, setStats] = useState<RivalsStats>(RIVALS_FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch("/api/rivals")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: RivalsStats) => alive && setStats(d))
      .catch(() => {}); // keep fallback on failure
    return () => {
      alive = false;
    };
  }, []);

  return stats;
}
