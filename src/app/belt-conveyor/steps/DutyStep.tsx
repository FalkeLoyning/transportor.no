"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Clock, Repeat, RotateCcw, HelpCircle } from "lucide-react";

const dutyOptions = [
  { value: "continuous", label: "Kontinuerlig", desc: "Kjører hele tiden", icon: <Clock className="h-8 w-8" /> },
  { value: "batch", label: "Batch/kampanje", desc: "Periodisk drift", icon: <Repeat className="h-8 w-8" /> },
  { value: "shift_24_7", label: "24/7 skift", desc: "Døgnkontinuerlig", icon: <RotateCcw className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Usikker på driftsform", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function DutyStep() {
  const { duty, reverseOperation, setField } = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {dutyOptions.map((d) => (
          <SelectionCard key={d.value} icon={d.icon} title={d.label} description={d.desc}
            selected={duty === d.value} onClick={() => setField("duty", d.value)} />
        ))}
      </div>
      <SelectionCard
        icon={<Repeat className="h-6 w-6" />}
        title="Reversibel drift"
        description="Båndet skal kunne kjøre begge veier"
        selected={reverseOperation}
        onClick={() => setField("reverseOperation", !reverseOperation)}
      />
    </div>
  );
}
