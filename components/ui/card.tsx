"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <m.div
      className={cn(
        "bg-white border-2 border-gray-800 rounded-xl p-6",
        "shadow-card",
        hover && "hover:shadow-hover transition-shadow duration-200",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </m.div>
  );
}
