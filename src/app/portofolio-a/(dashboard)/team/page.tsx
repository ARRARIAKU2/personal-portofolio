import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { TeamView } from "@/features/portofolio-a/team/TeamView";

export default function TeamPage() {
  return (
    <RouteGuard resource="users">
      <TeamView />
    </RouteGuard>
  );
}
