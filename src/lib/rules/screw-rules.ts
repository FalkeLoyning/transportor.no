import type { ScrewWizardState } from "@/stores/useScrewWizardStore";
import type { ValidationMessage } from "@/lib/wizard/types";
import { createWarning } from "@/lib/wizard/validation";

export function applyScrewRules(state: ScrewWizardState): ValidationMessage[] {
  const messages: ValidationMessage[] = [];
  if (state.screwMode === "feeder") {
    if (state.pitchType && state.pitchType !== "variable" && state.pitchType !== "unknown") {
      messages.push(createWarning("For mater anbefales variable pitch.", "pitchType"));
    }
  }
  if (state.abrasiveness === "high" && state.shaftType === "shafted") {
    messages.push(createWarning("Svært abrasivt med aksel: vurder sliteforinger.", "shaftType"));
  }
  if (state.screwMode === "vertical" && state.shaftType === "shaftless") {
    messages.push(createWarning("Vertikal + shaftless krever spesialdesign.", "shaftType"));
  }
  return messages;
}
