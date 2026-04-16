"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ScrewCapacityStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Kapasitet & drift</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Kapasitetsbehov" type="number" value={s.requiredCapacity?.toString() ?? ""} onChange={(v) => s.setField("requiredCapacity", v ? Number(v) : undefined)} />
        <Select label="Enhet" value={s.capacityUnit} onChange={(v) => s.setField("capacityUnit", v as typeof s.capacityUnit)}
          options={[{ value: "kg/h", label: "kg/h" }, { value: "t/h", label: "t/h" }, { value: "m³/h", label: "m³/h" }]} />
      </div>
      <Input label="Turndown ratio" type="number" value={s.turndownRatio.toString()} onChange={(v) => s.setField("turndownRatio", Number(v) || 1)} />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Batch/Kontinuerlig" value={s.batchOrContinuous} onChange={(v) => s.setField("batchOrContinuous", v as typeof s.batchOrContinuous)}
          options={[{ value: "batch", label: "Batch" }, { value: "continuous", label: "Kontinuerlig" }]} />
        <Select label="Matenøyaktighet" value={s.feedAccuracy} onChange={(v) => s.setField("feedAccuracy", v as typeof s.feedAccuracy)}
          options={[{ value: "low", label: "Lav" }, { value: "medium", label: "Middels" }, { value: "high", label: "Høy" }]} />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
        <input type="checkbox" checked={s.surgeLoads} onChange={(e) => s.setField("surgeLoads", e.target.checked)} className="rounded border-white/20 bg-surface" />
        Støtbelastninger mulig
      </label>
    </div>
  );
}
