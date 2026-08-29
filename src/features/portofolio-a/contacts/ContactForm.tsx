"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/portofolio-a/ui/Button";
import { Field, Input, Select } from "@/components/portofolio-a/ui/Field";
import { OWNER_OPTIONS } from "@/features/portofolio-a/shared/labels";
import { contactSchema, type ContactFormValues } from "./schema";

export function ContactForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
}: {
  defaultValues?: Partial<ContactFormValues>;
  onSubmit: (values: ContactFormValues) => void;
  onCancel: () => void;
  submitting?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ownerId: OWNER_OPTIONS[0]?.id, ...defaultValues },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <Field label="Name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" {...register("name")} />
      </Field>
      <Field label="Title" htmlFor="title" error={errors.title?.message}>
        <Input id="title" {...register("title")} />
      </Field>
      <Field label="Company" htmlFor="company" error={errors.company?.message}>
        <Input id="company" {...register("company")} />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" {...register("email")} />
      </Field>
      <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
        <Input id="phone" {...register("phone")} />
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

      <div className="col-span-full mt-1 flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
