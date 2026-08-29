"use client";
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { LuPencil, LuPlus, LuTrash2, LuUserPlus } from "react-icons/lu";
import { useCollection, useCrmMutations } from "@/hooks/portofolio-a/use-crm";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { Can } from "@/features/portofolio-a/auth/guards";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Badge } from "@/components/portofolio-a/ui/Badge";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Modal } from "@/components/portofolio-a/ui/Modal";
import { DataTable } from "@/components/portofolio-a/ui/DataTable";
import { EmptyState } from "@/components/portofolio-a/ui/EmptyState";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import {
  LEAD_SOURCE,
  LEAD_STATUS,
  ownerName,
} from "@/features/portofolio-a/shared/labels";
import { formatCurrency } from "@/lib/portofolio-a/format";
import { LeadForm } from "./LeadForm";
import type { LeadFormValues } from "./schema";
import type { Lead } from "@/types/portofolio-a";

const col = createColumnHelper<Lead>();

export function LeadsView() {
  const { notify } = useToast();
  const { data = [], isLoading } = useCollection<Lead>("leads");
  const { create, update, remove } = useCrmMutations<Lead>({
    resource: "leads",
    entityType: "lead",
  });

  const [editing, setEditing] = useState<Lead | "new" | null>(null);
  const [deleting, setDeleting] = useState<Lead | null>(null);

  const columns = useMemo(
    () => [
      col.accessor("name", {
        header: "Lead",
        cell: (c) => (
          <div className="flex items-center gap-2.5">
            <Avatar name={c.getValue()} size="sm" />
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                {c.getValue()}
              </div>
              <div className="text-xs text-zinc-400">{c.row.original.company}</div>
            </div>
          </div>
        ),
      }),
      col.accessor("email", { header: "Email" }),
      col.accessor("status", {
        header: "Status",
        cell: (c) => {
          const meta = LEAD_STATUS[c.getValue()];
          return <Badge tone={meta.tone}>{meta.label}</Badge>;
        },
      }),
      col.accessor("source", {
        header: "Source",
        cell: (c) => (
          <span className="text-zinc-500 dark:text-zinc-400">
            {LEAD_SOURCE[c.getValue()]}
          </span>
        ),
      }),
      col.accessor("ownerId", {
        header: "Owner",
        cell: (c) => (
          <span className="text-zinc-600 dark:text-zinc-300">
            {ownerName(c.getValue())}
          </span>
        ),
      }),
      col.accessor("value", {
        header: "Value",
        cell: (c) => (
          <span className="font-mono text-zinc-700 dark:text-zinc-200">
            {formatCurrency(c.getValue())}
          </span>
        ),
      }),
      col.display({
        id: "actions",
        header: "",
        enableHiding: false,
        cell: (c) => (
          <div className="flex items-center justify-end gap-1">
            <Can permission="leads.update">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit lead"
                onClick={() => setEditing(c.row.original)}
              >
                <LuPencil className="size-4" />
              </Button>
            </Can>
            <Can permission="leads.delete">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete lead"
                onClick={() => setDeleting(c.row.original)}
              >
                <LuTrash2 className="size-4 text-rose-500" />
              </Button>
            </Can>
          </div>
        ),
      }),
    ],
    []
  );

  function handleSubmit(values: LeadFormValues) {
    const now = new Date().toISOString();
    if (editing === "new") {
      create.mutate(
        { ...values, createdAt: now, updatedAt: now } as Omit<Lead, "id">,
        {
          onSuccess: () => {
            notify("Lead created");
            setEditing(null);
          },
        }
      );
    } else if (editing) {
      update.mutate(
        {
          id: editing.id,
          patch: { ...values, updatedAt: now },
          before: editing as unknown as Record<string, unknown>,
        },
        {
          onSuccess: () => {
            notify("Lead updated");
            setEditing(null);
          },
        }
      );
    }
  }

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle={`${data.length} leads in the book of business`}
        actions={
          <Can permission="leads.create">
            <Button onClick={() => setEditing("new")}>
              <LuPlus className="size-4" />
              Add lead
            </Button>
          </Can>
        }
      />

      <Card className="overflow-hidden">
        <DataTable
          data={data}
          columns={columns}
          loading={isLoading}
          searchPlaceholder="Search leads, companies, emails…"
          empty={
            <EmptyState
              icon={LuUserPlus}
              title="No leads yet"
              description="Capture your first lead to start building the pipeline."
              action={
                <Can permission="leads.create">
                  <Button onClick={() => setEditing("new")}>
                    <LuPlus className="size-4" />
                    Add lead
                  </Button>
                </Can>
              }
            />
          }
        />
      </Card>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? "Add lead" : "Edit lead"}
        description="Leads feed the top of your pipeline."
        size="lg"
      >
        <LeadForm
          defaultValues={
            editing && editing !== "new"
              ? {
                  name: editing.name,
                  company: editing.company,
                  email: editing.email,
                  phone: editing.phone,
                  status: editing.status,
                  source: editing.source,
                  ownerId: editing.ownerId,
                  value: editing.value,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
          submitting={create.isPending || update.isPending}
          submitLabel={editing === "new" ? "Create lead" : "Save changes"}
        />
      </Modal>

      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title="Delete lead"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={remove.isPending}
              onClick={() => {
                if (!deleting) return;
                remove.mutate(
                  {
                    id: deleting.id,
                    before: deleting as unknown as Record<string, unknown>,
                  },
                  {
                    onSuccess: () => {
                      notify("Lead deleted", "info");
                      setDeleting(null);
                    },
                  }
                );
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Delete <span className="font-medium">{deleting?.name}</span> from{" "}
          {deleting?.company}? This action is recorded in the audit log.
        </p>
      </Modal>
    </div>
  );
}
