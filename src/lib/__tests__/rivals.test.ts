import { describe, it, expect } from "vitest";
import { compact, playtime, rankIcon } from "../rivals";

describe("rivals formatters", () => {
  it("compact: 1 decimal under 10K, rounded at/above", () => {
    expect(compact(2932)).toBe("2.9K");
    expect(compact(1536)).toBe("1.5K");
    expect(compact(40296)).toBe("40K");
    expect(compact(31275)).toBe("31K");
  });

  it("playtime: hours + rounded minutes", () => {
    expect(playtime(467.7)).toBe("467h 42m");
  });

  it("rankIcon: local asset for GrandMaster, CDN Dan number otherwise", () => {
    expect(rankIcon("GrandMaster")).toBe("/img_rank_dan_06.png");
    expect(rankIcon("Diamond")).toContain("img_rank_dan_05.png");
    expect(rankIcon("Bronze")).toContain("img_rank_dan_01.png");
  });
});
