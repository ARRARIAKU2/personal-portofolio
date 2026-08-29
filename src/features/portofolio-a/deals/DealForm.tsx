"use client";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Field, Input, Select } from "@/components/portofolio-a/ui/Field";
import { DEAL_STAGE, OWNER_OPTIONS } from "@/features/portofolio-a/shared/labels";
import { dealSchema, type DealFormValues } from "./schema";

export function DealForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel = "Save deal",
}: {
  defaultValues?: Partial<DealFormValues>;
  onSubmit: (values: DealFormValues) => void;
  onCancel: () => void;
  submitting?: boolean;
  submitLabel?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealFormValues>({
    // coerce inputs make zod's inferred input type `unknown`; the resolver still
    // validates & coerces at runtime, so align the static type to the output.
    resolver: zodResolver(dealSchema) as Resolver<DealFormValues>,
    defaultValues: {
      stage: "new",
      value: 0,
      probability: 20,
      ownerId: OWNER_OPTIONS[0]?.id,
      expectedClose: "2026-09-30",
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <Field
        label="Deal title"
        htmlFor="title"
        error={errors.title?.message}
        className="sm:col-span-2"
      >
        <Input id="title" {...register("title")} placeholder="Fleet rollout — Q4" />
      </Field>
      <Field label="Company" htmlFor="company" error={errors.company?.message}>
        <Input id="company" {...register("company")} />
      </Field>
      <Field label="Stage" htmlFor="stage" error={errors.stage?.message}>
        <Select id="stage" {...register("stage")}>
          {Object.entries(DEAL_STAGE).map(([value, meta]) => (
            <option key={value} value={value}>
              {meta.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Value (USD)" htmlFor="value" error={errors.value?.message}>
        <Input id="value" type="number" min={0} step={500} {...register("value")} />
      </Field>
      <Field
        label="Probability (%)"
        htmlFor="probability"
        error={errors.probability?.message}
      >
        <Input
          id="probability"
          type="number"
          min={0}
          max={100}
          step={5}
          {...register("probability")}
        />
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
      <Field
        label="Expected close"
        htmlFor="expectedClose"
        error={errors.expectedClose?.message}
      >
        <Input id="expectedClose" type="date" {...register("expectedClose")} />
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
