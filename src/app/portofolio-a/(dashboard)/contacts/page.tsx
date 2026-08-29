import { RouteGuard } from "@/features/portofolio-a/auth/guards";
import { ContactsView } from "@/features/portofolio-a/contacts/ContactsView";

export default function ContactsPage() {
  return (
    <RouteGuard resource="contacts">
      <ContactsView />
    </RouteGuard>
  );
}
