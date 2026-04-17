"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

export function ShaftDiameterStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      {!s.shaftDiameterUnknown && (
        <Input label="Diameter aksling (mm)" type="number" value={s.shaftDiameterMm?.toString() ?? ""}
          onChange={(v) => s.setField("shaftDiameterMm", v ? Number(v) : undefined)} placeholder="F.eks. 60, 80, 100" />
      )}
      <SelectionCard
        icon={<HelpCircle className="h-8 w-8" />}
        title="Vet ikke"
        description="Trenger hjelp til å dimensjonere aksling"
        selected={s.shaftDiameterUnknown}
        onClick={() => { s.setField("shaftDiameterUnknown", !s.shaftDiameterUnknown); if (!s.shaftDiameterUnknown) s.setField("shaftDiameterMm", undefined); }}
      />
    </div>
  );
}
