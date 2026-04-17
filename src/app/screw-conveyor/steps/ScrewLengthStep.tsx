"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

export function ScrewLengthStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      {!s.screwLengthUnknown && (
        <Input label="Lengde skrue (mm)" type="number" value={s.screwLengthMm?.toString() ?? ""}
          onChange={(v) => s.setField("screwLengthMm", v ? Number(v) : undefined)} placeholder="F.eks. 2000, 3000, 5000" />
      )}
      <SelectionCard
        icon={<HelpCircle className="h-8 w-8" />}
        title="Vet ikke"
        description="Trenger hjelp med lengde"
        selected={s.screwLengthUnknown}
        onClick={() => { s.setField("screwLengthUnknown", !s.screwLengthUnknown); if (!s.screwLengthUnknown) s.setField("screwLengthMm", undefined); }}
      />
    </div>
  );
}
