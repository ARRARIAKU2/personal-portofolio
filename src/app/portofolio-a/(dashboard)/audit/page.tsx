import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { AuditView } from "@/features/portofolio-a/audit/AuditView";

export default function AuditPage() {
  return (
    <RouteGuard resource="audit">
      <AuditView />
    </RouteGuard>
  );
}
