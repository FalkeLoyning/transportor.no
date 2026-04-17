"use client";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useCallback } from "react";

export function OtherInfoStep() {
  const s = useScrewWizardStore();

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    s.setField("attachmentNames", [...s.attachmentNames, ...names]);
  }, [s]);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-muted">Annen informasjon</label>
        <textarea
          value={s.additionalInfo}
          onChange={(e) => s.setField("additionalInfo", e.target.value)}
          rows={4}
          placeholder="Beskriv spesielle krav, ønsker, referanser eller annen relevant informasjon..."
          className="mt-1 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-y"
        />
      </div>

      <div>
        <p className="text-xs font-medium text-muted mb-2">Last opp bilder og tegninger</p>
        <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-surface p-8 cursor-pointer hover:border-accent/40 hover:bg-surface-light transition-colors">
          <Upload className="h-8 w-8 text-foreground/40" />
          <span className="text-sm text-foreground/60">Klikk for å velge filer</span>
          <span className="text-xs text-muted">PDF, DWG, JPG, PNG (maks 25 MB per fil)</span>
          <input type="file" multiple accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.step,.stp,.igs,.iges" onChange={handleFiles} className="hidden" />
        </label>
      </div>

      {s.attachmentNames.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted">Valgte filer:</p>
          <div className="flex flex-wrap gap-2">
            {s.attachmentNames.map((name, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-accent/10 px-3 py-1 text-xs text-accent">
                {name}
                <button type="button" onClick={() => s.setField("attachmentNames", s.attachmentNames.filter((_, j) => j !== i))}
                  className="ml-1 text-accent/60 hover:text-accent">×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
