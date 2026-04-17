"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Lock, Gauge, Crosshair, HelpCircle } from "lucide-react";

const speedOptions = [
  { value: "fixed", label: "Fast hastighet", desc: "Enkel, pålitelig", icon: <Lock className="h-8 w-8" /> },
  { value: "vfd", label: "Frekvensomformer", desc: "Justerbar hastighet (VFD)", icon: <Gauge className="h-8 w-8" /> },
  { value: "servo", label: "Servo", desc: "Presis posisjonskontroll", icon: <Crosshair className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function SpeedControlStep() {
  const { speedControl, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {speedOptions.map((sc) => (
        <SelectionCard key={sc.value} icon={sc.icon} title={sc.label} description={sc.desc}
          selected={speedControl === sc.value} onClick={() => setField("speedControl", sc.value)} />
      ))}
    </div>
  );
}
