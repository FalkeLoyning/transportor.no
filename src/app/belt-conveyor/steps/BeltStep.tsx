"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Grip, Layers, Square, Timer, Zap, Shield } from "lucide-react";

const families = [
  { value: "pvc", label: "PVC", desc: "Standard, kostnadseffektiv" },
  { value: "tpu", label: "TPU", desc: "Oljebestandig, fleksibel" },
  { value: "monolithic_tpu", label: "Monolittisk TPU", desc: "Hygiene, enkel rengjøring" },
  { value: "modular_plastic", label: "Modulbånd", desc: "Robust, utskiftbare lenker" },
  { value: "timing_belt", label: "Timing belt", desc: "Presis posisjonering" },
  { value: "bulk_rubber", label: "Bulk gummi", desc: "Tungt gods, bulkmateriale" },
] as const;

const surfaces = [
  { value: "smooth", label: "Glatt", icon: <Square className="h-4 w-4" /> },
  { value: "grip", label: "Grip-topp", icon: <Grip className="h-4 w-4" /> },
  { value: "structured", label: "Strukturert", icon: <Layers className="h-4 w-4" /> },
  { value: "fda_hygiene", label: "FDA/Hygiene", icon: <Shield className="h-4 w-4" /> },
  { value: "antistatic", label: "Antistatisk", icon: <Zap className="h-4 w-4" /> },
  { value: "flame_retardant", label: "Flammehemmende", icon: <Timer className="h-4 w-4" /> },
] as const;

export function BeltStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Beltvalg</h3>
      <div>
        <p className="text-sm text-muted mb-2">Beltfamilie</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {families.map((f) => (
            <SelectionCard key={f.value} icon={null} title={f.label} description={f.desc} selected={s.beltFamily === f.value} onClick={() => s.setField("beltFamily", f.value)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">Overflate</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {surfaces.map((sf) => (
            <SelectionCard key={sf.value} icon={sf.icon} title={sf.label} selected={s.beltSurface === sf.value} onClick={() => s.setField("beltSurface", sf.value)} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[
          { key: "cleats" as const, label: "Medbringere (cleats)" },
          { key: "sidewalls" as const, label: "Sidevegger" },
          { key: "guideProfiles" as const, label: "Styreprofiler" },
          { key: "antistaticRequired" as const, label: "Antistatisk påkrevd" },
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
