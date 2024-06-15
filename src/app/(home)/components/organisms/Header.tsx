"use client";
import Logo from "../../../../../public/next.svg";
import { Link } from "react-scroll";

function Header() {
  return (
    <header className="py-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            activeClass="active"
            spy={true}
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            M. ALANA
          </Link>
          <button className="btn btn-sm">Work With Me</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
