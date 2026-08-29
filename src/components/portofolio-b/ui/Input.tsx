import { forwardRef, useId } from "react";
import { cn } from "@/lib/portofolio-b/cn";

const fieldBase =
  "w-full rounded-xl border bg-[var(--ark-surface)] px-4 py-3 text-sm text-[var(--ark-ink)] placeholder:text-[var(--ark-gray)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ark-bg)]";

function fieldTone(hasError?: boolean) {
  return hasError
    ? "border-red-400 focus-visible:ring-red-400"
    : "border-[var(--ark-line)] hover:border-[var(--ark-ink)]/30 focus-visible:ring-[var(--ark-accent)]";
}

interface FieldWrapProps {
  label: string;
  htmlFor: string;
  error?: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldWrap({
  label,
  htmlFor,
  error,
  helper,
  required,
  children,
}: FieldWrapProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--ark-ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--ark-accent-ink)]">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-500">
          {error}
        </p>
      ) : helper ? (
        <p className="text-xs text-[var(--ark-gray)]">{helper}</p>
      ) : null}
    </div>
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helper?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, id, required, className, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldWrap
        label={label}
        htmlFor={fieldId}
        error={error}
        helper={helper}
        required={required}
      >
        <input
          id={fieldId}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(fieldBase, fieldTone(!!error), className)}
          {...props}
        />
      </FieldWrap>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, id, required, className, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldWrap
        label={label}
        htmlFor={fieldId}
        error={error}
        helper={helper}
        required={required}
      >
        <textarea
          id={fieldId}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(fieldBase, fieldTone(!!error), "resize-y", className)}
          {...props}
        />
      </FieldWrap>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helper?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helper, id, required, options, placeholder, className, ...props },
    ref
  ) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldWrap
        label={label}
        htmlFor={fieldId}
        error={error}
        helper={helper}
        required={required}
      >
        <select
          id={fieldId}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          defaultValue=""
          className={cn(fieldBase, fieldTone(!!error), "appearance-none pr-10", className)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FieldWrap>
    );
  }
);
Select.displayName = "Select";
