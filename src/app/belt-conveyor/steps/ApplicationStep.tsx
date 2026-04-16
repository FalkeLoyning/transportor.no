"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Select } from "@/components/ui/select";
import { Package, Layers, Utensils, Target } from "lucide-react";

const modes = [
  { value: "unit_handling", label: "Stykkhåndtering", desc: "Kartonger, poser, flasker", icon: <Package className="h-6 w-6" /> },
  { value: "bulk", label: "Bulkgods", desc: "Korn, grus, pulver", icon: <Layers className="h-6 w-6" /> },
  { value: "food_hygiene", label: "Hygiene/mat", desc: "FDA/EU hygienekrav", icon: <Utensils className="h-6 w-6" /> },
  { value: "precision_indexing", label: "Presis indeksering", desc: "Posisjonerings­nøyaktighet", icon: <Target className="h-6 w-6" /> },
] as const;

const industries = [
  { value: "logistics", label: "Logistikk" },
  { value: "food", label: "Mat & Drikke" },
  { value: "pharma", label: "Farma" },
  { value: "workshop", label: "Verksted/Industri" },
  { value: "waste", label: "Avfall/Gjenvinning" },
  { value: "other", label: "Annet" },
];

const purposes = [
  { value: "new_line", label: "Ny linje" },
  { value: "replacement", label: "Erstatning" },
  { value: "rebuild", label: "Ombygging" },
];

export function ApplicationStep() {
  const { applicationMode, industry, quotePurpose, setField } = useBeltWizardStore();
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Applikasjon</h3>
        <p className="text-sm text-muted mb-4">Hva skal transporteres?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {modes.map((m) => (
            <SelectionCard key={m.value} icon={m.icon} title={m.label} description={m.desc}
              selected={applicationMode === m.value} onClick={() => setField("applicationMode", m.value)} />
          ))}
        </div>
      </div>
      <Select label="Bransje" value={industry} onChange={(v) => setField("industry", v as typeof industry)}
        options={industries} />
      <Select label="Formål" value={quotePurpose} onChange={(v) => setField("quotePurpose", v as typeof quotePurpose)}
        options={purposes} />
    </div>
  );
}
