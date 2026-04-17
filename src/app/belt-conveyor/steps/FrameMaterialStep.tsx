"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Square, Shield, Wrench, HelpCircle } from "lucide-react";

const frameMats = [
  { value: "aluminium", label: "Aluminium", desc: "Lett, korrosjonsbestandig", icon: <Square className="h-8 w-8" /> },
  { value: "stainless_steel", label: "Rustfritt stål", desc: "Hygiene, kjemisk bestandig", icon: <Shield className="h-8 w-8" /> },
  { value: "painted_steel", label: "Lakkert stål", desc: "Kostnadseffektivt, robust", icon: <Wrench className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function FrameMaterialStep() {
  const { frameMaterial, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {frameMats.map((f) => (
        <SelectionCard key={f.value} icon={f.icon} title={f.label} description={f.desc}
          selected={frameMaterial === f.value} onClick={() => setField("frameMaterial", f.value)} />
      ))}
    </div>
  );
}
