"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Field, Input, Select } from "@/components/portofolio-a/ui/Field";
import { TASK_PRIORITY, TASK_STATUS } from "@/features/portofolio-a/shared/labels";
import { TEAM } from "@/mocks/portofolio-a/data";
import { taskSchema, type TaskFormValues } from "./schema";

const ASSIGNEES = TEAM.filter((m) => m.active);

export function TaskForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel = "Save task",
}: {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
  submitting?: boolean;
  submitLabel?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "todo",
      priority: "medium",
      dueDate: "2026-09-15",
      assigneeId: ASSIGNEES[0]?.id,
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <Field
        label="Task"
        htmlFor="title"
        error={errors.title?.message}
        className="sm:col-span-2"
      >
        <Input id="title" {...register("title")} placeholder="Follow up on proposal" />
      </Field>
      <Field label="Status" htmlFor="status" error={errors.status?.message}>
        <Select id="status" {...register("status")}>
          {Object.entries(TASK_STATUS).map(([value, meta]) => (
            <option key={value} value={value}>
              {meta.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Priority" htmlFor="priority" error={errors.priority?.message}>
        <Select id="priority" {...register("priority")}>
          {Object.entries(TASK_PRIORITY).map(([value, meta]) => (
            <option key={value} value={value}>
              {meta.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Due date" htmlFor="dueDate" error={errors.dueDate?.message}>
        <Input id="dueDate" type="date" {...register("dueDate")} />
      </Field>
      <Field label="Assignee" htmlFor="assigneeId" error={errors.assigneeId?.message}>
        <Select id="assigneeId" {...register("assigneeId")}>
          {ASSIGNEES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Related to"
        htmlFor="relatedTo"
        error={errors.relatedTo?.message}
        className="sm:col-span-2"
        hint="Optional — a deal, account, or context."
      >
        <Input id="relatedTo" {...register("relatedTo")} />
      </Field>

      <div className="col-span-full mt-1 flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
