import { z } from "zod";

export const dealSchema = z.object({
  title: z.string().min(3, "Title is required"),
  company: z.string().min(2, "Company is required"),
  stage: z.enum([
    "new",
    "qualified",
    "proposal",
    "negotiation",
    "won",
    "lost",
  ]),
  value: z.coerce.number().min(0, "Value can't be negative"),
  probability: z.coerce
    .number()
    .min(0, "0–100")
    .max(100, "0–100"),
  ownerId: z.string().min(1, "Assign an owner"),
  expectedClose: z.string().min(1, "Pick a close date"),
});

export type DealFormValues = z.infer<typeof dealSchema>;
