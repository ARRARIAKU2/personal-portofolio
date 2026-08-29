// Realistic mock dataset for the CRM demo. All data is local and static;
// runtime mutations live in the stores (optionally persisted to localStorage).
import type {
  Contact,
  Deal,
  Lead,
  Task,
  TeamMember,
} from "@/types/portofolio-a";

export const TEAM: TeamMember[] = [
  {
    id: "usr_priya",
    name: "Priya Raghunathan",
    email: "priya.r@harborfinch.co",
    role: "super_admin",
    active: true,
    avatarSeed: "priya-r",
    joinedAt: "2023-02-11",
  },
  {
    id: "usr_declan",
    name: "Declan Whitmore",
    email: "declan.w@harborfinch.co",
    role: "admin",
    active: true,
    avatarSeed: "declan-w",
    joinedAt: "2023-05-19",
  },
  {
    id: "usr_soraya",
    name: "Soraya Benali",
    email: "soraya.b@harborfinch.co",
    role: "sales_manager",
    active: true,
    avatarSeed: "soraya-b",
    joinedAt: "2023-08-02",
  },
  {
    id: "usr_mateo",
    name: "Mateo Villanueva",
    email: "mateo.v@harborfinch.co",
    role: "sales_rep",
    active: true,
    avatarSeed: "mateo-v",
    joinedAt: "2024-01-15",
  },
  {
    id: "usr_ingrid",
    name: "Ingrid Solheim",
    email: "ingrid.s@harborfinch.co",
    role: "sales_rep",
    active: true,
    avatarSeed: "ingrid-s",
    joinedAt: "2024-03-27",
  },
  {
    id: "usr_tomas",
    name: "Tomás Okafor",
    email: "tomas.o@harborfinch.co",
    role: "support",
    active: true,
    avatarSeed: "tomas-o",
    joinedAt: "2024-06-04",
  },
  {
    id: "usr_nadia",
    name: "Nadia Hoffmann",
    email: "nadia.h@harborfinch.co",
    role: "finance",
    active: true,
    avatarSeed: "nadia-h",
    joinedAt: "2024-09-10",
  },
  {
    id: "usr_yuki",
    name: "Yuki Tanabe",
    email: "yuki.t@harborfinch.co",
    role: "viewer",
    active: false,
    avatarSeed: "yuki-t",
    joinedAt: "2025-02-21",
  },
];

const OWNERS = ["usr_soraya", "usr_mateo", "usr_ingrid"];

export const LEADS: Lead[] = [
  ["Rafael Costa-Marín", "Meridian Freight", "website", "qualified", 48200],
  ["Amara Delacroix", "Solstice Labs", "referral", "contacted", 91500],
  ["Bjorn Alvarsson", "Cobalt Ledger", "event", "new", 27400],
  ["Leila Farrokhzad", "Northwind Robotics", "partner", "qualified", 134900],
  ["Chidi Nwosu", "Verdant Grid", "inbound_call", "contacted", 62300],
  ["Elena Vasquez-Reid", "Atlas Provisions", "website", "new", 18750],
  ["Kenji Arroyo", "Kestrel Analytics", "cold_outreach", "unqualified", 9200],
  ["Ingrid Solheim", "Brightline Health", "referral", "qualified", 205600],
  ["Tomás Okafor", "Ironvale Manufacturing", "event", "contacted", 77800],
  ["Nadia Hoffmann", "Palisade Capital", "partner", "qualified", 152300],
  ["Soraya Benali", "Tanager Studios", "website", "new", 33100],
  ["Declan Whitmore", "Drayton Logistics", "inbound_call", "contacted", 58900],
  ["Marlowe Kord", "Marlowe & Kord", "referral", "qualified", 112400],
  ["Sable Ines", "Sable Interiors", "cold_outreach", "unqualified", 14600],
  ["Quillon Reyes", "Quillon Systems", "event", "new", 41200],
  ["Verano Diaz", "Verano Foods", "website", "contacted", 69700],
  ["Halcyon Mercer", "Halcyon Aero", "partner", "qualified", 187300],
  ["Rincon Adeyemi", "Rincon Biotics", "inbound_call", "new", 24800],
  ["Foundry Lindqvist", "Foundry Nine", "referral", "contacted", 95100],
  ["Priya Nair", "Lumen Cargo", "website", "qualified", 73400],
  ["Oskar Petrov", "Petrichor Media", "event", "new", 30500],
  ["Yara Mansour", "Cinder & Vale", "cold_outreach", "unqualified", 11900],
  ["Dario Fontaine", "Ostara Retail", "partner", "qualified", 128700],
  ["Hana Kowalski", "Basalt Energy", "inbound_call", "contacted", 84600],
].map(([name, company, source, status, value], i) => {
  const created = `2026-0${(i % 8) + 1}-${String((i % 27) + 1).padStart(2, "0")}`;
  return {
    id: `lead_${String(i + 1).padStart(3, "0")}`,
    name: name as string,
    company: company as string,
    email: `${(name as string).toLowerCase().replace(/[^a-z]+/g, ".")}@${(
      company as string
    )
      .toLowerCase()
      .replace(/[^a-z]+/g, "")}.com`,
    phone: `+1 (${312 + (i % 40)}) ${String(200 + i)}-${String(1000 + i * 7).slice(
      0,
      4
    )}`,
    status: status as Lead["status"],
    source: source as Lead["source"],
    ownerId: OWNERS[i % OWNERS.length],
    value: value as number,
    createdAt: created,
    updatedAt: created,
  } satisfies Lead;
});

