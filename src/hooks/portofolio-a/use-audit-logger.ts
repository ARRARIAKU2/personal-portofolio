"use client";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { recordAudit, type AuditInput } from "@/lib/portofolio-a/audit";

/** Returns a logger that records an audit entry for the current actor. */
export function useAuditLogger() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useCallback(
    (input: AuditInput) => {
      if (!user) return;
      recordAudit(user, input);
      queryClient.invalidateQueries({ queryKey: ["audit"] });
    },
    [user, queryClient]
  );
}
