import { TEAM } from "@/mocks/portofolio-a/data";
import type { BadgeTone } from "@/components/portofolio-a/ui/Badge";
import type {
  DealStage,
  LeadSource,
  LeadStatus,
  TaskPriority,
  TaskStatus,
} from "@/types/portofolio-a";

export const LEAD_STATUS: Record<LeadStatus, { label: string; tone: BadgeTone }> = {
  new: { label: "New", tone: "sky" },
  contacted: { label: "Contacted", tone: "amber" },
  qualified: { label: "Qualified", tone: "emerald" },
  unqualified: { label: "Unqualified", tone: "rose" },
};

export const LEAD_SOURCE: Record<LeadSource, string> = {
  website: "Website",
  referral: "Referral",
  event: "Event",
  cold_outreach: "Cold Outreach",
  partner: "Partner",
  inbound_call: "Inbound Call",
};

export const DEAL_STAGES: DealStage[] = [
  "new",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

export const DEAL_STAGE: Record<DealStage, { label: string; tone: BadgeTone }> = {
  new: { label: "New", tone: "zinc" },
  qualified: { label: "Qualified", tone: "sky" },
  proposal: { label: "Proposal", tone: "violet" },
  negotiation: { label: "Negotiation", tone: "amber" },
  won: { label: "Won", tone: "emerald" },
  lost: { label: "Lost", tone: "rose" },
};

export const TASK_STATUS: Record<TaskStatus, { label: string; tone: BadgeTone }> = {
  todo: { label: "To do", tone: "zinc" },
  in_progress: { label: "In progress", tone: "sky" },
  done: { label: "Done", tone: "emerald" },
};

export const TASK_PRIORITY: Record<
  TaskPriority,
  { label: string; tone: BadgeTone }
> = {
  low: { label: "Low", tone: "zinc" },
  medium: { label: "Medium", tone: "sky" },
  high: { label: "High", tone: "amber" },
  urgent: { label: "Urgent", tone: "rose" },
};

const OWNER_NAMES = new Map(TEAM.map((m) => [m.id, m.name]));

export function ownerName(id: string): string {
  return OWNER_NAMES.get(id) ?? "Unassigned";
}

export const OWNER_OPTIONS = TEAM.filter((m) =>
  ["sales_manager", "sales_rep"].includes(m.role)
).map((m) => ({ id: m.id, name: m.name }));
