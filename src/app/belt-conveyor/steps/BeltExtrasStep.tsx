"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { ChevronUp, PanelLeft, Route, Zap } from "lucide-react";

const extras = [
  { key: "cleats" as const, label: "Medbringere (cleats)", desc: "Hindrer at gods sklir ned", icon: <ChevronUp className="h-6 w-6" /> },
  { key: "sidewalls" as const, label: "Sidevegger", desc: "Holder materiale på båndet", icon: <PanelLeft className="h-6 w-6" /> },
  { key: "guideProfiles" as const, label: "Styreprofiler", desc: "Sporings­kontroll av båndet", icon: <Route className="h-6 w-6" /> },
  { key: "antistaticRequired" as const, label: "Antistatisk påkrevd", desc: "ESD-krav til hele systemet", icon: <Zap className="h-6 w-6" /> },
] as const;

export function BeltExtrasStep() {
  const s = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {extras.map((e) => (
        <SelectionCard key={e.key} icon={e.icon} title={e.label} description={e.desc}
          selected={s[e.key]} onClick={() => s.setField(e.key, !s[e.key])} />
      ))}
    </div>
  );
}
