import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "lime" | "green" | "pink" | "blue" | "purple";
}

export function Badge({
  children,
  className = "",
  variant = "lime",
}: BadgeProps) {
  const variants = {
    lime: "bg-lime-400 text-gray-800",
    green: "bg-green-500 text-white",
    pink: "bg-pink-200 text-gray-800",
    blue: "bg-blue-200 text-gray-800",
    purple: "bg-purple-200 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
