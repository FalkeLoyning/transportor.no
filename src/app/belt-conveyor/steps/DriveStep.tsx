"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownLeft, Disc, Circle } from "lucide-react";

const drivePositions = [
  { value: "head_discharge", label: "Hode (utlasting)", icon: <ArrowUpRight className="h-5 w-5" /> },
  { value: "head_infeed", label: "Hode (innmating)", icon: <ArrowDownLeft className="h-5 w-5" /> },
  { value: "center_drive", label: "Senterdrift", icon: <Disc className="h-5 w-5" /> },
  { value: "drum_motor", label: "Trommelmotor", icon: <Circle className="h-5 w-5" /> },
] as const;

export function DriveStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Drivverk</h3>
      <div>
        <p className="text-sm text-muted mb-2">Drivposisjon</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {drivePositions.map((dp) => (
            <SelectionCard key={dp.value} icon={dp.icon} title={dp.label} selected={s.drivePosition === dp.value} onClick={() => s.setField("drivePosition", dp.value)} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select label="Motorside" value={s.motorSide} onChange={(v) => s.setField("motorSide", v as typeof s.motorSide)}
          options={[{ value: "left", label: "Venstre" }, { value: "right", label: "Høyre" }]} />
        <Select label="Over/under" value={s.aboveBelow} onChange={(v) => s.setField("aboveBelow", v as typeof s.aboveBelow)}
          options={[{ value: "above", label: "Over" }, { value: "below", label: "Under" }]} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Spenning" value={s.voltage} onChange={(v) => s.setField("voltage", v)} />
        <Input label="IP-klasse" value={s.ipClass} onChange={(v) => s.setField("ipClass", v)} />
      </div>
      <Select label="Hastighetsregulering" value={s.speedControl} onChange={(v) => s.setField("speedControl", v as typeof s.speedControl)}
        options={[
          { value: "fixed", label: "Fast hastighet" },
          { value: "vfd", label: "Frekvensomformer (VFD)" },
          { value: "servo", label: "Servo" },
        ]} />
    </div>
  );
}
