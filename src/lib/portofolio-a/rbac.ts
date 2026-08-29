// Frontend RBAC simulation: role -> permission matrix + checker utilities.
import type { Permission, Resource, Role } from "@/types/portofolio-a";

export const ALL_PERMISSIONS: Permission[] = [
  "leads.read",
  "leads.create",
  "leads.update",
  "leads.delete",
  "deals.read",
  "deals.create",
  "deals.update",
  "deals.move",
  "deals.delete",
  "contacts.read",
  "contacts.update",
  "tasks.read",
  "tasks.create",
  "tasks.update",
  "tasks.delete",
  "users.read",
  "users.manage",
  "audit.read",
  "settings.manage",
];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  sales_manager: "Sales Manager",
  sales_rep: "Sales Rep",
  support: "Support",
  finance: "Finance",
  viewer: "Viewer",
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  super_admin: "Unrestricted access across every resource and action.",
  admin: "Manage the workspace, users and settings; full CRM operations.",
  sales_manager: "Run the sales floor: full leads, deals, contacts, tasks.",
  sales_rep: "Work assigned pipeline; create and update, no destructive ops.",
  support: "Read the book of business and manage tasks & contact updates.",
  finance: "Read pipeline and revenue; export the audit trail.",
  viewer: "Read-only visibility into leads, deals and contacts.",
};

// Every entry is explicit — no wildcards other than super_admin.
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [...ALL_PERMISSIONS],
  admin: [
    "leads.read",
    "leads.create",
    "leads.update",
    "leads.delete",
    "deals.read",
    "deals.create",
    "deals.update",
    "deals.move",
    "deals.delete",
    "contacts.read",
    "contacts.update",
    "tasks.read",
    "tasks.create",
    "tasks.update",
    "tasks.delete",
    "users.read",
    "users.manage",
    "audit.read",
    "settings.manage",
  ],
  sales_manager: [
    "leads.read",
    "leads.create",
    "leads.update",
    "leads.delete",
    "deals.read",
    "deals.create",
    "deals.update",
    "deals.move",
    "deals.delete",
    "contacts.read",
    "contacts.update",
    "tasks.read",
    "tasks.create",
    "tasks.update",
    "tasks.delete",
    "users.read",
    "audit.read",
  ],
  sales_rep: [
    "leads.read",
    "leads.create",
    "leads.update",
    "deals.read",
    "deals.create",
    "deals.update",
    "deals.move",
    "contacts.read",
    "contacts.update",
    "tasks.read",
    "tasks.create",
    "tasks.update",
  ],
  support: [
    "leads.read",
    "deals.read",
    "contacts.read",
    "contacts.update",
    "tasks.read",
    "tasks.create",
    "tasks.update",
  ],
  finance: [
    "leads.read",
    "deals.read",
    "contacts.read",
    "audit.read",
  ],
  viewer: ["leads.read", "deals.read", "contacts.read", "tasks.read"],
};

/** Core permission checker. Kept pure for unit testing. */
export function hasPermission(
  role: Role | undefined | null,
  permission: Permission
): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/** True if the role holds every listed permission. */
export function hasAll(role: Role | undefined | null, perms: Permission[]): boolean {
  return perms.every((p) => hasPermission(role, p));
}

/** True if the role holds at least one of the listed permissions. */
export function hasAny(role: Role | undefined | null, perms: Permission[]): boolean {
  return perms.some((p) => hasPermission(role, p));
}

/** Can the role read a whole resource (used for route/nav guards). */
export function canAccessResource(
  role: Role | undefined | null,
  resource: Resource
): boolean {
  const readPerm = `${resource}.read` as Permission;
  if (resource === "users") return hasAny(role, ["users.read", "users.manage"]);
  if (resource === "settings") return hasPermission(role, "settings.manage");
  return hasPermission(role, readPerm);
}

export const ALL_ROLES: Role[] = [
  "super_admin",
  "admin",
  "sales_manager",
  "sales_rep",
  "support",
  "finance",
  "viewer",
];
