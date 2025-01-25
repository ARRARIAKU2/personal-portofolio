"use client";
import { Link as ScrollLink } from "react-scroll";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/(home)/components/variant";

function Header() {
  const router = useRouter();
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("down", 0.5)}
          initial="hidden"
          whileInView={"show"}
        >
          <div className="flex items-center justify-between">
            <ScrollLink
              activeClass="active"
              spy={true}
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              M. ALANA
            </ScrollLink>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className="btn py-2 px-6 items-center"
                onClick={() => router.push("https://wa.me/6281273532695")}
              >
                Work With Me
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
