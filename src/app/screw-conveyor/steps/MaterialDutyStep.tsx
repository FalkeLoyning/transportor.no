"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { Input } from "@/components/ui/input";
import { Wheat, Package, TreePine, Mountain, Droplets, FlaskConical, Apple, HelpCircle } from "lucide-react";

const materials = [
  { value: "korn", label: "Korn / frø", desc: "Hvete, bygg, mais, raps …", icon: <Wheat className="h-8 w-8" /> },
  { value: "sement", label: "Sement / pulver", desc: "Sement, kalk, flygeaske …", icon: <Package className="h-8 w-8" /> },
  { value: "flis", label: "Flis / biomasse", desc: "Treflis, pellets, bark …", icon: <TreePine className="h-8 w-8" /> },
  { value: "sand", label: "Sand / grus", desc: "Sand, grus, stein, malm", icon: <Mountain className="h-8 w-8" /> },
  { value: "slam", label: "Slam / pasta", desc: "Avløpsslam, leire, gjørme", icon: <Droplets className="h-8 w-8" /> },
  { value: "kjemikalie", label: "Kjemikalier", desc: "Pulver, granulat, resirk.", icon: <FlaskConical className="h-8 w-8" /> },
  { value: "mat", label: "Matvarer", desc: "Mel, sukker, salt, krydder", icon: <Apple className="h-8 w-8" /> },
  { value: "unknown", label: "Vet ikke", desc: "Trenger rådgivning", icon: <HelpCircle className="h-8 w-8" /> },
] as const;

export function MaterialDutyStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {materials.map((m) => (
          <SelectionCard
            key={m.value}
            icon={m.icon}
            title={m.label}
            description={m.desc}
            selected={m.value === "unknown" ? s.materialUnknown : s.materialName === m.value}
            onClick={() => {
              if (m.value === "unknown") {
                s.setField("materialUnknown", true);
                s.setField("materialName", "");
              } else {
                s.setField("materialUnknown", false);
                s.setField("materialName", m.value);
              }
            }}
          />
        ))}
      </div>
      <Input
        label="Eller beskriv materialet"
        value={s.materialUnknown ? "" : (materials.some((m) => m.value === s.materialName) ? "" : s.materialName)}
        onChange={(v) => {
          s.setField("materialName", v);
          s.setField("materialUnknown", false);
        }}
        placeholder="F.eks. fiskemel, gummigranuler, aske …"
      />
    </div>
  );
}
