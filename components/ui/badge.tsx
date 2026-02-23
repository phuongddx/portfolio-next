import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cta" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-cta/10 text-cta dark:bg-blue-500/20 dark:text-blue-400",
    cta: "bg-cta text-white dark:bg-blue-500",
    outline:
      "bg-transparent border border-cta text-cta dark:border-blue-400 dark:text-blue-400",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-sm font-medium rounded-lg",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
