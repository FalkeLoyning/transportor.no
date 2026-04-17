"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { HelpCircle } from "lucide-react";

const flightTypes = [
  { value: "single_flight", label: "Enkelt vinge", desc: "Standard transport" },
  { value: "ribbon", label: "Ribbon", desc: "For klebrig materiale" },
  { value: "cut", label: "Kuttet", desc: "Blanding under transport" },
  { value: "cut_folded", label: "Kuttet & brettet", desc: "Intensiv blanding" },
  { value: "paddles", label: "Padler", desc: "Agitasjon og blanding" },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning" },
] as const;

export function FlightTypeStep() {
  const { flightType, setField } = useScrewWizardStore();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {flightTypes.map((ft) => (
        <SelectionCard key={ft.value} icon={ft.value === "unknown" ? <HelpCircle className="h-8 w-8" /> : null} title={ft.label} description={ft.desc}
          selected={flightType === ft.value} onClick={() => setField("flightType", ft.value)} />
      ))}
    </div>
  );
}
