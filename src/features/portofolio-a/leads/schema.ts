import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  status: z.enum(["new", "contacted", "qualified", "unqualified"]),
  source: z.enum([
    "website",
    "referral",
    "event",
    "cold_outreach",
    "partner",
    "inbound_call",
  ]),
  ownerId: z.string().min(1, "Assign an owner"),
  value: z.coerce.number().min(0, "Value can't be negative"),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
