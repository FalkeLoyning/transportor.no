"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Shield, AlertTriangle, Skull, HelpCircle } from "lucide-react";

const options = [
  { value: "low", label: "Lav", desc: "Ikke-korrosivt", icon: <Shield className="h-8 w-8" /> },
  { value: "medium", label: "Middels", desc: "Noe korrosivt", icon: <AlertTriangle className="h-8 w-8" /> },
  { value: "high", label: "Høy", desc: "Svært korrosivt", icon: <Skull className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Usikker på korrosivitet", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function CorrosivenessStep() {
  const { corrosiveness, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((o) => (
        <SelectionCard key={o.value} icon={o.icon} title={o.label} description={o.desc}
          selected={corrosiveness === o.value} onClick={() => setField("corrosiveness", o.value)} />
      ))}
    </div>
  );
}
