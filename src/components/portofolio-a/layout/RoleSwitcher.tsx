"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuCheck, LuChevronDown, LuShieldCheck } from "react-icons/lu";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { ALL_ROLES, ROLE_DESCRIPTIONS, ROLE_LABELS } from "@/lib/portofolio-a/rbac";
import { useToast } from "@/stores/portofolio-a/toast-context";

/** Live role switcher — instantly changes access across nav, pages and actions. */
export function RoleSwitcher() {
  const { user, switchRole } = useAuth();
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <LuShieldCheck className="size-4 text-emerald-500" />
        <span className="hidden sm:inline">{ROLE_LABELS[user.role]}</span>
        <LuChevronDown className="size-3.5 text-zinc-400" />
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
              className="absolute right-0 z-40 mt-1.5 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                Act as role
              </p>
              {ALL_ROLES.map((role) => {
                const active = role === user.role;
                return (
                  <button
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      setOpen(false);
                      if (role !== user.role)
                        notify(`Now acting as ${ROLE_LABELS[role]}`, "info");
                    }}
                    className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <span className="mt-0.5 size-4 shrink-0">
                      {active && <LuCheck className="size-4 text-emerald-500" />}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
                        {ROLE_LABELS[role]}
                      </span>
                      <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                        {ROLE_DESCRIPTIONS[role]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
