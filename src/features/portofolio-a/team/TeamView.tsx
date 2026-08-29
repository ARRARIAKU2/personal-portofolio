"use client";
import { useMemo, useState } from "react";
import { LuCheck, LuShield, LuUsers } from "react-icons/lu";
import { useCollection, useCrmMutations } from "@/hooks/portofolio-a/use-crm";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Badge } from "@/components/portofolio-a/ui/Badge";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { Select } from "@/components/portofolio-a/ui/Field";
import { TableSkeleton } from "@/components/portofolio-a/ui/Skeleton";
import {
  ALL_PERMISSIONS,
  ALL_ROLES,
  ROLE_DESCRIPTIONS,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
} from "@/lib/portofolio-a/rbac";
import { formatDate } from "@/lib/portofolio-a/format";
import { cn } from "@/lib/portofolio-a/cn";
import type { Role, TeamMember } from "@/types/portofolio-a";

export function TeamView() {
  const { notify } = useToast();
  const { can } = usePermission();
  const { data = [], isLoading } = useCollection<TeamMember>("users");
  const { update } = useCrmMutations<TeamMember>({
    resource: "users",
    entityType: "user",
  });

  const canManage = can("users.manage");
  const [previewRole, setPreviewRole] = useState<Role>("sales_rep");

  const granted = useMemo(
    () => new Set(ROLE_PERMISSIONS[previewRole]),
    [previewRole]
  );

  function changeRole(member: TeamMember, role: Role) {
    if (role === member.role) return;
    update.mutate(
      {
        id: member.id,
        patch: { role },
        before: member as unknown as Record<string, unknown>,
        action: "role_change",
      },
      {
        onSuccess: () =>
          notify(`${member.name} is now ${ROLE_LABELS[role]}`),
      }
    );
  }

  function toggleActive(member: TeamMember) {
    update.mutate(
      {
        id: member.id,
        patch: { active: !member.active },
        before: member as unknown as Record<string, unknown>,
      },
      {
        onSuccess: () =>
          notify(
            member.active ? `${member.name} deactivated` : `${member.name} activated`,
            "info"
          ),
      }
    );
  }

  return (
    <div>
      <PageHeader
        title="Team & Roles"
        subtitle={`${data.length} people · ${ALL_ROLES.length} roles`}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="overflow-hidden lg:col-span-2">
          {isLoading ? (
            <div className="p-4">
              <TableSkeleton rows={6} />
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {data.map((member) => (
                <li
                  key={member.id}
                  className="flex flex-wrap items-center gap-3 px-4 py-3"
                >
                  <Avatar name={member.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                        {member.name}
                      </span>
                      {!member.active && <Badge tone="rose">Inactive</Badge>}
                    </div>
                    <div className="truncate text-xs text-zinc-400">
                      {member.email} · joined {formatDate(member.joinedAt)}
                    </div>
                  </div>

                  {canManage ? (
                    <Select
                      aria-label={`Role for ${member.name}`}
                      value={member.role}
                      onChange={(e) => changeRole(member, e.target.value as Role)}
                      className="h-9 w-auto"
                    >
                      {ALL_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Badge tone="violet">{ROLE_LABELS[member.role]}</Badge>
                  )}

                  {canManage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(member)}
                    >
                      {member.active ? "Deactivate" : "Activate"}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Permission preview */}
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <LuShield className="size-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Permission preview
            </h3>
          </div>
          <Select
            aria-label="Preview role"
            value={previewRole}
            onChange={(e) => setPreviewRole(e.target.value as Role)}
            className="mb-1"
          >
            {ALL_ROLES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </Select>
          <p className="mb-3 text-xs text-zinc-400">
            {ROLE_DESCRIPTIONS[previewRole]}
          </p>
          <ul className="grid grid-cols-1 gap-1">
            {ALL_PERMISSIONS.map((p) => {
              const on = granted.has(p);
              return (
                <li
                  key={p}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1 text-xs",
                    on
                      ? "text-zinc-700 dark:text-zinc-200"
                      : "text-zinc-300 dark:text-zinc-600"
                  )}
                >
                  <span className="font-mono">{p}</span>
                  {on ? (
                    <LuCheck className="size-3.5 text-emerald-500" />
                  ) : (
                    <span className="text-zinc-300 dark:text-zinc-700">—</span>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {data.length === 0 && !isLoading && (
        <div className="mt-4">
          <Card>
            <div className="flex items-center gap-2 p-6 text-sm text-zinc-400">
              <LuUsers className="size-4" />
              No team members.
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
