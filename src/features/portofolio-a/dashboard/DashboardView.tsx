"use client";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  LuUserPlus,
  LuKanban,
  LuDollarSign,
  LuTrendingUp,
  LuActivity,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { useDashboard, useCollection } from "@/hooks/portofolio-a/use-crm";
import { useAuth } from "@/stores/portofolio-a/auth-context";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Skeleton } from "@/components/portofolio-a/ui/Skeleton";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Avatar } from "@/components/portofolio-a/ui/Avatar";
import { DEAL_STAGE } from "@/features/portofolio-a/shared/labels";
import { formatCompactCurrency, relativeDay } from "@/lib/portofolio-a/format";
import type { AuditLog, DealStage } from "@/types/portofolio-a";

// Heavy Recharts leaf is code-split and client-only.
const RevenueChart = dynamic(
  () => import("./RevenueChart").then((m) => m.RevenueChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[260px] w-full" />,
  }
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
};

interface Kpi {
  label: string;
  icon: IconType;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  hint: string;
}

export function DashboardView() {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();
  const { data: audit } = useCollection<AuditLog>("audit");

  const kpis: Kpi[] = data
    ? [
        {
          label: "Total Leads",
          icon: LuUserPlus,
          value: data.kpis.leads,
          hint: "across all sources",
        },
        {
          label: "Active Deals",
          icon: LuKanban,
          value: data.kpis.activeDeals,
          hint: "in open pipeline stages",
        },
        {
          label: "Revenue Won",
          icon: LuDollarSign,
          value: data.kpis.revenue,
          prefix: "$",
          hint: "closed-won total",
        },
        {
          label: "Conversion",
          icon: LuTrendingUp,
          value: data.kpis.conversion,
          suffix: "%",
          decimals: 1,
          hint: "leads → qualified",
        },
      ]
    : [];

  const maxStageValue = data
    ? Math.max(...data.byStage.map((s) => s.value), 1)
    : 1;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name.split(" ")[0] ?? ""}`}
        subtitle="Here's how the revenue floor is tracking today."
      />

      {/* KPI row — bordered surfaces, tinted icon chips */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {isLoading || !data
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[116px] rounded-2xl" />
            ))
          : kpis.map((k) => (
              <motion.div key={k.label} variants={item}>
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {k.label}
                    </span>
                    <span className="inline-flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <k.icon className="size-[18px]" />
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-3xl font-semibold tracking-tight">
                    <CountUp
                      end={k.value}
                      duration={1.4}
                      separator=","
                      prefix={k.prefix}
                      suffix={k.suffix}
                      decimals={k.decimals ?? 0}
                    />
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">{k.hint}</p>
                </Card>
              </motion.div>
            ))}
      </motion.div>

      {/* Chart + pipeline snapshot */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Revenue trend</h2>
              <p className="text-xs text-zinc-400">Last 8 months</p>
            </div>
          </div>
          {isLoading || !data ? (
            <Skeleton className="h-[260px] w-full" />
          ) : (
            <RevenueChart data={data.trend} />
          )}
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold">Pipeline snapshot</h2>
          {isLoading || !data ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {data.byStage.map((s) => {
                const meta = DEAL_STAGE[s.stage as DealStage];
                return (
                  <div key={s.stage}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-600 dark:text-zinc-300">
                        {meta.label}
                      </span>
                      <span className="font-mono text-zinc-400">
                        {s.count} · {formatCompactCurrency(s.value)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.value / maxStageValue) * 100}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        className="h-full rounded-full bg-emerald-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Recent activity from the audit trail */}
      <Card className="mt-4 p-5">
        <div className="mb-4 flex items-center gap-2">
          <LuActivity className="size-4 text-zinc-400" />
          <h2 className="text-sm font-semibold">Recent activity</h2>
        </div>
        {!audit || audit.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-400">
            No activity yet. Actions you take will appear here.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
            {audit.slice(0, 6).map((log) => (
              <li key={log.id} className="flex items-center gap-3 py-2.5">
                <Avatar name={log.actorName} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-zinc-700 dark:text-zinc-200">
                    <span className="font-medium">{log.actorName}</span>{" "}
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {log.action.replace(/_/g, " ")} {log.entityType}
                    </span>
                  </p>
                </div>
                <span className="shrink-0 text-xs text-zinc-400">
                  {relativeDay(log.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
