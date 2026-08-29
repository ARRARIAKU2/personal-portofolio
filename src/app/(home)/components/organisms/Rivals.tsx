"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/(home)/components/variant";
import { useRivals } from "@/hooks/useRivals";
import { rankIcon, compact, playtime } from "@/lib/rivals";
import lunaSnow from "../../../../../public/img_nolaehaneun-manyeo.png";

function Rivals() {
  const s = useRivals();

  const stats = [
    {
      label: "Highest Rank",
      value: s.highest_rank,
      icon: rankIcon(s.highest_rank),
    },
    { label: "Time Played", value: playtime(s.playtime_hours) },
    { label: "Matches Played", value: compact(s.total_games) },
    { label: "Wins", value: compact(s.total_wins) },
    { label: "KOs", value: compact(s.total_kills) },
    { label: "Assists", value: compact(s.total_assists) },
  ];

  return (
    <section id="rivals" className="min-h-[100dvh] flex items-center py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="relative w-full"
        >
          {/* {title} */}
          <div className="mb-10 text-center lg:text-left">
            <span className="text-sm uppercase tracking-[0.3em] text-accent">
              Off the clock
            </span>
            <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none">
              Marvel Rivals
            </h2>
          </div>

          {/* Character art: stacked in-flow block below lg, absolute bleed from lg */}
          <Image
            src={lunaSnow}
            alt={s.featured_played_character}
            priority
            className="pointer-events-none mx-auto block h-[240px] w-auto select-none object-contain sm:h-[300px] lg:absolute lg:-top-24 lg:right-0 lg:mx-0 lg:h-[380px] lg:object-right-top"
          />

          {/* Identity block */}
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {s.username}
            </h3>

            <p className="mt-4 flex items-center justify-center gap-2 text-base text-white/70 sm:text-lg lg:justify-start">
              {s.season}: {s.rank_name}
              <img src={rankIcon(s.rank_name)} alt="" className="h-8 w-8 sm:h-10 sm:w-10" />
            </p>
            <p className="mt-1 text-base text-white/70 sm:text-lg">
              Top Hero: {s.featured_played_character}
            </p>
          </div>

          {/* Stats grid */}
          <div className="relative z-10 mt-12 grid grid-cols-1 gap-x-4 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <span className="text-2xl font-bold leading-none sm:text-3xl">
                    {stat.value}
                  </span>
                  {stat.icon && (
                    <img
                      src={stat.icon}
                      alt=""
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    />
                  )}
                </div>
                <div className="mt-2 text-xs text-white/50 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Rivals;
