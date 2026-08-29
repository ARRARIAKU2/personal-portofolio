import type { IconType } from "react-icons";
import {
  LuLayoutDashboard,
  LuUserPlus,
  LuKanban,
  LuContact,
  LuListChecks,
  LuUsers,
  LuScrollText,
  LuSettings,
} from "react-icons/lu";
import type { Resource } from "@/types/portofolio-a";

export interface NavItem {
  href: string;
  label: string;
  icon: IconType;
  resource?: Resource; // undefined = any authenticated user
}

const BASE = "/portofolio-a";

export const NAV_ITEMS: NavItem[] = [
  { href: `${BASE}/dashboard`, label: "Overview", icon: LuLayoutDashboard },
  { href: `${BASE}/leads`, label: "Leads", icon: LuUserPlus, resource: "leads" },
  { href: `${BASE}/deals`, label: "Deals", icon: LuKanban, resource: "deals" },
  {
    href: `${BASE}/contacts`,
    label: "Contacts",
    icon: LuContact,
    resource: "contacts",
  },
  { href: `${BASE}/tasks`, label: "Tasks", icon: LuListChecks, resource: "tasks" },
  { href: `${BASE}/team`, label: "Team & Roles", icon: LuUsers, resource: "users" },
  {
    href: `${BASE}/audit`,
    label: "Audit Log",
    icon: LuScrollText,
    resource: "audit",
  },
  {
    href: `${BASE}/settings`,
    label: "Settings",
    icon: LuSettings,
    resource: "settings",
  },
];
