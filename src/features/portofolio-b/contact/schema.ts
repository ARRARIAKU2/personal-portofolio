import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "konstruksi", label: "Konstruksi Rumah" },
  { value: "renovasi", label: "Renovasi" },
  { value: "arsitektur", label: "Desain Arsitektur" },
  { value: "interior", label: "Interior & Fit-out" },
  { value: "konsultasi", label: "Konsultasi & Perencanaan" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "<500", label: "Di bawah Rp 500 juta" },
  { value: "500-1000", label: "Rp 500 juta – 1 miliar" },
  { value: "1000-2500", label: "Rp 1 – 2,5 miliar" },
  { value: "2500-5000", label: "Rp 2,5 – 5 miliar" },
  { value: ">5000", label: "Di atas Rp 5 miliar" },
] as const;

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [string, ...string[]];
const budgetValues = BUDGET_OPTIONS.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter.")
    .max(80, "Nama terlalu panjang."),
  email: z.string().trim().email("Format email tidak valid."),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor telepon minimal 8 digit.")
    .regex(/^[0-9+()\-\s]+$/, "Nomor telepon hanya boleh berisi angka."),
  service: z.enum(serviceValues, { message: "Pilih jenis layanan." }),
  budget: z.enum(budgetValues, { message: "Pilih rentang anggaran." }),
  message: z
    .string()
    .trim()
    .min(10, "Ceritakan sedikit tentang proyek Anda (min. 10 karakter).")
    .max(1000, "Pesan terlalu panjang."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
