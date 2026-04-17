"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { HelpCircle, Minimize2 } from "lucide-react";

export function DimensionsStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <SelectionCard
        icon={<HelpCircle className="h-6 w-6" />}
        title="Vet ikke"
        description="Usikker på mål – trenger rådgivning"
        selected={s.dimensionsUnknown}
        onClick={() => s.setField("dimensionsUnknown", !s.dimensionsUnknown)}
      />
      {!s.dimensionsUnknown && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Input label="Total lengde (mm)" type="number" value={s.overallLengthMm?.toString() ?? ""} onChange={(v) => s.setField("overallLengthMm", v ? Number(v) : undefined)} />
            <Input label="Beltbredde (mm)" type="number" value={s.beltWidthMm?.toString() ?? ""} onChange={(v) => s.setField("beltWidthMm", v ? Number(v) : undefined)} />
            <Input label="Nyttebredde (mm)" type="number" value={s.usableWidthMm?.toString() ?? ""} onChange={(v) => s.setField("usableWidthMm", v ? Number(v) : undefined)} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Input label="Innmatingshøyde (mm)" type="number" value={s.infeedHeightMm?.toString() ?? ""} onChange={(v) => s.setField("infeedHeightMm", v ? Number(v) : undefined)} />
            <Input label="Utmatingshøyde (mm)" type="number" value={s.outfeedHeightMm?.toString() ?? ""} onChange={(v) => s.setField("outfeedHeightMm", v ? Number(v) : undefined)} />
            <Input label="Helningsvinkel (°)" type="number" value={s.inclineAngleDeg?.toString() ?? ""} onChange={(v) => s.setField("inclineAngleDeg", v ? Number(v) : undefined)} />
          </div>
          <SelectionCard
            icon={<Minimize2 className="h-6 w-6" />}
            title="Liten-produkt overføring"
            description="Knife edge / nose bar for små produkter"
            selected={s.smallProductTransfer}
            onClick={() => s.setField("smallProductTransfer", !s.smallProductTransfer)}
          />
        </>
      )}
    </div>
  );
}
