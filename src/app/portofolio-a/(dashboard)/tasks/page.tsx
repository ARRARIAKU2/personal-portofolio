import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { TasksView } from "@/features/portofolio-a/tasks/TasksView";

export default function TasksPage() {
  return (
    <RouteGuard resource="tasks">
      <TasksView />
    </RouteGuard>
  );
}
