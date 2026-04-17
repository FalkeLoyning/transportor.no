"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { PlusCircle, RefreshCw, HelpCircle } from "lucide-react";

const purposes = [
  { value: "new", label: "Nyanlegg", desc: "Helt nytt system", icon: <PlusCircle className="h-8 w-8" /> },
  { value: "replacement", label: "Erstatning", desc: "Bytte ut eksisterende", icon: <RefreshCw className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function ScrewPurposeStep() {
  const { quotePurpose, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {purposes.map((p) => (
        <SelectionCard key={p.value} icon={p.icon} title={p.label} description={p.desc}
          selected={quotePurpose === p.value} onClick={() => setField("quotePurpose", p.value)} />
      ))}
    </div>
  );
}
