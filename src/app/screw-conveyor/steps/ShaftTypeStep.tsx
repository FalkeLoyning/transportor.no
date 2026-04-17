"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Circle, Disc, HelpCircle } from "lucide-react";

const shaftTypes = [
  { value: "shafted", label: "Med aksel", desc: "Standard, gir god støtte", icon: <Circle className="h-8 w-8" /> },
  { value: "shaftless", label: "Akselløs", desc: "For klebrig/seigt materiale", icon: <Disc className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function ShaftTypeStep() {
  const { shaftType, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {shaftTypes.map((st) => (
        <SelectionCard key={st.value} icon={st.icon} title={st.label} description={st.desc}
          selected={shaftType === st.value} onClick={() => setField("shaftType", st.value)} />
      ))}
    </div>
  );
}
