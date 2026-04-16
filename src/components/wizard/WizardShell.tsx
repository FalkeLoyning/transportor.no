"use client";
import { type ReactNode, useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { StepNavigator } from "./StepNavigator";
import { ErrorSummary } from "./ErrorSummary";
import Link from "next/link";
import { Cog } from "lucide-react";

interface WizardStep { id: string; title: string; description?: string; }
interface ValidationResult { valid: boolean; messages: { code: string; field?: string; severity: "error" | "warning" | "info"; message: string; }[]; }

interface WizardShellProps {
  title: string;
  steps: WizardStep[];
  children: (stepIndex: number) => ReactNode;
  preview?: ReactNode;
  onValidateStep?: (stepIndex: number) => ValidationResult;
  onSubmit?: () => void;
}

export function WizardShell({ title, steps, children, preview, onValidateStep, onSubmit }: WizardShellProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<ValidationResult>({ valid: true, messages: [] });

  const goNext = useCallback(() => {
    if (onValidateStep) {
      const result = onValidateStep(currentStep);
      setErrors(result);
      if (!result.valid) return;
    }
    setErrors({ valid: true, messages: [] });
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  }, [currentStep, onValidateStep, steps.length]);

  const goBack = useCallback(() => { setErrors({ valid: true, messages: [] }); setCurrentStep((s) => Math.max(s - 1, 0)); }, []);
  const goToStep = useCallback((index: number) => { if (index < currentStep) { setErrors({ valid: true, messages: [] }); setCurrentStep(index); } }, [currentStep]);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <Cog className="h-6 w-6 text-accent group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-sm font-bold text-foreground hidden sm:inline">Transportør<span className="text-accent">.no</span></span>
              </Link>
              <span className="text-white/20">|</span>
              <h1 className="text-lg font-bold text-foreground">{title}</h1>
            </div>
            <span className="text-sm text-muted">Steg {currentStep + 1} av {steps.length}</span>
          </div>
          <Progress steps={steps} currentStep={currentStep} onStepClick={goToStep} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-2">
              <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
              {step.description && <p className="text-sm text-muted">{step.description}</p>}
            </div>
            <ErrorSummary result={errors} />
            {children(currentStep)}
            <StepNavigator
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={goNext}
              onBack={goBack}
              onSubmit={onSubmit}
              isLastStep={isLastStep}
              isFirstStep={isFirstStep}
            />
          </div>
          {preview && (
            <div className="hidden lg:block sticky top-32 h-fit">
              <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
                <div className="p-3 border-b border-white/10">
                  <span className="text-xs font-medium text-muted">3D Forhåndsvisning</span>
                </div>
                <div className="aspect-[4/3]">
                  {preview}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
