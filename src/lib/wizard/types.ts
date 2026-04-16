export interface WizardStep {
  id: string;
  title: string;
  description?: string;
}

export interface ValidationMessage {
  code: string;
  field?: string;
  severity: "error" | "warning" | "info";
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  messages: ValidationMessage[];
}
