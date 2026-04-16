"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps { children: ReactNode; content: string; className?: string; }

export function Tooltip({ children, content, className }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className={cn("absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-lg bg-surface-light border border-white/10 px-3 py-1.5 text-xs text-foreground shadow-lg whitespace-nowrap", className)}>
          {content}
        </div>
      )}
    </div>
  );
}
