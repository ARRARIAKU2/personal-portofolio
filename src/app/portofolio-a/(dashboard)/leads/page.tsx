import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { LeadsView } from "@/features/portofolio-a/leads/LeadsView";

export default function LeadsPage() {
  return (
    <RouteGuard resource="leads">
      <LeadsView />
    </RouteGuard>
  );
}
