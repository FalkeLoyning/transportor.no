import { cn } from "@/lib/utils";

interface BadgeProps { children: React.ReactNode; variant?: "default" | "success" | "warning" | "error"; className?: string; }

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variant === "default" && "bg-white/10 text-foreground",
      variant === "success" && "bg-green-500/20 text-green-400",
      variant === "warning" && "bg-yellow-500/20 text-yellow-400",
      variant === "error" && "bg-red-500/20 text-red-400",
      className
    )}>
      {children}
    </span>
  );
}
