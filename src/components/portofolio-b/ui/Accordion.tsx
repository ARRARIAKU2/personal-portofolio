"use client";
import { useId, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { cn } from "@/lib/portofolio-b/cn";

export interface AccordionItemData {
  question: string;
  answer: string;
}

/** Single-open accordion, keyboard + aria accessible. */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-[var(--ark-line)] border-y border-[var(--ark-line)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ark-bg)]"
              >
                <span className="text-base font-medium text-[var(--ark-ink)] md:text-lg">
                  {item.question}
                </span>
                <HiPlus
                  className={cn(
                    "size-5 shrink-0 text-[var(--ark-accent-ink)] transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="grid transition-all"
            >
              <p className="max-w-[68ch] pb-6 pr-10 text-sm leading-relaxed text-[var(--ark-gray)] md:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
