"use client";
import { useState } from "react";
import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";
import { getDB, persist } from "@/stores/portofolio-a/db";
import { usePermission } from "@/hooks/portofolio-a/use-permission";
import { useAuditLogger } from "@/hooks/portofolio-a/use-audit-logger";
import { useTheme } from "@/stores/portofolio-a/theme-context";
import { useToast } from "@/stores/portofolio-a/toast-context";
import { Forbidden } from "@/features/portofolio-a/auth/guards";
import { PageHeader } from "@/components/portofolio-a/ui/PageHeader";
import { Card } from "@/components/portofolio-a/ui/Card";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Field, Input, Select } from "@/components/portofolio-a/ui/Field";
import { cn } from "@/lib/portofolio-a/cn";
import type { OrgSettings } from "@/types/portofolio-a";

export function SettingsView() {
  const { can } = usePermission();
  const { notify } = useToast();
  const { theme, setTheme } = useTheme();
  const log = useAuditLogger();

  const [form, setForm] = useState<OrgSettings>(() => ({ ...getDB().settings }));
  const [saving, setSaving] = useState(false);

  const canManage = can("settings.manage");
  if (!canManage) {
    return <Forbidden detail="You need the settings.manage permission." />;
  }

  function set<K extends keyof OrgSettings>(key: K, value: OrgSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function save() {
    setSaving(true);
    const db = getDB();
    const before = { ...db.settings };
    db.settings = { ...form };
    persist();
    log({
      action: "update",
      entityType: "settings",
      entityId: "org",
      before,
      after: { ...form },
    });
    setSaving(false);
    notify("Settings saved");
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Organization profile and workspace preferences"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Organization profile
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Organization name" htmlFor="orgName" className="sm:col-span-2">
              <Input
                id="orgName"
                value={form.orgName}
                onChange={(e) => set("orgName", e.target.value)}
              />
            </Field>
            <Field label="Domain" htmlFor="domain">
              <Input
                id="domain"
                value={form.domain}
                onChange={(e) => set("domain", e.target.value)}
              />
            </Field>
            <Field label="Industry" htmlFor="industry">
              <Input
                id="industry"
                value={form.industry}
                onChange={(e) => set("industry", e.target.value)}
              />
            </Field>
            <Field label="Fiscal year start" htmlFor="fiscalYearStart">
              <Input
                id="fiscalYearStart"
                type="date"
                value={form.fiscalYearStart}
                onChange={(e) => set("fiscalYearStart", e.target.value)}
              />
            </Field>
            <Field label="Table density" htmlFor="density">
              <Select
                id="density"
                value={form.density}
                onChange={(e) =>
                  set("density", e.target.value as OrgSettings["density"])
                }
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </Select>
            </Field>
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Appearance
          </h3>
          <p className="mb-3 text-xs text-zinc-400">
            Theme applies to this CRM workspace only.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { key: "light", label: "Light", icon: LuSun },
                { key: "dark", label: "Dark", icon: LuMoon },
                { key: "system", label: "System", icon: LuMonitor },
              ] as const
            ).map((opt) => {
              const activeOpt =
                opt.key === "system" ? false : theme === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() =>
                    opt.key === "system"
                      ? setTheme(
                          window.matchMedia("(prefers-color-scheme: dark)")
                            .matches
                            ? "dark"
                            : "light"
                        )
                      : setTheme(opt.key)
                  }
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs transition-colors active:scale-[0.98]",
                    activeOpt
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300"
                  )}
                >
                  <opt.icon className="size-4" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
