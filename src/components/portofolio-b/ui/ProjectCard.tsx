import { HiOutlineLocationMarker } from "react-icons/hi";
import { ImageSlot } from "./ImageSlot";
import { Badge } from "./Badge";
import type { Project } from "@/features/portofolio-b/portfolio/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <ImageSlot
        ratio="4/3"
        path={project.imagePath}
        alt={`${project.name} — ${project.type} di ${project.location}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-24px_rgba(23,24,26,0.35)]"
      >
        <div className="pointer-events-none absolute left-4 top-4">
          <Badge tone="accent">{project.category}</Badge>
        </div>
      </ImageSlot>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-semibold text-[var(--ark-ink)] md:text-lg">
            {project.name}
          </h3>
          <span className="font-[family-name:var(--font-space-grotesk)] text-xs text-[var(--ark-gray)]">
            {project.year}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--ark-gray)]">
          <HiOutlineLocationMarker className="size-4 shrink-0" />
          {project.location}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--ark-line)] pt-4 text-xs">
          <Meta label="Tipe" value={project.type} />
          <Meta label="Luas" value={project.area} />
          <Meta label="Durasi" value={project.duration} />
        </dl>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[var(--ark-gray)]/70">{label}</dt>
      <dd className="mt-0.5 font-medium text-[var(--ark-ink)]">{value}</dd>
    </div>
  );
}
