"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Hash, Weight, BarChart3, Box, HelpCircle } from "lucide-react";

const units = [
  { value: "stk/min", label: "stk/min", desc: "Enheter per minutt", icon: <Hash className="h-6 w-6" /> },
  { value: "kg/h", label: "kg/h", desc: "Kilo per time", icon: <Weight className="h-6 w-6" /> },
  { value: "t/h", label: "t/h", desc: "Tonn per time", icon: <BarChart3 className="h-6 w-6" /> },
  { value: "m³/h", label: "m³/h", desc: "Kubikkmeter per time", icon: <Box className="h-6 w-6" /> },
] as const;

export function ThroughputStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <SelectionCard
        icon={<HelpCircle className="h-6 w-6" />}
        title="Vet ikke"
        description="Usikker på kapasitetsbehov"
        selected={s.capacityUnknown}
        onClick={() => s.setField("capacityUnknown", !s.capacityUnknown)}
      />
      {!s.capacityUnknown && (
        <>
          <Input label="Kapasitetsbehov" type="number" value={s.throughputValue?.toString() ?? ""} onChange={(v) => s.setField("throughputValue", v ? Number(v) : undefined)} placeholder="Antall / mengde" />
          <div>
            <p className="text-sm text-muted mb-3">Enhet</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {units.map((u) => (
                <SelectionCard key={u.value} icon={u.icon} title={u.label} description={u.desc}
                  selected={s.throughputUnit === u.value} onClick={() => s.setField("throughputUnit", u.value)} />
              ))}
            </div>
          </div>
          <Input label="Ønsket hastighet (m/min)" type="number" value={s.targetSpeedMPerMin?.toString() ?? ""} onChange={(v) => s.setField("targetSpeedMPerMin", v ? Number(v) : undefined)} placeholder="Valgfritt" />
        </>
      )}
    </div>
  );
}
