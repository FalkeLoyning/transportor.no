import type { ValidationMessage, ValidationResult } from "./types";

const ERROR_MESSAGES: Record<string, string> = {
  "E-REQ": "Obligatorisk felt mangler",
  "E-RANGE": "Verdi utenfor gyldig område",
  "E-TYPE": "Ugyldig type – kontroller format",
  "E-MATERIAL": "Materialegenskaper mangler",
  "E-GEOMETRY": "Geometrifeil – kontroller mål og vinkler",
  "E-COMPAT": "Kompatibilitetsfeil mellom valg",
  "E-SAFETY": "Sikkerhetskrav ikke oppfylt",
  "E-ATEX": "ATEX-klassifisering mangler",
  "E-CEMA": "CEMA/ISO kapasitetssjekk feilet",
  "E-DRIVE": "Drivberegning feilet",
  "E-FILE": "Vedlegg har ugyldig format eller størrelse",
};

export function createError(code: string, field?: string): ValidationMessage {
  return { code, field, severity: "error", message: ERROR_MESSAGES[code] ?? code };
}

export function createWarning(message: string, field?: string): ValidationMessage {
  return { code: "W-CUSTOM", field, severity: "warning", message };
}

export function validateRequired(value: unknown, field: string): ValidationMessage | null {
  if (value === "" || value === undefined || value === null) return createError("E-REQ", field);
  return null;
}

export function validateNumber(value: unknown, field: string): ValidationMessage | null {
  if (value !== undefined && value !== null && value !== "" && isNaN(Number(value))) return createError("E-TYPE", field);
  return null;
}

export function validateRange(value: number | undefined, min: number, max: number, field: string): ValidationMessage | null {
  if (value !== undefined && (value < min || value > max)) return createError("E-RANGE", field);
  return null;
}

export function combineValidations(...results: (ValidationMessage | null)[]): ValidationResult {
  const messages = results.filter((m): m is ValidationMessage => m !== null);
  return { valid: messages.filter((m) => m.severity === "error").length === 0, messages };
}
