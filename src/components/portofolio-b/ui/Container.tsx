import { cn } from "@/lib/portofolio-b/cn";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1240px] px-4 md:px-8", className)}>
      {children}
    </Tag>
  );
}
