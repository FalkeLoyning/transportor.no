"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Package, Layers, Utensils, Target, HelpCircle } from "lucide-react";

const modes = [
  { value: "unit_handling", label: "Stykkhåndtering", desc: "Kartonger, poser, flasker", icon: <Package className="h-8 w-8" /> },
  { value: "bulk", label: "Bulkgods", desc: "Korn, grus, pulver", icon: <Layers className="h-8 w-8" /> },
  { value: "food_hygiene", label: "Hygiene/mat", desc: "FDA/EU hygienekrav", icon: <Utensils className="h-8 w-8" /> },
  { value: "precision_indexing", label: "Presis indeksering", desc: "Posisjonerings­nøyaktighet", icon: <Target className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function ApplicationStep() {
  const { applicationMode, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {modes.map((m) => (
        <SelectionCard key={m.value} icon={m.icon} title={m.label} description={m.desc}
          selected={applicationMode === m.value} onClick={() => setField("applicationMode", m.value)} />
      ))}
    </div>
  );
}
