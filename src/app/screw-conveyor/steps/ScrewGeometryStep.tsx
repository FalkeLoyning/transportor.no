"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ScrewGeometryStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Geometri</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Sentrallinjelengde (mm)" type="number" value={s.centerlineLengthMm?.toString() ?? ""} onChange={(v) => s.setField("centerlineLengthMm", v ? Number(v) : undefined)} />
        <Input label="Helningsvinkel (°)" type="number" value={s.inclineAngleDeg?.toString() ?? ""} onChange={(v) => s.setField("inclineAngleDeg", v ? Number(v) : undefined)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Innløpshøyde (mm)" type="number" value={s.inletElevationMm?.toString() ?? ""} onChange={(v) => s.setField("inletElevationMm", v ? Number(v) : undefined)} />
        <Input label="Utløpshøyde (mm)" type="number" value={s.dischargeElevationMm?.toString() ?? ""} onChange={(v) => s.setField("dischargeElevationMm", v ? Number(v) : undefined)} />
      </div>
      <Input label="Tilgjengelig installasjonsplass" value={s.installationSpace} onChange={(v) => s.setField("installationSpace", v)} placeholder="Beskriv begrensninger" />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Venstre-/høyrehånds" value={s.leftOrRightHand} onChange={(v) => s.setField("leftOrRightHand", v as typeof s.leftOrRightHand)}
          options={[{ value: "left", label: "Venstrehånds" }, { value: "right", label: "Høyrehånds" }]} />
        <Select label="Rotasjonsretning" value={s.rotationIfKnown} onChange={(v) => s.setField("rotationIfKnown", v as typeof s.rotationIfKnown)}
          options={[{ value: "cw", label: "Med klokken" }, { value: "ccw", label: "Mot klokken" }]} />
      </div>
    </div>
  );
}
