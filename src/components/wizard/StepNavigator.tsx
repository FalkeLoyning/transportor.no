"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface StepNavigatorProps { currentStep: number; totalSteps: number; onNext: () => void; onBack: () => void; onSubmit?: () => void; isLastStep: boolean; isFirstStep: boolean; }

export function StepNavigator({ onNext, onBack, onSubmit, isLastStep, isFirstStep }: StepNavigatorProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-white/10">
      <Button variant="ghost" onClick={onBack} disabled={isFirstStep} className={isFirstStep ? "invisible" : ""}>
        <ChevronLeft className="h-4 w-4" /> Tilbake
      </Button>
      {isLastStep ? (
        <Button variant="primary" size="lg" onClick={onSubmit}><Send className="h-4 w-4" /> Send forespørsel</Button>
      ) : (
        <Button variant="primary" onClick={onNext}>Neste <ChevronRight className="h-4 w-4" /></Button>
      )}
    </div>
  );
}
