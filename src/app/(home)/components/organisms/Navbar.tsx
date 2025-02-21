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
import { Link } from "react-scroll";

// Define menu items with their corresponding icons and section IDs
const navLinks = [
  { id: "home", icon: <BiHomeAlt /> },
  { id: "about", icon: <BiUser /> },
  { id: "service", icon: <BsClipboardData /> },
  { id: "work", icon: <BsBriefcase /> },
  { id: "contact", icon: <BsChatSquareText /> },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setActiveSection("home"); // Set "home" as active on initial load
  }, []);

  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div className="p-4 mx-auto">
        <div className="w-full bg-black/20 backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-2 py-1.5 flex justify-between items-center text-2xl text-white/50">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              activeClass="active"
              spy={true}
              to={link.id}
              smooth={true}
              duration={700}
              onSetActive={() => setActiveSection(link.id)}
              className={`cursor-pointer w-[60px] h-[60px] flex justify-center items-center ${
                activeSection === link.id ? "active" : ""
              }`}
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
