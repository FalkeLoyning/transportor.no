"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Clock, Repeat, AlertTriangle, HelpCircle } from "lucide-react";

const dutyOptions = [
  { value: "batch", label: "Batch", desc: "Periodisk drift med pauser", icon: <Clock className="h-8 w-8" /> },
  { value: "continuous", label: "Kontinuerlig", desc: "Uavbrutt drift", icon: <Repeat className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Usikker på driftsform", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function DutyStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {dutyOptions.map((o) => (
          <SelectionCard key={o.value} icon={o.icon} title={o.label} description={o.desc}
            selected={s.batchOrContinuous === o.value} onClick={() => s.setField("batchOrContinuous", o.value)} />
        ))}
      </div>
      <SelectionCard
        icon={<AlertTriangle className="h-6 w-6" />}
        title="Støtbelastninger mulig"
        description="Plutselige mengdeøkninger kan forekomme"
        selected={s.surgeLoads}
        onClick={() => s.setField("surgeLoads", !s.surgeLoads)}
      />
    </div>
  );
}
