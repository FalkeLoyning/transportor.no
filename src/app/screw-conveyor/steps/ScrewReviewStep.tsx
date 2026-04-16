"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export function ScrewReviewStep() {
  const s = useScrewWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Oppsummering, materialer & kontakt</h3>

      <Card className="p-4 space-y-2 text-sm">
        <p><span className="text-muted">Funksjonstype:</span> <span className="text-foreground">{s.screwMode || "–"}</span></p>
        <p><span className="text-muted">Materiale:</span> <span className="text-foreground">{s.materialName || "–"}</span></p>
        <p><span className="text-muted">Kapasitet:</span> <span className="text-foreground">{s.requiredCapacity ? s.requiredCapacity + " " + s.capacityUnit : "–"}</span></p>
        <p><span className="text-muted">Lengde:</span> <span className="text-foreground">{s.centerlineLengthMm ? s.centerlineLengthMm + " mm" : "–"}</span></p>
        <p><span className="text-muted">Aksel:</span> <span className="text-foreground">{s.shaftType || "–"}</span></p>
        <p><span className="text-muted">Hus:</span> <span className="text-foreground">{s.housingType || "–"}</span></p>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Select label="Bygningsmateriale" value={s.constructionMaterial} onChange={(v) => s.setField("constructionMaterial", v as typeof s.constructionMaterial)}
          options={[
            { value: "carbon_steel", label: "Karbonstål" },
            { value: "stainless_304", label: "Rustfritt 304" },
            { value: "stainless_316", label: "Rustfritt 316" },
            { value: "wear_alloy", label: "Slitasjelegeringer" },
          ]} />
        <Input label="Akselmateriale" value={s.shaftMaterial} onChange={(v) => s.setField("shaftMaterial", v)} />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.foodContact} onChange={(e) => s.setField("foodContact", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Matkontakt
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.venting} onChange={(e) => s.setField("venting", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Ventilering
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={s.manuals} onChange={(e) => s.setField("manuals", e.target.checked)} className="rounded border-white/20 bg-surface" />
          Manualer
        </label>
      </div>

      <Input label="ATEX-sone" value={s.atexZone} onChange={(v) => s.setField("atexZone", v)} placeholder="F.eks. Zone 21" />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Antall" type="number" value={s.quantity.toString()} onChange={(v) => s.setField("quantity", Number(v) || 1)} />
        <Input label="Leveringsland" value={s.deliveryCountry} onChange={(v) => s.setField("deliveryCountry", v)} />
      </div>
      <Input label="Ønsket levering" value={s.deadline} onChange={(v) => s.setField("deadline", v)} placeholder="F.eks. Q3 2025" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Kontaktperson" value={s.contactName} onChange={(v) => s.setField("contactName", v)} />
        <Input label="Firma" value={s.companyName} onChange={(v) => s.setField("companyName", v)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="E-post" type="email" value={s.contactEmail} onChange={(v) => s.setField("contactEmail", v)} />
        <Input label="Telefon" type="tel" value={s.contactPhone} onChange={(v) => s.setField("contactPhone", v)} />
      </div>
    </div>
  );
}
