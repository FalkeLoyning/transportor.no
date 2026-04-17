"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Weight, BarChart3, Box, HelpCircle } from "lucide-react";

const units = [
  { value: "kg/h", label: "kg/h", desc: "Kilo per time", icon: <Weight className="h-6 w-6" /> },
  { value: "t/h", label: "t/h", desc: "Tonn per time", icon: <BarChart3 className="h-6 w-6" /> },
  { value: "m³/h", label: "m³/h", desc: "Kubikkmeter per time", icon: <Box className="h-6 w-6" /> },
] as const;

export function ScrewCapacityStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      {!s.capacityUnknown && (
        <>
          <Input label="Kapasitetsbehov" type="number" value={s.requiredCapacity?.toString() ?? ""}
            onChange={(v) => s.setField("requiredCapacity", v ? Number(v) : undefined)} placeholder="Mengde" />
          <div>
            <p className="text-sm text-muted mb-3">Enhet</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {units.map((u) => (
                <SelectionCard key={u.value} icon={u.icon} title={u.label} description={u.desc}
                  selected={s.capacityUnit === u.value} onClick={() => s.setField("capacityUnit", u.value)} />
              ))}
            </div>
          </div>
        </>
      )}
      <SelectionCard
        icon={<HelpCircle className="h-8 w-8" />}
        title="Vet ikke"
        description="Trenger hjelp med kapasitetsberegning"
        selected={s.capacityUnknown}
        onClick={() => { s.setField("capacityUnknown", !s.capacityUnknown); if (!s.capacityUnknown) s.setField("requiredCapacity", undefined); }}
      />
    </div>
  );
}
