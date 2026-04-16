import type { ScrewWizardState } from "@/stores/useScrewWizardStore";
import type { ValidationMessage } from "@/lib/wizard/types";
import { createWarning, createError } from "@/lib/wizard/validation";

export function applyScrewRules(state: ScrewWizardState): ValidationMessage[] {
  const messages: ValidationMessage[] = [];
  if (state.stickyStringy && state.shaftType === "shafted") {
    messages.push(createWarning("For klebrig materiale anbefales shaftless.", "shaftType"));
  }
  if (state.screwMode === "feeder") {
    if (state.pitchType && state.pitchType !== "variable") {
      messages.push(createWarning("For mater anbefales variable pitch.", "pitchType"));
    }
    if (!state.vfd) {
      messages.push(createWarning("VFD anbefales for matere.", "vfd"));
    }
  }
  if (state.inclineAngleDeg !== undefined && state.inclineAngleDeg > 10 && state.inclineAngleDeg <= 30) {
    if (state.pitchType === "standard") {
      messages.push(createWarning("Ved helning 10–30° anbefales short/half pitch.", "pitchType"));
    }
  }
  if (state.abrasiveness === "high" && state.constructionMaterial && state.constructionMaterial !== "wear_alloy") {
    messages.push(createWarning("Svært abrasivt: vurder slitasjelegeringer.", "constructionMaterial"));
  }
  if ((state.corrosiveness === "high" || state.foodContact) && state.constructionMaterial && !state.constructionMaterial.startsWith("stainless")) {
    messages.push(createWarning("Korrosivt/matkontakt: anbefaler rustfritt.", "constructionMaterial"));
  }
  if (state.outletCount > 1 && state.slideGates) {
    messages.push(createWarning("Siste utløp trenger normalt ikke spjeld.", "slideGates"));
  }
  if (state.atexMaterial && !state.atexZone) {
    messages.push(createError("E-ATEX", "atexZone"));
  }
  if (state.screwMode === "vertical" && state.shaftType === "shaftless") {
    messages.push(createWarning("Vertikal + shaftless krever spesialdesign.", "shaftType"));
  }
  return messages;
}
