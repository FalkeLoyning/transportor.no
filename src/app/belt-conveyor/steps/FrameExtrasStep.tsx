"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Columns2, AlignHorizontalJustifyCenter, ShieldCheck, Droplets, LayoutPanelLeft } from "lucide-react";

const extras = [
  { key: "stands" as const, label: "Gulvstativ", desc: "Frittstående bein/ramme", icon: <Columns2 className="h-6 w-6" /> },
  { key: "sideRails" as const, label: "Sidekanter/rails", desc: "Holder gods på plass", icon: <AlignHorizontalJustifyCenter className="h-6 w-6" /> },
  { key: "covers" as const, label: "Deksler", desc: "Beskytter båndet", icon: <ShieldCheck className="h-6 w-6" /> },
  { key: "washdown" as const, label: "Nedspyling (IP65+)", desc: "Tåler direkte vask", icon: <Droplets className="h-6 w-6" /> },
  { key: "openFrame" as const, label: "Åpen ramme", desc: "Enkel tilgang og rengjøring", icon: <LayoutPanelLeft className="h-6 w-6" /> },
] as const;

export function FrameExtrasStep() {
  const s = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {extras.map((e) => (
        <SelectionCard key={e.key} icon={e.icon} title={e.label} description={e.desc}
          selected={s[e.key]} onClick={() => s.setField(e.key, !s[e.key])} />
      ))}
    </div>
  );
}
