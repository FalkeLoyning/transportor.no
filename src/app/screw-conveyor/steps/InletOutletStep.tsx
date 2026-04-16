"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";

export function InletOutletStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Innløp & utløp</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Antall innløp" type="number" value={s.inletCount.toString()} onChange={(v) => s.setField("inletCount", Number(v) || 1)} />
        <Input label="Innløpsposisjoner" value={s.inletPositions} onChange={(v) => s.setField("inletPositions", v)} placeholder="F.eks. 0mm fra start" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Antall utløp" type="number" value={s.outletCount.toString()} onChange={(v) => s.setField("outletCount", Number(v) || 1)} />
        <Input label="Utløpsposisjoner" value={s.outletPositions} onChange={(v) => s.setField("outletPositions", v)} placeholder="F.eks. ende" />
      </div>
      <div className="flex flex-wrap gap-4">
        {[
          { key: "slideGates" as const, label: "Spjeld (slide gates)" },
          { key: "endBearings" as const, label: "Endelagre" },
          { key: "hangerBearings" as const, label: "Hengelagre" },
          { key: "inspectionPorts" as const, label: "Inspeksjonsporter" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={s[key]} onChange={(e) => s.setField(key, e.target.checked)} className="rounded border-white/20 bg-surface" />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
