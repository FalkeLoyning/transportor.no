"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Square, Shield, Wrench } from "lucide-react";

const frameMats = [
  { value: "aluminium", label: "Aluminium", desc: "Lett, korrosjonsbestandig", icon: <Square className="h-5 w-5" /> },
  { value: "stainless_steel", label: "Rustfritt stål", desc: "Hygiene, kjemisk bestandig", icon: <Shield className="h-5 w-5" /> },
  { value: "painted_steel", label: "Lakkert stål", desc: "Kostnadseffektivt, robust", icon: <Wrench className="h-5 w-5" /> },
] as const;

const supportTypes = [
  { value: "slide_bed", label: "Gliseng", desc: "For lette produkter" },
  { value: "carrying_idlers", label: "Bæreruller", desc: "For tyngre gods" },
  { value: "roller_support", label: "Rullestøtte", desc: "Redusert friksjon" },
] as const;

export function FrameStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Ramme & understøttelse</h3>
      <div>
        <p className="text-sm text-muted mb-2">Rammemateriale</p>
        <div className="grid grid-cols-3 gap-3">
          {frameMats.map((f) => (
            <SelectionCard key={f.value} icon={f.icon} title={f.label} description={f.desc} selected={s.frameMaterial === f.value} onClick={() => s.setField("frameMaterial", f.value)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">Understøttelse</p>
        <div className="grid grid-cols-3 gap-3">
          {supportTypes.map((st) => (
            <SelectionCard key={st.value} icon={null} title={st.label} description={st.desc} selected={s.supportType === st.value} onClick={() => s.setField("supportType", st.value)} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[
          { key: "stands" as const, label: "Gulvstativ" },
          { key: "sideRails" as const, label: "Sidekanter/rails" },
          { key: "covers" as const, label: "Deksler" },
          { key: "washdown" as const, label: "Nedspyling (IP65+)" },
          { key: "openFrame" as const, label: "Åpen ramme" },
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
