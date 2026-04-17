"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { ArrowRight, TrendingUp, Mountain, CornerDownRight, Shuffle, HelpCircle } from "lucide-react";

const routes = [
  { value: "straight", label: "Rett", desc: "Horisontal transport", icon: <ArrowRight className="h-8 w-8" /> },
  { value: "incline_under_20", label: "Helning <20°", desc: "Moderat stigning", icon: <TrendingUp className="h-8 w-8" /> },
  { value: "incline_above_20", label: "Helning >20°", desc: "Bratt stigning", icon: <Mountain className="h-8 w-8" /> },
  { value: "curve", label: "Kurve", desc: "Retningsendring", icon: <CornerDownRight className="h-8 w-8" /> },
  { value: "combination", label: "Kombinasjon", desc: "Blanding av ruter", icon: <Shuffle className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function RouteTypeStep() {
  const { routeType, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {routes.map((r) => (
        <SelectionCard key={r.value} icon={r.icon} title={r.label} description={r.desc}
          selected={routeType === r.value} onClick={() => setField("routeType", r.value)} />
      ))}
    </div>
  );
}
