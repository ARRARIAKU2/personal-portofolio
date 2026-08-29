// In-memory backing "database" for the CRM, seeded from mocks and optionally
// persisted to localStorage. This is the source of truth the mock axios adapter
// reads/writes; TanStack Query sits on top as the cache layer.
import {
  CONTACTS,
  DEALS,
  LEADS,
  TASKS,
  TEAM,
} from "@/mocks/portofolio-a/data";
import type {
  AuditLog,
  Contact,
  Deal,
  Lead,
  OrgSettings,
  Task,
  TeamMember,
} from "@/types/portofolio-a";

const STORAGE_KEY = "crm:db:v1";
const isBrowser = typeof window !== "undefined";

export interface DBShape {
  leads: Lead[];
  deals: Deal[];
  contacts: Contact[];
  tasks: Task[];
  users: TeamMember[];
  audit: AuditLog[];
  settings: OrgSettings;
}

function seed(): DBShape {
  return {
    leads: structuredClone(LEADS),
    deals: structuredClone(DEALS),
    contacts: structuredClone(CONTACTS),
    tasks: structuredClone(TASKS),
    users: structuredClone(TEAM),
    audit: [],
    settings: {
      orgName: "Harbor & Finch",
      domain: "harborfinch.co",
      industry: "B2B SaaS",
      fiscalYearStart: "2026-01-01",
      density: "comfortable",
    },
  };
}

let db: DBShape | null = null;

export function getDB(): DBShape {
  if (db) return db;
  if (isBrowser) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        db = JSON.parse(raw) as DBShape;
        return db;
      }
    } catch {
      // corrupt storage — fall through to seed
    }
  }
  db = seed();
  persist();
  return db;
}

export function persist(): void {
  if (!isBrowser || !db) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // storage full / unavailable — keep running in-memory
  }
}

export function resetDB(): void {
  db = seed();
  persist();
}
