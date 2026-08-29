import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { SettingsView } from "@/features/portofolio-a/settings/SettingsView";

export default function SettingsPage() {
  return (
    <RouteGuard resource="settings">
      <SettingsView />
    </RouteGuard>
  );
}
