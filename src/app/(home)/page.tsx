import Navbar from "./components/organisms/Navbar";
import Header from "./components/organisms/Header";
import Banner from "./components/organisms/Banner";
import About from "./components/organisms/About";
import Service from "./components/organisms/Service";
import Work from "./components/organisms/Work";
import Contact from "./components/organisms/Contact";

export default function Home() {
  return (
    <main className="bg-site bg-center bg-no-repeat bg-cover overflow-hidden">
      <Header />
      <Banner />
      <Navbar />
      <About />
      <Service />
      <Work />
      <Contact />
      <div className="h-[4000px]">
      </div>
    </main>
  );
}
