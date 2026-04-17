"use client";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useCallback } from "react";

export function BeltOtherInfoStep() {
  const s = useBeltWizardStore();

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    s.setField("attachmentNames", [...s.attachmentNames, ...names]);
  }, [s]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted mb-2">Tilleggsinformasjon</label>
        <textarea
          className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent min-h-[120px] resize-y"
          placeholder="Beskriv spesielle krav, miljøforhold, eksisterende utstyr, ønsket leveringstid …"
          value={s.additionalInfo}
          onChange={(e) => s.setField("additionalInfo", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-2">Last opp filer</label>
        <div
          className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          onClick={() => document.getElementById("belt-file-input")?.click()}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted" />
          <p className="text-sm text-muted">Dra filer hit, eller klikk for å velge</p>
          <p className="text-xs text-muted mt-1">Tegninger, bilder, spesifikasjoner</p>
          <input id="belt-file-input" type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>
        {s.attachmentNames.length > 0 && (
          <ul className="mt-3 space-y-1">
            {s.attachmentNames.map((n, i) => (
              <li key={i} className="text-sm text-foreground flex items-center gap-2">
                <span className="text-accent">📎</span> {n}
              </li>
            ))}
          </ul>
        )}
      </div>

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
