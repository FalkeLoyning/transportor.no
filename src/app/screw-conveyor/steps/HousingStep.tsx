"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";

const housingTypes = [
  { value: "u_trough", label: "U-trau", desc: "Standard, enkel tilgang" },
  { value: "tubular", label: "Rørformet", desc: "Støvtett, luktfri" },
  { value: "flared", label: "Utvidet", desc: "Større innmatingsåpning" },
  { value: "rectangular", label: "Rektangulær", desc: "Spesialapplikasjoner" },
] as const;

const coverTypes = [
  { value: "flanged", label: "Flensed" },
  { value: "semi_flanged", label: "Semi-flensed" },
  { value: "flat", label: "Flat" },
  { value: "gasketed", label: "Med pakning" },
] as const;

export function HousingStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Hus & deksel</h3>
      <div>
        <p className="text-sm text-muted mb-2">Hustype</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {housingTypes.map((h) => (
            <SelectionCard key={h.value} icon={null} title={h.label} description={h.desc}
              selected={s.housingType === h.value} onClick={() => s.setField("housingType", h.value)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">Dekseltype</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {coverTypes.map((c) => (
            <SelectionCard key={c.value} icon={null} title={c.label}
              selected={s.coverType === c.value} onClick={() => s.setField("coverType", c.value)} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[
          { key: "linerRequired" as const, label: "Slitasjeliner" },
          { key: "accessHatches" as const, label: "Inspeksjonsluker" },
          { key: "continuousWeld" as const, label: "Gjennomgående sveis" },
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
