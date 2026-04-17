"use client";
import { cn } from "@/lib/utils";

interface ProgressProps {
  steps: { id: string; title: string }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function Progress({ steps, currentStep, onStepClick }: ProgressProps) {
  const pct = ((currentStep) / (steps.length - 1)) * 100;
  return (
    <div className="space-y-2">
      <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
        {steps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick?.(i)}
            disabled={i > currentStep}
            title={step.title}
            className={cn(
              "flex-shrink-0 flex items-center justify-center rounded-full text-[10px] font-bold transition-colors h-7 w-7",
              i === currentStep && "bg-accent text-background",
              i < currentStep && "bg-accent/20 text-accent cursor-pointer hover:bg-accent/30",
              i > currentStep && "bg-white/5 text-foreground/30 cursor-not-allowed"
            )}
          >
            {i < currentStep ? "✓" : i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
