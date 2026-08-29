"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuKanban,
  LuScrollText,
  LuShieldCheck,
} from "react-icons/lu";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { TEAM } from "@/mocks/portofolio-a/data";
import {
  ALL_ROLES,
  ROLE_DESCRIPTIONS,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
} from "@/lib/portofolio-a/rbac";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { Button } from "@/components/portofolio-a/ui/Button";
import { cn } from "@/lib/portofolio-a/cn";
import type { Role } from "@/types/portofolio-a";

const HIGHLIGHTS = [
  { icon: LuShieldCheck, text: "Granular role-based access, enforced 3 layers deep" },
  { icon: LuKanban, text: "Drag-and-drop pipeline with live probability" },
  { icon: LuScrollText, text: "Append-only audit trail, searchable & exportable" },
];

export function LoginView() {
  const { user, hydrated, login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<Role>("sales_manager");

  useEffect(() => {
    if (hydrated && user) router.replace("/portofolio-a/dashboard");
  }, [hydrated, user, router]);

  const member = TEAM.find((m) => m.role === role) ?? TEAM[0];

  function handleEnter() {
    login(role);
    router.push("/portofolio-a/dashboard");
  }

  return (
    <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
      {/* Brand panel — asymmetric, hidden on small screens */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-12 text-white lg:flex">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-96 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-16 size-96 rounded-full bg-emerald-600/10 blur-3xl"
        />
        <div className="relative flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-emerald-500 text-base font-bold">
            C
          </span>
          <span className="text-lg font-semibold tracking-tight">CRM</span>
        </div>

        <div className="relative">
          <h1 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Run the whole revenue floor from one console.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
            Pick a role to explore how permissions reshape every screen, action
            and record in real time.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/5 text-emerald-400">
                  <h.icon className="size-4" />
                </span>
                {h.text}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-zinc-500">
          Frontend-only demo · No backend, no real data leaves your browser.
        </p>
      </div>

      {/* Role picker */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
              Sign in
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Choose your role
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Session is simulated locally — switch roles anytime from the top bar.
            </p>
          </div>

          <div className="grid max-h-[46dvh] grid-cols-1 gap-2 overflow-y-auto pr-1">
            {ALL_ROLES.map((r) => {
              const active = r === role;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                    active
                      ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-500/10"
                      : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {ROLE_LABELS[r]}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {ROLE_DESCRIPTIONS[r]}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-zinc-400">
                    {ROLE_PERMISSIONS[r].length} perms
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="mt-5 flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Avatar name={member.name} seed={member.avatarSeed} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {member.email}
              </p>
            </div>
          </motion.div>

          <Button onClick={handleEnter} className="mt-5 w-full justify-center">
            Enter workspace as {ROLE_LABELS[role]}
            <LuArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
