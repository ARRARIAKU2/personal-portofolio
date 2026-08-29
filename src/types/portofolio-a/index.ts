// Domain types for the Enterprise CRM (frontend-only simulation).

export type Role =
  | "super_admin"
  | "admin"
  | "sales_manager"
  | "sales_rep"
  | "support"
  | "finance"
  | "viewer";

export type Resource =
  | "leads"
  | "deals"
  | "contacts"
  | "tasks"
  | "users"
  | "audit"
  | "settings";

// Granular permission strings, e.g. "leads.create", "deals.move".
export type Permission =
  | "leads.read"
  | "leads.create"
  | "leads.update"
  | "leads.delete"
  | "deals.read"
  | "deals.create"
  | "deals.update"
  | "deals.move"
  | "deals.delete"
  | "contacts.read"
  | "contacts.update"
  | "tasks.read"
  | "tasks.create"
  | "tasks.update"
  | "tasks.delete"
  | "users.read"
  | "users.manage"
  | "audit.read"
  | "settings.manage";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarSeed: string;
}

// ---- CRM entities ----

export type LeadStatus = "new" | "contacted" | "qualified" | "unqualified";
export type LeadSource =
  | "website"
  | "referral"
  | "event"
  | "cold_outreach"
  | "partner"
  | "inbound_call";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  ownerId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export type DealStage =
  | "new"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Deal {
  id: string;
  title: string;
  company: string;
  stage: DealStage;
  value: number;
  probability: number; // 0..100
  ownerId: string;
  contactId?: string;
  expectedClose: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  tags: string[];
  notes: ContactNote[];
  ownerId: string;
  createdAt: string;
}

export interface ContactNote {
  id: string;
  body: string;
  authorName: string;
  createdAt: string;
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assigneeId: string;
  relatedTo?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  avatarSeed: string;
  joinedAt: string;
}

// ---- Audit ----

export type AuditAction =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "move_stage"
  | "role_change"
  | "export";

export type AuditEntity =
  | "session"
  | "lead"
  | "deal"
  | "contact"
  | "task"
  | "user"
  | "settings"
  | "audit";

export interface AuditLog {
  id: string;
  actorName: string;
  actorRole: Role;
  action: AuditAction;
  entityType: AuditEntity;
  entityId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  timestamp: string;
  requestId: string;
}

export interface OrgSettings {
  orgName: string;
  domain: string;
  industry: string;
  fiscalYearStart: string;
  density: "comfortable" | "compact";
}
