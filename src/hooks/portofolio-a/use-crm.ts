"use client";
// Generic TanStack Query hooks over the mock Axios API, with audit logging
// wired into every mutation.
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api, type DashboardData } from "@/lib/portofolio-a/api";
import { useAuditLogger } from "@/hooks/portofolio-a/use-audit-logger";
import type { AuditAction, AuditEntity } from "@/types/portofolio-a";

type Resource = "leads" | "deals" | "contacts" | "tasks" | "users" | "audit";

export function useCollection<T>(resource: Resource) {
  return useQuery<T[]>({
    queryKey: [resource],
    queryFn: async () => (await api.get<T[]>(`/${resource}`)).data,
  });
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => (await api.get<DashboardData>("/dashboard")).data,
  });
}

interface EntityConfig {
  resource: Resource;
  entityType: AuditEntity;
}

interface UpdateVars<T> {
  id: string;
  patch: Partial<T>;
  before: Record<string, unknown>;
  action?: AuditAction; // defaults to "update"
}

interface DeleteVars {
  id: string;
  before: Record<string, unknown>;
}

/** CRUD mutations for a resource; each success logs an audit entry. */
export function useCrmMutations<T extends { id: string }>({
  resource,
  entityType,
}: EntityConfig) {
  const queryClient = useQueryClient();
  const log = useAuditLogger();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [resource] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const create = useMutation({
    mutationFn: async (payload: Omit<T, "id">) =>
      (await api.post<T>(`/${resource}`, payload)).data,
    onSuccess: (created) => {
      log({
        action: "create",
        entityType,
        entityId: created.id,
        after: created as Record<string, unknown>,
      });
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: UpdateVars<T>) =>
      (await api.patch<T>(`/${resource}/${id}`, patch)).data,
    onSuccess: (updated, vars) => {
      log({
        action: vars.action ?? "update",
        entityType,
        entityId: updated.id,
        before: vars.before,
        after: updated as Record<string, unknown>,
      });
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: async ({ id }: DeleteVars) =>
      (await api.delete<T>(`/${resource}/${id}`)).data,
    onSuccess: (_data, vars) => {
      log({
        action: "delete",
        entityType,
        entityId: vars.id,
        before: vars.before,
      });
      invalidate();
    },
  });

  return { create, update, remove };
}
