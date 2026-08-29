import { describe, expect, it } from "vitest";
import { createAuditEntry } from "@/lib/portofolio-a/audit";

const actor = { name: "Priya Nandakumar", role: "super_admin" as const };

describe("createAuditEntry", () => {
  it("captures actor, action, and entity metadata", () => {
    const entry = createAuditEntry(
      actor,
      {
        action: "move_stage",
        entityType: "deal",
        entityId: "deal_42",
        before: { stage: "proposal" },
        after: { stage: "won" },
      },
      "2026-08-29T10:00:00.000Z",
      "aud_1",
      "req_1"
    );

    expect(entry).toMatchObject({
      id: "aud_1",
      actorName: "Priya Nandakumar",
      actorRole: "super_admin",
      action: "move_stage",
      entityType: "deal",
      entityId: "deal_42",
      before: { stage: "proposal" },
      after: { stage: "won" },
      timestamp: "2026-08-29T10:00:00.000Z",
      requestId: "req_1",
    });
  });

  it("defaults before/after to null when omitted", () => {
    const entry = createAuditEntry(
      actor,
      { action: "login", entityType: "session", entityId: "session" },
      "2026-08-29T10:00:00.000Z",
      "aud_2",
      "req_2"
    );
    expect(entry.before).toBeNull();
    expect(entry.after).toBeNull();
  });
});
