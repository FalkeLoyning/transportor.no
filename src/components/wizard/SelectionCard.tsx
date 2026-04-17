"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SelectionCardProps { icon: React.ReactNode; title: string; description?: string; selected: boolean; recommended?: boolean; onClick: () => void; disabled?: boolean; }

export function SelectionCard({ icon, title, description, selected, recommended, onClick, disabled }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        selected ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-white/10 bg-surface hover:border-white/20 hover:bg-surface-light",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {recommended && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-background">Anbefalt</span>}
      {selected && (
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-accent flex items-center justify-center">
          <Check className="h-3 w-3 text-background" />
        </div>
      )}
      {icon && <div className={cn("text-3xl", selected ? "text-accent" : "text-foreground/60")}>{icon}</div>}
      <div>
        <div className={cn("font-medium text-sm", selected ? "text-accent" : "text-foreground")}>{title}</div>
        {description && <div className="text-xs text-muted mt-1">{description}</div>}
      </div>
    </button>
  );
}
