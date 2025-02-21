"use client";
import React from "react";
import { Link, Element } from "react-scroll";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="section1" smooth={true} duration={500}>
              Section 1
            </Link>
          </li>
          <li>
            <Link to="section2" smooth={true} duration={500}>
              Section 2
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      <Element name="section1">
        <section style={{ height: "100vh", backgroundColor: "lightblue" }}>
          <h1>Section 1</h1>
          <p>This is the content of section 1</p>
        </section>
      </Element>
      <Element name="section2">
        <section style={{ height: "100vh", backgroundColor: "lightgreen" }}>
          <h1>Section 2</h1>
          <p>This is the content of section 2</p>
        </section>
      </Element>
      {/* Add more sections with Element components as needed */}
    </div>
  );
}

export default App;
