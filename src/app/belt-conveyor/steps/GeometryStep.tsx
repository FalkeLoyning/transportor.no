"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { SelectionCard } from "@/components/wizard/SelectionCard";
import { ArrowRight, TrendingUp, Mountain, CornerDownRight, Shuffle } from "lucide-react";

const routes = [
  { value: "straight", label: "Rett", icon: <ArrowRight className="h-5 w-5" /> },
  { value: "incline_under_20", label: "Helning <20°", icon: <TrendingUp className="h-5 w-5" /> },
  { value: "incline_above_20", label: "Helning >20°", icon: <Mountain className="h-5 w-5" /> },
  { value: "curve", label: "Kurve", icon: <CornerDownRight className="h-5 w-5" /> },
  { value: "combination", label: "Kombinasjon", icon: <Shuffle className="h-5 w-5" /> },
] as const;

export function GeometryStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Geometri & layout</h3>
      <div>
        <p className="text-sm text-muted mb-2">Rutetype</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {routes.map((r) => (
            <SelectionCard key={r.value} icon={r.icon} title={r.label} selected={s.routeType === r.value} onClick={() => s.setField("routeType", r.value)} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Input label="Total lengde (mm)" type="number" value={s.overallLengthMm?.toString() ?? ""} onChange={(v) => s.setField("overallLengthMm", v ? Number(v) : undefined)} />
        <Input label="Beltbredde (mm)" type="number" value={s.beltWidthMm?.toString() ?? ""} onChange={(v) => s.setField("beltWidthMm", v ? Number(v) : undefined)} />
        <Input label="Nyttebredde (mm)" type="number" value={s.usableWidthMm?.toString() ?? ""} onChange={(v) => s.setField("usableWidthMm", v ? Number(v) : undefined)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Input label="Innmatingshøyde (mm)" type="number" value={s.infeedHeightMm?.toString() ?? ""} onChange={(v) => s.setField("infeedHeightMm", v ? Number(v) : undefined)} />
        <Input label="Utmatingshøyde (mm)" type="number" value={s.outfeedHeightMm?.toString() ?? ""} onChange={(v) => s.setField("outfeedHeightMm", v ? Number(v) : undefined)} />
        <Input label="Helningsvinkel (°)" type="number" value={s.inclineAngleDeg?.toString() ?? ""} onChange={(v) => s.setField("inclineAngleDeg", v ? Number(v) : undefined)} />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
        <input type="checkbox" checked={s.smallProductTransfer} onChange={(e) => s.setField("smallProductTransfer", e.target.checked)} className="rounded border-white/20 bg-surface" />
        Liten-produkt overføring (knife edge / nose bar)
      </label>
    </div>
  );
}
