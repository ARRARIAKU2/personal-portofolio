import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  title: z.string().min(2, "Title is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Phone is required"),
  ownerId: z.string().min(1, "Assign an owner"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
