"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Feather, CircleDot, Flame, HelpCircle } from "lucide-react";

const options = [
  { value: "low", label: "Lav", desc: "Mykt, ikke-slitende", icon: <Feather className="h-8 w-8" /> },
  { value: "medium", label: "Middels", desc: "Noe slitasje", icon: <CircleDot className="h-8 w-8" /> },
  { value: "high", label: "Høy", desc: "Sterkt slitende materiale", icon: <Flame className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Usikker på abrasivitet", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function AbrasivenessStep() {
  const { abrasiveness, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((o) => (
        <SelectionCard key={o.value} icon={o.icon} title={o.label} description={o.desc}
          selected={abrasiveness === o.value} onClick={() => setField("abrasiveness", o.value)} />
      ))}
    </div>
  );
}
