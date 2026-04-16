"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function SafetyStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Sikkerhet & sertifisering</h3>
      <div className="flex flex-wrap gap-6">
        {[
          { key: "ceRequired" as const, label: "CE-merking" },
          { key: "ukcaRequired" as const, label: "UKCA-merking" },
          { key: "atexApplicable" as const, label: "ATEX aktuelt" },
          { key: "emergencyStop" as const, label: "Nødstopp" },
          { key: "lockoutNeeds" as const, label: "LOTO-behov" },
          { key: "riskAssessmentRequired" as const, label: "Risikovurdering" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={s[key]} onChange={(e) => s.setField(key, e.target.checked)} className="rounded border-white/20 bg-surface" />
            {label}
          </label>
        ))}
      </div>
      {s.atexApplicable && (
        <Input label="ATEX-sone" value={s.atexZone} onChange={(v) => s.setField("atexZone", v)} placeholder="F.eks. Zone 21" />
      )}
      <Input label="Avskjermingsomfang" value={s.guardingScope} onChange={(v) => s.setField("guardingScope", v)} placeholder="Beskriv behov" />
      <Select label="Dokumentasjonsspråk" value={s.documentationLang} onChange={(v) => s.setField("documentationLang", v)}
        options={[
          { value: "nb-NO", label: "Norsk" },
          { value: "en-GB", label: "Engelsk" },
          { value: "sv-SE", label: "Svensk" },
          { value: "da-DK", label: "Dansk" },
        ]} />
    </div>
  );
}
