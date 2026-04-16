"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function ReviewStep() {
  const s = useBeltWizardStore();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Oppsummering & kontakt</h3>

      <Card className="p-4 space-y-2 text-sm">
        <p><span className="text-muted">Applikasjon:</span> <span className="text-foreground">{s.applicationMode || "–"}</span></p>
        <p><span className="text-muted">Rutetype:</span> <span className="text-foreground">{s.routeType || "–"}</span></p>
        <p><span className="text-muted">Lengde:</span> <span className="text-foreground">{s.overallLengthMm ? s.overallLengthMm + " mm" : "–"}</span></p>
        <p><span className="text-muted">Beltbredde:</span> <span className="text-foreground">{s.beltWidthMm ? s.beltWidthMm + " mm" : "–"}</span></p>
        <p><span className="text-muted">Beltfamilie:</span> <span className="text-foreground">{s.beltFamily || "–"}</span></p>
        <p><span className="text-muted">Ramme:</span> <span className="text-foreground">{s.frameMaterial || "–"}</span></p>
        <p><span className="text-muted">Driv:</span> <span className="text-foreground">{s.drivePosition || "–"}</span></p>
        <p><span className="text-muted">Antall:</span> <span className="text-foreground">{s.quantity}</span></p>
      </Card>

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
