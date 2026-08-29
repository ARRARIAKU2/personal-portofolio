"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LuX } from "react-icons/lu";
import { NAV_ITEMS } from "./nav";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { cn } from "@/lib/portofolio-a/cn";

function BrandMark() {
  return (
    <Link
      href="/portofolio-a/dashboard"
      className="flex items-center gap-2.5 px-2"
    >
      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
        C
      </span>
      <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        CRM
      </span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { canResource } = usePermission();

  const items = NAV_ITEMS.filter(
    (item) => !item.resource || canResource(item.resource)
  );

  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
            )}
          >
            {active && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 -z-0 rounded-lg bg-emerald-50 dark:bg-emerald-500/10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 size-[18px]",
                active ? "text-emerald-600 dark:text-emerald-400" : ""
              )}
              strokeWidth={1.75}
            />
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:self-start dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-16 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
        <BrandMark />
      </div>
      <NavList />
      <div className="border-t border-zinc-200 px-5 py-4 text-[11px] text-zinc-400 dark:border-zinc-800">
        Frontend-only demo · v1.0
      </div>
    </aside>
  );
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
              <BrandMark />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <LuX className="size-5" />
              </button>
            </div>
            <NavList onNavigate={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
