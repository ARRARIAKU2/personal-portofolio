import { Navbar } from "@/components/portofolio-b/layout/Navbar";
import { Footer } from "@/components/portofolio-b/layout/Footer";
import { Hero } from "@/features/portofolio-b/hero/components/Hero";
import { About } from "@/features/portofolio-b/about/components/About";
import { ValueProps } from "@/features/portofolio-b/about/components/ValueProps";
import { Services } from "@/features/portofolio-b/services/components/Services";
import { Portfolio } from "@/features/portofolio-b/portfolio/components/Portfolio";
import { Process } from "@/features/portofolio-b/process/components/Process";
import { Testimonials } from "@/features/portofolio-b/testimonials/components/Testimonials";
import { Faq } from "@/features/portofolio-b/faq/components/Faq";
import { Cta } from "@/features/portofolio-b/cta/components/Cta";
import { Contact } from "@/features/portofolio-b/contact/components/Contact";

export default function PortofolioBPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ValueProps />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
