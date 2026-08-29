"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowLeft, LuLogOut, LuMenu } from "react-icons/lu";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { ROLE_LABELS } from "@/lib/portofolio-a/rbac";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { ThemeToggle } from "./ThemeToggle";
import { RoleSwitcher } from "./RoleSwitcher";

function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:bg-zinc-800"
      >
        <Avatar name={user.name} seed={user.avatarSeed} size="sm" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <button
              className="fixed inset-0 z-30 cursor-default"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.14 }}
              className="absolute right-0 z-40 mt-1.5 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-2.5 px-2.5 py-2">
                <Avatar name={user.name} seed={user.avatarSeed} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {ROLE_LABELS[user.role]}
                  </p>
                </div>
              </div>
              <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
              <button
                onClick={() => {
                  logout();
                  router.replace("/portofolio-a/login");
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <LuLogOut className="size-4" />
                Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-zinc-200 bg-zinc-50/80 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="inline-flex size-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        <LuMenu className="size-5" />
      </button>
      <div className="flex-1" />
      <a
        href="/"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <LuArrowLeft className="size-4" />
        <span className="hidden sm:inline">Main site</span>
      </a>
      <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
      <ThemeToggle />
      <RoleSwitcher />
      <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
      <UserMenu />
    </header>
  );
}
