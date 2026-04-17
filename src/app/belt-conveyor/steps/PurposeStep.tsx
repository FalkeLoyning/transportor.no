"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { PlusCircle, RefreshCw, Settings, HelpCircle } from "lucide-react";

const purposes = [
  { value: "new_line", label: "Ny linje", desc: "Helt nytt anlegg", icon: <PlusCircle className="h-8 w-8" /> },
  { value: "replacement", label: "Erstatning", desc: "Bytte ut eksisterende", icon: <RefreshCw className="h-8 w-8" /> },
  { value: "rebuild", label: "Ombygging", desc: "Modifisere eksisterende", icon: <Settings className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function PurposeStep() {
  const { quotePurpose, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {purposes.map((p) => (
        <SelectionCard key={p.value} icon={p.icon} title={p.label} description={p.desc}
          selected={quotePurpose === p.value} onClick={() => setField("quotePurpose", p.value)} />
      ))}
    </div>
  );
}
