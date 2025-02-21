import Navbar from "./components/organisms/Navbar";
import Header from "./components/organisms/Header";
import Banner from "./components/organisms/Banner";
import About from "./components/organisms/About";
import Service from "./components/organisms/Service";
import Work from "./components/organisms/Work";
import Contact from "./components/organisms/Contact";

function Home() {
  return (
    <main className="bg-site bg-cover bg-left-top bg-no-repeat overflow-hidden">
      <Navbar />
      <div id="home" className="min-h-screen">
        <Header />
        <Banner />
      </div>
      <About />
      <Service />
      <Work />
      <Contact />
      <div className="h-fit"></div>
    </main>
  );
}

export default Home;
