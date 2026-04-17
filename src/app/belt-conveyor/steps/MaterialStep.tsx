"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { Package, Wheat, Mountain, Apple, Pill, Recycle, FlaskConical, HelpCircle } from "lucide-react";

const materials = [
  { value: "kartong", label: "Kartonger / kasser", desc: "Esker, pakker, kartonger", icon: <Package className="h-8 w-8" /> },
  { value: "korn", label: "Korn / frø", desc: "Hvete, bygg, mais, raps", icon: <Wheat className="h-8 w-8" /> },
  { value: "sand", label: "Sand / grus / stein", desc: "Aggregater, malm, mineraler", icon: <Mountain className="h-8 w-8" /> },
  { value: "mat", label: "Matvarer", desc: "Fisk, kjøtt, grønnsaker, bakeri", icon: <Apple className="h-8 w-8" /> },
  { value: "farma", label: "Farma / medisinsk", desc: "Tabletter, ampuller, poser", icon: <Pill className="h-8 w-8" /> },
  { value: "avfall", label: "Avfall / resirk.", desc: "Sortering, gjenvinning", icon: <Recycle className="h-8 w-8" /> },
  { value: "kjemikalie", label: "Kjemikalier", desc: "Pulver, granulat, væsker", icon: <FlaskConical className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function MaterialStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {materials.map((m) => (
          <SelectionCard
            key={m.value}
            icon={m.icon}
            title={m.label}
            description={m.desc}
            selected={m.value === "unknown" ? s.unknownMaterial : s.materialName === m.value}
            onClick={() => {
              if (m.value === "unknown") {
                s.setField("unknownMaterial", true);
                s.setField("materialName", "");
                s.setField("productName", "");
              } else {
                s.setField("unknownMaterial", false);
                s.setField("materialName", m.value);
                s.setField("productName", m.value);
              }
            }}
          />
        ))}
      </div>
      <Input
        label="Eller beskriv materialet"
        value={s.unknownMaterial ? "" : (materials.some((m) => m.value === s.materialName) ? "" : s.materialName)}
        onChange={(v) => {
          s.setField("materialName", v);
          s.setField("productName", v);
          s.setField("unknownMaterial", false);
        }}
        placeholder="F.eks. plastflasker, tørrfisk, aluminiumsprofiler …"
      />
    </div>
  );
}
