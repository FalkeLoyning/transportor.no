"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { RotateCw, RotateCcw, HelpCircle } from "lucide-react";

const rotationOptions = [
  { value: "cw", label: "Med klokken (CW)", desc: "Sett fra drivende ende", icon: <RotateCw className="h-8 w-8" /> },
  { value: "ccw", label: "Mot klokken (CCW)", desc: "Sett fra drivende ende", icon: <RotateCcw className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function RotationStep() {
  const { rotationDirection, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {rotationOptions.map((r) => (
        <SelectionCard key={r.value} icon={r.icon} title={r.label} description={r.desc}
          selected={rotationDirection === r.value} onClick={() => setField("rotationDirection", r.value)} />
      ))}
    </div>
  );
}
