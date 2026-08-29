// Append-only audit trail helpers. The pure builder is unit-tested; recordAudit
// performs the side effect (append to db + persist).
import { getDB, persist } from "@/stores/portofolio-a/db";
import { uid } from "@/lib/portofolio-a/id";
import type {
  AuditAction,
  AuditEntity,
  AuditLog,
  SessionUser,
} from "@/types/portofolio-a";

export interface AuditInput {
  action: AuditAction;
  entityType: AuditEntity;
  entityId: string;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
}

export function createAuditEntry(
  actor: Pick<SessionUser, "name" | "role">,
  input: AuditInput,
  timestamp: string,
  id: string,
  reqId: string
): AuditLog {
  return {
    id,
    actorName: actor.name,
    actorRole: actor.role,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    before: input.before ?? null,
    after: input.after ?? null,
    timestamp,
    requestId: reqId,
  };
}

export function recordAudit(
  actor: Pick<SessionUser, "name" | "role">,
  input: AuditInput
): AuditLog {
  const entry = createAuditEntry(
    actor,
    input,
    new Date().toISOString(),
    uid("aud"),
    uid("req")
  );
  const db = getDB();
  db.audit.unshift(entry); // append-only, newest first
  persist();
  return entry;
}
