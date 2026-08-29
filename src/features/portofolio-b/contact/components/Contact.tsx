"use client";
import { HiCheckCircle, HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { Section } from "@/components/portofolio-b/ui/Section";
import { Kicker } from "@/components/portofolio-b/ui/Kicker";
import { Button } from "@/components/portofolio-b/ui/Button";
import { Input, Textarea, Select } from "@/components/portofolio-b/ui/Input";
import { BRAND } from "@/features/portofolio-b/shared/nav";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "../schema";
import { useContactForm } from "../hooks/useContactForm";

export function Contact() {
  const { form, status, onSubmit, reset } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Section
      id="kontak"
      labelledBy="kontak-title"
      className="border-t border-[var(--ark-line)] bg-[var(--ark-surface)]"
      containerClassName="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
    >
      {/* Left — context + details */}
      <div className="lg:col-span-5">
        <Kicker>Kontak</Kicker>
        <h2
          id="kontak-title"
          className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--ark-ink)] md:text-4xl"
        >
          Ceritakan rencana Anda.
        </h2>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[var(--ark-gray)]">
          Isi formulir ini dan tim kami menghubungi Anda dalam 1×24 jam kerja
          untuk menjadwalkan konsultasi tanpa biaya.
        </p>

        <ul className="mt-9 space-y-5">
          <ContactRow icon={<HiOutlinePhone className="size-5" />} label="Telepon / WhatsApp">
            <a href={BRAND.phoneHref} className="hover:text-[var(--ark-accent-ink)]">
              {BRAND.phoneDisplay}
            </a>
          </ContactRow>
          <ContactRow icon={<HiOutlineMail className="size-5" />} label="Email">
            <a href={`mailto:${BRAND.email}`} className="hover:text-[var(--ark-accent-ink)]">
              {BRAND.email}
            </a>
          </ContactRow>
          <ContactRow icon={<HiOutlineLocationMarker className="size-5" />} label="Studio">
            {BRAND.address}
          </ContactRow>
        </ul>

        <div className="ark-blueprint mt-10 hidden h-40 rounded-2xl border border-[var(--ark-line)] lg:block" aria-hidden />
      </div>

      {/* Right — form / success */}
      <div className="lg:col-span-7">
        {status === "success" ? (
          <div
            role="status"
            className="flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--ark-line)] bg-[var(--ark-bg)] p-10 text-center"
          >
            <HiCheckCircle className="size-14 text-[var(--ark-accent)]" />
            <h3 className="mt-4 text-xl font-semibold text-[var(--ark-ink)]">
              Terima kasih, pesan Anda terkirim.
            </h3>
            <p className="mt-2 max-w-[42ch] text-sm text-[var(--ark-gray)]">
              Tim ARK Design akan menghubungi Anda dalam 1×24 jam kerja. Sampai
              jumpa di sesi konsultasi.
            </p>
            <Button variant="secondary" className="mt-6" onClick={reset}>
              Kirim pesan lain
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-[var(--ark-line)] bg-[var(--ark-bg)] p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Nama lengkap"
                required
                placeholder="Nama Anda"
                autoComplete="name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email"
                type="email"
                required
                placeholder="nama@email.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Nomor telepon"
                type="tel"
                required
                placeholder="+62 8xx xxxx xxxx"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Select
                label="Jenis layanan"
                required
                placeholder="Pilih layanan"
                options={[...SERVICE_OPTIONS]}
                error={errors.service?.message}
                {...register("service")}
              />
              <div className="sm:col-span-2">
                <Select
                  label="Rentang anggaran"
                  required
                  placeholder="Pilih rentang anggaran"
                  options={[...BUDGET_OPTIONS]}
                  error={errors.budget?.message}
                  {...register("budget")}
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  label="Cerita proyek"
                  required
                  rows={5}
                  placeholder="Lokasi, luas lahan, target waktu, dan hal yang Anda inginkan…"
                  error={errors.message?.message}
                  {...register("message")}
                />
              </div>
            </div>

            {status === "error" && (
              <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                Maaf, terjadi kendala saat mengirim. Silakan coba lagi.
              </p>
            )}

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[var(--ark-gray)]">
                Data Anda hanya digunakan untuk menghubungi kembali.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
              >
                {status === "submitting" ? "Mengirim…" : "Kirim & jadwalkan konsultasi"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--ark-line)] text-[var(--ark-accent-ink)]">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--ark-gray)]">
          {label}
        </p>
        <p className="mt-1 text-base text-[var(--ark-ink)]">{children}</p>
      </div>
    </li>
  );
}
