"use client";
import { cn } from "@/lib/utils";

interface ProgressProps {
  steps: { id: string; title: string }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function Progress({ steps, currentStep, onStepClick }: ProgressProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {steps.map((step, i) => (
        <button
          key={step.id}
          type="button"
          onClick={() => onStepClick?.(i)}
          disabled={i > currentStep}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap",
            i === currentStep && "bg-accent text-background",
            i < currentStep && "bg-accent/20 text-accent cursor-pointer hover:bg-accent/30",
            i > currentStep && "bg-white/5 text-foreground/30 cursor-not-allowed"
          )}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/20 text-[10px]">
            {i < currentStep ? "✓" : i + 1}
          </span>
          <span className="hidden sm:inline">{step.title}</span>
        </button>
      ))}
    </div>
  );
}
