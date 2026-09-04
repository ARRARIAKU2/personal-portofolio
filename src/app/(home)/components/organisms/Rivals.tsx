"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn } from "@/app/(home)/components/variant";
import { useRivals } from "@/hooks/useRivals";
import { rankIcon, compact, playtime } from "@/lib/rivals";
import lunaSnow from "../../../../../public/img_nolaehaneun-manyeo.png";
import carmineCassette from "../../../../../public/img_carmine-cassette.png";
import radiantRadiance from "../../../../../public/img_radiant-radiance.png";
import sonicTrailblazer from "../../../../../public/img_sonic-trailblazer.png";

function Rivals() {
  const s = useRivals();

  const stats = [
    {
      label: "Highest Rank",
      value: s.highest_rank,
      icon: rankIcon(s.highest_rank),
    },
    {
      label: "Time Played",
      end: s.playtime_hours,
      formattingFn: playtime,
    },
    { label: "Matches Played", end: s.total_games },
    { label: "Wins", end: s.total_wins },
    { label: "KOs", end: s.total_kills },
    { label: "Assists", end: s.total_assists },
  ];

  return (
    <section id="rivals" className="min-h-dvh flex items-center py-24">
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
          <div className="pointer-events-none relative mx-auto h-60 w-full select-none sm:h-75 lg:absolute lg:-top-24 lg:right-0 lg:h-95 lg:w-120">
            <Image
              src={carmineCassette}
              alt=""
              className="absolute inset-0 z-10 mx-auto h-60 w-auto -translate-x-96 object-contain sm:h-75 lg:h-95"
            />
            <Image
              src={sonicTrailblazer}
              alt={s.featured_played_character}
              className="absolute inset-0 z-20 mx-auto h-60 w-auto -translate-x-64 object-contain sm:h-75 lg:h-95"
            />
            <Image
              src={radiantRadiance}
              alt=""
              className="absolute inset-0 z-30 mx-auto h-60 w-auto -translate-x-32 object-contain sm:h-75 lg:h-95"
            />
            <Image
              src={lunaSnow}
              alt=""
              priority
              className="absolute inset-0 z-40 mx-auto h-60 w-auto object-contain sm:h-75 lg:h-95"
            />
          </div>

          {/* Identity block */}
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {s.username}
            </h3>

            <p className="mt-4 flex items-center justify-center gap-2 text-base text-white/70 sm:text-lg lg:justify-start">
              {s.season}: {s.rank_name}
              <img
                src={rankIcon(s.rank_name)}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
            </p>
            <p className="mt-1 text-base text-white/70 sm:text-lg">
              Top Hero: {s.featured_played_character}
            </p>
          </div>

          {/* Stats grid */}
          <div className="relative z-10 mt-6 grid grid-cols-1 gap-x-4 gap-y-4 border-t border-white/10 pt-5 sm:mt-12 sm:gap-y-8 sm:pt-10 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <span className="text-2xl font-bold leading-none sm:text-3xl">
                    {"end" in stat ? (
                      <CountUp
                        end={stat.end ?? 0}
                        duration={3.5}
                        decimals={stat.formattingFn ? 2 : 0}
                        enableScrollSpy
                        formattingFn={stat.formattingFn ?? compact}
                      />
                    ) : (
                      stat.value
                    )}
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
