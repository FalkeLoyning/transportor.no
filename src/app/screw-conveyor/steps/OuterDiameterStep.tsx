"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

export function OuterDiameterStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      {!s.screwOuterDiameterUnknown && (
        <Input label="Ytterdiameter skrue (mm)" type="number" value={s.screwOuterDiameterMm?.toString() ?? ""}
          onChange={(v) => s.setField("screwOuterDiameterMm", v ? Number(v) : undefined)} placeholder="F.eks. 200, 300, 400" />
      )}
      <SelectionCard
        icon={<HelpCircle className="h-8 w-8" />}
        title="Vet ikke"
        description="Trenger hjelp til å dimensjonere ytterdiameter"
        selected={s.screwOuterDiameterUnknown}
        onClick={() => { s.setField("screwOuterDiameterUnknown", !s.screwOuterDiameterUnknown); if (!s.screwOuterDiameterUnknown) s.setField("screwOuterDiameterMm", undefined); }}
      />
    </div>
  );
}
