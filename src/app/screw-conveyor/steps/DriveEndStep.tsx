"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Cog, Key, CircleDot, Grip, HelpCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const couplings = [
  { value: "spline", label: "Spline", desc: "Innvendig spor i akselen", icon: <Cog className="h-8 w-8" /> },
  { value: "keyway", label: "Kilspor", desc: "Kile og spor i akselen", icon: <Key className="h-8 w-8" /> },
  { value: "clamp_ring", label: "Klemring", desc: "Klembefestigelse", icon: <CircleDot className="h-8 w-8" /> },
  { value: "driver", label: "Medbringer", desc: "Medbringer kobling", icon: <Grip className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

const driveEnds = [
  { value: "inlet", label: "Innløpsende", desc: "Drivende på innmatingen", icon: <ArrowDownLeft className="h-8 w-8" /> },
  { value: "discharge", label: "Utløpsende", desc: "Drivende på utløpet", icon: <ArrowUpRight className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Usikker på drivende ende", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function DriveEndStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted mb-3">Type kobling</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {couplings.map((c) => (
            <SelectionCard key={c.value} icon={c.icon} title={c.label} description={c.desc}
              selected={s.driveCoupling === c.value} onClick={() => s.setField("driveCoupling", c.value)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted mb-3">Hvilken ende er drivende?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {driveEnds.map((d) => (
            <SelectionCard key={d.value} icon={d.icon} title={d.label} description={d.desc}
              selected={s.driveEnd === d.value} onClick={() => s.setField("driveEnd", d.value)} />
          ))}
        </div>
      </div>
    </div>
  );
}
