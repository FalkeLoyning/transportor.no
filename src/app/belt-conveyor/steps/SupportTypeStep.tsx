"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { PanelBottom, CircleDot, RotateCcw, HelpCircle } from "lucide-react";

const supportTypes = [
  { value: "slide_bed", label: "Gliseng", desc: "For lette produkter, lav friksjon", icon: <PanelBottom className="h-8 w-8" /> },
  { value: "carrying_idlers", label: "Bæreruller", desc: "For tyngre gods og bulk", icon: <CircleDot className="h-8 w-8" /> },
  { value: "roller_support", label: "Rullestøtte", desc: "Redusert friksjon, lang levetid", icon: <RotateCcw className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function SupportTypeStep() {
  const { supportType, setField } = useBeltWizardStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      {supportTypes.map((st) => (
        <SelectionCard key={st.value} icon={st.icon} title={st.label} description={st.desc}
          selected={supportType === st.value} onClick={() => setField("supportType", st.value)} />
      ))}
    </div>
  );
}
