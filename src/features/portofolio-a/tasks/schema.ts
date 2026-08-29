import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title is required"),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().min(1, "Pick a due date"),
  assigneeId: z.string().min(1, "Assign someone"),
  relatedTo: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
