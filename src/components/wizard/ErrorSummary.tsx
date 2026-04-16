"use client";
import type { ValidationResult } from "@/lib/wizard/types";
import { AlertTriangle, XCircle, Info } from "lucide-react";

export function ErrorSummary({ result }: { result: ValidationResult }) {
  if (result.messages.length === 0) return null;
  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 space-y-2">
      {result.messages.map((m, i) => (
        <div key={i} className="flex items-start gap-2 text-sm">
          {m.severity === "error" && <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />}
          {m.severity === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />}
          {m.severity === "info" && <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />}
          <span className={m.severity === "error" ? "text-red-300" : m.severity === "warning" ? "text-yellow-300" : "text-blue-300"}>
            {m.message}
          </span>
        </div>
      ))}
    </div>
  );
}
