"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "../schema";

type Status = "idle" | "submitting" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "" as ContactFormValues["service"],
      budget: "" as ContactFormValues["budget"],
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("submitting");
    try {
      // Frontend-only demo: simulate a network round-trip. No data leaves the browser.
      await new Promise((resolve) => setTimeout(resolve, 1100));
      // Deterministic success for the demo; swap for a real endpoint later.
      void values;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  });

  return { form, status, onSubmit, reset: () => setStatus("idle") };
}
