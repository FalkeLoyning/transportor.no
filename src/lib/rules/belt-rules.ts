import type { BeltWizardState } from "@/stores/useBeltWizardStore";
import type { ValidationMessage } from "@/lib/wizard/types";
import { createWarning, createError } from "@/lib/wizard/validation";

export function applyBeltRules(state: BeltWizardState): ValidationMessage[] {
  const messages: ValidationMessage[] = [];
  if (state.applicationMode === "bulk" && !state.materialName && !state.unknownMaterial) {
    messages.push(createError("E-MATERIAL", "materialName"));
  }
  if (state.routeType === "incline_above_20" && !state.cleats && !state.sidewalls) {
    messages.push(createWarning("Helning over 20° krever medbringere eller sidevegger.", "cleats"));
  }
  if (state.reverseOperation && state.drivePosition && state.drivePosition !== "center_drive") {
    messages.push(createWarning("Reversibel drift anbefaler senterdrift.", "drivePosition"));
  }
  if (state.applicationMode === "precision_indexing" && state.beltFamily && state.beltFamily !== "timing_belt") {
    messages.push(createWarning("For presis indeksering anbefales timing belt.", "beltFamily"));
  }
  if (state.applicationMode === "food_hygiene" && state.beltFamily && state.beltFamily !== "monolithic_tpu" && state.beltFamily !== "modular_plastic") {
    messages.push(createWarning("For hygienisk drift anbefales monolittisk TPU eller modulbånd.", "beltFamily"));
  }
  if (state.atexApplicable && !state.atexZone) {
    messages.push(createError("E-ATEX", "atexZone"));
  }
  if (state.smallProductTransfer) {
    messages.push(createWarning("For små produkter, vurder nose bar / knife edge-overføring.", "smallProductTransfer"));
  }
  if (state.accumulationMode === "yes") {
    messages.push(createWarning("Akkumulering kan doble friksjon og motorbehov.", "accumulationMode"));
  }
  if (state.applicationMode === "bulk" && (state.beltFamily === "pvc" || state.beltFamily === "tpu")) {
    messages.push(createWarning("Lett transportbånd er normalt ikke egnet for bulkmaterialer.", "beltFamily"));
  }
  return messages;
}
