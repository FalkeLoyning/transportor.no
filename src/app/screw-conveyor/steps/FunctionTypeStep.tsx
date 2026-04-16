"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Select } from "@/components/ui/select";
import { ArrowRight, Filter, TrendingUp, ArrowUp, Disc, Blend } from "lucide-react";

const modes = [
  { value: "conveyor", label: "Transportør", desc: "Horisontal. Standard.", icon: <ArrowRight className="h-6 w-6" /> },
  { value: "feeder", label: "Mater/føder", desc: "Dosering fra silo/hopper", icon: <Filter className="h-6 w-6" /> },
  { value: "inclined", label: "Skrå", desc: "Opptil 45°", icon: <TrendingUp className="h-6 w-6" /> },
  { value: "vertical", label: "Vertikal", desc: "Vertikal løfting", icon: <ArrowUp className="h-6 w-6" /> },
  { value: "shaftless", label: "Akselløs", desc: "Klebrig/seigt materiale", icon: <Disc className="h-6 w-6" /> },
  { value: "mixing", label: "Mikser/blander", desc: "Blande under transport", icon: <Blend className="h-6 w-6" /> },
] as const;

export function FunctionTypeStep() {
  const { screwMode, quotePurpose, setField } = useScrewWizardStore();
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Funksjonstype</h3>
        <p className="text-sm text-muted mb-4">Hva skal skruetransportøren gjøre?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modes.map((m) => (
            <SelectionCard key={m.value} icon={m.icon} title={m.label} description={m.desc}
              selected={screwMode === m.value} onClick={() => setField("screwMode", m.value)} />
          ))}
        </div>
      </div>
      <Select label="Formål" value={quotePurpose} onChange={(v) => setField("quotePurpose", v as typeof quotePurpose)}
        options={[{ value: "new", label: "Nyanlegg" }, { value: "replacement", label: "Erstatning" }]} />
    </div>
  );
}
