"use client";
// RBAC enforcement primitives: component guard (Can), route guard (RouteGuard)
// and the shared 403 view (Forbidden).
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLock, LuTriangleAlert } from "react-icons/lu";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { ROLE_LABELS } from "@/lib/portofolio-a/rbac";
import type { Permission, Resource } from "@/types/portofolio-a";

/** Component/action guard — renders children only when the role is permitted. */
export function Can({
  permission,
  any,
  all,
  fallback = null,
  children,
}: {
  permission?: Permission;
  any?: Permission[];
  all?: Permission[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { can, canAny, canAll } = usePermission();
  let ok = true;
  if (permission) ok = can(permission);
  if (any) ok = ok && canAny(any);
  if (all) ok = ok && canAll(all);
  return <>{ok ? children : fallback}</>;
}

/** Full 403 screen shown when a route is accessed without permission. */
export function Forbidden({ detail }: { detail?: string }) {
  const { user } = useAuth();
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
        <LuLock className="size-7" strokeWidth={1.5} />
      </span>
      <h1 className="text-2xl font-semibold tracking-tight">403 — Access denied</h1>
      <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
        {detail ??
          `Your role (${
            user ? ROLE_LABELS[user.role] : "unknown"
          }) doesn't have permission to view this page.`}
      </p>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400">
        <LuTriangleAlert className="size-3.5" />
        Switch to a role with access using the role selector in the top bar.
      </p>
    </div>
  );
}

/** Page-level guard: requires a session, then checks resource/permission. */
export function RouteGuard({
  resource,
  permission,
  children,
}: {
  resource?: Resource;
  permission?: Permission;
  children: React.ReactNode;
}) {
  const { user, hydrated } = useAuth();
  const { can, canResource } = usePermission();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) router.replace("/portofolio-a/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <span className="size-6 animate-spin rounded-full border-2 border-zinc-300 border-t-emerald-500" />
      </div>
    );
  }

  const allowed =
    (resource ? canResource(resource) : true) &&
    (permission ? can(permission) : true);

  if (!allowed) return <Forbidden />;
  return <>{children}</>;
}
