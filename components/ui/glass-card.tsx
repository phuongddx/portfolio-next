"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { springTransition } from "@/components/effects/animation-variants";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <m.div
      whileHover={hover ? { scale: 1.03, y: -8 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={springTransition}
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6",
        "bg-white/70 dark:bg-gray-900/80",
        "backdrop-blur-xl backdrop-saturate-180",
        "border border-white/20 dark:border-white/10",
        "shadow-xl shadow-black/5 dark:shadow-black/20",
        "supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/70",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </m.div>
  );
}
