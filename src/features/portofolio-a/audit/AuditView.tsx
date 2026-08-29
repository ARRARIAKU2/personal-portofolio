"use client";
import { useMemo, useState } from "react";
import { LuDownload, LuScrollText } from "react-icons/lu";
import { useCollection } from "@/hooks/portofolio-a/use-crm";
import { useAuditLogger } from "@/hooks/portofolio-a/use-audit-logger";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Badge, type BadgeTone } from "@/components/portofolio-a/ui/Badge";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Input, Select } from "@/components/portofolio-a/ui/Field";
import { EmptyState } from "@/components/portofolio-a/ui/EmptyState";
import { TableSkeleton } from "@/components/portofolio-a/ui/Skeleton";
import { ROLE_LABELS } from "@/lib/portofolio-a/rbac";
import { formatDateTime } from "@/lib/portofolio-a/format";
import { toCSV, downloadCSV } from "@/lib/portofolio-a/csv";
import type { AuditAction, AuditEntity, AuditLog } from "@/types/portofolio-a";

const ACTION_TONE: Record<AuditAction, BadgeTone> = {
  login: "sky",
  logout: "zinc",
  create: "emerald",
  update: "amber",
  delete: "rose",
  move_stage: "violet",
  role_change: "violet",
  export: "zinc",
};

const ACTIONS: AuditAction[] = [
  "login",
  "logout",
  "create",
  "update",
  "delete",
  "move_stage",
  "role_change",
  "export",
];

const ENTITIES: AuditEntity[] = [
  "session",
  "lead",
  "deal",
  "contact",
  "task",
  "user",
  "settings",
  "audit",
];

export function AuditView() {
  const { notify } = useToast();
  const log = useAuditLogger();
  const { data = [], isLoading } = useCollection<AuditLog>("audit");

  const [search, setSearch] = useState("");
  const [action, setAction] = useState<string>("all");
  const [entity, setEntity] = useState<string>("all");
  const [fromDate, setFromDate] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((e) => {
      if (action !== "all" && e.action !== action) return false;
      if (entity !== "all" && e.entityType !== entity) return false;
      if (fromDate && e.timestamp.slice(0, 10) < fromDate) return false;
      if (
        q &&
        !e.actorName.toLowerCase().includes(q) &&
        !e.entityId.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [data, search, action, entity, fromDate]);

  function exportCsv() {
    if (filtered.length === 0) return;
    const csv = toCSV(filtered as unknown as Record<string, unknown>[], [
      { key: "timestamp", header: "Timestamp" },
      { key: "actorName", header: "Actor" },
      { key: "actorRole", header: "Role" },
      { key: "action", header: "Action" },
      { key: "entityType", header: "Entity" },
      { key: "entityId", header: "Entity ID" },
      { key: "requestId", header: "Request ID" },
    ]);
    downloadCSV("audit-log.csv", csv);
    log({
      action: "export",
      entityType: "audit",
      entityId: "audit-export",
      after: { count: filtered.length },
    });
    notify(`Exported ${filtered.length} entries`);
  }

  return (
    <div>
      <PageHeader
        title="Audit Log"
        subtitle={`${data.length} recorded events`}
        actions={
          <Button onClick={exportCsv} disabled={filtered.length === 0}>
            <LuDownload className="size-4" />
            Export CSV
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Search actor or entity ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9"
        />
        <Select
          aria-label="Filter by action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="h-9"
        >
          <option value="all">All actions</option>
          {ACTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filter by entity"
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
          className="h-9"
        >
          <option value="all">All entities</option>
          {ENTITIES.map((en) => (
            <option key={en} value={en}>
              {en}
            </option>
          ))}
        </Select>
        <Input
          type="date"
          aria-label="From date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="h-9"
        />
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={8} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={LuScrollText}
            title="No matching events"
            description="Adjust the filters to see more of the trail."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-xs uppercase tracking-wide text-zinc-400 dark:border-zinc-800">
                  <th className="px-4 py-2.5 font-medium">When</th>
                  <th className="px-4 py-2.5 font-medium">Actor</th>
                  <th className="px-4 py-2.5 font-medium">Action</th>
                  <th className="px-4 py-2.5 font-medium">Entity</th>
                  <th className="px-4 py-2.5 font-medium">Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-zinc-500">
                      {formatDateTime(e.timestamp)}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="font-medium text-zinc-800 dark:text-zinc-100">
                        {e.actorName}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {ROLE_LABELS[e.actorRole]}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge tone={ACTION_TONE[e.action]}>{e.action}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-zinc-600 dark:text-zinc-300">
                        {e.entityType}
                      </span>
                      <span className="ml-1 font-mono text-xs text-zinc-400">
                        {e.entityId}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-zinc-400">
                      {e.requestId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
