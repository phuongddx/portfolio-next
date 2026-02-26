import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatBadgeProps {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
}

export function StatBadge({
  icon,
  value,
  label,
  className = "",
}: StatBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}
