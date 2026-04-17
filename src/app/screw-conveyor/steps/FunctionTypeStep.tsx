"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { ArrowRight, Filter, TrendingUp, ArrowUp, Disc, Blend, HelpCircle } from "lucide-react";

const modes = [
  { value: "conveyor", label: "Transportør", desc: "Horisontal. Standard.", icon: <ArrowRight className="h-8 w-8" /> },
  { value: "feeder", label: "Mater/føder", desc: "Dosering fra silo/hopper", icon: <Filter className="h-8 w-8" /> },
  { value: "inclined", label: "Skrå", desc: "Skråstilt transport", icon: <TrendingUp className="h-8 w-8" /> },
  { value: "vertical", label: "Vertikal", desc: "Vertikal løfting", icon: <ArrowUp className="h-8 w-8" /> },
  { value: "shaftless", label: "Akselløs", desc: "Klebrig/seigt materiale", icon: <Disc className="h-8 w-8" /> },
  { value: "mixing", label: "Mikser/blander", desc: "Blande under transport", icon: <Blend className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function FunctionTypeStep() {
  const { screwMode, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {modes.map((m) => (
        <SelectionCard key={m.value} icon={m.icon} title={m.label} description={m.desc}
          selected={screwMode === m.value} onClick={() => setField("screwMode", m.value)} />
      ))}
    </div>
  );
}
