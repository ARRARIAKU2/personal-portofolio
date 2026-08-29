import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { DealsView } from "@/features/portofolio-a/deals/DealsView";

export default function DealsPage() {
  return (
    <RouteGuard resource="deals">
      <DealsView />
    </RouteGuard>
  );
}
