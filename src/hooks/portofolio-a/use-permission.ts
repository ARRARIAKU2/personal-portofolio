"use client";
import { useCallback, useMemo } from "react";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import {
  canAccessResource,
  hasAll,
  hasAny,
  hasPermission,
} from "@/lib/portofolio-a/rbac";
import type { Permission, Resource } from "@/types/portofolio-a";

/** Permission helpers bound to the active session role. */
export function usePermission() {
  const { user } = useAuth();
  const role = user?.role ?? null;

  const can = useCallback((p: Permission) => hasPermission(role, p), [role]);
  const canAny = useCallback((p: Permission[]) => hasAny(role, p), [role]);
  const canAll = useCallback((p: Permission[]) => hasAll(role, p), [role]);
  const canResource = useCallback(
    (r: Resource) => canAccessResource(role, r),
    [role]
  );

  return useMemo(
    () => ({ role, can, canAny, canAll, canResource }),
    [role, can, canAny, canAll, canResource]
  );
}
