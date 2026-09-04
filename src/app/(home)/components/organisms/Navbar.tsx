// "use client";
// import React from "react";
// import { BiHomeAlt, BiUser } from "react-icons/bi";
// import { BsClipboardData, BsBriefcase, BsChatSquareText } from "react-icons/bs";
// import { Link } from "react-scroll";

// // const scrollToSection = (id: string) => {
// //   const element = document.getElementById(id);
// //   if (element) {
// //     element.scrollIntoView({ behavior: "smooth" });
// //   }
// // };

// function Navbar() {
//   return (
//     <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
//       <div className="p-4 mx-auto">
//         <div className="w-full bg-black/20  backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-2 py-1.5 flex justify-between items-center text-2xl text-white/50">
//           <Link
//             activeClass="active"
//             spy={true}
//             to="home"
//             smooth={true}
//             duration={700}
//             className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center"
//           >
//             <BiHomeAlt />
//           </Link>
//           <Link
//             activeClass="active"
//             spy={true}
//             to="about"
//             smooth={true}
//             duration={700}
//             className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center"
//           >
//             <BiUser />
//           </Link>
//           <Link
//             activeClass="active"
//             spy={true}
//             to="service"
//             smooth={true}
//             duration={700}
//             className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center"
//           >
//             <BsClipboardData />
//           </Link>
//           <Link
//             activeClass="active"
//             spy={true}
//             to="work"
//             smooth={true}
//             duration={700}
//             className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center"
//           >
//             <BsBriefcase />
//           </Link>
//           <Link
//             activeClass="active"
//             spy={true}
//             to="contact"
//             smooth={true}
//             duration={700}
//             className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center"
//           >
//             <BsChatSquareText />
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

"use client";
import React, { useEffect, useState } from "react";
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsClipboardData, BsBriefcase, BsChatSquareText } from "react-icons/bs";
import { useRivals } from "@/hooks/useRivals";
import { rankIcon } from "@/lib/rivals";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const { rank_name } = useRivals();

  // Menu items; the Rivals icon is the current rank badge, after portofolio.
  const navLinks = [
    { id: "home", icon: <BiHomeAlt /> },
    { id: "about", icon: <BiUser /> },
    { id: "work", icon: <BsBriefcase /> },
    { id: "portofolio", icon: <BsClipboardData /> },
    {
      id: "rivals",
      icon: (
        <img
          src={rankIcon(rank_name)}
          alt="Marvel Rivals rank"
          className="w-10 h-10 shrink-0 object-contain"
        />
      ),
    },
    { id: "contact", icon: <BsChatSquareText /> },
  ];

  // Native smooth scroll — runs on the compositor, smoother on mobile than JS.
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Active-section tracking (replaces react-scroll's spy).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }, // fire when section crosses viewport center
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div className="p-4 mx-auto">
        <div className="w-full bg-black/20 backdrop-blur-2xl rounded-full max-w-115 mx-auto px-2 py-1.5 flex justify-between items-center text-2xl text-white/50">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              aria-label={link.id}
              className={`cursor-pointer w-15 h-15 flex justify-center items-center ${
                activeSection === link.id ? "active" : ""
              }`}
            >
              {/* Fixed, non-shrinking box so .active padding can't squeeze the icon */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                {link.icon}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
