"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";

export function MaterialStep() {
  const s = useBeltWizardStore();
  const isBulk = s.applicationMode === "bulk";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        {isBulk ? "Bulkmateriale" : "Produkt / Enhet"}
      </h3>

      {isBulk ? (
        <div className="space-y-4">
          <Input label="Materialenavn" value={s.materialName} onChange={(v) => s.setField("materialName", v)} placeholder="F.eks. hvete, sand, sement" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Bulkdensitet (kg/m³)" type="number" value={s.bulkDensityKgM3?.toString() ?? ""} onChange={(v) => s.setField("bulkDensityKgM3", v ? Number(v) : undefined)} />
            <Input label="Partikkelstørrelse (mm)" type="number" value={s.particleSizeMm?.toString() ?? ""} onChange={(v) => s.setField("particleSizeMm", v ? Number(v) : undefined)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Klumpstørrelse (mm)" type="number" value={s.lumpSizeMm?.toString() ?? ""} onChange={(v) => s.setField("lumpSizeMm", v ? Number(v) : undefined)} />
            <Input label="Temperatur (°C)" type="number" value={s.materialTemperatureC?.toString() ?? ""} onChange={(v) => s.setField("materialTemperatureC", v ? Number(v) : undefined)} />
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { key: "materialSticky" as const, label: "Klebrig" },
              { key: "materialDusty" as const, label: "Støvende" },
              { key: "materialAbrasive" as const, label: "Abrasivt" },
              { key: "materialCorrosive" as const, label: "Korrosivt" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input type="checkbox" checked={s[key]} onChange={(e) => s.setField(key, e.target.checked)}
                  className="rounded border-white/20 bg-surface" />
                {label}
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
            <input type="checkbox" checked={s.unknownMaterial} onChange={(e) => s.setField("unknownMaterial", e.target.checked)} className="rounded border-white/20 bg-surface" />
            Ukjent materiale – trenger rådgivning
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <Input label="Produktnavn" value={s.productName} onChange={(v) => s.setField("productName", v)} placeholder="F.eks. kartong, flaske" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input label="Lengde (mm)" type="number" value={s.productLengthMm?.toString() ?? ""} onChange={(v) => s.setField("productLengthMm", v ? Number(v) : undefined)} />
            <Input label="Bredde (mm)" type="number" value={s.productWidthMm?.toString() ?? ""} onChange={(v) => s.setField("productWidthMm", v ? Number(v) : undefined)} />
            <Input label="Høyde (mm)" type="number" value={s.productHeightMm?.toString() ?? ""} onChange={(v) => s.setField("productHeightMm", v ? Number(v) : undefined)} />
            <Input label="Vekt (kg)" type="number" value={s.productWeightKg?.toString() ?? ""} onChange={(v) => s.setField("productWeightKg", v ? Number(v) : undefined)} />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={s.orientationCritical} onChange={(e) => s.setField("orientationCritical", e.target.checked)} className="rounded border-white/20 bg-surface" />
              Orientering er kritisk
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={s.accumulationAllowed} onChange={(e) => s.setField("accumulationAllowed", e.target.checked)} className="rounded border-white/20 bg-surface" />
              Akkumulering tillatt
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
