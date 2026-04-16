"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Clock, Repeat, RotateCcw } from "lucide-react";

const dutyOptions = [
  { value: "continuous", label: "Kontinuerlig", icon: <Clock className="h-5 w-5" /> },
  { value: "batch", label: "Batch/kampanje", icon: <Repeat className="h-5 w-5" /> },
  { value: "shift_24_7", label: "24/7 skift", icon: <RotateCcw className="h-5 w-5" /> },
] as const;

export function CapacityStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Kapasitet & drift</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Kapasitetsbehov" type="number" value={s.throughputValue?.toString() ?? ""} onChange={(v) => s.setField("throughputValue", v ? Number(v) : undefined)} />
        <Select label="Enhet" value={s.throughputUnit} onChange={(v) => s.setField("throughputUnit", v as typeof s.throughputUnit)}
          options={[{ value: "stk/min", label: "stk/min" }, { value: "kg/h", label: "kg/h" }, { value: "t/h", label: "t/h" }, { value: "m³/h", label: "m³/h" }]} />
      </div>
      <Input label="Ønsket hastighet (m/min)" type="number" value={s.targetSpeedMPerMin?.toString() ?? ""} onChange={(v) => s.setField("targetSpeedMPerMin", v ? Number(v) : undefined)} />
      <div>
        <p className="text-sm text-muted mb-2">Driftstype</p>
        <div className="grid grid-cols-3 gap-3">
          {dutyOptions.map((d) => (
            <SelectionCard key={d.value} icon={d.icon} title={d.label} selected={s.duty === d.value} onClick={() => s.setField("duty", d.value)} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.reverseOperation} onChange={(e) => s.setField("reverseOperation", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Reversibel drift
        </label>
      </div>
    </div>
  );
}
