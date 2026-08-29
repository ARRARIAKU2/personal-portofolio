"use client";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Field, Input, Select } from "@/components/portofolio-a/ui/Field";
import { LEAD_SOURCE, LEAD_STATUS, OWNER_OPTIONS } from "@/features/portofolio-a/shared/labels";
import { leadSchema, type LeadFormValues } from "./schema";

export function LeadForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel = "Save lead",
}: {
  defaultValues?: Partial<LeadFormValues>;
  onSubmit: (values: LeadFormValues) => void;
  onCancel: () => void;
  submitting?: boolean;
  submitLabel?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    // coerce inputs make zod's inferred input type `unknown`; the resolver still
    // validates & coerces at runtime, so align the static type to the output.
    resolver: zodResolver(leadSchema) as Resolver<LeadFormValues>,
    defaultValues: {
      status: "new",
      source: "website",
      value: 0,
      ownerId: OWNER_OPTIONS[0]?.id,
      ...defaultValues,
    },
  });

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <Field label="Full name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" {...register("name")} placeholder="Rafael Costa-Marín" />
      </Field>
      <Field label="Company" htmlFor="company" error={errors.company?.message}>
        <Input id="company" {...register("company")} placeholder="Meridian Freight" />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" {...register("email")} placeholder="name@company.com" />
      </Field>
      <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
        <Input id="phone" {...register("phone")} placeholder="+1 (312) 555-0148" />
      </Field>
      <Field label="Status" htmlFor="status" error={errors.status?.message}>
        <Select id="status" {...register("status")}>
          {Object.entries(LEAD_STATUS).map(([value, meta]) => (
            <option key={value} value={value}>
              {meta.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Source" htmlFor="source" error={errors.source?.message}>
        <Select id="source" {...register("source")}>
          {Object.entries(LEAD_SOURCE).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Owner" htmlFor="ownerId" error={errors.ownerId?.message}>
        <Select id="ownerId" {...register("ownerId")}>
          {OWNER_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Estimated value (USD)" htmlFor="value" error={errors.value?.message}>
        <Input id="value" type="number" min={0} step={100} {...register("value")} />
      </Field>

      <div className="col-span-full mt-1 flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
