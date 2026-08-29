// Axios instance with a fully local mock adapter. No network calls leave the
// browser — the adapter routes REST-ish requests to the in-memory db. This lets
// the app use real Axios (interceptors, config, error shapes) against mock data.
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getDB, persist, type DBShape } from "@/stores/portofolio-a/db";
import { uid } from "@/lib/portofolio-a/id";
import type { AuditLog } from "@/types/portofolio-a";

const LATENCY_MS = 260;

type Collection = "leads" | "deals" | "contacts" | "tasks" | "users" | "audit";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

function ok<T>(config: InternalAxiosRequestConfig, data: T): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  };
}

function notFound(config: InternalAxiosRequestConfig): never {
  throw {
    response: { data: { message: "Not found" }, status: 404, config },
    message: "Request failed with status code 404",
    isAxiosError: true,
  };
}

function parseBody<T>(config: InternalAxiosRequestConfig): T {
  if (!config.data) return {} as T;
  return typeof config.data === "string"
    ? (JSON.parse(config.data) as T)
    : (config.data as T);
}

export const api = axios.create({ baseURL: "/mock" });

api.defaults.adapter = async (config) => {
  await delay(LATENCY_MS);
  const db = getDB();
  const url = (config.url ?? "").replace(/^\/+/, "");
  const method = (config.method ?? "get").toLowerCase();
  const [resource, id] = url.split("/");

  // Aggregated dashboard endpoint
  if (resource === "dashboard") {
    return ok(config, buildDashboard(db));
  }

  const list = db[resource as Collection] as unknown[] | undefined;
  if (!list) notFound(config);

  if (method === "get") {
    if (id) {
      const found = (list as { id: string }[]).find((r) => r.id === id);
      if (!found) notFound(config);
      return ok(config, found);
    }
    return ok(config, list);
  }

  if (method === "post") {
    const body = parseBody<Record<string, unknown>>(config);
    const record = { id: body.id ?? uid(resource.slice(0, 4)), ...body };
    (list as unknown[]).unshift(record);
    persist();
    return ok(config, record);
  }

  if (method === "patch" || method === "put") {
    const body = parseBody<Record<string, unknown>>(config);
    const idx = (list as { id: string }[]).findIndex((r) => r.id === id);
    if (idx === -1) notFound(config);
    const updated = { ...(list[idx] as object), ...body };
    (list as unknown[])[idx] = updated;
    persist();
    return ok(config, updated);
  }

  if (method === "delete") {
    const idx = (list as { id: string }[]).findIndex((r) => r.id === id);
    if (idx === -1) notFound(config);
    const [removed] = (list as unknown[]).splice(idx, 1);
    persist();
    return ok(config, removed);
  }

  notFound(config);
};

// Audit is append-only: no PATCH/DELETE handlers are exposed for it above,
// and the POST path simply unshifts. This helper keeps intent explicit.
export function appendAuditRecord(db: DBShape, entry: AuditLog): void {
  db.audit.unshift(entry);
  persist();
}

function buildDashboard(db: DBShape) {
  const activeStages = new Set(["new", "qualified", "proposal", "negotiation"]);
  const activeDeals = db.deals.filter((d) => activeStages.has(d.stage));
  const won = db.deals.filter((d) => d.stage === "won");
  const revenue = won.reduce((sum, d) => sum + d.value, 0);
  const qualified = db.leads.filter(
    (l) => l.status === "qualified"
  ).length;
  const conversion =
    db.leads.length === 0 ? 0 : (qualified / db.leads.length) * 100;

  const byStage = ["new", "qualified", "proposal", "negotiation", "won", "lost"].map(
    (stage) => ({
      stage,
      count: db.deals.filter((d) => d.stage === stage).length,
      value: db.deals
        .filter((d) => d.stage === stage)
        .reduce((s, d) => s + d.value, 0),
    })
  );

  // Deterministic 8-month trend derived from the dataset (no random noise).
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const trend = months.map((m, i) => ({
    month: m,
    revenue: Math.round(revenue * (0.35 + i * 0.09)),
    leads: 12 + i * 3 + (i % 2 === 0 ? 4 : 0),
  }));

  return {
    kpis: {
      leads: db.leads.length,
      activeDeals: activeDeals.length,
      revenue,
      conversion: Math.round(conversion * 10) / 10,
    },
    byStage,
    trend,
  };
}

export type DashboardData = ReturnType<typeof buildDashboard>;
