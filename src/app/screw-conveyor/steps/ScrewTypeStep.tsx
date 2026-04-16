"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { Disc, Circle, Scissors, Wrench, Blend } from "lucide-react";

const shaftTypes = [
  { value: "shafted", label: "Med aksel", icon: <Circle className="h-5 w-5" /> },
  { value: "shaftless", label: "Akselløs", icon: <Disc className="h-5 w-5" /> },
] as const;

const flightTypes = [
  { value: "single_flight", label: "Enkelt vinge" },
  { value: "ribbon", label: "Ribbon" },
  { value: "cut", label: "Kuttet" },
  { value: "cut_folded", label: "Kuttet & brettet" },
  { value: "paddles", label: "Padler" },
] as const;

const pitchTypes = [
  { value: "standard", label: "Standard (=D)" },
  { value: "short_2_3D", label: "Kort (2/3 D)" },
  { value: "half_1_2D", label: "Halv (1/2 D)" },
  { value: "variable", label: "Variabel" },
] as const;

export function ScrewTypeStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Skruetype</h3>
      <div>
        <p className="text-sm text-muted mb-2">Akseltype</p>
        <div className="grid grid-cols-2 gap-3">
          {shaftTypes.map((st) => (
            <SelectionCard key={st.value} icon={st.icon} title={st.label} selected={s.shaftType === st.value} onClick={() => s.setField("shaftType", st.value)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">Vingetype</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {flightTypes.map((ft) => (
            <SelectionCard key={ft.value} icon={null} title={ft.label} selected={s.flightType === ft.value} onClick={() => s.setField("flightType", ft.value)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">Stigning (pitch)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pitchTypes.map((pt) => (
            <SelectionCard key={pt.value} icon={null} title={pt.label} selected={s.pitchType === pt.value} onClick={() => s.setField("pitchType", pt.value)} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Diameter (mm) – valgfritt" type="number" value={s.diameterKnown?.toString() ?? ""} onChange={(v) => s.setField("diameterKnown", v ? Number(v) : undefined)} />
        <Input label="Turtall (rpm) – valgfritt" type="number" value={s.speedKnown?.toString() ?? ""} onChange={(v) => s.setField("speedKnown", v ? Number(v) : undefined)} />
      </div>
    </div>
  );
}
