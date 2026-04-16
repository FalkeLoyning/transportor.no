"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ScrewMaterialStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Materiale</h3>
      <Input label="Materialenavn" value={s.materialName} onChange={(v) => s.setField("materialName", v)} placeholder="F.eks. sement, korn, spon" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Input label="Bulkdensitet (kg/m³)" type="number" value={s.bulkDensityKgM3?.toString() ?? ""} onChange={(v) => s.setField("bulkDensityKgM3", v ? Number(v) : undefined)} />
        <Input label="Partikkelstr. (mm)" type="number" value={s.particleSizeMm?.toString() ?? ""} onChange={(v) => s.setField("particleSizeMm", v ? Number(v) : undefined)} />
        <Input label="Klumpstr. (mm)" type="number" value={s.lumpSizeMm?.toString() ?? ""} onChange={(v) => s.setField("lumpSizeMm", v ? Number(v) : undefined)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Select label="Flyteevne" value={s.flowability} onChange={(v) => s.setField("flowability", v as typeof s.flowability)}
          options={[{ value: "free", label: "Frittflytende" }, { value: "medium", label: "Middels" }, { value: "sluggish", label: "Treg" }]} />
        <Select label="Abrasivitet" value={s.abrasiveness} onChange={(v) => s.setField("abrasiveness", v as typeof s.abrasiveness)}
          options={[{ value: "low", label: "Lav" }, { value: "medium", label: "Middels" }, { value: "high", label: "Høy" }]} />
        <Select label="Korrosivitet" value={s.corrosiveness} onChange={(v) => s.setField("corrosiveness", v as typeof s.corrosiveness)}
          options={[{ value: "low", label: "Lav" }, { value: "medium", label: "Middels" }, { value: "high", label: "Høy" }]} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Temperatur (°C)" type="number" value={s.temperatureC?.toString() ?? ""} onChange={(v) => s.setField("temperatureC", v ? Number(v) : undefined)} />
        <Input label="Fuktighet" value={s.moisture} onChange={(v) => s.setField("moisture", v)} placeholder="F.eks. tørr, 5%" />
      </div>
      <div className="flex flex-wrap gap-4">
        {[
          { key: "stickyStringy" as const, label: "Klebrig/seigt" },
          { key: "odorVapor" as const, label: "Lukt/damp" },
          { key: "atexMaterial" as const, label: "ATEX-klassifisert" },
          { key: "unknownMaterial" as const, label: "Ukjent – trenger rådgivning" },
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
