"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

export function BearingEndStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      {!s.bearingSizeUnknown && (
        <Input label="Lagerstørrelse opplagret ende (mm)" type="number" value={s.bearingSizeMm?.toString() ?? ""}
          onChange={(v) => s.setField("bearingSizeMm", v ? Number(v) : undefined)} placeholder="F.eks. 40, 50, 60" />
      )}
      <SelectionCard
        icon={<HelpCircle className="h-8 w-8" />}
        title="Vet ikke"
        description="Trenger hjelp med lagerstørrelse"
        selected={s.bearingSizeUnknown}
        onClick={() => { s.setField("bearingSizeUnknown", !s.bearingSizeUnknown); if (!s.bearingSizeUnknown) s.setField("bearingSizeMm", undefined); }}
      />
    </div>
  );
}
