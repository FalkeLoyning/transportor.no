"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Layers, Droplets, Shield, Grid3X3, Crosshair, Truck, HelpCircle } from "lucide-react";

const families = [
  { value: "pvc", label: "PVC", desc: "Standard, kostnadseffektiv", icon: <Layers className="h-8 w-8" /> },
  { value: "tpu", label: "TPU", desc: "Oljebestandig, fleksibel", icon: <Droplets className="h-8 w-8" /> },
  { value: "monolithic_tpu", label: "Monolittisk TPU", desc: "Hygiene, enkel rengjøring", icon: <Shield className="h-8 w-8" /> },
  { value: "modular_plastic", label: "Modulbånd", desc: "Robust, utskiftbare lenker", icon: <Grid3X3 className="h-8 w-8" /> },
  { value: "timing_belt", label: "Timing belt", desc: "Presis posisjonering", icon: <Crosshair className="h-8 w-8" /> },
  { value: "bulk_rubber", label: "Bulk gummi", desc: "Tungt gods, bulkmateriale", icon: <Truck className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function BeltFamilyStep() {
  const { beltFamily, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {families.map((f) => (
        <SelectionCard key={f.value} icon={f.icon} title={f.label} description={f.desc}
          selected={beltFamily === f.value} onClick={() => setField("beltFamily", f.value)} />
      ))}
    </div>
  );
}
