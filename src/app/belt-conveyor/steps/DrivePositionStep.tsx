"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { ArrowUpRight, ArrowDownLeft, Disc, Circle, HelpCircle } from "lucide-react";

const drivePositions = [
  { value: "head_discharge", label: "Hode (utlasting)", desc: "Motoren ved utmateren", icon: <ArrowUpRight className="h-8 w-8" /> },
  { value: "head_infeed", label: "Hode (innmating)", desc: "Motoren ved innmateren", icon: <ArrowDownLeft className="h-8 w-8" /> },
  { value: "center_drive", label: "Senterdrift", desc: "Motor plassert i midten", icon: <Disc className="h-8 w-8" /> },
  { value: "drum_motor", label: "Trommelmotor", desc: "Motor inne i trommelen", icon: <Circle className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function DrivePositionStep() {
  const { drivePosition, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {drivePositions.map((dp) => (
        <SelectionCard key={dp.value} icon={dp.icon} title={dp.label} description={dp.desc}
          selected={drivePosition === dp.value} onClick={() => setField("drivePosition", dp.value)} />
      ))}
    </div>
  );
}