export const DEALS: Deal[] = [
  ["Meridian Freight — Fleet Rollout", "Meridian Freight", "proposal", 148000, 60],
  ["Solstice Labs — Platform License", "Solstice Labs", "negotiation", 232000, 75],
  ["Northwind Robotics — Q3 Expansion", "Northwind Robotics", "qualified", 89000, 40],
  ["Brightline Health — Enterprise Tier", "Brightline Health", "won", 305000, 100],
  ["Palisade Capital — Advisory Suite", "Palisade Capital", "proposal", 176000, 55],
  ["Kestrel Analytics — Pilot", "Kestrel Analytics", "new", 42000, 20],
  ["Halcyon Aero — Multi-year", "Halcyon Aero", "negotiation", 418000, 70],
  ["Drayton Logistics — Renewal", "Drayton Logistics", "qualified", 96500, 45],
  ["Ironvale Manufacturing — Add-on", "Ironvale Manufacturing", "lost", 61000, 0],
  ["Verdant Grid — Integration", "Verdant Grid", "proposal", 118000, 60],
  ["Atlas Provisions — Starter", "Atlas Provisions", "new", 28500, 15],
  ["Marlowe & Kord — Full Suite", "Marlowe & Kord", "won", 214000, 100],
  ["Foundry Nine — Team Plan", "Foundry Nine", "qualified", 74000, 35],
  ["Cobalt Ledger — Compliance Pack", "Cobalt Ledger", "negotiation", 133000, 65],
  ["Verano Foods — Regional", "Verano Foods", "new", 52000, 25],
  ["Basalt Energy — Grid Contract", "Basalt Energy", "proposal", 289000, 50],
  ["Ostara Retail — Seasonal", "Ostara Retail", "qualified", 67500, 40],
  ["Rincon Biotics — Research Tier", "Rincon Biotics", "lost", 45000, 0],
].map(([title, company, stage, value, probability], i) => {
  const created = `2026-0${(i % 7) + 1}-${String((i % 25) + 3).padStart(2, "0")}`;
  return {
    id: `deal_${String(i + 1).padStart(3, "0")}`,
    title: title as string,
    company: company as string,
    stage: stage as Deal["stage"],
    value: value as number,
    probability: probability as number,
    ownerId: OWNERS[i % OWNERS.length],
    contactId: `cont_${String((i % 20) + 1).padStart(3, "0")}`,
    expectedClose: `2026-${String(((i % 6) + 7)).padStart(2, "0")}-${String(
      (i % 27) + 1
    ).padStart(2, "0")}`,
    createdAt: created,
    updatedAt: created,
  } satisfies Deal;
});

const CONTACT_TAGS = [
  ["decision-maker", "enterprise"],
  ["champion"],
  ["technical", "influencer"],
  ["procurement"],
  ["executive", "vip"],
  ["blocker"],
  ["evaluator", "technical"],
  ["billing"],
];

