"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Square, Grip, Layers, Shield, Zap, Flame, HelpCircle } from "lucide-react";

const surfaces = [
  { value: "smooth", label: "Glatt", desc: "Universell overflate", icon: <Square className="h-8 w-8" /> },
  { value: "grip", label: "Grip-topp", desc: "Økt friksjon", icon: <Grip className="h-8 w-8" /> },
  { value: "structured", label: "Strukturert", desc: "Mønster for grep", icon: <Layers className="h-8 w-8" /> },
  { value: "fda_hygiene", label: "FDA/Hygiene", desc: "Matkontakt-godkjent", icon: <Shield className="h-8 w-8" /> },
  { value: "antistatic", label: "Antistatisk", desc: "ESD-beskyttelse", icon: <Zap className="h-8 w-8" /> },
  { value: "flame_retardant", label: "Flammehemmende", desc: "Brannmotstand", icon: <Flame className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function BeltSurfaceStep() {
  const { beltSurface, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {surfaces.map((sf) => (
        <SelectionCard key={sf.value} icon={sf.icon} title={sf.label} description={sf.desc}
          selected={beltSurface === sf.value} onClick={() => setField("beltSurface", sf.value)} />
      ))}
    </div>
  );
}
