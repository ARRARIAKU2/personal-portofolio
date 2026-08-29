"use client";
import { AppShell } from "@/components/portofolio-a/layout/AppShell";
import { RouteGuard } from "@/features/portofolio-a/auth/guards";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <AppShell>{children}</AppShell>
    </RouteGuard>
  );
}
