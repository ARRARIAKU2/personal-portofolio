import Image from "next/image";
import { cn } from "@/lib/portofolio-b/cn";

export interface ImageSlotProps {
  /** aspect ratio as w/h, e.g. "4/3", "16/9", "3/4". */
  ratio?: string;
  /** target public path the owner will drop a real photo into. */
  path: string;
  alt: string;
  /** when the real file exists, pass its /public src to render next/image. */
  src?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** overlay content (badges, captions) rendered above the image/placeholder. */
  children?: React.ReactNode;
}

/**
 * Placeholder-first image slot. Until a real photo exists in /public the owner
 * sees a premium blueprint placeholder labelled with the target filename.
 * Pass `src` once the asset is added to switch to an optimized next/image.
 */
export function ImageSlot({
  ratio = "4/3",
  path,
  alt,
  src,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  children,
}: ImageSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--ark-line)] bg-[#ecebe4]",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Placeholder path={path} />
      )}
      {children}
    </div>
  );
}

function Placeholder({ path }: { path: string }) {
  return (
    <div
      className="ark-blueprint absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
      aria-hidden
    >
      {/* corner registration marks — architectural drawing cue */}
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 rotate-90" />
      <Corner className="bottom-3 left-3 -rotate-90" />
      <Corner className="bottom-3 right-3 rotate-180" />

      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 text-[var(--ark-gray)]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
      >
        <path d="M8 40 32 16l24 24" />
        <path d="M14 40v14h36V40" />
        <path d="M28 54V44h8v10" />
      </svg>
      <span className="px-4 font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.18em] text-[var(--ark-gray)]">
        {path}
      </span>
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute h-4 w-4 border-l border-t border-[var(--ark-gray)]/40",
        className
      )}
    />
  );
}
