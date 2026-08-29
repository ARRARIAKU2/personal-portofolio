"use client";
import { useMemo, useState } from "react";
import { LuListChecks, LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { useCollection, useCrmMutations } from "@/hooks/portofolio-a/use-crm";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { Can } from "@/features/portofolio-a/auth/guards";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Badge } from "@/components/portofolio-a/ui/Badge";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Modal } from "@/components/portofolio-a/ui/Modal";
import { EmptyState } from "@/components/portofolio-a/ui/EmptyState";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { Select } from "@/components/portofolio-a/ui/Field";
import { TableSkeleton } from "@/components/portofolio-a/ui/Skeleton";
import {
  TASK_PRIORITY,
  TASK_STATUS,
  ownerName,
} from "@/features/portofolio-a/shared/labels";
import { formatDate } from "@/lib/portofolio-a/format";
import { cn } from "@/lib/portofolio-a/cn";
import { TaskForm } from "./TaskForm";
import type { TaskFormValues } from "./schema";
import type { Task, TaskStatus } from "@/types/portofolio-a";

const TODAY = "2026-08-29";

export function TasksView() {
  const { notify } = useToast();
  const { can } = usePermission();
  const { data = [], isLoading } = useCollection<Task>("tasks");
  const { create, update, remove } = useCrmMutations<Task>({
    resource: "tasks",
    entityType: "task",
  });

  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [editing, setEditing] = useState<Task | "new" | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);

  const canUpdate = can("tasks.update");

  const filtered = useMemo(
    () =>
      data
        .filter((t) => statusFilter === "all" || t.status === statusFilter)
        .filter((t) => priorityFilter === "all" || t.priority === priorityFilter)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [data, statusFilter, priorityFilter]
  );

  function quickStatus(task: Task, status: TaskStatus) {
    update.mutate(
      {
        id: task.id,
        patch: { status },
        before: task as unknown as Record<string, unknown>,
      },
      { onSuccess: () => notify(`Marked ${TASK_STATUS[status].label}`, "info") }
    );
  }

  function handleSubmit(values: TaskFormValues) {
    const now = new Date().toISOString();
    if (editing === "new") {
      create.mutate({ ...values, createdAt: now } as Omit<Task, "id">, {
        onSuccess: () => {
          notify("Task created");
          setEditing(null);
        },
      });
    } else if (editing) {
      update.mutate(
        {
          id: editing.id,
          patch: values,
          before: editing as unknown as Record<string, unknown>,
        },
        {
          onSuccess: () => {
            notify("Task updated");
            setEditing(null);
          },
        }
      );
    }
  }

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle={`${data.length} tasks on the board`}
        actions={
          <Can permission="tasks.create">
            <Button onClick={() => setEditing("new")}>
              <LuPlus className="size-4" />
              New task
            </Button>
          </Can>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <Select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "all")}
          className="h-9 w-auto"
        >
          <option value="all">All statuses</option>
          {Object.entries(TASK_STATUS).map(([v, m]) => (
            <option key={v} value={v}>
              {m.label}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="h-9 w-auto"
        >
          <option value="all">All priorities</option>
          {Object.entries(TASK_PRIORITY).map(([v, m]) => (
            <option key={v} value={v}>
              {m.label}
            </option>
          ))}
        </Select>
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton rows={6} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={LuListChecks}
            title="Nothing here"
            description="No tasks match the current filters."
          />
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filtered.map((task) => {
              const overdue = task.status !== "done" && task.dueDate < TODAY;
              const prio = TASK_PRIORITY[task.priority];
              return (
                <li
                  key={task.id}
                  className="flex flex-wrap items-center gap-3 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate text-sm font-medium text-zinc-900 dark:text-zinc-100",
                        task.status === "done" &&
                          "text-zinc-400 line-through dark:text-zinc-500"
                      )}
                    >
                      {task.title}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {task.relatedTo ?? "General"} ·{" "}
                      <span className={cn(overdue && "font-medium text-rose-500")}>
                        Due {formatDate(task.dueDate)}
                      </span>
                    </p>
                  </div>

                  <Badge tone={prio.tone}>{prio.label}</Badge>

                  <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Avatar name={ownerName(task.assigneeId)} size="sm" />
                    <span className="hidden sm:inline">
                      {ownerName(task.assigneeId)}
                    </span>
                  </span>

                  {canUpdate ? (
                    <Select
                      aria-label="Task status"
                      value={task.status}
                      onChange={(e) =>
                        quickStatus(task, e.target.value as TaskStatus)
                      }
                      className="h-8 w-auto text-xs"
                    >
                      {Object.entries(TASK_STATUS).map(([v, m]) => (
                        <option key={v} value={v}>
                          {m.label}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Badge tone={TASK_STATUS[task.status].tone}>
                      {TASK_STATUS[task.status].label}
                    </Badge>
                  )}

                  <div className="flex items-center">
                    <Can permission="tasks.update">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit task"
                        onClick={() => setEditing(task)}
                      >
                        <LuPencil className="size-4" />
                      </Button>
                    </Can>
                    <Can permission="tasks.delete">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete task"
                        onClick={() => setDeleting(task)}
                      >
                        <LuTrash2 className="size-4 text-rose-500" />
                      </Button>
                    </Can>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? "New task" : "Edit task"}
        size="lg"
      >
        <TaskForm
          defaultValues={
            editing && editing !== "new"
              ? {
                  title: editing.title,
                  status: editing.status,
                  priority: editing.priority,
                  dueDate: editing.dueDate,
                  assigneeId: editing.assigneeId,
                  relatedTo: editing.relatedTo,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
          submitting={create.isPending || update.isPending}
          submitLabel={editing === "new" ? "Create task" : "Save changes"}
        />
      </Modal>

      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title="Delete task"
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
                      notify("Task deleted", "info");
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
          Delete <span className="font-medium">{deleting?.title}</span>? This is
          recorded in the audit log.
        </p>
      </Modal>
    </div>
  );
}
