"use client";
import { cn } from "@/lib/utils";

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export function Input({ label, value, onChange, placeholder, type = "text", className, disabled }: InputProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && <label className="text-xs font-medium text-muted">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
      />
    </div>
  );
}