export const CONTACTS: Contact[] = [
  ["Rafael Costa-Marín", "VP Operations", "Meridian Freight"],
  ["Amara Delacroix", "Head of Data", "Solstice Labs"],
  ["Leila Farrokhzad", "CTO", "Northwind Robotics"],
  ["Chidi Nwosu", "Director of IT", "Verdant Grid"],
  ["Elena Vasquez-Reid", "Procurement Lead", "Atlas Provisions"],
  ["Halcyon Mercer", "COO", "Halcyon Aero"],
  ["Dario Fontaine", "VP Retail", "Ostara Retail"],
  ["Hana Kowalski", "Grid Architect", "Basalt Energy"],
  ["Marlowe Kord", "Managing Partner", "Marlowe & Kord"],
  ["Foundry Lindqvist", "Engineering Lead", "Foundry Nine"],
  ["Verano Diaz", "Regional Manager", "Verano Foods"],
  ["Rincon Adeyemi", "Research Director", "Rincon Biotics"],
  ["Oskar Petrov", "Head of Growth", "Petrichor Media"],
  ["Priya Nair", "Logistics Lead", "Lumen Cargo"],
  ["Quillon Reyes", "Platform Owner", "Quillon Systems"],
  ["Sable Ines", "Creative Director", "Sable Interiors"],
  ["Bjorn Alvarsson", "Finance Controller", "Cobalt Ledger"],
  ["Kenji Arroyo", "Analytics Manager", "Kestrel Analytics"],
  ["Nadia Osei", "Portfolio Manager", "Palisade Capital"],
  ["Tomás Herrera", "Plant Manager", "Ironvale Manufacturing"],
].map(([name, title, company], i) => {
  const created = `2026-0${(i % 6) + 1}-${String((i % 26) + 2).padStart(2, "0")}`;
  return {
    id: `cont_${String(i + 1).padStart(3, "0")}`,
    name: name as string,
    title: title as string,
    company: company as string,
    email: `${(name as string).toLowerCase().replace(/[^a-z]+/g, ".")}@${(
      company as string
    )
      .toLowerCase()
      .replace(/[^a-z]+/g, "")}.com`,
    phone: `+1 (${212 + (i % 60)}) ${String(300 + i)}-${String(2000 + i * 11).slice(
      0,
      4
    )}`,
    tags: CONTACT_TAGS[i % CONTACT_TAGS.length],
    notes:
      i % 3 === 0
        ? [
            {
              id: `note_${i}_1`,
              body: "Prefers async updates; loops in procurement before sign-off.",
              authorName: "Soraya Benali",
              createdAt: created,
            },
          ]
        : [],
    ownerId: OWNERS[i % OWNERS.length],
    createdAt: created,
  } satisfies Contact;
});

export const TASKS: Task[] = [
  ["Send revised proposal to Meridian Freight", "in_progress", "high", 2],
  ["Follow up with Solstice Labs procurement", "todo", "urgent", 1],
  ["Prep security questionnaire — Brightline Health", "todo", "high", 4],
  ["Schedule technical demo for Northwind Robotics", "in_progress", "medium", 3],
  ["Renewal call with Drayton Logistics", "todo", "medium", 6],
  ["Draft ROI deck for Palisade Capital", "done", "high", -2],
  ["Loop in legal on Halcyon Aero MSA", "in_progress", "urgent", 1],
  ["Qualify inbound from Verano Foods", "todo", "low", 8],
  ["Update contact records — Q2 cleanup", "done", "low", -5],
  ["Confirm pricing tier with Cobalt Ledger", "todo", "medium", 5],
  ["Handoff Ironvale account to support", "done", "medium", -1],
  ["Book discovery with Basalt Energy", "todo", "high", 2],
  ["Recap notes from Ostara Retail sync", "in_progress", "low", 3],
  ["Send NDA to Rincon Biotics", "todo", "medium", 7],
  ["Refresh pipeline forecast for leadership", "in_progress", "high", 1],
  ["Archive lost deal — Kestrel pilot", "todo", "low", 9],
].map(([title, status, priority, offset], i) => {
  const base = new Date("2026-08-29");
  const due = new Date(base);
  due.setDate(base.getDate() + (offset as number));
  return {
    id: `task_${String(i + 1).padStart(3, "0")}`,
    title: title as string,
    status: status as Task["status"],
    priority: priority as Task["priority"],
    dueDate: due.toISOString().slice(0, 10),
    assigneeId: OWNERS[i % OWNERS.length],
    createdAt: "2026-08-20",
  } satisfies Task;
});
