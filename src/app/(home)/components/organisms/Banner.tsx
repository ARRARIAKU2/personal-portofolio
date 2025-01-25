"use client";
import profile from "@/public/profile.jpg";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/(home)/components/variant";
import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <section className="min-h-[85vh] lg:min-h-[78vh] flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <h1 className="mb-2 text-[55px] font-bold leading-[0.8] lg:text-[80px]">
                M. <span>ALANA</span>
              </h1>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <div className="mb-6 text-4xl lg:text-[50px] font-semibold uppercase leading-[1]">
                <span className="text-white">I&apos;m a </span>
                <TypeAnimation
                  sequence={[
                    2000,
                    "Fullstack", // Types 'One'
                    2000, // Waits 1s
                    "Frontend", // Deletes 'One' and types 'Two'
                    2000, // Waits 2s
                    "AI Developer", // Deletes 'Two' and types 'Three'
                    2000, // Waits 2s
                  ]}
                  speed={50}
                  className="text-accent"
                  wrapper="span"
                  repeat={Infinity}
                />
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <div className="mb-8 max-w-lg mx-auto lg:mx-0">
                Hi, I&apos;m Lana, a Passionate and enthusiastic Frontend
                Developer with 1+ years of experience.
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <div className="flex items-center gap-6 max-w-max mb-12 mx-auto lg:mx-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    className="btn py-2 px-6 items-center"
                    href="https://wa.me/6281273532695"
                  >
                    Contact Me
                  </Link>
                </motion.button>
                <motion.button>
                  <Link
                    className="text-gradient btn-link cursor-pointer"
                    href="https://www.canva.com/design/DAGCrTW6IdQ/nfYZmsc9rT5eof9GKPgH1Q/edit?utm_content=DAGCrTW6IdQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                  >
                    My Portofolio
                  </Link>
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <div className="flex items-center gap-4 text-2xl max-w-max mx-auto lg:mx-0">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="https://github.com/ARRARIAKU2">
                    <FaGithub />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="https://www.instagram.com/m_alana/">
                    <FaInstagram />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="https://www.linkedin.com/in/m-alana/">
                    <FaLinkedin />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
          >
            <div className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px]">
              <Image
                src={profile}
                alt="profile"
                className="h-[450px] w-[450px] rounded-full shrink-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
