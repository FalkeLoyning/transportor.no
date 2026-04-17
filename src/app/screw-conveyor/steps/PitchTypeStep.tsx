"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

const pitchTypes = [
  { value: "standard", label: "Standard (=D)", desc: "Stigning lik diameteren" },
  { value: "short_2_3D", label: "Kort (2/3 D)", desc: "For helning og føding" },
  { value: "half_1_2D", label: "Halv (1/2 D)", desc: "For bratt helning" },
  { value: "variable", label: "Variabel", desc: "Progressiv stigning" },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning" },
] as const;

export function PitchTypeStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pitchTypes.map((pt) => (
          <SelectionCard key={pt.value} icon={pt.value === "unknown" ? <HelpCircle className="h-8 w-8" /> : null} title={pt.label} description={pt.desc}
            selected={s.pitchType === pt.value} onClick={() => s.setField("pitchType", pt.value)} />
        ))}
      </div>
      {s.pitchType && s.pitchType !== "unknown" && (
        <Input label="Stigning (mm) – valgfritt" type="number" value={s.pitchMm?.toString() ?? ""}
          onChange={(v) => s.setField("pitchMm", v ? Number(v) : undefined)} placeholder="Oppgi eksakt stigning om kjent" />
      )}
    </div>
  );
}
