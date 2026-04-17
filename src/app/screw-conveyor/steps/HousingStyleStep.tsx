"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Lock, Square, HelpCircle } from "lucide-react";

const housingOptions = [
  { value: "sealed", label: "Tett / lukket", desc: "Rørformet eller forseglet hus", icon: <Lock className="h-8 w-8" /> },
  { value: "trough", label: "Trau / åpent", desc: "U-trau med deksel", icon: <Square className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function HousingStyleStep() {
  const { housingStyle, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {housingOptions.map((h) => (
        <SelectionCard key={h.value} icon={h.icon} title={h.label} description={h.desc}
          selected={housingStyle === h.value} onClick={() => setField("housingStyle", h.value)} />
      ))}
    </div>
  );
}
