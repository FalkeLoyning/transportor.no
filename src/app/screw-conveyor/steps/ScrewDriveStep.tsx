"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ScrewDriveStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Drivverk</h3>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.gearReducerMotor} onChange={(e) => s.setField("gearReducerMotor", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Gir + motor
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.vfd} onChange={(e) => s.setField("vfd", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Frekvensomformer (VFD)
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.torqueArm} onChange={(e) => s.setField("torqueArm", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Momentarm
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.reverse} onChange={(e) => s.setField("reverse", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Reversibel
        </label>
      </div>
      <Select label="Drivside" value={s.driveSide} onChange={(v) => s.setField("driveSide", v as typeof s.driveSide)}
        options={[{ value: "inlet", label: "Innløpsside" }, { value: "discharge", label: "Utløpsside" }]} />
      <Input label="Starter-type" value={s.starterType} onChange={(v) => s.setField("starterType", v)} placeholder="F.eks. DOL, star-delta" />
      <Input label="Virkningsgrad (%) – valgfritt" type="number" value={s.efficiencyIfKnown?.toString() ?? ""} onChange={(v) => s.setField("efficiencyIfKnown", v ? Number(v) : undefined)} />
    </div>
  );
}
