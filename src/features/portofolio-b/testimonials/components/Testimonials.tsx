import { Section } from "@/components/portofolio-b/ui/Section";
import { SectionHeading } from "@/components/portofolio-b/ui/SectionHeading";
import { TestimonialCard } from "@/components/portofolio-b/ui/TestimonialCard";
import { testimonials } from "../data/testimonials";

export function Testimonials() {
  return (
    <Section id="testimoni" labelledBy="testimoni-title">
      <SectionHeading
        id="testimoni-title"
        kicker="Testimoni"
        title="Dipercaya untuk rumah yang mereka tinggali."
        className="max-w-2xl"
      />

      {/* Scroll-snap row on small screens, grid on large. */}
      <ul className="hover-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:overflow-visible xl:grid-cols-4">
        {testimonials.map((item) => (
          <li
            key={item.id}
            className="w-[85%] shrink-0 snap-start sm:w-[420px] lg:w-auto"
          >
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
